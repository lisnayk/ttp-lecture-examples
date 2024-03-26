import legacy from '@vitejs/plugin-legacy'
import { defineConfig } from 'vite'
export default defineConfig({
    plugins: [
        legacy({
            targets: ['defaults', 'not IE 11'],
        }),
    ],
    build: {
        rollupOptions: {
            input: {
                home: './index.html',
                about: './nested/about.html'
                // ...
            }
        }
    }
})
