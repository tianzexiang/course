<template>
  <div class="form-share-container">
    <div class="title">
      分享邀请他人填写
    </div>
    <div class="content">
      <QrCodeCard :qrCodeText="qrCodeText" ref="qrcodeRef" />
      <span class="download-qrcode" @click="downloadQrcode">下载二维码</span>
      <div class="copy-url" data-clipboard-action="copy" :data-clipboard-text="qrCodeText" @click="_copyURL">
        <img :src="require('@/assets/images/copy.svg')">
        <span>复制链接</span>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import Clipboard from 'clipboard'
import { throttle } from 'lodash-es'
import { useFormStore } from '@/store/modules/form'

const formStore = useFormStore()
const qrcodeRef = ref() // ref实例
const qrCodeText = computed(() => `http://192.168.101.139:8080/input-form/${formStore.form.id}`)

// 下载二维码
const downloadQrcode = () => {
  const a = document.createElement('a')
  a.download = '表单二维码'
  a.href = qrcodeRef.value.qrCodeURL
  document.body.appendChild(a)
  a.click()
  a.remove()
}

// 复制二维码地址
const copyURL = () => {
  const _clipboard = new Clipboard('.copy-url')
  _clipboard.on('success', function () {
    ElMessage.success('复制成功')
  })
  _clipboard.on('error', function () {
    ElMessage.info('复制失败')
  })
  setTimeout(() => {
    _clipboard.destroy()
  }, 3000)
}

// 对复制行为节流
const _copyURL = throttle(copyURL, 3000, { leading: true })
</script>
<style scoped lang="less">
.form-share-container {
  .title {
    font-size: 18px;
    color: primary-text-color;
  }

  .content {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 0;

    .download-qrcode {
      margin: 20px 0;
      color: @primary-color;
      font-size: 14px;
      padding: 5px 10px;
      cursor: pointer;
    }

    .copy-url {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 2px 15px;
      border: 1px solid #e2e4e8;
      cursor: pointer;
      font-size: 14px;
      line-height: 1;
    }
  }
}
</style>
