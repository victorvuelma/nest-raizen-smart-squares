import { z } from 'zod';

const _apiConfigScheme = z.object({
  DATABASE_URL: z.string().url(),
  HOST: z.string().default('0.0.0.0'),
  JWT_EXPIRES: z
    .string()
    .default('3600')
    .transform((expires) => Number(expires)),
  JWT_SECRET: z.string(),
  PORT: z
    .string()
    .default('3000')
    .transform((expires) => Number(expires)),
});

export type ApiConfigEnvironment = z.infer<typeof _apiConfigScheme>;

export function apiConfigValidate(
  config: Record<string, unknown>,
): ApiConfigEnvironment {
  const validatedConfig = _apiConfigScheme.parse(config);

  return validatedConfig;
}
