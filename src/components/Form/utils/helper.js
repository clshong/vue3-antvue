import { PLEASE_ENTER, PLEASE_SELECT } from '@/utils/config';
import { DATE_FORMAT } from '@/utils/constants';
import dayjs from 'dayjs';

/**
 * 生成占位符
 * @param component - 组件名
 */
export function createPlaceholder(component) {
  if (component.includes('Select') || component.includes('Picker')) {
    return PLEASE_SELECT;
  }
  return PLEASE_ENTER;
}

/**
 * 获取嵌套数据
 * @param arr - 键值数组
 * @param obj - 表单数据对象
 */
const getDeepNested = (arr, obj) => {
  try {
    for (let i = 0; i < arr.length; i++) {
      const key = arr[i]?.trim();
      if (!key || !obj || !obj[key]) return '';
      if (arr.length - 1 === i) return obj[key];
      obj = obj[key] ;
    }
    return '';
  } catch(e) {
    console.warn('嵌套数据解析异常:', e);
  }
};

/**
 * 获取组件属性
 * @param item - 组件项
 * @param data - 数据对象
 * @param setData - 修改数据
 */
export function getComponentProps(
  item,
  data,
  setData
) {
  const key = item.name;
  let compData;

  // 当key存在逗号时，分割数据
  if (Array.isArray(key)) {
    compData = getDeepNested(key, data);
  } else {
    compData = data[key];
  }

  switch (item.component) {
    // 富文本
    case 'Editor':
      return {
        modelValue: compData ,
        height: (compData).height || 300,
        'onUpdate:modelValue': (value) => setData(key, value)
      };

    // 复选框
    case 'Checkbox':
      return {
        checked: !!compData,
        innerHTML: data?.name || '',
        'onChange': (value) => {
          setData(key, value.target.checked);
        },
        'onUpdate:value': (value) => {
          setData(key, value);
        }
      };

    // 时间
    case 'DatePicker': {
      const dateValue = compData ? dayjs(compData) : undefined;
      return {
        defaultValue: dateValue,
        value: dateValue,
        'onUpdate:value': (value) => {
          const format = (data.format || DATE_FORMAT);
          setData(key, (value).format(format));
        }
      };
    }

    // 时间区间
    case 'RangePicker': {
      const rangeValue = (compData).length > 1 && compData[0] ?
        [dayjs(compData[0]), dayjs(compData[1])] : undefined;
      return {
        defaultValue: rangeValue,
        value: rangeValue,
        'onUpdate:value': (value) => {
          const format = (data.format || DATE_FORMAT);
          const newValue = [
            (value)[0].format(format),
            (value)[1].format(format)
          ];
          setData(key, newValue);
        }
      };
    }

    default:
      return {
        value: compData,
        'onUpdate:value': (value) => {
          setData(key, value);
        }
      };
  }
}
