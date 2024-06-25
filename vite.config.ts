import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import wasm from 'vite-plugin-wasm';
import topLevelAwait from 'vite-plugin-top-level-await';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    wasm(),
    topLevelAwait(),
    sveltekit(),
    viteStaticCopy({
      targets: [{ src: 'node_modules/three/examples/jsm/libs/draco/**', dest: 'draco' }]
    })
  ]
});
