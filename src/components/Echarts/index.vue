<template>
  <div
    ref="chartRef"
    :style="{ height, width }"
  ></div>
</template>

<script  setup>
  import { onMounted, onUnmounted, watch, ref } from 'vue';
  import echarts from './lib/echarts';

  const props = defineProps({
    width: {
      type: String ,
      default: '100%',
      required: false
    },
    height: {
      type: String ,
      default: '100%',
      required: false
    },
    option: {
      type: Object ,
      required: true
    }
  });

  const chartRef = ref(null);

  /** 销毁echarts */
  const dispose = () => {
    if (chartRef.value && echarts !== null && echarts !== undefined) {
      echarts?.dispose(chartRef.value);
    }
  };

  const init = () => {
    if (chartRef.value) {
      // 摧毁echarts后在初始化
      dispose();

      // 初始化chart
      const chartInstance = echarts.init(chartRef.value);
      chartInstance.setOption(props.option);
    }
  };

  onMounted(() => {
    init();
    window.addEventListener("resize", () => init(), false);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", () => init());
    dispose();
  });

  watch(() => props.option, value => {
    if (value) {
      // 初始化chart
      init();
    }
  });
</script>
