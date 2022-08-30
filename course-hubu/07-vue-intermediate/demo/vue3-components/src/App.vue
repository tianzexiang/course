<template>
  <div className="btns">
    <CustomButton>默认按钮</CustomButton>
    <CustomButton type="primary">主按钮</CustomButton>
    <CustomButton type="primary" @click="handleShowLifeCircleClick">lifeCircle</CustomButton>
    <CustomButton type="primary" @click="handleOpenClick">
      打开对话框
    </CustomButton>
    <LifeCircle v-if="lifeCircleVisible"/>
  </div>
  <CustomModal :visible="visible" title="窗口标题" @close="handleCloseClick">
    <template #footer>
      <CustomButton key="cancel" @click="handleCloseClick"> 取消 </CustomButton>
      <CustomButton key="ok" type="primary" @click="handleCloseClick">
        确认
      </CustomButton>
    </template>
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </CustomModal>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import CustomButton from "./components/CustomButton.vue";
import CustomModal from "./components/CustomModal.vue";
import LifeCircle from "./components/LifeCircle.vue";
export default defineComponent({
  components: {
    CustomButton,
    CustomModal,
    LifeCircle
  },
  setup() {
    const visible = ref(false);
    const lifeCircleVisible = ref(false)
    const handleCloseClick = () => {
      visible.value = false;
    };
    const handleOpenClick = () => {
      visible.value = true;
    };
    const handleShowLifeCircleClick = () => {
      lifeCircleVisible.value = !lifeCircleVisible.value
    }

    return {
      handleCloseClick,
      handleOpenClick,
      handleShowLifeCircleClick,
      visible,
      lifeCircleVisible
    };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.btns {
  margin-bottom: 20px;
}
.btns > * {
  margin-right: 15px;
}
</style>
