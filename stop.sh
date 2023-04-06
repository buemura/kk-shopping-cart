#!bin/bash

cd kk-backend && npm run docker:down;

cd ../kk-cart-service && npm run docker:down;

cd ../kk-products-service && npm run docker:down;