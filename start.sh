#!bin/bash

cd kk-backend && npm run docker:up;

cd ../kk-cart-service && npm run docker:up;

cd ../kk-products-service && npm install && npm run docker:up && npm run seed:dev;
