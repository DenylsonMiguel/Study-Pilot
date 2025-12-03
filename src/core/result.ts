export class Result<T> {
  private constructor(
    public readonly ok: boolean,
    public readonly status: number,
    public readonly data?: T,
    public readonly error?: {
      message: string;
      code?: string;
    }
  ) {}

  static ok<T>(data: T, status: number): Result<T> {
    return new Result<T>(true, status, data);
  }

  static fail<T>(message: string, status: number, code: string): Result<T> {
    return new Result<T>(false, status, undefined, { message, code });
  }
}