export const swaggerConfig = {
  swagger: "2.0",
  info: {
    description: "Node JS REST API to manage Shopping Cart",
    version: "1.0.0",
    title: "Shopping Cart API",
  },
  tags: [
    {
      name: "Bruno Uemura",
      description: "",
    },
  ],
  schemes: ["http"],
  paths: {
    "/api/products": {
      get: {
        tags: ["Products"],
        description: "Returns a list of products",
        consumes: ["application/json"],
        produces: ["application/json"],
        responses: {
          200: {
            description:
              "If the code runs without error, you should get 200 response and an output JSON in the format as shown below.",
            schema: {
              $ref: "#/definitions/ProductsGetHttp200",
            },
          },
          400: {
            description:
              "If query parameters is not provided it will return status 400 and the JSON object as shown below.",
            schema: {
              $ref: "#/definitions/ProductsGetHttp400",
            },
          },
          500: {
            description:
              "If the extenal weather api id unavailable it will return status 500 and the JSON object as shown below.",
            schema: {
              $ref: "#/definitions/ProductsGetHttp500",
            },
          },
        },
      },
    },
    "/api/users/{userId}/carts/{cartId}": {
      get: {
        tags: ["Carts"],
        description: "Returns cart details",
        consumes: ["application/json"],
        produces: ["application/json"],
        parameters: [
          {
            in: "path",
            name: "userId",
            type: "string",
            description: "user id",
            example: "user-001",
          },
          {
            in: "path",
            name: "cartId",
            type: "string",
            description: "user id",
            example: "71743e67-2445-49ba-b6f7-f7173e61c1cd",
          },
        ],
        responses: {
          200: {
            description:
              "If the code runs without error, you should get 200 response and an output JSON in the format as shown below.",
            schema: {
              $ref: "#/definitions/CartGetHttp200",
            },
          },
          400: {
            description:
              "If query parameters is not provided it will return status 400 and the JSON object as shown below.",
            schema: {
              $ref: "#/definitions/CartGetHttp400",
            },
          },
          500: {
            description:
              "If the extenal weather api id unavailable it will return status 500 and the JSON object as shown below.",
            schema: {
              $ref: "#/definitions/CartGetHttp500",
            },
          },
        },
      },
      post: {
        tags: ["Carts"],
        description: "Adds a product to the cart",
        consumes: ["application/json"],
        produces: ["application/json"],
        parameters: [
          {
            in: "path",
            name: "userId",
            type: "string",
            description: "user id",
            example: "user-001",
          },
          {
            in: "path",
            name: "cartId",
            type: "string",
            description: "user id",
            example: "71743e67-2445-49ba-b6f7-f7173e61c1cd",
          },
          {
            in: "body",
            name: "product",
            description: "Product to add to the cart",
            schema: {
              $ref: "#/components/schemas/AddProductToCart",
            },
          },
        ],
        responses: {
          201: {
            description:
              "If the code runs without error, you should get 201 response and an output JSON in the format as shown below.",
            schema: {
              $ref: "#/definitions/CartPostHttp201",
            },
          },
          400: {
            description:
              "If query parameters is not provided it will return status 400 and the JSON object as shown below.",
            schema: {
              $ref: "#/definitions/CartPostHttp400",
            },
          },
          500: {
            description:
              "If the extenal weather api id unavailable it will return status 500 and the JSON object as shown below.",
            schema: {
              $ref: "#/definitions/CartPostHttp500",
            },
          },
        },
      },
    },
    "/api/users/{userId}/carts/{cartId}/products/{productId}": {
      delete: {
        tags: ["Carts"],
        description: "Remove a product from cart",
        consumes: ["application/json"],
        produces: ["application/json"],
        parameters: [
          {
            in: "path",
            name: "userId",
            type: "string",
            description: "user id",
            example: "user-001",
          },
          {
            in: "path",
            name: "cartId",
            type: "string",
            description: "user id",
            example: "71743e67-2445-49ba-b6f7-f7173e61c1cd",
          },
          {
            in: "path",
            name: "productId",
            type: "string",
            description: "product id",
            example: "642cbd0ab77945bab736f9c0",
          },
        ],
        responses: {
          204: {
            description:
              "If the code runs without error, you should get 204 response and no response body",
          },
          400: {
            description:
              "If query parameters is not provided it will return status 400 and the JSON object as shown below.",
            schema: {
              $ref: "#/definitions/CartDeleteHttp400",
            },
          },
          500: {
            description:
              "If the extenal weather api id unavailable it will return status 500 and the JSON object as shown below.",
            schema: {
              $ref: "#/definitions/CartDeleteHttp500",
            },
          },
        },
      },
    },
  },
  definitions: {
    ProductsGetHttp200: {
      type: "array",
      items: {
        type: "object",
        properties: {
          productId: {
            type: "string",
            example: "642cbd0ab77945bab736f9bf",
          },
          price: {
            type: "number",
            example: 10.99,
          },
        },
      },
    },
    ProductsGetHttp400: {
      type: "object",
      properties: {
        status: {
          type: "string",
          example: "error",
        },
        message: {
          type: "string",
          example: "/GET API request error: ...",
        },
      },
    },
    ProductsGetHttp500: {
      type: "object",
      properties: {
        status: {
          type: "string",
          example: "error",
        },
        message: {
          type: "string",
          example: "Internal Server Error",
        },
      },
    },
    CartGetHttp200: {
      type: "object",
      properties: {
        shoppingCartId: {
          type: "string",
          example: "71743e67-2445-49ba-b6f7-f7173e61c1cd",
        },
        userId: {
          type: "string",
          example: "user-001",
        },
        totalPrice: {
          type: "number",
          example: 10.99,
        },
        totalQuantity: {
          type: "number",
          example: 1,
        },
        createdAt: {
          type: "string",
          example: new Date(),
        },
        updatedAt: {
          type: "string",
          example: new Date(),
        },
        products: {
          type: "array",
          items: {
            properties: {
              productId: {
                type: "string",
                example: "642cbd0ab77945bab736f9bf",
              },
              price: {
                type: "number",
                example: 10.99,
              },
              quantity: {
                type: "number",
                example: 1,
              },
            },
          },
        },
      },
    },
    CartGetHttp400: {
      type: "object",
      properties: {
        status: {
          type: "string",
          example: "error",
        },
        message: {
          type: "string",
          example: "/GET API request error: ...",
        },
      },
    },
    CartGetHttp500: {
      type: "object",
      properties: {
        status: {
          type: "string",
          example: "error",
        },
        message: {
          type: "string",
          example: "Internal Server Error",
        },
      },
    },
    CartPostHttp201: {
      type: "object",
      properties: {
        message: {
          type: "string",
          example: "Product added to existing cart.",
        },
        shoppingCartId: {
          type: "string",
          example: "71743e67-2445-49ba-b6f7-f7173e61c1cd",
        },
        productId: {
          type: "string",
          example: "642cbd0ab77945bab736f9bf",
        },
      },
    },
    CartPostHttp400: {
      type: "object",
      properties: {
        status: {
          type: "string",
          example: "error",
        },
        message: {
          type: "string",
          example: "/GET API request error: ...",
        },
      },
    },
    CartPostHttp500: {
      type: "object",
      properties: {
        status: {
          type: "string",
          example: "error",
        },
        message: {
          type: "string",
          example: "Internal Server Error",
        },
      },
    },
    CartDeleteHttp400: {
      type: "object",
      properties: {
        status: {
          type: "string",
          example: "error",
        },
        message: {
          type: "string",
          example: "/GET API request error: ...",
        },
      },
    },
    CartDeleteHttp500: {
      type: "object",
      properties: {
        status: {
          type: "string",
          example: "error",
        },
        message: {
          type: "string",
          example: "Internal Server Error",
        },
      },
    },
  },
  components: {
    schemas: {
      AddProductToCart: {
        type: "object",
        properties: {
          productId: {
            type: "string",
            example: "642cbd0ab77945bab736f9bf",
          },
          price: {
            type: "number",
            example: 10.99,
          },
          quantity: {
            type: "number",
            example: 2,
          },
        },
      },
    },
  },
};
