import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call
	plugins: [tsconfigPaths()],
});