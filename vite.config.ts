import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        outDir: 'dist',
        rollupOptions: {
            plugins: [
                {
                    name: 'log-env-vars',
                    buildStart() {
                        // Vite 빌드 시작 시 환경 변수를 로그로 출력
                        console.log('VITE_PB_URL:', process.env.VITE_PB_URL);
                        console.log('VITE_PB_API:', process.env.VITE_PB_API);
                    },
                },
            ],
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        if (id.includes('react')) {
                            return 'react-vendor';
                        }
                        if (id.includes('lodash')) {
                            return 'lodash';
                        }
                        if (id.includes('axios')) {
                            return 'axios';
                        }
                        return 'vendor';
                    }
                    if (id.includes('src/pages/')) {
                        const pageName = id
                            .split('src/pages/')[1]
                            .split('.')[0];
                        return `page-${pageName}`;
                    }
                    if (id.includes('src/components/')) {
                        return 'components';
                    }
                },
            },
        },
    },
    base: '/',
    define: {
        'process.env': process.env,
        'process.env.VITE_PB_URL': JSON.stringify(process.env.VITE_PB_URL),
        'process.env.VITE_PB_API': JSON.stringify(process.env.VITE_PB_API),
    },
    server: {
        host: 'localhost',
        port: 3000,
        open: false,
        proxy: {
            '/api': 'http://localhost:5000',
        },
    },
    plugins: [react()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    envPrefix: 'VITE_',
});
