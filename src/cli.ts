import { TickTickAuth } from './common/auth.js';
import dotenv from 'dotenv';

export async function main(): Promise<{
  message: string;
  ok: boolean;
}> {
  dotenv.config();

  const clientId = process.env.TICKTICK_CLIENT_ID;
  const clientSecret = process.env.TICKTICK_CLIENT_SECRET;
  const accessToken = process.env.TICKTICK_ACCESS_TOKEN;
  const redirectUri = 'http://localhost:8000/callback';
  const port = 8000;

  if (!clientId || !clientSecret) {
    console.error(
      'Error: TICKTICK_CLIENT_ID and TICKTICK_CLIENT_SECRET must be set in the environment.'
    );
    return {
      message:
        'Error: TICKTICK_CLIENT_ID and TICKTICK_CLIENT_SECRET must be set in the environment.',
      ok: false,
    };
  }

  if (accessToken) {
    console.error(
      'Access token is already set on .env No need to authorize again.'
    );
    return {
      message: 'Access token is already set. No need to authorize again.',
      ok: true,
    };
  }

  const auth = new TickTickAuth({
    clientId,
    clientSecret,
    redirectUri,
    port,
  });

  const result = await auth.startAuthFlow();
  console.error(result);
  return result;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}
