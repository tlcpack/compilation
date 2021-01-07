<template>
  <div id="app">
    <chessboard :showThreats="true"/>
  </div>
</template>

<script>
import { chessboard } from "vue-chessboard";
import "vue-chessboard/dist/vue-chessboard.css";
export default {
  name: "app",
  components: {
    chessboard,
  },
};
</script>
