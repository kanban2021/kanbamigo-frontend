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
      <div v-show="selectedTab === 'General'">
        <div class="general-head">
          <input v-model="item.nombre" />
        </div>
        <div class="general-body">
          <table class="general-table" style="left: 0px">
            <tbody>
              <tr>
                <td class="table-label">
                  <label> Contacto </label>
                </td>
                <td style="width: 100%; vertical-align: top">
                  <input v-model="item.contacto" class="text-field" />
                </td>
              </tr>
            </tbody>
          </table>
          <table class="general-table" style="right: 0px">
            <tbody>
              <tr>
                <td class="table-label"><label> Usuario </label></td>
                <td style="width: 100%">
                  <input
                    v-model="item.credenciales.usuario"
                    class="text-field"
                  />
                </td>
              </tr>
              <tr>
                <td class="table-label"><label> Contraseña </label></td>
                <td style="width: 100%">
                  <input
                    v-model="item.credenciales.contraseña"
                    class="text-field"
                  />
                </td>
              </tr>
              <tr>
                <td class="table-label"><label> URL </label></td>
                <td style="width: 100%">
                  <input v-model="item.credenciales.url" class="text-field" />
                </td>
              </tr>
              <tr>
                <td class="table-label"><label> Nombre de DB </label></td>
                <td style="width: 100%">
                  <input v-model="item.credenciales.db" class="text-field" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div v-show="selectedTab === 'Plantilla'" class="html-area">
        <input
          v-model="item.plantilla.asunto"
          class="text-field"
          style="
            position: absolute;
            left: 6px;
            padding-left: 12px;
            top: 14px;
            width: calc(100% - 520px);
          "
        />
        <div class="editor-buttons-container">
          <input
            type="file"
            @change="loadDesign"
            ref="file"
            style="display: none"
          />
          <button class="button" @click="$refs.file.click()">
            <span>Importar JSON</span>
          </button>
          <button class="button" @click="exportHtml('json')">
            <span>Exportar JSON</span>
          </button>
          <button class="button" @click="exportHtml('html')">
            <span>Exportar Plantilla</span>
          </button>
        </div>
        <div id="editor-container" class="email-editor" />
      </div>
    </div>
    <div class="action-buttons-container">
      <button class="button" @click="$emit('change-view', [0])">
        <span>Cancelar</span>
      </button>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted } from "vue";
import { saveAs } from "file-saver";

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
      tabs: ["General", "Plantilla"],
      selectedTab: "General",
      item: loadItem(),
    });

    const selectTab = (a) => {
      if (state.selectedTab !== a) state.selectedTab = a;
    };

    const exportHtml = (format) => {
      // eslint-disable-next-line no-undef
      unlayer.exportHtml(function (data) {
        var file;

        switch (format) {
          case "json":
            file = JSON.stringify(data.design);
            break;
          case "html":
            file = data.html;
            break;
        }

        var blob = new Blob([file], { type: "text/plain;charset=utf-8" });
        saveAs(blob, `temp.${format}`);
      });
    };

    const loadDesign = (e) => {
      var files = e.target.files || e.dataTransfer.files;

      if (files.length) {
        var file = files[0];
        const reader = new FileReader();
        reader.onload = (res) => {
          var design = JSON.parse(res.target.result);
          // eslint-disable-next-line no-undef
          unlayer.loadDesign(design);
        };
        reader.onerror = (err) => console.log(err);
        reader.readAsText(file);
      }
    };

    onMounted(() => {
      // eslint-disable-next-line no-undef
      unlayer.init({
        id: "editor-container",
        locale: "es-ES",
        displayMode: "email",
      });
    });

    return {
      ...toRefs(state),
      selectTab,
      exportHtml,
      loadDesign,
    };
  },
};
</script>

<style lang="css" scoped>
input {
  border: 1px solid transparent;
  border-bottom: 1px solid #ccc;
  font-family: "Montserrat";
  color: #777;
  font-weight: 400;
}

input:read-only {
  border-bottom: 1px solid transparent !important;
  color: #000;
}

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

.general-head {
  position: absolute;
  left: 6px;
  right: 6px;
  top: 12px;
  height: 92px;
}

.general-head input {
  margin-left: 24px;
  width: 60%;
  height: 36px;
  min-width: 320px;
  padding: 2px 12px;
  font-size: 24px;
}

.general-body {
  position: absolute;
  bottom: 6px;
  top: 120px;
  left: 6px;
  right: 6px;
  display: inline-flex;
  align-content: top;
}

.general-table {
  width: 50%;
  border-collapse: collapse;
  display: inline-block;
}

.table-label {
  width: 0%;
  padding: 4px 12px 4px 6px;
  text-align: right;
  min-width: 120px;
  border-right: 1px solid #ddd;
}

.table-label label {
  font-weight: bold;
  font-family: "Montserrat";
  font-size: 14px;
  line-height: 1.5;
}

.text-field {
  width: 85%;
  margin: 0px 0px 0px 6px;
  padding: 2px 4px;
  font-size: 14px;
}

.email-editor {
  position: absolute;
  left: 6px;
  right: 6px;
  top: 48px;
  bottom: 6px;
  border-radius: 5px;
  overflow: scroll;
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

/* Hide scrollbar for Chrome, Safari and Opera */
.email-editor::-webkit-scrollbar {
  display: none;
}

.action-buttons-container {
  position: absolute;
  left: 0px;
  right: 0px;
  bottom: 0px;
  height: 30px;
  justify-content: right;
  display: inline-flex;
}

.editor-buttons-container {
  position: absolute;
  right: 12px;
  top: 12px;
  height: 30px;
  justify-content: right;
  display: inline-flex;
}

.button {
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

.button:hover {
  background: #5e427a;
}

.button span {
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
