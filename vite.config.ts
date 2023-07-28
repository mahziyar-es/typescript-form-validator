import { defineConfig } from 'vitest/config'
import dts from 'vite-plugin-dts'

export default defineConfig({
  test: {
    // ...
  },

  plugins: [
    dts(),
  ],

  build: {
    lib: {
      entry: './src/index.ts',
      formats:['es', 'cjs'],
      name: 'typescript-form-validator',
      fileName: format => `index.${format}.ts`,
    },
  },


})