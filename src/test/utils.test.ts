import { describe, it, expect } from 'vitest';
import { createMockProject, createMockService } from './utils';

describe('Test Utilities', () => {
    describe('createMockProject', () => {
        it('should create a project with default values', () => {
            const project = createMockProject();

            expect(project).toHaveProperty('id');
            expect(project).toHaveProperty('title');
            expect(project).toHaveProperty('category');
            expect(project.title).toBe('Test Project');
            expect(project.tags).toEqual(['React', 'TypeScript']);
        });

        it('should allow overriding default values', () => {
            const project = createMockProject({
                title: 'Custom Project',
                year: '2025',
            });

            expect(project.title).toBe('Custom Project');
            expect(project.year).toBe('2025');
        });
    });

    describe('createMockService', () => {
        it('should create a service with default values', () => {
            const service = createMockService();

            expect(service).toHaveProperty('id');
            expect(service).toHaveProperty('title');
            expect(service).toHaveProperty('description');
            expect(service.features).toHaveLength(2);
        });

        it('should allow overriding default values', () => {
            const service = createMockService({
                title: 'Custom Service',
                features: ['Feature A', 'Feature B', 'Feature C'],
            });

            expect(service.title).toBe('Custom Service');
            expect(service.features).toHaveLength(3);
        });
    });
});
