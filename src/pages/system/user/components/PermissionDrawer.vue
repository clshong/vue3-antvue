<template>
  <Drawer
    :visible="isVisible"
    :title="title || '权限配置'"
    placement="right"
    @close="onClose"
  >
    <template #extra>
      <Button type="primary" @click="onSubmit">提交</Button>
    </template>
    <Tree
      checkable
      :checkedKeys="treeCheckedKeys"
      :treeData="treeData"
      @check="handleCheck"
    />
  </Drawer>
</template>

<script >

import { defineComponent, ref, watch } from 'vue';
import { Drawer, Tree, Button } from 'ant-design-vue';

export default defineComponent({
  name: 'PermissionDrawer',
  emits: ['onClose', 'onSubmit'],
  props: {
    title: {
      type: String
    },
    isVisible: {
      type: Boolean,
      required: true
    },
    treeData: {
      type: Array ,
      required: true
    },
    checkedKeys: {
      type: Array ,
      required: true
    }
  },
  components: {
    Drawer,
    Tree,
    Button
  },
  setup(props, { emit }) {
    const treeCheckedKeys = ref(props.checkedKeys || []);

    // 监听checkedKeys
    watch(() => props.checkedKeys, value => {
      treeCheckedKeys.value = value;
    });

    /** 关闭 */
    const onClose = () => {
      emit('onClose');
    };

    /** 提交 */
    const onSubmit = () => {
      emit('onSubmit', treeCheckedKeys.value);
    };

    /**
     * 处理勾选
     * @param checked - 勾选值
     */
    const handleCheck = checked => {
      treeCheckedKeys.value = checked ;
    };

    return {
      treeCheckedKeys,
      onClose,
      onSubmit,
      handleCheck
    };
  },
});
</script>
