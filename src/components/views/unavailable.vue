<template>
  <div class="area">
    <h1 class="message">ESTE ÁREA NO ESTÁ DISPONIBLE AÚN...</h1>
  </div>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style lang="css" scoped>
.area {
  position: absolute;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  border: 0.5px dashed gray;
}

.message {
  text-align: center;
  margin-top: 56px;
  font-family: "Montserrat";
}
</style>
