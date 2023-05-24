import { Response } from "express";

import { AppError } from "../../../helpers/errors/app-error";

export function handleHttpResponse(
  response: Response,
  statusCode: number,
  result: any
): Response {
  return response.status(statusCode).send(result);
}

export function handleHttpErrorResponse(
  response: Response,
  error: Error
): Response {
  if (error instanceof AppError) {
    return response.status(error.statusCode).send({
      status: "error",
      message: error.message,
    });
  }

  return response.status(500).send({
    status: "error",
    message: "Internal Server Error",
  });
}
