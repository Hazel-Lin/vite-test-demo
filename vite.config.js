import dayjs from "dayjs";
import { resolve } from "path";
import pkg from "./package.json";
import { warpperEnv, regExps } from "./build";
import { getPluginsList } from "./build/plugins";
import { UserConfigExport, ConfigEnv, loadEnv } from "vite";

// 当前执行node命令时文件夹的地址（工作目录）
const root = process.cwd();

// 路径查找
const pathResolve = (dir) => {
  return resolve(__dirname, ".", dir);
};

const { dependencies, devDependencies, name, version } = pkg;
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss")
};

export default ({ command, mode }) => {
  const {
    VITE_PORT,
    VITE_LEGACY,
    VITE_PUBLIC_PATH,
    VITE_PROXY_DOMAIN,
    VITE_PROXY_DOMAIN_REAL
  } = warpperEnv(loadEnv(mode, root));
  return {
    base: VITE_PUBLIC_PATH,
    root,
   
    // 服务端渲染
    // server: {
    //   // 是否开启 https
    //   https: false,
    //   // 端口号
    //   port: VITE_PORT,
    //   host: "0.0.0.0",
    //   // 本地跨域代理
    //   proxy:
    //     VITE_PROXY_DOMAIN_REAL.length > 0
    //       ? {
    //           [VITE_PROXY_DOMAIN]: {
    //             target: VITE_PROXY_DOMAIN_REAL,
    //             // ws: true,
    //             changeOrigin: true,
    //             rewrite: (path: string) => regExps(path, VITE_PROXY_DOMAIN)
    //           }
    //         }
    //       : null
    // },
    plugins: getPluginsList(command, VITE_LEGACY),
    // define: {
    //   __INTLIFY_PROD_DEVTOOLS__: false,
    //   __APP_INFO__: JSON.stringify(__APP_INFO__)
    // }
  };
};
