<template>
  <div class="py-1 box-border transition-all overflow-hidden z-2">
    <div
      class="flex content-center px-5 py-2 cursor-pointer"
      :class="{ 'justify-center': isCollapsed }"
      @click="onClickLogo"
    >
      <img
        class="object-contain"
        :width="30"
        :height="30"
        :src="Logo"
        alt="LOGO"
      />
      <span
        class="text-white ml-3 text-xl font-bold truncate"
        :class="{ 'hidden': isCollapsed }"
      >
        后台系统
      </span>
    </div>
    <div class="menu-height overflow-y-auto">
      <Menu
        v-model:openKeys="currentOpenKeys"
        v-model:selectedKeys="selectedKeys"
        class="h-full z-1000"
        mode="inline"
        theme="dark"
        :inlineCollapsed="isCollapsed"
        @openChange="openChange"
      >
        <MenuChildren
          :list="menuList"
          :handleClick="handleClick"
        />
      </Menu>
    </div>

    <div
      v-if="isPhone && !isCollapsed"
      class="cover fixed right-0 top-0 bottom-0 h-full bg-gray-500 bg-opacity-10 z-2"
      @click="hiddenMenu"
    />
  </div>
</template>

<script  setup>
import { watch, onMounted, ref } from 'vue';
import { useMenuStore } from '@/stores/menu';
import { useUserStore } from '@/stores/user';
import { useRoute, useRouter } from 'vue-router';
import { Menu } from 'ant-design-vue';
import { storeToRefs } from 'pinia';
import { defaultMenus } from '@/menus';
import {
  filterMenus,
  getFirstMenu,
  getOpenMenuByRouter,
  splitPath
} from '@/menus/utils/helper';
import MenuChildren from './MenuChildren.vue';
import Logo from '@/assets/images/logo.png';

const emit = defineEmits(['toggleCollapsed']);

const props = defineProps({
  isCollapsed: {
    type: Boolean,
    required: true
  }
});

const route = useRoute();
const router = useRouter();
const menuStore = useMenuStore();
const userStore = useUserStore();
const { permissions } = storeToRefs(userStore);
const {
  isPhone,
  openKeys,
  selectedKeys,
  menuList
} = storeToRefs(menuStore);
const {
  setMenus,
  setOpenKeys,
  setSelectedKeys
} = menuStore;

// 当前展开项，收缩模式不展开
const currentOpenKeys = ref(openKeys.value);

onMounted(() => {
  if (permissions.value.length > 0) {
    // 创建菜单
    const newMenus = filterMenus(defaultMenus, permissions.value);
    setMenus(newMenus || []);
  
    // 展开菜单
    const newOpenKey = getOpenMenuByRouter(route.path);
    setOpenKeys(newOpenKey);
    setSelectedKeys([route.path]);
  }
});

// 监听路径
watch(() => route.path, value => {
  const newOpenKey = getOpenMenuByRouter(value);
  setOpenKeys(newOpenKey);
  setSelectedKeys([value]);
});

// 监听展开
watch(() => openKeys, openKeys => {
  if (props.isCollapsed || isPhone.value) {
    currentOpenKeys.value = [];
  } else {
    currentOpenKeys.value = openKeys.value;
  }
});

/**
 * 处理跳转
 * @param path - 路径
 */
const goPath = (path) => {
  router.push(path);
};

/** 点击logo */
const onClickLogo = () => {
  const firstMenu = getFirstMenu(defaultMenus, permissions.value);
  goPath(firstMenu);
};

/**
 * 对比当前展开目录是否是同一层级
 * @param arr - 当前展开目录
 * @param lastArr - 最后展开的目录
 */
const diffOpenMenu = (arr, lastArr) => {
  let result = true;

  for (let j = 0; j < arr.length; j++) {
    if (arr[j] !== lastArr[j]) {
      result = false;
      break;
    }
  }

  return result;
};

/**
 * 菜单展开事件
 * @param openKeys - 展开下标
 */
const openChange = (openKeys) => {
  const newOpenKey = [];
  let last = ''; // 最后一个目录结构

  // 当目录有展开值
  if (openKeys.length > 0) {
    last = openKeys[openKeys.length - 1].toString();
    const lastArr = splitPath(last);
    newOpenKey.push(last);

    // 对比当前展开目录是否是同一层级
    for (let i = openKeys.length - 2; i >= 0; i--) {
      const arr = splitPath(openKeys[i].toString());
      const hasOpenKey = diffOpenMenu(arr, lastArr);
      if (hasOpenKey) newOpenKey.unshift(openKeys[i].toString());
    }
  }

  setOpenKeys(newOpenKey);
};

/**
 * 点击菜单
 * @param key - 唯一值
 */
const handleClick = (key) => {
  goPath(key);
  
  // 手机端点击隐藏菜单
  if (isPhone.value) emit('toggleCollapsed');
};

/** 隐藏菜单 */
const hiddenMenu = () => {
  emit('toggleCollapsed');
};
</script>

<style lang="less" scoped>
@import '@/assets/css/default.less';

.menu-height {
  height: calc(100% - 50px);
}

.cover {
  left: @layoutLeft;
}
</style>