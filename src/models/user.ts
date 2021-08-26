import ajv from "@models";
import { JSONSchemaType } from "ajv";

interface User {
  id: string;
  email: string;
  username: string;
  password: string;
  admin: boolean;
  createdAt: string;
}

const schema: JSONSchemaType<User> = {
  type: "object",
  properties: {
    id: { type: "string", format: "uuid" },
    email: { type: "string", format: "email" },
    username: { type: "string", pattern: "^[a-zA-z0-9]{3,}$" },
    password: { type: "string", format: "password" },
    admin: { type: "boolean" },
    createdAt: { type: "string", format: "date-time" },
  },
  required: ["id", "email", "password", "username", "admin", "createdAt"],
  additionalProperties: false,
};

// validate is a type guard for MyData - type is inferred from schema type
export const isUser = ajv.compile(schema);
