<template>
  <el-dialog
    :title="title"
    v-model="dialogFormVisible"
    @keyup.enter="searchByPhone"
  >
    <el-form :model="searchForm">
      <el-form-item :label="column" :label-width="formLabelWidth">
        <el-input v-model="columnValue" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="search">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { ElMessage } from "element-plus";
import { $emit, $on } from "vue-happy-bus";

const db = window.$api.import("db");

export default {
  data() {
    return {
      dialogFormVisible: false,
      columnValue: "",
      title: "",
      column: "",
      formLabelWidth: "120px",
      nameSearch: false,
      phoneSearch: false,
      codeSearch: false,
    };
  },
  methods: {
    search() {
      let filter = {};
      if (this.codeSearch) {
        filter = { code: this.columnValue };
        this.codeSearch = false;
      }
      if (this.nameSearch) {
        filter = { name: this.columnValue };
        this.nameSearch = false;
      }
      if (this.phoneSearch) {
        filter = { phone: this.columnValue };
        this.phoneSearch = false;
      }
      this.columnValue = "";
      const data = db.getDataByFilter(filter);
      if (data.length == 1) {
        $emit("Show-Information", data[0]);
      } else if (data.length == 0) {
        ElMessage.error("未查找到数据！");
      }
      this.dialogFormVisible = false;
    },
  },
  mounted() {
    $on("Search-By-Phone", () => {
      this.title = "通过手机搜索学生";
      this.column = "学生手机号码";
      this.phoneSearch = true;
      this.dialogFormVisible = true;
    });

    $on("Search-By-UID", () => {
      this.title = "通过学生编号搜索学生";
      this.column = "学生编号";
      this.codeSearch = true;
      this.dialogFormVisible = true;
    });

    $on("Search-By-Name", () => {
      this.title = "通过学生姓名搜索学生";
      this.column = "学生姓名";
      this.nameSearch = true;
      this.dialogFormVisible = true;
    });
  },
};
</script>