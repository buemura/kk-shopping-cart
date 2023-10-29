# cart-service

The cart service of a shopping cart project.

## Technical details

- Languages:
  - Node.js 18.x.x
  - TypeScript
- Frameworks:
  - Nest.js
- Database:
  - PostgreSQL
- Others:
  - Docker

## How to run on local environment

- To run on local environment you will need to have `node`, `docker` and `docker-compose` installed.

1. Make sure to have the `.env` on repository root.

2. To start app and local database

```bash
npm run docker:up
```

3. To stop app and local database

```bash
npm run docker:down
```

### API documentation

- With application running, go to `http://localhost:8082/api/docs` to see the Swagger documentation.

## Architecture design

![Architecture](./docs/architecture.png)
