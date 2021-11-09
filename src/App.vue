<template>
  <div>
    <Sidebar />
    <div class="right-area">
      <Top />
      <Workspace />
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/sidebar.vue";
import Top from "@/components/top.vue";
import Workspace from "@/components/workspace.vue";

export default {
  components: { Sidebar, Top, Workspace },
};
</script>

<style lang="css" scoped>
.right-area {
  position: fixed;
  left: 255px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  background: #f7f8fc;
  border-radius: 8px;
}
</style>
