import { TickTickAuth } from './common/auth.js';
import dotenv from 'dotenv';

async function main() {
  dotenv.config();

  const clientId = process.env.TICKTICK_CLIENT_ID;
  const clientSecret = process.env.TICKTICK_CLIENT_SECRET;
  const redirectUri = 'http://localhost:8000/callback';
  const port = 8000;

  if (!clientId || !clientSecret) {
    console.error(
      'Error: TICKTICK_CLIENT_ID and TICKTICK_CLIENT_SECRET must be set in the environment.'
    );
    process.exit(1);
  }

  const auth = new TickTickAuth({
    clientId,
    clientSecret,
    redirectUri,
    port,
  });

  const result = await auth.startAuthFlow();
  console.log(result);
}

main().catch(console.error);
