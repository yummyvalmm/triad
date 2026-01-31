import { IS_DEV } from '../constants';

type LogLevel = 'info' | 'warn' | 'error';

/**
 * Logger utility - only logs in development mode
 */
export const logger = {
    /**
     * Log informational message
     */
    info: (message: string, ...args: any[]): void => {
        if (IS_DEV) {
            console.log(`[INFO] ${message}`, ...args);
        }
    },

    /**
     * Log warning message
     */
    warn: (message: string, ...args: any[]): void => {
        if (IS_DEV) {
            console.warn(`[WARN] ${message}`, ...args);
        }
    },

    /**
     * Log error message
     */
    error: (message: string, error?: Error | unknown, ...args: any[]): void => {
        if (IS_DEV) {
            console.error(`[ERROR] ${message}`, error, ...args);
        }
        // In production, you could send to error tracking service (e.g., Sentry)
        // if (!IS_DEV) {
        //   sendToErrorTracking(message, error);
        // }
    },

    /**
     * Log debug message (only in development)
     */
    debug: (message: string, ...args: any[]): void => {
        if (IS_DEV) {
            console.debug(`[DEBUG] ${message}`, ...args);
        }
    },

    /**
     * Group related logs
     */
    group: (label: string, callback: () => void): void => {
        if (IS_DEV) {
            console.group(label);
            callback();
            console.groupEnd();
        }
    },

    /**
     * Log table data
     */
    table: (data: any): void => {
        if (IS_DEV) {
            console.table(data);
        }
    },
};

/**
 * Performance logger
 */
export const perfLogger = {
    /**
     * Start performance measurement
     */
    start: (label: string): void => {
        if (IS_DEV) {
            performance.mark(`${label}-start`);
        }
    },

    /**
     * End performance measurement and log result
     */
    end: (label: string): void => {
        if (IS_DEV) {
            performance.mark(`${label}-end`);
            performance.measure(label, `${label}-start`, `${label}-end`);
            const measure = performance.getEntriesByName(label)[0];
            logger.info(`Performance: ${label}`, `${measure.duration.toFixed(2)}ms`);
            performance.clearMarks(`${label}-start`);
            performance.clearMarks(`${label}-end`);
            performance.clearMeasures(label);
        }
    },
};
