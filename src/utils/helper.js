
/**
 * 首字母大写
 * @param str - 传入英文字符串
 */
export function firstCapitalize(str) {
  if (!str || typeof str !== 'string') return '';
  return str.substring(0, 1).toUpperCase() + str.substring(1);
}

/**
 * 金额格式化3000->3,000
 * @param amount - 金额
 */
export function amountFormatter(amount) {
  return `${amount}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * 过滤空数据
 * @param obj - 传入对象
 */

export function filterEmptyValue(obj) {
  const res = {};

  for (let key in obj) {
    // 去除key中多余的空格
    key = key.trim();

    // undefined过滤
    if (obj[key] === undefined) continue;

    // null过滤
    if (obj[key] === null) continue;

    // 空数组过滤
    if (
      obj[key]?.constructor === Array &&
      (obj[key]).length === 0
    ) continue;

    // 空字符串过滤
    if (
      obj[key]?.constructor === String &&
      (obj[key]).length === 0
    ) continue;

    // 空对象过滤
    if (
      obj[key]?.constructor === Object &&
      Object.keys(obj[key]).length === 0
    ) continue;

    // 去除字符串多余空格
    if (obj[key]?.constructor === String) {
      res[key] = (obj[key]).trim();
    } else {
      res[key] = obj[key];
    }
  }

  return res;
}

/**
 * 递归数据
 * @param data - 数据源
 */
export function recursiveData(
  data,
  callback
) {
  if (data. length === 0) return [];
  const res = [];

  for (let i = 0; i < data.length; i++) {
    const element = data[i];
    const filterData = callback(element);
    const children = element.children ? recursiveData(element.children, callback) : undefined;
    res.push({ ...filterData, children });
  }

  return res;
}