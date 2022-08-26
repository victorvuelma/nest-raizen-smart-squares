import { z } from 'zod';

const _apiConfigScheme = z.object({
  BCRYPT_ROUNDS: z
    .string()
    .default('4')
    .transform((rounds) => Number(rounds)),
  DATABASE_URL: z.string().url(),
  ENVIRONMENT: z.enum(['PRODUCTION', 'DEVELOPMENT']).default('DEVELOPMENT'),
  HOST: z.string().default('0.0.0.0'),
  JWT_EXPIRES: z
    .string()
    .default('3600')
    .transform((expires) => Number(expires)),
  JWT_SECRET: z.string(),
  MQTT_PORT: z.string().transform((port) => Number(port)),
  MQTT_HOST: z.string(),
  MQTT_PASSWORD: z.string(),
  MQTT_PROTOCOL: z.enum(['ssl']),
  MQTT_PROTOCOL_VERSION: z.string().transform((version) => Number(version)),
  MQTT_USER: z.string(),
  PORT: z
    .string()
    .default('3000')
    .transform((port) => Number(port)),
  REDIS_DB: z
    .string()
    .default('1')
    .transform((db) => Number(db)),
  REDIS_HOST: z.string(),
  REDIS_PASSWORD: z.string(),
  REDIS_PORT: z.string().transform((db) => Number(db)),
  REDIS_TLS: z.string().transform((tls) => Boolean(tls)),
});

export type ApiConfigEnvironment = z.infer<typeof _apiConfigScheme>;

export function apiConfigValidate(
  config: Record<string, unknown>,
): ApiConfigEnvironment {
  const validatedConfig = _apiConfigScheme.parse(config);

  return validatedConfig;
}
