import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RESPONSE_MESSAGES } from '../helpers/constants/messages';
import { ERROR_MESSAGE } from '../helpers/errors/message';
import { AddCartProductDto } from './dto/add-cart-product.dto';
import { CartProducts } from './entities/cart-products.entity';
import { Cart } from './entities/cart.entity';

@Injectable()
export class CartsService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    @InjectRepository(CartProducts)
    private readonly cartProductsRepository: Repository<CartProducts>,
  ) {}

  async getCartsByUserId(userId: string) {
    const cart = await this.cartRepository.find({
      where: { userId },
      relations: {
        products: true,
      },
      select: {
        products: {
          productId: true,
          price: true,
          quantity: true,
        },
      },
    });

    return cart;
  }

  async getCartById(userId: string, cartId: string) {
    const cart = await this.cartRepository.find({
      where: { userId, shoppingCartId: cartId },
      relations: {
        products: true,
      },
      select: {
        products: {
          productId: true,
          price: true,
          quantity: true,
        },
      },
    });
    if (!cart || cart.length === 0) {
      throw new BadRequestException(ERROR_MESSAGE.CART_NOT_FOUND);
    }

    return cart[0];
  }

  async addProduct(
    userId: string,
    cartId: string,
    addCartProductDto: AddCartProductDto,
  ) {
    let cart: Cart;

    const userHasCart = await this.cartRepository.findOne({
      where: { userId },
    });
    if (!userHasCart) {
      const newCart = new Cart({
        userId,
      });
      await this.cartRepository.save(newCart);
      cart = newCart;
    } else {
      cart = await this.cartRepository.findOne({
        where: { shoppingCartId: cartId },
      });
      if (!cart) {
        throw new BadRequestException(ERROR_MESSAGE.CART_NOT_FOUND);
      }
    }

    const existingCartProducts = await this.cartProductsRepository.findOne({
      where: {
        productId: addCartProductDto.productId,
        cart: { shoppingCartId: cartId },
      },
    });

    let resultProduct: CartProducts;

    if (existingCartProducts) {
      existingCartProducts.price += addCartProductDto.price;
      existingCartProducts.quantity += addCartProductDto.quantity;
      resultProduct = existingCartProducts;
    } else {
      const newCartProduct = new CartProducts({
        productId: addCartProductDto.productId,
        price: addCartProductDto.price,
        quantity: addCartProductDto.quantity,
        cart: cart,
      });
      resultProduct = newCartProduct;
    }

    await this.cartProductsRepository.save(resultProduct);

    cart.incrementTotals(addCartProductDto.price, addCartProductDto.quantity);
    await this.cartRepository.save(cart);

    const responseMessage = !userHasCart
      ? RESPONSE_MESSAGES.NEW_CART_CREATED
      : RESPONSE_MESSAGES.PRODUCT_ADDED;

    return {
      message: responseMessage,
      shoppingCartId: cart.shoppingCartId,
      productId: resultProduct.productId,
    };
  }

  async removeProduct(cartId: string, productId: string) {
    const cart = await this.cartRepository.findOne({
      where: { shoppingCartId: cartId },
    });
    if (!cart) {
      throw new BadRequestException(ERROR_MESSAGE.CART_NOT_FOUND);
    }

    const product = await this.cartProductsRepository.findOne({
      where: {
        productId,
        cart: {
          shoppingCartId: cartId,
        },
      },
    });
    if (!product) {
      throw new BadRequestException(ERROR_MESSAGE.PRODUCT_NOT_FOUND);
    }

    cart.decrementTotals(product.price, product.quantity);
    await this.cartRepository.save(cart);

    await this.cartProductsRepository.delete({
      cart: { shoppingCartId: cartId },
      productId,
    });
  }
}
