// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class RemoveItemUsecase {
//   async execute(cartId: string, productId: string) {
//     const cart = await this.cartRepository.findOne({
//       where: { shoppingCartId: cartId },
//     });

//     if (!cart) {
//       throw new BadRequestException(ERROR_MESSAGE.CART_NOT_FOUND);
//     }

//     const product = await this.cartProductsRepository.findOne({
//       where: {
//         productId,
//         cart: {
//           shoppingCartId: cartId,
//         },
//       },
//     });
//     if (!product) {
//       throw new BadRequestException(ERROR_MESSAGE.PRODUCT_NOT_FOUND);
//     }

//     cart.decrementTotals(product.price, product.quantity);
//     await this.cartRepository.save(cart);

//     await this.cartProductsRepository.delete({
//       cart: { shoppingCartId: cartId },
//       productId,
//     });
//   }
// }
