export class ItemNotFoundError extends Error {
  message: string = 'Item not found';
  httpStatusCode: number = 404;

  constructor() {
    super('Item not found');
    Object.setPrototypeOf(this, ItemNotFoundError.prototype);
  }
}
