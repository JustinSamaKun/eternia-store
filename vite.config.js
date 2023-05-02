// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        outDir: 'dist', // Output directory for the bundled files
        minify: 'terser', // Minification
        lib: {
            entry: './build/index.js', // Entry point for the library
            formats: ['es'], // Format of the output bundle
        },
        rollupOptions: {
            output: {
                entryFileNames: 'index.js', // The output file name
            },
        },
    },
});
