import { createDefaultPreset } from 'ts-jest';

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import('jest').Config} */
export const preset = 'ts-jest';
export const testEnvironment = 'node';
export const transform = {
  ...tsJestTransformCfg,
};
export const roots = ['<rootDir>/tests'];
