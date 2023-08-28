
/**
 * 创建跨域
 * @param list - 二维数组参数
 */
export function createProxy(list = []) {
  const res = {};
  
  for (const [prefix, target] of list) {
    res[`^${prefix}`] = {
      target,
      changeOrigin: true,
      // ws: true,
      rewrite: path => path.replace(new RegExp(`^${prefix}`), ''),
    };
  }

  return res;
}