import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
    base: '/',
    define: {
        'process.env': process.env,
    },
    server: {
        host: 'localhost',
        port: 3000,
        open: false,
    },
    plugins: [react()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    envPrefix: 'VITE_',
});
