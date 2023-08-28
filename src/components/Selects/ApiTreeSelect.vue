<script >
/**
 * @description: 根据API获取数据树形下拉组件
 */
import { defineComponent, onMounted, watch, ref, h } from 'vue';
import { TreeSelect } from 'ant-design-vue';
import { PLEASE_SELECT, MAX_TAG_COUNT } from '@/utils/config';
import BasicLoading from '../Loading/BasicLoading.vue';

export default defineComponent({
  name: 'ApiSelect',
  props: {
    modelValue: {
      type: [String, Number, Array] ,
      required: false
    },
    value: {
      type: [String, Number, Array] ,
      required: false
    },
    componentProps: {
      type: Object ,
      required: false
    },
    api: {
      type: Function,
      required: true
    },
    params: {
      type: Object,
      required: false
    },
    onDropdownVisibleChange: {
      type: Function,
      required: false
    }
  },
  components: {
    TreeSelect,
    BasicLoading
  },
  setup(props, { emit }) {
    const options = ref([]);
    const selectValue = ref(props.value || props.modelValue);
    const isLoading = ref(false);

    onMounted(() => {
      // 首次有值获取API接口
      if ((props.value || props.modelValue) && options.value?.length === 0) {
        getApiData();
      }
    });

    watch(() => props.value, value => {
      selectValue.value = value;

      // 首次有值获取API接口
      if (value && options.value?.length === 0) {
        getApiData();
      }
    });

    watch(() => props.modelValue, value => {
      selectValue.value = value;

      // 首次有值获取API接口
      if (value && options.value?.length === 0) {
        getApiData();
      }
    });

    /** 获取接口数据 */
    const getApiData = async () => {
      try {
        isLoading.value = true;
        const data = await props?.api?.(props?.params);
        options.value = data;
      } finally {
        isLoading.value = false;
      }
    };

    return () => h(
      TreeSelect, {
        allowClear: true,
        maxTagCount: MAX_TAG_COUNT,
        placeholder: PLEASE_SELECT,
        treeNodeFilterProp: 'label',
        showSearch: true,
        value: props.value ,
        ...props?.componentProps,
        treeData: options.value,
        notFoundContent: isLoading.value && h(BasicLoading),
        onDropdownVisibleChange: async (open) => {
          if (props?.onDropdownVisibleChange) {
            props.onDropdownVisibleChange?.(open);
          } else if (open) {
            getApiData();
          }
        },
        'onUpdate:value': (value) => {
          emit('update:value', value);
        },
        'onUpdate:modelValue': (value) => {
          emit('update:modelValue', value);
        }
      }
    );
  }
});
</script>
