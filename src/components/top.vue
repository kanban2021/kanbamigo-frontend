<template>
  <div class="area">
    <div class="navbar-area">
      <div
        v-for="item in spaces"
        :key="item.index"
        :class="[
          selectedSpace.index === item.index
            ? 'navbar-item navbar-item-selected'
            : 'navbar-item',
        ]"
        @click="selectSpace(item.index)"
      >
        <span> {{ item.name }} </span>
      </div>
    </div>
    <div class="notifs-area">
      <img
        src="@/assets/vectors/notif_bell.svg"
        alt="notification_bell"
        class="notif-bell"
      />
      <!--img
        src="@/assets/vectors/unread_notif_dot.svg"
        alt="unread_notifs_dot"
        class="unread-notif-dot"
      /-->
    </div>
    <div class="user-area">
      <div class="user-name">
        <span>{{ userInfo.name }}</span>
      </div>
      <div class="avatar">
        <img
          :src="require(`@/assets/${userInfo.avatar}`)"
          :alt="userInfo.alias + '_avatar'"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    // STORE DEFINITION, DATA AND FUNCTIONS
    const store = useStore();

    const userInfo = computed(() => {
      return store.getters.userInfo;
    });
    const selectedSpace = computed(() => {
      const space = store.getters.workspace("space");
      if (space) return space;
      return { index: -1 };
    });
    const spaces = computed(() => {
      const module = store.getters.workspace("module");

      if (module.spaces) return module.spaces;
      else return [];
    });

    const selectSpace = async (b) => {
      await store.commit("selectItem", { a: "space", b });
    };

    return {
      userInfo,
      selectSpace,
      selectedSpace,
      spaces,
    };
  },
};
</script>

<style lang="css" scoped>
.area {
  position: fixed;
  left: 255px;
  right: 0px;
  top: 0px;
  height: 94px;
  border-bottom: 1px solid #715091;
}

.navbar-area {
  position: fixed;
  left: 288px;
  right: 314px;
  top: 39px;
  height: 56px;
  overflow-x: scroll;
  overflow-y: visible;
  white-space: nowrap;
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

/* Hide scrollbar for Chrome, Safari and Opera */
.navbar-area::-webkit-scrollbar {
  display: none;
}

.navbar-item {
  position: relative;
  bottom: 0px;
  height: 54px;
  padding: 0px 16px;
  cursor: pointer;
  display: inline-block;
  color: #878787de;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 4px 4px 0px 0px;
}

.navbar-item span {
  position: relative;
  top: 25.5%;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.44px;
}

.navbar-item-selected {
  color: #000000 !important;
  background: #ffffff !important;
  border: 1px solid #715091 !important;
  border-bottom: 1px solid #ffffff !important;
}

.notifs-area {
  position: fixed;
  right: 234px;
  top: 47px;
  width: 79px;
  height: 32px;
  border-right: 1px solid #dfe0eb;
}

.notif-bell {
  position: absolute;
  top: 4px;
  right: 32px;
  height: 16px;
  cursor: pointer;
  z-index: 4;
}

.unread-notif-icon {
  position: absolute;
  top: 3.25px;
  right: 32.25px;
  width: 6.5px;
  z-index: 5;
}

.user-area {
  position: fixed;
  right: 0px;
  top: 38px;
  width: 234px;
  height: 56px;
}

.user-name {
  position: absolute;
  top: 12px;
  right: 89px;
  width: 130px;
  height: 18px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: clip;
}

.user-name span {
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  text-align: right;
  letter-spacing: 0.2px;
  color: #252733;
}

.avatar {
  position: absolute;
  top: 0px;
  right: 31px;
  width: 42.5px;
  height: 42.5px;
  border: 1.5px solid #dfe0eb;
  border-radius: 50%;
}

.avatar img {
  position: absolute;
  top: 1.25px;
  right: 1.25px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.workspace-area {
  position: fixed;
  left: 287px;
  right: 29px;
  top: 105px;
  bottom: 22px;
}
</style>
