import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { dependencies } from "./package.json";
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
  },
  server: {
    port: 3000,
  },
});

// function renderChunks(deps) {
//   let chunks = {};
//   Object.keys(deps).forEach((key) => {
//     if (["react", "react-router-dom", "react-dom"].includes(key)) return;
//     chunks[key] = [key];
//   });
//   return chunks;
// }
// // https://vitejs.dev/config/
// export default defineConfig({
//   build: {
//     sourcemap: false,
//     rollupOptions: {
//       output: {
//         manualChunks: {
//           vendor: ["react", "react-router-dom", "react-dom"],
//           ...renderChunks(dependencies),
//         },
//       },
//     },
//   },
// });
