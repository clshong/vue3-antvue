<template>
  <Tooltip>
    <template #title>{{ !isFullscreen ? '全屏' : '退出全屏' }}</template>
    <div
      class="flex items-center justify-center text-lg mr-3 cursor-pointer"
      @click="toggle"
    >
      <Icon icon="gridicons-fullscreen-exit" v-if="isFullscreen" />
      <Icon icon="gridicons-fullscreen" v-else />
    </div>
  </Tooltip>
</template>

<script  setup>
/**
 * @description: 全屏组件
 */
import { useFullscreen } from '@vueuse/core';
import { Tooltip } from 'ant-design-vue';
import Icon from '@/components/Icon/index.vue';

const { isFullscreen, toggle } = useFullscreen();
</script>
