export class CartNotFoundError extends Error {
  message: string = 'Cart not found';
  httpStatusCode: number = 404;

  constructor() {
    super('Cart not found');
    Object.setPrototypeOf(this, CartNotFoundError.prototype);
  }
}
