import * as joi from "joi";

export const userUpdateSchema = joi.object({
  name: joi.string().optional(),
  email: joi.string().email().optional(),
  username: joi.string().optional(),
  avatar: joi.string().uri().optional(),
});
