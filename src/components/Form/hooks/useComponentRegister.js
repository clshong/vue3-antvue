
import { tryOnUnmounted } from '@vueuse/core';
import { addComponent, deleteComponent } from '../utils/componentMap';

/**
 * 组件注册，页面销毁且组件销毁
 * @param compName - 组件名
 * @param comp - 组件
 */
export function useComponentRegister(compName, comp) {
  addComponent(compName, comp);
  tryOnUnmounted(() => {
    deleteComponent(compName);
  });
}
