import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/index.ts"],
    outDir: "dist",
    sourcemap: true,
    clean: true,
    format: ["esm"], // Ensure you're targeting CommonJS
    bundle: true,          // Enable bundling of dependencies
    minify: false,          // Optional minification
    splitting: false,      // Disable code splitting
    dts: true,             // Generate declaration files
    shims: true,  // Add CJS->ESM shims
    target: "node16",  // Specify Node.js target
    external: [
        "crypto", "fs", "path", "os", "http", "https", 
        "stream", "util", "events", "url", "querystring",
        "buffer", "assert", "zlib"
    ],
    noExternal: ["telegraf"],
    esbuildOptions(options) {
        options.mainFields = ['module', 'main'];
        options.banner = {
            js: `
                import { createRequire } from 'module';
                const require = createRequire(import.meta.url);
            `,
        };
    },
});
