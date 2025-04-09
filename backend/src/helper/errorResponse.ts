class ErrorResponse extends Error {
   public statusCode: any;
   constructor(message: any, statusCode: number) {
      super(message);
      this.statusCode = statusCode;
   }
}

export default ErrorResponse;
