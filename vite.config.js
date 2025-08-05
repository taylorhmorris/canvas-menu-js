import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { defaultExclude } from 'vitest/config';

export default defineConfig({
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/index.ts'),
      name: '@taylorhmorris/observer',
      // the proper extensions will be added
      fileName: 'index',
    },
  },
  plugins: [dts()],
  test: {
    globals: true,
    coverage: {
      exclude: [
        ...defaultExclude,
        'docs/',
        'src/vite-env.d.ts',
      ]
    }
  },
})
