<template>
  <div></div>
</template>

<script>
import { ElMessage } from "element-plus";
const db = window.$api.import("db");
const dialog = window.$api.import("dialog");
import { $emit, $on } from "vue-happy-bus";
const sleep = window.$api.import("time").$require("sleep");

export default {
  mounted() {
    $on("Recovery-From-File", () => {
      let path = dialog.showOpenDialogSync();
      let items = [];
      if (path != undefined) {
        path = path[0];
        items = db.getAllDataFromFile(path);
        for (let i = 0; i < items.length; i++) {
          if (db.studentExist(items[i].code)) {
            db.updateByCode(items[i]);
          } else {
            db.insertData(items[i]);
          }
        }
      }
      $emit("Loading-Switcher", true);
      sleep(300).then(() => {
        $emit("Refresh-Data");
      });
    });
  },
};
</script>