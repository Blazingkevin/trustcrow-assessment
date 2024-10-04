import Joi from 'joi';

/**
 * To ensure that all necessary environment variables are set, and defaults are provided where applicable...
 */
const envSchema = Joi.object({
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().required(),
    DB_USER: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_NAME: Joi.string().required(),
    PORT: Joi.number().default(3000),
    NODE_ENV: Joi.string().valid('test', 'development', 'production').default('development'),
}).unknown();

export const validateEnv = () => {
    const { error, value: envVars } = envSchema.validate(process.env);
    if (error) {
        throw new Error(`Config validation error: ${error.message}`);
    }
    return envVars;
};
