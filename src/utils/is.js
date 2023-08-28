/**
 * 是否是方法
 * @param val - 参数
 */
export function isFunction(val) {
  return typeof val === 'function';
}

/**
 * 是否是URL
 * @param path - 路径
 */
export function isUrl(path) {
  const reg =
    /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
  return reg.test(path);
}

/**
 * 是否是NULL
 * @param value - 值
 */
export function isNull(value) {
  return value === null;
}