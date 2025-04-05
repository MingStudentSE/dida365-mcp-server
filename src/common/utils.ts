import { createTickTickError } from './errors.js';

type RequestOptions = {
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
};

async function parseResponseBody(response: Response): Promise<unknown> {
  const contentType = response.headers.get('content-type');
  if (contentType?.includes('application/json')) {
    return response.json();
  }
  return response.text();
}

export async function ticktickRequest(
  url: string,
  options: RequestOptions = {}
): Promise<unknown> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (process.env.TICKTICK_ACCESS_TOKEN) {
    headers['Authorization'] = `Bearer ${process.env.TICKTICK_ACCESS_TOKEN}`;
  }

  const response = await fetch(url, {
    method: options.method || 'GET',
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const responseBody = await parseResponseBody(response);

  if (!response.ok) {
    throw createTickTickError(response.status, responseBody);
  }

  return responseBody;
}
