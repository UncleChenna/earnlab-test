export default class CustomServiceError extends Error {
  constructor(message: string) {
    super(message);
  }
}
