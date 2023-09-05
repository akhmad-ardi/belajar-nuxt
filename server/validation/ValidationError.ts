export class ValidationError extends Error {
  private statusCode: number;

  constructor(statusCode: number, message: string) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }

  getStatusCode() {
    return this.statusCode;
  }

  getStatusCodeAndMessage() {
    return { statusCode: this.statusCode, message: this.message };
  }
}
