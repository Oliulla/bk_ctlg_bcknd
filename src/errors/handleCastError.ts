import mongoose from "mongoose";
import { IGenericErrorMessage } from "../app/interfaces/error";

const handleCastError = (error: mongoose.Error.CastError) => {
  const errors: IGenericErrorMessage[] = [
    {
      path: error.path,
      message: "Invalid _id",
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: "Cast Error",
    errorMessages: errors,
  };
};

export default handleCastError;
