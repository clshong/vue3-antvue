<template>
  <SubMenu
    v-for="item in list"
    :key="item.key"
    :data-title="item.label"
  >
    <template #icon>
      <Icon
        v-if="item?.icon"
        class="mt-2px"
        :icon="item.icon"
        :style="{ fontSize: '16px' }"
      />
    </template>

    <template #title>
      {{ item.label }}
    </template>

    <template
      v-for="child in item.children"
      :key="child.key"
    >
      <MenuItem
        v-if="!child?.children?.length"
        :key="child.key"
        @click="handleClick(child.key)"
      >
        {{ child.label }}
      </MenuItem>

      <MenuChildren
        v-else
        :list="[child]"
        :handleClick="handleClick"
      />
    </template>

  </SubMenu>
</template>

<script  setup>
import { MenuItem, SubMenu } from 'ant-design-vue';
import Icon from '@/components/Icon/index.vue';

defineProps({
  list: {
    type: Array,
    required: true
  },
  handleClick: {
    type: Function ,
    required: true
  }
});
</script>