<template>
  <div class="area">
    <component
      :is="selectedView ? selectedView.type + '_view' : ''"
      :meta="selectedView.meta"
      :item-id="itemId"
      @change-view="changeView"
    />
  </div>
</template>

<script>
import { computed, toRefs, reactive } from "vue";
import { useStore } from "vuex";

import list from "@/components/views/list.vue";
import form from "@/components/views/form.vue";
import dash from "@/components/views/dash.vue";
import unavailable from "@/components/views/unavailable.vue";

export default {
  components: {
    list_view: list,
    form_view: form,
    dash_view: dash,
    unavailable_view: unavailable,
  },
  setup() {
    const store = useStore();

    const state = reactive({
      itemId: -1,
    });

    const selectedView = computed(() => {
      if (
        (store.getters.workspace("module").index === 3 &&
          store.getters.workspace("space").index === 1) ||
        !store.getters.workspace("module") ||
        !store.getters.workspace("space")
      ) {
        return store.getters.workspace("view");
      }

      return {
        index: -1,
        type: "unavailable",
        meta: {},
      };
    });

    const changeView = async (params) => {
      params[1] >= 0 ? (state.itemId = params[1]) : (state.itemId = -1);
      await store.commit("selectItem", { a: "view", b: params[0] });
    };

    return {
      ...toRefs(state),
      selectedView,
      changeView,
    };
  },
};
</script>

<style lang="css" scoped>
.area {
  position: fixed;
  left: 287px;
  right: 29px;
  top: 105px;
  bottom: 22px;
}
</style>
