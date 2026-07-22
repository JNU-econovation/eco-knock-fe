// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [                                  //Vite가 실행할 때 적용할 플러그인 목록
    react(),
    VitePWA({                                //PWA 기능 설정하기
      registerType: 'autoUpdate',            // service worker 자동 업데이트
      manifest: {
        name: 'ECO-KNOCK',
        short_name: 'ECO-KNOCK',
        description: '에코놐',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/icons/eco-knock-icon-152x152.png',
            sizes: '152x152',
            type: 'image/png'
          },
          {
            src: '/icons/eco-knock-icon-196x196.png',
            sizes: '196x196',
            type: 'image/png'
          },
          {
            src: '/icons/eco-knock-icon-558x558.png',
            sizes: '558x558',
            type: 'image/png'
          },
          {
            src: '/icons/ECO-KNOCK_icon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any',
          },
        ],
        display: 'standalone',  // 앱처럼 보임(상단 주소창 제거)
        start_url: '/'          //앱이 실행될 때 처음 열릴 주소
      }
    })
  ],
  resolve: {                    // 절대경로 alias 설정
    alias: {
      '@': '/src',
    },
  },
})
