import express from "express";
import http from "http";
import { routers } from "../routes";

const app = express();

app.use(express.json());
app.use(routers);

const httpServer = http.createServer(app);

export { httpServer };
