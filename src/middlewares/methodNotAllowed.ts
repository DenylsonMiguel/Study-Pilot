import type { Request, Response } from 'express';

export default function methodNotAllowed(req: Request, res: Response) {
  res.status(405).json({
    error: 'Method not allowed',
    code: 'METHOD_NOT_ALLOWED'
  });
}