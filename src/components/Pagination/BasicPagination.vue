<template>
  <div
    id="pagination"
    class="
      w-full
      flex
      items-center
      justify-end
      px-5
      min-h-40px
      z-999
    "
  >
    <Pagination
      showSizeChanger
      showQuickJumper
      size="small"
      :disabled="isLoading"
      :showTotal="() => showTotal(total)"
      :defaultCurrent="page"
      :defaultPageSize="pageSize"
      :total="total"
      :onChange="onChange"
    />
  </div>
</template>

<script  setup>
import { Pagination } from 'ant-design-vue';

const emit = defineEmits(['handleChange']);

defineProps({
  total: {
    type: Number,
    required: false,
    default: 0
  },
  page: {
    type: Number,
    required: true,
    default: 1
  },
  pageSize: {
    type: Number,
    required: true,
    default: 20
  },
  isLoading: {
    type: Boolean,
    required: false,
    default: false
  }
});

/**
 * 显示总数
 * @param total - 总数
 */
const showTotal = (total) => {
  return `共 ${total || 0} 条数据`;
};

/**
 * 页数改变
 * @param page - 当前页
 * @param pageSize - 页总数
 */
const onChange = (page, pageSize) => {
  emit('handleChange', page, pageSize);
};
</script>

<style lang="less">
.ant-pagination-item {
  background-color: #f4f4f5 !important;
  margin-right: 7px !important;
}

.ant-pagination-item-active {
  background-color: #0960bd!important;
}

.ant-pagination-item-active a {
  color: #fff !important;
}

.ant-pagination-prev {
  margin-right: 7px !important;
  background-color: #f4f4f5 !important;
}

.ant-pagination-next {
  margin-right: 7px !important;
  background-color: #f4f4f5 !important;
}
</style>