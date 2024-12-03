import { config } from "dotenv";
import Joi, { ObjectSchema } from "joi";
import path from "path";
config({ path: path.resolve(__dirname, "../../.env") });

// environment

export const { MONO_API_KEY, MONO_BASE_URL, APP_PORT, NODE_ENV } = process.env;

export const env = {
  isDev: String(NODE_ENV).toLowerCase().includes("development"),
  env: NODE_ENV,
};

const schema = Joi.object({});
const validateAppConfig = (
  schema: ObjectSchema,
  config: Record<string, unknown>
): void => {
  const result = schema.validate(config, {
    abortEarly: false,
    allowUnknown: true,
  });

  if (result.error) {
    console.error("Application configuration error.", {
      details: result.error.details,
    });

    throw result.error;
  }
};

export const validateEnv = () => {
  try {
    validateAppConfig(schema, process.env);
  } catch (e) {
    process.exit(1);
  }
};
