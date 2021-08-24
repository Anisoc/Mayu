import ajv from "@models";
import { JSONSchemaType } from "ajv";

interface user {
  id: string;
  email: string;
  username: string;
  password: string;
  admin: boolean;
}

const schema: JSONSchemaType<user> = {
  type: "object",
  properties: {
    id: { type: "string", format: "uuid" },
    email: { type: "string", format: "email" },
    username: { type: "string", pattern: "^[a-zA-z0-9]{3,}$" },
    password: { type: "string", format: "password" },
    admin: { type: "boolean" },
  },
  required: ["id", "email", "password", "username", "admin"],
  additionalProperties: false,
};

// validate is a type guard for MyData - type is inferred from schema type
export const user = ajv.compile(schema);
