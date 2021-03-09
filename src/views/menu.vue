<template>
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu :default-openeds="['1', '1-5']">
      <el-submenu index="1">
        <template #title><i class="el-icon-document"></i>学生信息</template>
        <el-menu-item-group>
          <template #title>基础操作</template>
          <el-menu-item index="1-1" @click="newStudent()"
            ><i class="el-icon-plus"></i>新增学生信息
          </el-menu-item>
          <el-menu-item index="1-2" @click="editStudent()"
            ><i class="el-icon-edit"></i>编辑学生信息</el-menu-item
          >
          <el-menu-item index="1-3" @click="deleteSelectedItem"
            ><i class="el-icon-delete"></i>删除选中学生信息
          </el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="高级操作"> </el-menu-item-group>
        <el-submenu index="1-5" v-if="!showSearchResult">
          <template #title><i class="el-icon-search"></i>搜索</template>
          <el-menu-item-group tile="搜索类别" v-if="!showSearchResult">
            <el-menu-item index="1-5-1" @click="searchByName()"
              ><i class="el-icon-user"></i>名字搜索</el-menu-item
            >
            <el-menu-item index="1-5-2" @click="searchByUID()"
              ><i class="el-icon-info"></i>编号搜索</el-menu-item
            >
            <el-menu-item index="1-5-3" @click="searchByPhone()"
              ><i class="el-icon-phone"></i>手机号码搜索</el-menu-item
            >
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="1-7" @click="backupFile"
          ><i class="el-icon-copy-document"></i>备份</el-menu-item
        >
        <el-menu-item index="1-8" @click="recovery"
          ><i class="el-icon-receiving"></i>恢复</el-menu-item
        >
        <el-menu-item index="1-9" @click="showModeChange"
          ><i class="el-icon-connection"></i
          ><span v-if="!showInShort">简略</span
          ><span v-if="showInShort">详细</span>显示</el-menu-item
        >
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
import { defineComponent } from "vue";
import { $emit } from "vue-happy-bus";

const _window = window.$api.import("electron_window");

export default {
  methods: {
    backupFile() {
      $emit("Backup-Prepare");
    },
    recovery() {
      $emit("Recovery-From-File");
    },
    showModeChange() {
      if (this.showInShort) {
        _window.maximize();
      } else {
        _window.unmaximize();
      }
      this.showInShort = !this.showInShort;
      $emit("Show-In-Short-Mode-Change");
    },
    newStudent() {
      $emit("New-Student");
    },
    editStudent() {
      $emit("Edit-Student");
    },
    searchByName() {
      $emit("Search-By-Name");
    },
    searchByUID() {
      $emit("Search-By-UID");
    },
    searchByPhone() {
      $emit("Search-By-Phone");
    },
    deleteSelectedItem() {
      $emit("Delete-Student");
    },
  },
  data() {
    return {
      showInShort: true,
    };
  },
};
</script>

<style scoped>
.el-aside {
  color: #333;
}
</style>