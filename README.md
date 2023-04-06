# kk-shopping-cart

The shopping cart main repository.

## Requirements

Development of three services. The communication between the services can be done through HTTP:

- Development of a REST API:

  - Endpoint that returns a list of products. This products must be retrieved from the `products-service`.

    - Structure example:

    ```json
    {
      "productId": "192663",
      "price": 267
    }
    ```

  - Endpoint to add a product to a cart. It must communicate with `carts-service`.
  - Endpoint to remove a remove a product from a cart. It must communicate with `carts-service`.
  - Endpoint to get cart. It must communicate with `carts-service`.
  - Cart response example:
    ```json
    {
      "shoppingCartId": "192663",
      "userId": "11111111",
      "totalPrice": 267,
      "totalQuantity": 1,
      "products": [
        {
          "productId": "192663",
          "price": 267,
          "quantity": 1
        }
      ]
    }
    ```

- Development of a microservice for products
  - Should integrate with a NoSQL database to get products.
- Development of a microservice for shopping cart
  - Should integrate with a SQL database to persist shopping carts.

## Architecture design

![Architecture](./docs/architecture.png)
