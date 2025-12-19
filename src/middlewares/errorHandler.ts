import type { Request, Response, NextFunction } from 'express';

export default async function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<Response> {
  if (err instanceof SyntaxError && 'body' in err) {
    return res.status(400).json({
      error: 'Invalid JSON payload'
    });
  }

  console.error(err);

  return res.status(500).json({
    error: 'Internal server error'
  });
}