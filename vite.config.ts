import build from '@hono/vite-build/cloudflare-workers'
import adapter from '@hono/vite-dev-server/cloudflare'
import tailwindcss from '@tailwindcss/vite'
import honox from 'honox/vite'
import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => {
  if (mode === "client") {
    return {
      build: {
        rollupOptions: {
          input: './app/client.ts',
          output: {
            entryFileNames: 'client.js'
          }
        }
      },
      plugins: [client()]
    };
  }

  return {
    plugins: [
      honox({
        devServer: { adapter },
        client: { input: ['./app/style.css'] }
      }),
      tailwindcss(),
      build()
    ]
  };
});

function client(): import("vite").PluginOption {
  return {
    name: 'client-plugin',
    configureServer(server) {
      console.log('Client mode active');
    },
    transformIndexHtml(html) {
      return html.replace(
        '<!-- inject -->',
        '<script src="/client.js"></script>'
      );
    },
  };
}
