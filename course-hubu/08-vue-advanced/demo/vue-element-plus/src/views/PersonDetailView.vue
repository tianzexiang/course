<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/home' }">人员管理</el-breadcrumb-item>
    <el-breadcrumb-item>查看详情</el-breadcrumb-item>
  </el-breadcrumb>
  <el-form class="form">
    <el-form-item label="头像">
      <el-avatar :src="person?.avatar"></el-avatar
    ></el-form-item>
    <el-form-item label="姓名"> {{ person?.name }}</el-form-item
    ><el-form-item label="性别">{{ person?.gender }}</el-form-item
    ><el-form-item label="电话">{{ person?.phone }}</el-form-item
    ><el-form-item label="邮箱">{{ person?.email }}</el-form-item></el-form
  >
</template>

<script lang="ts">
import * as api from "@/services/api";
import { defineComponent, onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";
import {
  ElMessage,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElAvatar,
  ElForm,
  ElFormItem,
} from "element-plus";
import { IPerson } from "@/types";

export default defineComponent({
  components: {
    ElBreadcrumb,
    ElBreadcrumbItem,
    ElAvatar,
    ElForm,
    ElFormItem,
  },
  setup() {
    const route = useRoute();
    const person = ref<IPerson>();

    const getPerson = async (id: string) => {
      try {
        const res = await api.getPerson(id);
        if (res.stat === "OK") {
          person.value = res.data;
        } else {
          ElMessage.info(res.message);
        }
      } catch (err) {
        console.trace(err);
      }
    };
    onBeforeMount(async () => {
      await getPerson(route.params.id as string);
    });
    return {
      person,
    };
  },
});
</script>

<style scoped>
.form {
  margin-top: 20px;
}
</style>
