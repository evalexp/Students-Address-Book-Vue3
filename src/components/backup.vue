<template>
  <div></div>
</template>

<script>
import { ElMessage } from "element-plus";
import { $on } from "vue-happy-bus";
const dialog = window.$api.import("dialog");
const fs = window.$api.import("fs");
export default {
  mounted() {
    $on("Backup-Work", (items) => {
      const path = dialog.showSaveDialogSync();
      if (path != undefined) {
        const data = {
          data: items,
        };
        fs.writeFile(
          path,
          JSON.stringify(data),
          {
            encoding: "utf-8",
          },
          (err) => {
            if (err) {
              ElMessage.error("写文件失败，请检查是否为此程序赋予权限");
            } else {
              ElMessage.success("备份成功，请妥善保管备份文件");
            }
          }
        );
      } else {
        ElMessage.info("用户取消了备份操作");
      }
    });
  },
};
</script>