import http from 'http';
import fs from 'fs';
import path from 'path';
import { URL } from 'url';
import dotenv from 'dotenv';
import open from 'open';
import { randomBytes } from 'crypto';
import { z } from 'zod';
import { successAuthHtml, errorAuthHtml } from './templates.js';

const authUrl = 'https://ticktick.com/oauth/authorize';
const tokenUrl = 'https://ticktick.com/oauth/token';
const defaultScopes = ['tasks:read', 'tasks:write'];

const AuthOptionsSchema = z.object({
  clientId: z.string().optional(),
  clientSecret: z.string().optional(),
  redirectUri: z.string().url().optional(),
  port: z.number().int().positive().optional(),
  envFile: z.string().optional(),
});

const TokenResponseSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string().optional(),
  token_type: z.string(),
  expires_in: z.number(),
  scope: z.string(),
});

const envContentSchema = z.record(z.string());

export class TickTickAuth {
  private clientId: string | undefined;
  private clientSecret: string | undefined;
  private redirectUri: string;
  private port: number;
  private authCode: string | null = null;
  private tokens: z.infer<typeof TokenResponseSchema> | null = null;

  constructor(options: z.infer<typeof AuthOptionsSchema> = {}) {
    const validatedOptions = AuthOptionsSchema.parse(options);
    const {
      clientId,
      clientSecret,
      redirectUri = 'http://localhost:8000/callback',
      port = 8000,
      envFile,
    } = validatedOptions;

    if (envFile) {
      dotenv.config({ path: envFile });
    } else {
      dotenv.config();
    }

    this.clientId = clientId || process.env.TICKTICK_CLIENT_ID;
    this.clientSecret = clientSecret || process.env.TICKTICK_CLIENT_SECRET;
    this.redirectUri = redirectUri;
    this.port = port;

    if (!this.clientId || !this.clientSecret) {
      console.warn(
        'TickTick client ID or client secret is missing. ' +
          'Please set TICKTICK_CLIENT_ID and TICKTICK_CLIENT_SECRET ' +
          'environment variables or provide them as parameters.'
      );
    }
  }

  private getAuthorizationUrl(scopes?: string[], state?: string): string {
    const params = new URLSearchParams({
      client_id: this.clientId!,
      redirect_uri: this.redirectUri,
      response_type: 'code',
      scope: (scopes || defaultScopes).join(' '),
    });

    if (state) {
      params.append('state', state);
    }

    return `${authUrl}?${params.toString()}`;
  }

  async startAuthFlow(scopes?: string[]): Promise<{
    message: string;
    ok: boolean;
  }> {
    if (!this.clientId || !this.clientSecret) {
      return {
        message:
          'TickTick client ID or client secret is missing. Please set up your credentials first.',
        ok: false,
      };
    }

    const state = randomBytes(30).toString('base64url');
    const authorizationUrl = this.getAuthorizationUrl(scopes, state);

    console.error('Opening browser for TickTick authorization...');
    console.error(
      "If the browser doesn't open automatically, please visit this URL:"
    );
    console.error(authorizationUrl);

    await open(authorizationUrl);

    return new Promise((resolve) => {
      const server = http.createServer((req, res) => {
        const url = new URL(req.url!, `http://localhost:${this.port}`);
        const code = url.searchParams.get('code');

        if (!code) {
          res.writeHead(400, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(errorAuthHtml);
          server.close();
          resolve({
            message: 'No authorization code received. Please try again.',
            ok: false,
          });
          return;
        }

        this.authCode = code;
        this.exchangeCodeForToken()
          .then((response) => {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(successAuthHtml(this.tokens?.access_token || ''));
            server.close();
            resolve({ message: response, ok: true });
          })
          .catch((error) => {
            res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(errorAuthHtml);
            server.close();
            resolve({
              message: `Error during token exchange: ${error}`,
              ok: false,
            });
          });
      });

      server.listen(this.port, () => {
        console.error(
          `Waiting for authentication callback on port ${this.port}...`
        );
      });

      setTimeout(() => {
        server.close();
        resolve({
          message: 'Authentication timed out. Please try again.',
          ok: false,
        });
      }, 300000);
    });
  }

  private async exchangeCodeForToken(): Promise<string> {
    if (!this.authCode) {
      return 'No authorization code available. Please start the authentication flow again.';
    }

    const tokenData = new URLSearchParams({
      grant_type: 'authorization_code',
      code: this.authCode,
      redirect_uri: this.redirectUri,
      scope: defaultScopes.join(' '),
    });

    const auth = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString(
      'base64'
    );

    try {
      const response = await fetch(tokenUrl, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: tokenData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const rawTokens = await response.json();
      this.tokens = TokenResponseSchema.parse(rawTokens);
      await this.saveTokensToEnv();
      return 'Authentication successful! Access token saved to .env file.';
    } catch (error) {
      console.error('Error exchanging code for token:', error);
      return `Error exchanging code for token: ${
        error instanceof Error ? error.message : String(error)
      }`;
    }
  }

  private async saveTokensToEnv(): Promise<void> {
    if (!this.tokens) return;

    const envPath = path.join(process.cwd(), '.env');
    const envContent: z.infer<typeof envContentSchema> = {};

    try {
      if (fs.existsSync(envPath)) {
        const content = fs.readFileSync(envPath, 'utf8');
        content.split('\n').forEach((line) => {
          const [key, value] = line.split('=');
          if (key && value) {
            envContent[key.trim()] = value.trim();
          }
        });
      }

      envContent['TICKTICK_ACCESS_TOKEN'] = this.tokens.access_token;
      if (this.tokens.refresh_token) {
        envContent['TICKTICK_REFRESH_TOKEN'] = this.tokens.refresh_token;
      }

      if (this.clientId) {
        envContent['TICKTICK_CLIENT_ID'] = this.clientId;
      }
      if (this.clientSecret) {
        envContent['TICKTICK_CLIENT_SECRET'] = this.clientSecret;
      }

      envContentSchema.parse(envContent);

      const envString = Object.entries(envContent)
        .map(([key, value]) => `${key}="${value}"`)
        .join('\n');

      fs.writeFileSync(envPath, envString);
      console.error('Tokens saved to .env file');
    } catch (error) {
      console.error('Error saving tokens to .env file:', error);
    }
  }
}
