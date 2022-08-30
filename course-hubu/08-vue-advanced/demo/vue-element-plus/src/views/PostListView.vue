<template>
  <el-table :data="data">
    <el-table-column prop="cover" label="配图">
      <template #default="scope">
        <el-avatar
          shape="square"
          :size="50"
          :src="scope.row.avatar"
        ></el-avatar>
      </template>
    </el-table-column>
    <el-table-column prop="title" label="标题"></el-table-column>
    <el-table-column prop="author" label="作者"></el-table-column>
    <el-table-column prop="time" label="时间"></el-table-column>
    <el-table-column prop="likes" label="点赞"></el-table-column>
    <el-table-column prop="comments" label="评论"></el-table-column>
    <el-table-column prop="op" label="操作">
      <template #default="scope">
        <el-button @click="handleSettingClick(scope.row.title)"
          ><el-icon><icon-setting /></el-icon
        ></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from "vue";
import {
  ElTable,
  ElTableColumn,
  ElAvatar,
  ElButton,
  ElIcon,
  ElMessage,
} from "element-plus";
import { IArticle } from "@/types";
import * as api from "@/services/api";
export default defineComponent({
  components: { ElTable, ElTableColumn, ElAvatar, ElButton, ElIcon },
  setup() {
    const data = ref<IArticle[]>([]);

    const list = async () => {
      try {
        const res = await api.posts();
        if (res.stat === "OK") {
          data.value = res.rows;
        } else {
          ElMessage(res.message);
        }
      } catch (err) {
        console.trace(err);
      }
    };
    const handleSettingClick = (title: string) => {
      ElMessage.info(title);
    };
    onBeforeMount(async () => {
      await list();
    });

    return { data, handleSettingClick };
  },
});
</script>
