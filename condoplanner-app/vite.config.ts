
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
    build: {
        chunkSizeWarningLimit: 4096,
    },
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            workbox: {
                cleanupOutdatedCaches: true,
                maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
            },
            manifestFilename: 'site.webmanifest',
            includeAssets: [
                'favicon.ico',
                'robots.txt',
                'apple-touch-icon.png',
                'pwa-192x192.png',
                'pwa-512x512.png'
            ],
            manifest: {
                name: 'CondoPlanner - Planejamento de condomínios',
                short_name: 'CondoPlanner',
                description: 'Coordene o seu condomínio na palma da sua mão.',
                theme_color: '#1c349eff',
                background_color: '#ffffff',
                display: 'standalone',
                scope: '/',
                start_url: '/',
                icons: [
                    {
                        src: '/pwa-192x192.png',
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: '/pwa-512x512.png',
                        sizes: '512x512',
                        type: 'image/png'
                    }
                ]
            }
        })
    ]
});