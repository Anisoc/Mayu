import ajv from "@models";
import { JSONSchemaType } from "ajv";

interface post {
  id: string;
  createdBy: string;
  content: string;
  timestamp: string;
  platforms?: object;
}

const schema: JSONSchemaType<post> = {
  type: "object",
  properties: {
    id: { type: "string", format: "uuid" },
    createdBy: { type: "string", pattern: "^[a-zA-z0-9]{3,}$" },
    content: { type: "string" },
    timestamp: { type: "string", format: "date-time" },
    platforms: {
      type: "object",
      nullable: true,
      properties: {
        discord: {
          type: "string",
          pattern: "^[0-9]{18}$",
          nullable: true,
        },
        facebook: {
          type: "string",
          pattern: "^[a-zA-z0-9]{3,}$",
          nullable: true,
        },
        github: {
          type: "string",
          pattern: "^[a-zA-z0-9]{3,}$",
          nullable: true,
        },
      },
    },
  },
  required: ["id", "createdBy", "content", "timestamp"],
  additionalProperties: false,
};

// validate is a type guard for MyData - type is inferred from schema type
export const user = ajv.compile(schema);
