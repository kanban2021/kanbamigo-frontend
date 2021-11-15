<template>
  <div>
    <div id="buttons-container">
      <button
        v-if="meta.actions.CREATE[0]"
        class="create-button"
        @click="$emit('change-view', [meta.actions.CREATE[1]])"
      >
        <img src="@/assets/vectors/plus_sign.svg" alt="+" />
        <span>Crear</span>
      </button>
    </div>
    <div class="table-container">
      <table style="width: 100%" rules="none">
        <thead>
          <tr class="table-header">
            <th style="width: 38px"></th>
            <th
              v-for="column in tableProps.columns"
              :key="column.name"
              class="header-column"
              :style="{ 'text-align': column.align }"
            >
              <span>{{ column.name }}</span>
            </th>
            <th style="width: 50px"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in tableData"
            :key="item.index"
            :style="{
              height: '56px',
              background: rowBg(),
            }"
          >
            <td style="width: 38px"></td>
            <td
              v-for="column in tableProps.columns"
              :key="column.name"
              class="row-column"
              :style="{
                'text-align': column.align,
                'font-weight': column.fontWeight,
              }"
            >
              <span
                :style="{
                  cursor:
                    column.fontWeight === 600 && meta.actions.READ[0]
                      ? 'pointer'
                      : '',
                }"
                @click="
                  column.fontWeight === 600 && meta.actions.READ[0]
                    ? $emit('change-view', [meta.actions.READ[1], item.index])
                    : () => {
                        return;
                      }
                "
                >{{ item[column.dataKey] }}</span
              >
            </td>
            <td style="width: 50px; text-align: right">
              <img
                v-if="meta.actions.UPDATE[0]"
                @click="
                  $emit('change-view', [meta.actions.UPDATE[1], item.index])
                "
                src="@/assets/vectors/edit_pencil.svg"
                alt="edit"
                class="edit-icon"
              />
              <img
                v-if="meta.actions.DELETE[0]"
                src="@/assets/vectors/trash_can.svg"
                alt="delete"
                class="delete-icon"
                @click="deleteItem(meta.actions.DELETE[1], item)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="footer-container"></div>
  </div>
</template>

<script>
import { reactive, toRefs, computed } from "vue";

export default {
  props: {
    meta: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    // STATE DECLARATION
    const state = reactive({
      tableProps: {
        columns: [props.meta.data.columns[0], props.meta.data.columns[1]],
        rowCounter: 0,
      },
    });

    const tableData = computed(() => {
      const data = props.meta.data.QUERY;
      data.sort((a, b) =>
        a.nombre > b.nombre ? 1 : b.nombre > a.nombre ? -1 : 0
      );
      return data;
    });

    const rowBg = () => {
      state.tableProps.rowCounter += 1;
      return state.tableProps.rowCounter % 2 === 0 ? "#f7f8fc" : "#ffffff";
    };

    const deleteItem = (action, item) => {
      var a = new Function("item", action);
      a(item);
    };

    return {
      ...toRefs(state),
      tableData,
      deleteItem,
      rowBg,
    };
  },
};
</script>

<style lang="css" scoped>
.create-button {
  position: absolute;
  width: 84px;
  height: 30px;
  left: 0px;
  top: 25px;
  background: #715091;
  border-radius: 4px;
  border: 0px;
  display: flex;
  align-items: center;
  text-align: center;
  cursor: pointer;
}

.create-button:hover {
  background: #5e427a;
}

.create-button img {
  width: 10px;
  height: 10px;
  margin-left: 2px;
}

.create-button span {
  margin-left: 8px;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: 0.44px;
  color: #ffffff;
}

.table-container {
  position: absolute;
  left: 0px;
  right: 0px;
  top: 80px;
  bottom: 36px;
  border-radius: 5px;
  overflow-y: scroll;
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

/* Hide scrollbar for Chrome, Safari and Opera */
.table-container::-webkit-scrollbar {
  display: none;
}

.table-header {
  background: #ffffff;
  height: 45px;
}

.header-column span {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: 0.05em;
  color: #606f89;
}

.row-column span {
  font-family: "Montserrat";
  font-style: normal;
  font-size: 12px;
  line-height: 15px;
  color: #2e3b52;
  top: 35.71%;
  bottom: 37.5%;
}

.edit-icon {
  margin: 20px 4.94px 20px 3.88px;
  cursor: pointer;
}

.delete-icon {
  margin: 20px 3.88px 20px 4.94px;
  cursor: pointer;
}

.footer-container {
  position: absolute;
  left: 0px;
  right: 0px;
  bottom: 0px;
  height: 36px;
  border: 0px dashed gray;
}
</style>
