/**
 * API error object
 * @property status
 * @property message
 */
 export class HttpError extends Error {
  public status: number;

  public message: string;

  constructor(status: number, message: string, name?: string) {
    super(message);
    this.name = name || 'Error';
    this.status = status;
    this.message = message;
  }
}
