<template>
  <div>
    <Input
      :value="props.value"
      :allowClear="true"
      @change="onChange"
    />
    <div className='mb-5px text-red'>注：标题不能含有敏感信息!</div>
  </div>
</template>

<script  setup>
import { Input } from 'ant-design-vue';

const props = defineProps({
    value: {
      type: String,
      required: false
    },
    setData: {
      type: Function,
      required: false
    }
});

const emit = defineEmits(['update:value']);

/**
 * 更改数据
 * @param e - 下标值
 */
const onChange = e => {
  emit('update:value', e.target.value);
};
</script>
