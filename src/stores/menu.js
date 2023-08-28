
import { defineStore } from 'pinia';

export const useMenuStore = defineStore({
  id: 'menu',
  state: () => ({
    isPhone: false,
    firstMenu: {
      key: '',
      path: '',
      top: '',
      topTitle: '',
      rule: '',
      title: ''
    },
    openKeys: [],
    selectedKeys: [],
    menuList: []
  }),
  actions: {
    /**
     * 设置菜单
     * @param menus - 菜单值
     */
    setMenus(menus) {
      this.menuList = menus;
    },
    /**
     * 设置是否是手机
     * @param isPhone - 是否是手机打开
     */
    setPhone(isPhone) {
      this.isPhone = isPhone;
    },
    /**
     * 设置展开值
     * @param arr - 展开值
     */
     setOpenKeys(arr) {
      this.openKeys = arr;
    },
    /**
     * 设置选中的值
     * @param arr - 选中的值
     */
     setSelectedKeys(arr) {
      this.selectedKeys = arr;
    },
    /**
     * 设置第一个菜单
     * @param obj - 菜单值
     */
    setFirstMenu(obj) {
      this.firstMenu = obj;
    }
  }
});