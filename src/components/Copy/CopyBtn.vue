<template>
  <Button
    :loading="isLoading"
    @click="onClick"
  >
    <template #icon>
      <Icon icon="ant-design:copy-outlined" />
    </template>
    {{ text }}
  </Button>
</template>

<script  setup>
import { Button } from 'ant-design-vue';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import Icon from '@/components/Icon/index.vue';

const props = defineProps({
  text: {
    type: String
  },
  isLoading: {
    type: Boolean,
    required: false,
    default: false
  },
  value: {
    type: String,
    required: true
  }
});

/** 点击编辑 */
const onClick = () => {
  useCopyToClipboard(props.value);
};
</script>
