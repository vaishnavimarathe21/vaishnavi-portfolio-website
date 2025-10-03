import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    mdx({
      remarkPlugins: [remarkGfm, remarkFrontmatter],
    }),
  ],
  assetsInclude: ['**/*.mdx'],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'framer-motion': ['framer-motion'],
          'form-vendor': ['react-hook-form', '@hookform/resolvers', 'zod'],
          'ui-vendor': ['lucide-react', 'clsx', 'tailwind-merge'],
          'mdx-vendor': ['@mdx-js/react', '@mdx-js/mdx', 'markdown-to-jsx', 'gray-matter'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      'react-hook-form',
      '@hookform/resolvers',
      'zod',
      'lucide-react',
      'clsx',
      'tailwind-merge',
    ],
  },
})
