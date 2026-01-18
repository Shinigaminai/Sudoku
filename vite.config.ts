import { defineConfig } from "vitest/config";
import { sveltekit } from "@sveltejs/kit/vite";

export default defineConfig({
  plugins: [sveltekit()],
  test: {
    // Run tests in Node by default (good for pure logic)
    environment: "node",

    // Enable global test APIs (describe, it, expect)
    globals: true,

    // Where to look for tests
    include: ["src/lib/**/*.test.ts", "src/lib/**/*.spec.ts"],

    // Exclude Svelte routes and build artifacts
    exclude: ["node_modules", "dist", "src/routes/**/*"],

    // Report coverage (optional)
    coverage: {
      reporter: ["text", "html"],
      include: ["src/lib/**/*.{ts,js}"],
      exclude: ["**/*.d.ts", "node_modules"],
    },

    // Adjust this if you want longer test timeouts
    testTimeout: 5000,
  },

  // Resolve aliases from tsconfig / svelte.config.js
  resolve: {
    alias: {
      $lib: "/src/lib",
    },
  },

  // Vitest-specific dependencies optimization
  optimizeDeps: {
    // Avoid Vite pre-bundling issues with Vitest
    exclude: ["vitest"],
  },
});
