import { defineStore } from 'pinia';

export const usePublicStore = defineStore({
  id: 'public',
  state: () => ({
    isRefreshPage: false
  }),
  actions: {
    /**
     * 设置刷新页面
     * @param isRefresh - 是否刷新
     */
    setRefreshPage(isRefresh) {
      this.isRefreshPage = isRefresh;
    },
  },
});