<template>
  <div class="qr-code-container">
    <div class="qr-code-title">表单标题</div>
    <vue-qr :logoSrc="require('@/assets/images/logo.svg')" :text="qrCodeText" :size="160" :logoMargin="5"
      :logoCornerRadius="0" :correctLevel="3" :callback="getQrCodeURL"/>
    <div class="qr-info">微信扫码或长按识别，填写内容</div>
  </div>
</template>
<script lang='ts' setup>
import vueQr from 'vue-qr/src/packages/vue-qr.vue'
import { ref } from 'vue'

const props = defineProps<{
  qrCodeText: string
}>()
const qrCodeText = ref(props.qrCodeText) // 网址链接
const qrCodeURL = ref('')

const getQrCodeURL = (dataURL:string) => {
  qrCodeURL.value = dataURL
}
defineExpose({ qrCodeURL }) // 暴露qrCodeURL
</script>
<style scoped lang="less">
.qr-code-container {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  border: .01rem solid #e3e3e3;
  width: 180px;
  padding: 10px 0 5px 0;
  .qr-info {
    font-size: 12px;
    color: #A8ABB2;
  }
}
</style>
