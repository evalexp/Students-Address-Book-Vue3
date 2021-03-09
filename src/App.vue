<template>
  <!-- <div id="nav"></div>
  <router-view /> -->
  <Home />
</template>

<script>
import { defineComponent } from "vue";
import Home from "@/views/Home.vue";
import { $on } from "vue-happy-bus";
import { ElMessage } from "element-plus";

export default defineComponent({
  components: {
    Home,
  },
});
</script>
