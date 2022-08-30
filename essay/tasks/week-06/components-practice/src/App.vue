<script lang='ts' setup>
import CustomButton from './components/custom-button/CustomButton.vue'
import CustomModal from './components/custom-modal/CustomModal.vue'
import { ref } from 'vue'
const modalVisible = ref(false)
const handleClick = () => {
  modalVisible.value = true
}
</script>
<template>
  <div class="btn-box">
    <CustomButton type="default" @click="handleClick">打开modal</CustomButton>
    <CustomButton type="primary" @click="handleClick">打开modal</CustomButton>
  </div>
  <CustomModal v-model:visible="modalVisible"></CustomModal>
</template>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
.btn-box{
  padding-top: 100px;
  display: flex;
  justify-content: center;
  gap: 40px;
}
</style>
