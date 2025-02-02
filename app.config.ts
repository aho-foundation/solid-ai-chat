import { defineConfig, ViteCustomizableConfig } from "@solidjs/start/config"
// biome-ignore lint/correctness/noNodejsModules: build context
import { readFileSync } from 'node:fs'

import { viteConfig } from './vite.config'

let key = ''
let cert = ''
try {
    key = readFileSync("./localhost-key.pem").toString()
    cert = readFileSync("./localhost.pem").toString()
} catch(_) {
    console.warn('no certs, use `mkcert localhost` to fix')
}

export default defineConfig({
    ssr: false,
    devOverlay: true,
    server: {
        prerender: {
            crawlLinks: false,
            routes: [],
        },
        https: key ? {
            key: key,
            cert: cert
        } : undefined,
    },
    vite: viteConfig as ViteCustomizableConfig
});
