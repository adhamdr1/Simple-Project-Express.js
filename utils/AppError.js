class AppError extends Error {
  constructor(message, statusCode, statusText) {
    super(message); // توريث الرسالة للكلاس الأصلي Error
    this.statusCode = statusCode;
    this.statusText = statusText;

    // يمنع إظهار الـ Error Stack في الإنتاج (لأسباب أمنية)
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
