import jwt from "jsonwebtoken";

export const generateJWT = (payload: any) => {
  const SECRET_KEY = process.env.JWT_SECRET || "secret";

  return jwt.sign(payload, SECRET_KEY);
};

export const verifyJWT = (token: string) => {
  const SECRET_KEY = process.env.JWT_SECRET || "secret";

  return jwt.verify(token, SECRET_KEY);
};
