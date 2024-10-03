// Wrap async routes to handle errors without repeating try-catch
export const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
  