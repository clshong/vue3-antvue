<script >
/**
 * @description: 合作公司下拉组件
 */
import { defineComponent, h } from 'vue';
import { getPartner } from '@/servers/platform/partner';
import ApiSelect from '@/components/Selects/ApiSelect.vue';

export default defineComponent({
  name: "PartnerSelect",
  setup(props, { emit }) {
    return () =>
      h(ApiSelect, {
        api: getPartner,
        mode: 'multiple',
        'onUpdate:value': (value) => {
          emit('update:value', value);
        }
      });
  },
});
</script>
