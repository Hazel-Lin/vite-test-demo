import { resolve } from "path";
import vue from "@vitejs/plugin-vue";
import { viteBuildInfo } from "./info";

import { viteMockServe } from "vite-plugin-mock";

export function getPluginsList(command, VITE_LEGACY) {
  const prodMock = true;
  const lifecycle = process.env.npm_lifecycle_event;
  return [
    vue(),
    viteBuildInfo(),
   
    // mock支持
    viteMockServe({
      mockPath: "mock",
      localEnabled: command === "serve",
      prodEnabled: command !== "serve" && prodMock,
      injectCode: `
          import { setupProdMockServer } from './mockProdServer';
          setupProdMockServer();
        `,
      logger: false
    }),
   
  ];
}
