export const HTTP_CODES = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

export enum Namespaces {
  Entry = "entry",
  Config = "config",
  POSTGRES_DATABASE = "postgres-database",
  FUNCTIONS = "functions",
}
