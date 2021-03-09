<template>
  <el-main>
    <el-table
      ref="Table"
      :data="tableData"
      border
      @cell-dblclick="handleEdit"
      @selection-change="handleSelectionChange"
      :row-style="selectedRow"
    >
      <!-- detail show form -->
      <el-table-column type="expand">
        <template v-slot="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="学生姓名">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="学生性别">
              <span>
                <el-tag
                  :type="props.row.sex === '男' ? 'primary' : 'success'"
                  disable-transitions
                >
                  {{ props.row.sex }}
                </el-tag>
              </span>
            </el-form-item>
            <el-form-item label="学生编号">
              <span>{{ props.row.code }}</span>
            </el-form-item>
            <el-form-item label="学生年龄">
              <span
                ><el-tag :type="'danger'" disable-transitions>{{
                  props.row.age
                }}</el-tag></span
              >
            </el-form-item>
            <el-form-item label="手机号码">
              <span>{{ props.row.phone }}</span>
            </el-form-item>
            <el-form-item label="电子邮箱">
              <span
                ><a :href="'mailto:' + props.row.emailAddress">
                  <el-tag :type="'warning'" disable-transitions>{{
                    props.row.emailAddress
                  }}</el-tag>
                </a></span
              >
            </el-form-item>
            <el-form-item label="家庭住址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="专 业">
              <span>
                <el-tag :type="tagType(props.row.major)" disable-transitions>{{
                  props.row.major
                }}</el-tag>
              </span>
            </el-form-item>
            <el-form-item label="出生日期">
              <span>{{ formatTime(props.row.date) }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <!-- show in short table columns setting -->
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="code" label="学生编号" width="120" sortable>
        <template v-slot="scope">
          <span> {{ scope.row.code }} </span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="学生姓名" width="120" sortable>
        <template v-slot="scope">
          <span v-if="!scope.row.editAvailable"> {{ scope.row.name }} </span>
          <span v-else>
            <el-input
              v-model="scope.row.name"
              @keyup.enter="updateData(scope)"
              @blur="updateData(scope)"
            />
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="sex"
        label="学生性别"
        width="120"
        sortable
        column-key="sex"
        :filters="[
          { text: '男', value: '男' },
          { text: '女', value: '女' },
        ]"
        :filter-method="filter"
      >
        <template v-slot="scope">
          <span v-if="!scope.row.editAvailable">
            <el-tag
              :type="scope.row.sex === '男' ? 'primary' : 'success'"
              disable-transitions
            >
              {{ scope.row.sex }}
            </el-tag>
          </span>
          <span v-else>
            <el-select v-model="scope.row.sex" @change="updateData(scope)">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="手机号码" sortable>
        <template v-slot="scope">
          <span v-if="!scope.row.editAvailable">{{ scope.row.phone }}</span>
          <span v-else>
            <el-input
              v-model="scope.row.phone"
              @keyup.enter="updateData(scope)"
              @blur="updateData(scope)"
            />
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="emailAddress" label="邮箱地址" sortable>
        <template v-slot="scope">
          <span v-if="!scope.row.editAvailable"
            ><a :href="'mailto:' + scope.row.emailAddress">
              <el-tag :type="'warning'" disable-transitions
                >{{ scope.row.emailAddress }}
              </el-tag></a
            ></span
          >
          <span v-else>
            <el-input
              v-model="scope.row.emailAddress"
              @keyup.enter="updateData(scope)"
              @blur="updateData(scope)"
            />
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="major"
        label="学生专业"
        sortable
        column-key="major"
        :filters="[
          { text: '计算机应用', value: '计算机应用' },
          { text: '信息安全', value: '信息安全' },
          { text: '电子信息', value: '电子信息' },
          { text: '网络技术', value: '网络技术' },
        ]"
        :filter-method="filter"
      >
        <template v-slot="scope">
          <span v-if="!scope.row.editAvailable">
            <el-tag :type="tagType(scope.row.major)" disable-transitions>
              {{ scope.row.major }}
            </el-tag>
          </span>
          <span v-else>
            <el-select v-model="scope.row.major" @change="updateData(scope)">
              <el-option label="计算机应用" value="计算机应用"></el-option>
              <el-option label="信息安全" value="信息安全"></el-option>
              <el-option label="电子信息" value="电子信息"></el-option>
              <el-option label="网络技术" value="网络技术"></el-option>
            </el-select>
          </span>
        </template>
      </el-table-column>
      <!-- show in detail table columns setting, use this.showInShort to control this part show or not -->
      <el-table-column prop="age" label="学生年龄" sortable v-if="!showInShort">
        <template v-slot="scope">
          <span v-if="!scope.row.editAvailable">{{ scope.row.age }}</span>
          <span v-else>
            <el-input-number
              v-model="scope.row.age"
              @keyup.enter="updateData(scope)"
              @blur="updateData(scope)"
              :min="0"
              :max="100"
            ></el-input-number>
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="家庭住址"
        sortable
        v-if="!showInShort"
      >
        <template v-slot="scope">
          <span v-if="!scope.row.editAvailable">{{ scope.row.address }}</span>
          <span v-else>
            <el-input
              v-model="scope.row.address"
              @keyup.enter="updateData(scope)"
              @blur="updateData(scope)"
            />
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="date"
        label="出生日期"
        sortable
        v-if="!showInShort"
      >
        <template v-slot="scope">
          <span v-if="!scope.row.editAvailable">{{
            formatTime(scope.row.date)
          }}</span>
          <span v-else>
            <el-date-picker
              v-model="scope.row.date"
              type="date"
              placeholder="选择日期"
              @blur="updateData(scope)"
            >
            </el-date-picker>
          </span>
        </template>
      </el-table-column>
    </el-table>
  </el-main>
