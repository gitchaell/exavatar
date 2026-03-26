/**
 * Application environment modes.
 * Determines runtime behavior and configuration for different deployment contexts.
 *
 * @example
 * ```typescript
 * // Environment variable usage
 * // ENV=production deno run app.ts
 * // ENV=development deno run app.ts
 *
 * console.log(Environment.PRODUCTION)  // 'production'
 * console.log(Environment.DEVELOPMENT) // 'development'
 * ```
 */
export enum Environment {
	/** Production environment with GitHub repository and optimized caching */
	PRODUCTION = 'production',
	/** Development environment with local filesystem and no caching */
	DEVELOPMENT = 'development',
}

/**
 * Configuration interface for environment settings.
 * Contains validated environment configuration loaded from system environment variables.
 *
 * @example
 * ```typescript
 * const config: EnvironmentConfig = {
 *   environment: Environment.PRODUCTION
 * }
 *
 * // Used by EnvironmentManager
 * const manager = EnvironmentManager.getInstance()
 * const currentConfig = manager.getConfig()
 * console.log(currentConfig.environment) // Environment.PRODUCTION or DEVELOPMENT
 * ```
 */
export interface EnvironmentConfig {
	/** Current application environment mode */
	environment: Environment;
}

class EnvironmentManager {
	private static instance: EnvironmentManager | null = null;
	private config: EnvironmentConfig;

	private constructor() {
		this.config = this.loadConfig();
	}

	static getInstance(): EnvironmentManager {
		if (!EnvironmentManager.instance) {
			EnvironmentManager.instance = new EnvironmentManager();
		}
		return EnvironmentManager.instance;
	}

	private loadConfig(): EnvironmentConfig {
		let env = process.env.ENV || import.meta.env?.ENV;

		// Vercel and Node environments commonly use NODE_ENV
		if (!env) {
			const nodeEnv = process.env.NODE_ENV || import.meta.env?.NODE_ENV;
			if (nodeEnv === 'production' || nodeEnv === 'development') {
				env = nodeEnv;
			}
		}

		// Force VERCEL env to production
		if (process.env.VERCEL) {
			env = Environment.PRODUCTION;
		}

		// Default to production if completely missing in a serverless environment
		if (!env) {
			env = Environment.PRODUCTION;
		}

		if (!Object.values(Environment).includes(env as Environment)) {
			console.warn(`⚠️ Invalid ENV variable: ${env}. Defaulting to production.`);
			env = Environment.PRODUCTION;
		}

		return {
			environment: env as Environment,
		};
	}

	getConfig(): EnvironmentConfig {
		return { ...this.config };
	}

	getEnvironment(): Environment {
		return this.config.environment;
	}

	isProduction(): boolean {
		return this.config.environment === Environment.PRODUCTION;
	}

	isDevelopment(): boolean {
		return this.config.environment === Environment.DEVELOPMENT;
	}

	static reset(): void {
		EnvironmentManager.instance = null;
	}
}

export const environmentManager = EnvironmentManager.getInstance();
