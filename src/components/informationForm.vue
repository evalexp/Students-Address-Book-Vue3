<template>
  <el-dialog
    :title="title"
    v-model="dialogFormVisible"
    @keyup.enter="updateData"
  >
    <el-form v-model="Studentform">
      <el-form-item label="学生编号" :label-width="formLabelWidth">
        <el-input
          v-model="Studentform.code"
          autocomplete="off"
          :disabled="codeEnable || showMode"
        ></el-input>
      </el-form-item>
      <el-form-item label="学生姓名" :label-width="formLabelWidth">
        <el-input
          v-model="Studentform.name"
          autocomplete="off"
          :disabled="showMode"
        ></el-input>
      </el-form-item>
      <el-form-item label="学生性别" :label-width="formLabelWidth">
        <el-select
          v-model="Studentform.sex"
          placeholder="请选择学生性别"
          :disabled="showMode"
        >
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="手机号码" :label-width="formLabelWidth">
        <el-input
          v-model="Studentform.phone"
          autocomplete="off"
          :disabled="showMode"
        ></el-input>
      </el-form-item>
      <el-form-item label="电子邮箱" :label-width="formLabelWidth">
        <el-input
          v-model="Studentform.emailAddress"
          autocomplete="off"
          :disabled="showMode"
        ></el-input>
      </el-form-item>
      <el-form-item label="学生专业" :label-width="formLabelWidth">
        <el-select
          v-model="Studentform.major"
          placeholder="请选择学生专业"
          :disabled="showMode"
        >
          <el-option label="计算机应用" value="计算机应用"></el-option>
          <el-option label="信息安全" value="信息安全"></el-option>
          <el-option label="电子信息" value="电子信息"></el-option>
          <el-option label="网络技术" value="网络技术"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学生年龄" :label-width="formLabelWidth">
        <el-input-number
          v-model="Studentform.age"
          autocomplete="off"
          :disabled="showMode"
        >
        </el-input-number>
      </el-form-item>
      <el-form-item label="家庭住址" :label-width="formLabelWidth">
        <el-input
          v-model="Studentform.address"
          autocomplete="off"
          :disabled="showMode"
        ></el-input>
      </el-form-item>
      <el-form-item label="出生日期" :label-width="formLabelWidth">
        <el-date-picker
          v-model="Studentform.date"
          type="date"
          placeholder="选择日期"
          :disabled="showMode"
        >
        </el-date-picker>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer" :style="showMode ? 'display:none' : ''">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateData">确 定</el-button>
      </span>
      <span class="dialog-footer" :style="showMode ? '' : 'display:none'">
        <el-button @click="dialogFormVisible = false" type="primary"
          >确定</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { ElMessage } from "element-plus";
import { $emit, $on } from "vue-happy-bus";
const db = window.$api.import("db");
const sleep = window.$api.import("time").$require("sleep");

export default {
  data() {
    return {
      dialogFormVisible: false,
      Studentform: {
        code: "",
        name: "",
        sex: "",
        phone: "",
        emailAddress: "",
        major: "",
        age: "",
        address: "",
        date: "",
      },
      formLabelWidth: "120px",
      new: true,
      codeEnable: false,
      showMode: false,
      title: "",
    };
  },
  methods: {
    updateData() {
      $emit("Loading-Switcher", true);
      const d = new Date(this.Studentform.date);
      this.Studentform.age = new Date().getFullYear() - d.getFullYear();
      if (this.new && db.insertData(this.Studentform) == "successful") {
        ElMessage.success("新增信息成功！");
      } else if (db.updateByCode(this.Studentform) == "successful") {
        ElMessage.success("修改信息成功！");
      } else {
        ElMessage.error(`${this.new ? "新增信息失败！" : "修改信息失败！"}`);
      }
      $emit("Refresh-Data");
      this.dialogFormVisible = false;
    },
  },
  mounted() {
    $on("Edit-Information", (formData) => {
      this.title = "编辑学生信息";
      this.Studentform = formData;
      this.new = false;
      this.dialogFormVisible = true;
      this.codeEnable = true;
      this.showMode = false;
    });

    $on("New-Student", () => {
      this.title = "新增学生信息";
      this.codeEnable = false;
      this.Studentform = {
        id: "",
        code: "",
        name: "",
        sex: "",
        phone: "",
        emailAddress: "",
        major: "",
        age: "",
        address: "",
        date: "",
      };
      this.new = true;
      this.dialogFormVisible = true;
      this.showMode = false;
    });

    $on("Show-Information", (data) => {
      this.title = "查看学生信息";
      this.showMode = true;
      this.dialogFormVisible = true;
      this.Studentform = data;
    });
  },
};
</script>