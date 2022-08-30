<template>
  <div class="login">
    <el-form class="form" :model="form" ref="formRef" :rules="rules">
      <div class="title">登录</div>
      <el-form-item prop="username">
        <el-input placeholder="用户名" v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          placeholder="密码"
          type="password"
          v-model="form.password"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="loginBtn" @click="handleLoginClick"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { ElForm, ElFormItem, ElInput, ElButton, ElMessage } from "element-plus";
import * as api from "@/services/api";
import { useRouter } from "vue-router";
type FormInstance = InstanceType<typeof ElForm>;
interface ILoginReq {
  username: string;
  password: string;
}
export default defineComponent({
  components: { ElForm, ElFormItem, ElInput, ElButton },
  setup() {
    const formRef = ref<FormInstance>();
    const form = ref<ILoginReq>({ username: "", password: "" });
    const router = useRouter();
    const rules = ref({
      username: [
        {
          required: true,
          message: "请输入用户名",
          trigger: "change",
        },
      ],
      password: [
        {
          required: true,
          message: "请输入密码",
          trigger: "change",
        },
      ],
    });
    const login = async (username: string, password: string) => {
      try {
        const res = await api.login(username, password);
        if (res.stat === "OK") {
          ElMessage.success("登录成功");
          router.push("/home");
        } else {
          ElMessage.info(res.message);
        }
      } catch (err) {
        console.trace(err);
      }
    };
    const handleLoginClick = () => {
      formRef.value?.validate(async (validate) => {
        if (validate) {
          await login(form.value.username, form.value.password);
        }
      });
    };
    return {
      rules,
      formRef,
      form,
      handleLoginClick,
    };
  },
});
</script>

<style scoped>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.form {
  width: 360px;
  padding: 30px;
  border: 1px solid #ddd;
  border-radius: 10px;
}
.title {
  font-size: 18px;
  text-align: center;
  margin-bottom: 15px;
}
.loginBtn {
  width: 100%;
}
</style>
