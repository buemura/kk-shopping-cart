# shopping-cart

The shopping cart main repository.

- [Setup](#setup)
- [How to run on local environment](#how-to-run-on-local-environment)
  - [APIs documentation](#apis-documentation)
- [Architecture design](#architecture-design)

## Setup

- clone the repository with the command below:

```bash
git clone https://github.com/buemura/shopping-cart.git
```

## How to run on local environment

- To run on local environment you will need to have `node`, `docker` and `docker-compose` installed.

1. Make sure to have the `.env` on root of all applications inside `apps/` directory.

2. To start all the required databases

- You can execute the script below to start an instance of mongodb and postgresql:

```bash
pnpm run env:up
```

- Then install all the dependencies:

```bash
pnpm install
```

3. To stop apps and local databases

- You can execute the script below to stop the mongodb and postgresql:

```bash
npm run env:down
```

### APIs documentation

- api-gateway:
  - With application running, go to `http://localhost:8080/api/docs` to see the Swagger documentation.
- product-service:
  - With application running, go to `http://localhost:8081/api/docs` to see the Swagger documentation.
- cart-service:
  - With application running, go to `http://localhost:8082/api/docs` to see the Swagger documentation.

## Architecture design

![Architecture](./docs/architecture.png)
