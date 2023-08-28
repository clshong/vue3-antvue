
/**
 * 处理转化env
 * @param envConfigs 
 */
export function handleEnv(envConfigs) {
  const {
    VITE_SERVER_PORT,
    VITE_PROXY
  } = envConfigs;

  const proxy = VITE_PROXY ? JSON.parse(VITE_PROXY.replace(/'/g, '"')) : [];

  const res = {
    VITE_SERVER_PORT: Number(VITE_SERVER_PORT) || 8080,
    VITE_PROXY: proxy
  };

  return res;
}