import React, { Component, ErrorInfo, ReactNode } from 'react';
import { logger } from '../utils/logger';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
    onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

/**
 * ErrorBoundary - Catches JavaScript errors anywhere in the child component tree
 * 
 * Usage:
 * ```tsx
 * <ErrorBoundary>
 *   <YourComponent />
 * </ErrorBoundary>
 * ```
 */
export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
        };
    }

    static getDerivedStateFromError(error: Error): State {
        return {
            hasError: true,
            error,
        };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        // Log error to console in development
        logger.error('Error caught by ErrorBoundary', error, errorInfo);

        // Call custom error handler if provided
        this.props.onError?.(error, errorInfo);
    }

    private handleReset = (): void => {
        this.setState({ hasError: false, error: null });
    };

    private handleReload = (): void => {
        window.location.reload();
    };

    render(): ReactNode {
        if (this.state.hasError) {
            // Use custom fallback if provided
            if (this.props.fallback) {
                return this.props.fallback;
            }

            // Default error UI
            return (
                <div className="min-h-screen bg-brand-black flex items-center justify-center p-6">
                    <div className="max-w-md w-full text-center">
                        <div className="mb-6">
                            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-brand-red/10 flex items-center justify-center">
                                <svg
                                    className="w-10 h-10 text-brand-red"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                    />
                                </svg>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                                Oops! Something went wrong
                            </h1>
                            <p className="text-gray-400 text-lg mb-2">
                                We encountered an unexpected error
                            </p>
                            {this.state.error && (
                                <details className="mt-4 text-left">
                                    <summary className="text-sm text-gray-500 cursor-pointer hover:text-gray-400 transition-colors">
                                        Technical details
                                    </summary>
                                    <pre className="mt-2 p-3 bg-gray-900 rounded-lg text-xs text-gray-400 overflow-auto max-h-40">
                                        {this.state.error.message}
                                    </pre>
                                </details>
                            )}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <button
                                onClick={this.handleReset}
                                className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors"
                            >
                                Try Again
                            </button>
                            <button
                                onClick={this.handleReload}
                                className="px-6 py-3 bg-brand-red hover:bg-brand-accent text-white font-semibold rounded-lg transition-colors shadow-lg shadow-brand-red/20"
                            >
                                Reload Page
                            </button>
                        </div>

                        <p className="mt-6 text-sm text-gray-500">
                            If the problem persists, please{' '}
                            <a
                                href="#contact"
                                className="text-brand-accent hover:text-brand-red transition-colors underline"
                            >
                                contact support
                            </a>
                        </p>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
