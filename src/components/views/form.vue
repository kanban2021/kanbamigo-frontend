<template>
  <div>
    <div class="tabs-container">
      <div
        v-for="tab in tabs"
        :key="tab"
        :class="[selectedTab === tab ? 'tab tab-selected' : 'tab']"
        @click="selectTab(tab)"
      >
        <span> {{ tab }} </span>
      </div>
    </div>
    <div class="form-area">
      <div v-show="selectedTab === 'General'" class="general-area">
        <div>
          <label>NOMBRE: </label>
          <input v-model="item.nombre" />
        </div>
        <div>
          <label>CONTACTO: </label>
          <input v-model="item.contacto" />
        </div>
        <br />
        <div>
          <label>USUARIO: </label>
          <input v-model="item.credenciales.usuario" />
        </div>
        <div>
          <label>CONTRASEÑA: </label>
          <input v-model="item.credenciales.contraseña" />
        </div>
        <div>
          <label>URL: </label>
          <input v-model="item.credenciales.url" />
        </div>
        <div>
          <label>NOMBRE DE DB: </label>
          <input v-model="item.credenciales.db" />
        </div>
      </div>
      <div v-show="selectedTab === 'HTML'" class="html-area">HTML</div>
    </div>
    <div class="buttons-container">
      <button class="action-button" @click="$emit('change-view', [0])">
        <span>Cancelar</span>
      </button>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";

export default {
  props: {
    meta: {
      type: Object,
      required: true,
    },
    itemId: {
      type: Number,
      required: false,
    },
  },
  setup(props) {
    const loadItem = () => {
      let item = {};

      if (props.meta.action !== "CREATE") {
        item = props.meta.data.QUERY.find(
          (item) => item.index === props.itemId
        );
      } else {
        item = props.meta.data.newItem;
      }

      return item;
    };

    const state = reactive({
      tabs: ["General", "HTML"],
      selectedTab: "General",
      item: loadItem(),
    });

    const selectTab = (a) => {
      if (state.selectedTab !== a) state.selectedTab = a;
    };

    return {
      ...toRefs(state),
      selectTab,
    };
  },
};
</script>

<style lang="css" scoped>
.tabs-container {
  position: fixed;
  left: 287px;
  right: 29px;
  top: 105px;
  height: 42px;
  display: inline-flex;
  justify-items: center;
  overflow-x: scroll;
  overflow-y: visible;
  white-space: nowrap;
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

/* Hide scrollbar for Chrome, Safari and Opera */
.tabs-container::-webkit-scrollbar {
  display: none;
}

.tab {
  position: relative;
  bottom: 0px;
  height: 40px;
  width: 50%;
  padding: 0px 16px;
  cursor: pointer;
  display: inline-block;
  color: #878787de;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 4px 4px 0px 0px;
  border-bottom: 1px solid #715091;
}

.tab span {
  position: relative;
  top: 25.5%;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 20px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.44px;
}

.tab-selected {
  color: #000000 !important;
  background: #ffffff !important;
  border: 1px solid #715091 !important;
  border-bottom: 1px solid #ffffff !important;
}

.form-area {
  position: absolute;
  left: 0px;
  right: 0px;
  top: 42px;
  bottom: 36px;
  border: 1px solid #715091;
  border-radius: 0px 0px 5px 5px;
  border-top: 0px;
  background: #ffffff;
}

.buttons-container {
  position: absolute;
  left: 0px;
  right: 0px;
  bottom: 0px;
  height: 30px;
  justify-content: right;
  display: inline-flex;
}

.action-button {
  height: 30px;
  margin-left: 12px;
  background: #715091;
  border-radius: 4px;
  border: 0px;
  display: flex;
  align-items: center;
  text-align: center;
  cursor: pointer;
}

.action-button:hover {
  background: #5e427a;
}

.action-button span {
  margin-left: 8px;
  margin-right: 8px;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: 0.44px;
  color: #ffffff;
}
</style>
