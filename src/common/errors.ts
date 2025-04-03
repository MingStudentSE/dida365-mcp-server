export class TickTickError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly response: unknown
  ) {
    super(message);
    this.name = 'TickTickError';
  }
}

export class TickTickValidationError extends TickTickError {
  constructor(message: string, status: number, response: unknown) {
    super(message, status, response);
    this.name = 'TickTickValidationError';
  }
}

export class TickTickResourceNotFoundError extends TickTickError {
  constructor(resource: string) {
    super(`Resource not found: ${resource}`, 404, {
      message: `${resource} not found`,
    });
    this.name = 'TickTickResourceNotFoundError';
  }
}

export class TickTickAuthenticationError extends TickTickError {
  constructor(message = 'Authentication failed') {
    super(message, 401, { message });
    this.name = 'TickTickAuthenticationError';
  }
}

export class TickTickPermissionError extends TickTickError {
  constructor(message = 'Insufficient permissions') {
    super(message, 403, { message });
    this.name = 'TickTickPermissionError';
  }
}

export class TickTickRateLimitError extends TickTickError {
  constructor(message = 'Rate limit exceeded', public readonly resetAt: Date) {
    super(message, 429, { message, reset_at: resetAt.toISOString() });
    this.name = 'TickTickRateLimitError';
  }
}

export class TickTickConflictError extends TickTickError {
  constructor(message: string) {
    super(message, 409, { message });
    this.name = 'TickTickConflictError';
  }
}

export function isTickTickError(error: unknown): error is TickTickError {
  return error instanceof TickTickError;
}

export function createTickTickError(
  status: number,
  response: any
): TickTickError {
  switch (status) {
    case 401:
      return new TickTickAuthenticationError(response?.message);
    case 403:
      return new TickTickPermissionError(response?.message);
    case 404:
      return new TickTickResourceNotFoundError(response?.message || 'Resource');
    case 409:
      return new TickTickConflictError(
        response?.message || 'Conflict occurred'
      );
    case 422:
      return new TickTickValidationError(
        response?.message || 'Validation failed',
        status,
        response
      );
    case 429:
      return new TickTickRateLimitError(
        response?.message,
        new Date(response?.reset_at || Date.now() + 60000)
      );
    default:
      return new TickTickError(
        response?.message || 'TickTick API error',
        status,
        response
      );
  }
}

export function formatTickTickError(error: TickTickError): string {
  let message = `TickTick API Error: ${error.message}`;

  if (error instanceof TickTickValidationError) {
    message = `Validation Error: ${error.message}`;
    if (error.response) {
      message += `\nDetails: ${JSON.stringify(error.response)}`;
    }
  } else if (error instanceof TickTickResourceNotFoundError) {
    message = `Not Found: ${error.message}`;
  } else if (error instanceof TickTickAuthenticationError) {
    message = `Authentication Failed: ${error.message}`;
  } else if (error instanceof TickTickPermissionError) {
    message = `Permission Denied: ${error.message}`;
  } else if (error instanceof TickTickRateLimitError) {
    message = `Rate Limit Exceeded: ${
      error.message
    }\nResets at: ${error.resetAt.toISOString()}`;
  } else if (error instanceof TickTickConflictError) {
    message = `Conflict: ${error.message}`;
  }

  return message;
}