</template>

<script>
import { $emit, $on } from "vue-happy-bus";
import { ElMessage, ElPopconfirm } from "element-plus";

const db = window.$api.import("db");
const sleep = window.$api.import("time").$require("sleep");

export default {
  setup() {
    // $emit("Loading-Switcher", true);
  },
  data() {
    return {
      showInShort: true,
      tableData: [],
      selectRow: [],
      formData: {
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
      },
      editAvailable: false,
    };
  },
  methods: {
    /**
     * return the hightlight css
     */
    selectedRow({ row, rowIndex }) {
      if (this.selectRow.includes(rowIndex)) {
        return {
          "background-color": "rgba(185,221,249,0.75)",
        };
      }
    },
    /**
     * @param {Object} row the double click row
     * @param {*} column
     * @param {*} event
     * set that row to edited status
     */
    handleEdit(row, column, event) {
      row.editAvailable = true;
    },
    /**
     * @param {Array} data the selected rows
     * check if could edit or not
     */
    handleSelectionChange(data) {
      this.selectRow = [];
      if (data.length > 0) {
        data.forEach((item, index) => {
          this.selectRow.push(this.tableData.indexOf(item));
        });
      }
      if (data.length == 1) {
        this.editAvailable = true;
        this.formData.id = data[0].id;
        this.formData.code = data[0].code;
        this.formData.name = data[0].name;
        this.formData.sex = data[0].sex;
        this.formData.phone = data[0].phone;
        this.formData.emailAddress = data[0].emailAddress;
        this.formData.major = data[0].major;
        this.formData.age = data[0].age;
        this.formData.address = data[0].address;
        this.formData.date = data[0].date;
      } else {
        this.editAvailable = false;
      }
    },
    /**
     * return the tag type
     */
    tagType(major) {
      if (major === "计算机应用") return "primary";
      if (major === "信息安全") return "success";
      if (major === "电子信息") return "info";
      if (major === "网络技术") return "danger";
    },
    /**
     * table filter
     * value has been seted to 'major'
     * column.property has been seted to 'major'
     */
    filter(value, row, column) {
      return row[column["property"]] === value;
    },
    // time formater, to beautify the time string
    formatTime(date) {
      /**
       * @param {Date} time time string
       */
      const TimeFormater = (time) => {
        const d = new Date(time);
        if (d instanceof Date && !isNaN(d.getTime()))
          return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
        else return "";
      };
      return TimeFormater(date);
    },
    updateData(scope) {
      scope.row.editAvailable = false;
      const d = new Date(scope.row.date);
      scope.row.age = new Date().getFullYear() - d.getFullYear();
      // this.loading = true;
      // ipcRender.send("updata-data", scope.row);
      $emit("Loading-Switcher", true);
      if (db.updateByCode(scope.row) == "successful") {
        ElMessage.success("修改成功！");
      }
      sleep(300).then(() => {
        $emit("Loading-Switcher", false);
      });
    },
  },
  mounted() {
    this.tableData = db.getAllData();
    $on("Edit-Student", () => {
      if (this.editAvailable) {
        $emit("Edit-Information", this.formData);
      } else {
        ElMessage.warning("选中一条数据以编辑！");
      }
    });

    $on("Refresh-Data", () => {
      const data = db.getAllData();
      this.tableData = [];
      data.forEach((value, index) => {
        this.tableData.push(value);
      });
      this.$refs.Table.clearSelection();
      sleep(300).then(() => {
        this.$forceUpdate();
        $emit("Loading-Switcher", false);
      });
    });
    $on("Delete-Student", () => {
      if (this.selectRow.length === 0) {
        ElMessage.error("未选择数据！");
      } else {
        this.$confirm("删除操作不可逆，确认删除所选的同学资料？", "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            const codeList = [];
            /**
             * Because of proxy mode,
             * there is no way to call delete operation in forEach of selectRow.
             */
            this.selectRow.forEach((value, index) => {
              codeList.push(this.$refs.Table.data[value].code);
            });
            codeList.forEach((value, index) => {
              db.removeDataByCode(value);
            });
            $emit("Refresh-Data");
            ElMessage.success("删除成功！");
          })
          .catch((err) => {
            ElMessage.info("已取消删除！");
          });
      }
    });
    $on("Backup-Prepare", () => {
      if (this.selectRow.length === 0) {
        ElMessage.error("未选择数据！无法进行备份操作！");
      } else {
        const items = [];
        this.selectRow.forEach((value, index) => {
          items.push(this.$refs.Table.data[value]);
        });
        $emit("Backup-Work", items);
      }
    });
    $on("Show-In-Short-Mode-Change", () => {
      this.showInShort = !this.showInShort;
    });
  },
};
</script>

<style scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>