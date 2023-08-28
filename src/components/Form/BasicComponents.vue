<script >
import { defineComponent, h, watch } from 'vue';
import { componentMap } from './utils/componentMap';
import { createPlaceholder, getComponentProps } from './utils/helper';

export default defineComponent({
  name: 'BasicComponents',
  props: {
    item: {
      type: Object ,
      required: true
    },
    data: {
      type: Object ,
      required: true
    },
    setData: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    let Comp;

    // 组件
    if (props.item.component !== 'customize') {
      Comp = componentMap.get(props.item.component);
    }
    
    watch(() => props.item, () => {
      if (props.item.component === 'customize') {
        Comp = props.item.render;
      }
    });

    // 占位符
    const placeholder = props.item.placeholder || createPlaceholder(props.item.component);

    // 渲染组件
    return () => h(Comp, {
      className: 'min-w-70px',
      placeholder,
      allowClear: true,
      ...getComponentProps(
        props.item,
        props.data,
        props.setData
      ),
      ...props.item.componentProps
    });
  }
});
</script>