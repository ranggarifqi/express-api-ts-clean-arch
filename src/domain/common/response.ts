export interface DSuccessResponse {
  statusCode: number;
  message: string;
  results: any;
}

export interface DErrorResponse {
  statusCode: number;
  error: string;
  message: string;
}