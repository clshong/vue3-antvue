<template>
  <div class="p-4">
    <p>
      <Button class="mr-10px" @click="loadData(10)">加载10条</Button>
      <Button class="mr-10px" @click="loadData(500)">加载500条</Button>
      <Button class="mr-10px" @click="loadData(10000)">加载1w条</Button>
      <Button class="mr-10px" @click="loadData(100000)">加载10w条</Button>
      <Button class="mr-10px" @click="loadData(300000)">加载30w条</Button>
      <Button class="mr-10px" @click="loadData(500000)">加载50w条</Button>
    </p>

    <p>
      <List height="240" class="my-list" :isLoading="demo.isLoading" :data="demo.list">
        <template #default="{ items }">
          <div class="my-list-item" v-for="(item, index) in items" :key="index">{{ item.label }}</div>
        </template>
      </List>
    </p>
  </div>
</template>

<script  setup>
import { reactive, nextTick, onMounted } from 'vue';
import { List } from 'vxe-table';
import { Button, message } from 'ant-design-vue';
import { useTitle } from '@/hooks/useTitle';

useTitle('虚拟滚动');
const mockList = [];
const demo = reactive({
  isLoading: false,
  list: []
});

// 模拟后台
const getList = (size) => {
  return new Promise(resolve => {
    setTimeout(() => {
      if (size > mockList.length) {
        for (let index = mockList.length; index < size; index++) {
          mockList.push({
            id: index,
            label: `row_${index}`
          });
        }
      }
      resolve(mockList.slice(0, size));
    }, 100);
  });
};

const loadData = async (size) => {
  demo.isLoading = true;
  demo.list = await getList(size);
  demo.isLoading = false;
  const startTime = Date.now();
  await nextTick();
  await message.info({ content: `渲染 ${size} 行，用时 ${Date.now() - startTime}毫秒`, key: 'info' });
};

// 初始化
onMounted(async () => {
  demo.list = await getList(200);
});
</script>

<style scoped>
.my-list {
  border: 1px solid #e8eaec;
}

.my-list .my-list-item {
  height: 28px;
  padding-left: 15px;
}

.my-ul-list {
  border: 1px solid #e8eaec;
}

.my-ul-list li {
  height: 40px;
}

.my-table-list {
  border: 1px solid #e8eaec;
}

.my-table-list table {
  width: 100%;
  text-align: center;
}

.my-table-list .my-tr {
  height: 32px;
}

.my-table-list .my-tr:hover {
  background-color: #f5f7fa;
}

.my-table-list td {
  border-right: 1px solid #e8eaec;
}
</style>