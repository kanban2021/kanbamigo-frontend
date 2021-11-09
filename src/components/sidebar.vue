<template>
  <div class="area">
    <img
      src="@/assets/img/LogoKanbamigo.svg"
      alt="Logo_Kanbamigo"
      class="logo-kanbamigo"
    />
    <div class="items-area">
      <div
        v-for="item in generalMods"
        :key="item.index"
        :class="[
          selectedModule.index === item.index ? 'item item-selected' : 'item',
        ]"
        @click="selectModule(item.index)"
      >
        <img
          :src="require(`@/assets/modules/${item.alias}/icon.svg`)"
          :alt="'icon_' + item.alias"
          :class="[
            selectedModule.index === item.index
              ? 'item-icon item-selected-icon'
              : 'item-icon',
          ]"
        />
        <span class="item-span">{{ item.name }}</span>
      </div>
      <div class="divider" />
      <div
        v-for="item in technicalMods"
        :key="item.index"
        :class="[
          selectedModule.index === item.index ? 'item item-selected' : 'item',
        ]"
        @click="selectModule(item.index)"
      >
        <img
          :src="require(`@/assets/modules/${item.alias}/icon.svg`)"
          :alt="'icon_' + item.alias"
          :class="[
            selectedModule.index === item.index
              ? 'item-icon item-selected-icon'
              : 'item-icon',
          ]"
        />
        <span class="item-span">{{ item.name }}</span>
      </div>
      <a href="#" style="text-decoration: none">
        <div class="item">
          <img
            src="@/assets/img/IconCerrarSesion.svg"
            alt="Icon Cerrar Sesion"
            class="item-icon"
          />
          <span class="item-span">Cerrar Sesión</span>
        </div>
      </a>
    </div>
    <img
      src="@/assets/img/LogoKanbanLavender.svg"
      alt="Logo_Kanban_Lavanda"
      class="logo-kanban"
    />
  </div>
</template>

<script>
import { reactive, toRefs, onBeforeMount, computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    // STORE DEFINITION, DATA AND FUNCTIONS
    const store = useStore();

    const selectedModule = computed(() => {
      const module = store.getters.workspace("module");
      if (module) return module;
      return { index: -1 };
    });

    const selectModule = async (b) => {
      await store.commit("selectItem", { a: "module", b });
    };

    // STATE DECLARATION
    const state = reactive({
      generalMods: [],
      technicalMods: [],
    });

    // LIFECYCLE HOOKS
    onBeforeMount(() => {
      const modules = store.getters.modules;

      for (let i = 0; i < modules.length; i++) {
        if (modules[i].category === "General")
          state.generalMods.push(modules[i]);
        if (modules[i].category === "Technical")
          state.technicalMods.push(modules[i]);
      }
    });

    return {
      ...toRefs(state),
      selectModule,
      selectedModule,
    };
  },
};
</script>

<style lang="css" scoped>
.area {
  position: fixed;
  left: 0px;
  top: 0px;
  bottom: 0px;
  width: 255px;
  background: #715091;
}

.logo-kanbamigo {
  position: absolute;
  width: 201px;
  height: 88px;
  left: 26px;
  top: 20px;
}

.items-area {
  position: absolute;
  left: 0px;
  right: 0px;
  top: 128px;
  bottom: 43px;
  overflow-y: scroll;
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

/* Hide scrollbar for Chrome, Safari and Opera */
.items-area::-webkit-scrollbar {
  display: none;
}

.item {
  display: block;
  width: 255px;
  height: 56px;
  cursor: pointer;
}

.item-selected {
  border-left: 3px solid #dde2ff !important;
  background: #9fa2b414;
  width: 252px;
}

.item:hover {
  background: #9fa2b414;
}

.item-icon {
  width: 16px;
  height: 16px;
  margin-left: 32px;
  margin-top: 20px;
}

.item-selected-icon {
  margin-left: 29px !important;
}

.item-span {
  height: 20px;
  margin-left: 20px;
  margin-top: 18px;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0.2px;
  color: #dde2ff;

  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
}

.divider {
  height: 0px;
  margin-left: 0px;
  width: 255px;
  margin-top: 0px;
  border-top: 1px solid #dfe0eb14;
}

.logo-kanban {
  position: absolute;
  width: 69px;
  height: 27px;
  left: 93px;
  bottom: 8px;
}
</style>
