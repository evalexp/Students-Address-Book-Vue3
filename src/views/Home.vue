<template>
  <el-container class="container" :style="style()" v-loading="loading">
    <Menu />
    <el-container>
      <!-- <Header /> -->
      <el-header style="text-align: right; font-size: 12px">
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <span>学生通信录</span>
      </el-header>
      <Content />
    </el-container>
  </el-container>
  <InformationForm />
  <SearchForm />
  <Backup />
  <Recovery />
  <!-- <router-view /> -->
</template>

<script>
import Menu from "./menu.vue";
import Content from "./main.vue";
import { $on } from "vue-happy-bus";
import InformationForm from "@/components/informationForm.vue";
import SearchForm from "@/components/searchForm.vue";
import Backup from "@/components/backup.vue";
import Recovery from "@/components/recovery.vue";

export default {
  components: {
    Menu,
    Content,
    InformationForm,
    SearchForm,
    Backup,
    Recovery,
  },
  data() {
    return {
      winHeight: "750px",
      loading: false,
    };
  },
  methods: {
    style() {
      return `height:${this.winHeight}`;
    },
  },
  mounted() {
    $on("Loading-Switcher", (loading) => {
      this.loading = loading;
    });
  },
};
</script>

<style scoped>
.container {
  border: 1px solid #eee;
}

.header {
  text-align: right;
  font-size: 12px;
}

.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}
</style>