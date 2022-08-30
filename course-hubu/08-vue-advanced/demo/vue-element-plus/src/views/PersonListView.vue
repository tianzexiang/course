<template>
  <el-container>
    <el-header class="header">
      <el-button type="primary" @click="visible = true">添加用户</el-button>
      <el-input placeholder="姓名" class="input" v-model="keyword"></el-input>
      <el-button type="primary" @click="handleSearchClick">搜索</el-button>
      <el-button @click="handleResetClick">重置</el-button>
    </el-header>
    <el-main
      ><el-table style="width: 100%" :data="data">
        <el-table-column prop="avatar" label="头像" width="180">
          <template #default="scope">
            <el-avatar
              shape="square"
              :size="50"
              :src="scope.row.avatar"
            ></el-avatar>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180" />
        <el-table-column prop="gender" label="性别">
          <template #default="scope">
            <el-tag v-if="scope.row.gender === 'Male'">男</el-tag>
            <el-tag v-else type="danger">女</el-tag>
          </template> </el-table-column
        ><el-table-column prop="phone" label="电话" /><el-table-column
          prop="email"
          label="邮箱"
        /><el-table-column prop="op" label="操作">
          <template #default="scope">
            <el-dropdown
              ><el-icon><icon-setting /></el-icon
              ><template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="handlePreview(scope.row.id)"
                    >查看</el-dropdown-item
                  >
                  <el-dropdown-item @click="handleEdit(scope.row)"
                    >编辑</el-dropdown-item
                  >
                  <el-dropdown-item @click="handleDeleteConfirm(scope.row.id)"
                    >删除</el-dropdown-item
                  >
                </el-dropdown-menu>
              </template></el-dropdown
            >
          </template></el-table-column
        >
      </el-table></el-main
    >
  </el-container>
  <el-dialog
    v-model="visible"
    :title="form.id ? '编辑用户' : '添加用户'"
    @close="handleClose"
  >
    <el-form :model="form" :rules="rules" ref="ruleFormRef">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-select v-model="form.gender" placeholder="请选择性别">
          <el-option label="男" value="Male"></el-option>
          <el-option label="女" value="Female"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input v-model="form.phone" placeholder="请输入电话"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item label="头像" prop="avatar">
        <el-input v-model="form.avatar" placeholder="请输入头像"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from "vue";
import * as api from "@/services/api";
import { IPerson } from "@/types";
import {
  ElMessage,
  ElButton,
  ElTable,
  ElTableColumn,
  ElAvatar,
  ElInput,
  ElDropdownMenu,
  ElDropdown,
  ElContainer,
  ElHeader,
  ElMain,
  ElDropdownItem,
  ElTag,
  ElMessageBox,
  ElDialog,
  ElForm,
  ElFormItem,
  ElSelect,
  ElOption,
  ElIcon,
} from "element-plus";
import { useRouter } from "vue-router";
type FormInstance = InstanceType<typeof ElForm>;

export default defineComponent({
  components: {
    ElButton,
    ElTable,
    ElIcon,
    ElTableColumn,
    ElAvatar,
    ElContainer,
    ElMain,
    ElHeader,
    ElDropdownItem,
    ElDropdown,
    ElInput,
    ElDropdownMenu,
    ElTag,
    ElDialog,
    ElForm,
    ElFormItem,
    ElSelect,
    ElOption,
  },
  setup() {
    const data = ref<IPerson[]>([]);
    const keyword = ref("");
    const visible = ref(false);
    const router = useRouter();
    const personInit: IPerson = {
      id: "",
      name: "",
      gender: "Male",
      avatar: "",
      email: "",
      phone: "",
    };
    const form = ref<IPerson>({ ...personInit });
    const rules = ref({
      name: [
        {
          required: true,
          message: "请输入用户名",
          trigger: "change",
        },
        {
          min: 2,
          message: "长度最小为2",
          trigger: "change",
        },
      ],
      phone: [
        {
          required: true,
          message: "请输入电话",
          trigger: "change",
        },
      ],
      avatar: [
        {
          required: true,
          message: "请输入头像地址",
          trigger: "change",
        },
      ],
      email: [
        {
          required: true,
          message: "请输入邮箱",
          trigger: "change",
        },
      ],
    });
    const ruleFormRef = ref<FormInstance>();

    const list = async (name?: string) => {
      try {
        const res = await api.listPerson(name);
        if (res.stat === "OK") {
          data.value = res.rows;
        } else {
          ElMessage(res.message);
        }
      } catch (err) {
        console.trace(err);
      }
    };
    const remove = async (id: string) => {
      try {
        const res = await api.removePerson(id);
        if (res.stat === "OK") {
          ElMessage({
            type: "success",
            message: "删除成功",
          });
          handleResetClick();
        } else {
          ElMessage({
            type: "error",
            message: "删除失败",
          });
        }
      } catch (err) {
        console.trace(err);
      }
    };
    const edit = async () => {
      try {
        const res = await api.updatePerson(form.value);
        if (res.stat === "OK") {
          handleResetClick();
          ElMessage.success("更新成功");
        } else {
          ElMessage.info(res.message);
        }
      } catch (err) {
        console.trace(err);
      } finally {
        handleClose();
      }
    };
    const add = async () => {
      try {
        const res = await api.addPerson(form.value);
        if (res.stat === "OK") {
          handleResetClick();
          ElMessage.success("添加成功");
        } else {
          ElMessage.info(res.message);
        }
      } catch (err) {
        console.trace(err);
      } finally {
        handleClose();
      }
    };
    const handleConfirm = () => {
      if (ruleFormRef.value) {
        ruleFormRef.value.validate((valid) => {
          if (valid) {
            form.value.id ? edit() : add();
          }
        });
      }
    };
    const handleClose = () => {
      visible.value = false;
      form.value = { ...personInit };
    };
    const handleSearchClick = async () => {
      await list(keyword.value);
    };
    const handleResetClick = async () => {
      keyword.value = "";
      await list();
    };
    const handleDeleteConfirm = async (id: string) => {
      ElMessageBox.confirm("确认删除该用户吗?", "请确认", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          remove(id);
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "删除取消",
          });
        });
    };
    const handleEdit = (person: IPerson) => {
      visible.value = true;
      form.value = person;
    };
    const handlePreview = (id: string) => {
      router.push(`/home/person/view/${id}`);
    };
    onBeforeMount(async () => {
      await list();
    });
    return {
      data,
      keyword,
      visible,
      form,
      rules,
      ruleFormRef,
      handleEdit,
      handleSearchClick,
      handleResetClick,
      handleDeleteConfirm,
      handlePreview,
      handleClose,
      handleConfirm,
    };
  },
});
</script>

<style lang="less" scoped>
.header {
  display: flex;
  align-items: center;
  .input {
    width: 200px;
    margin: 0 20px;
  }
}
</style>
