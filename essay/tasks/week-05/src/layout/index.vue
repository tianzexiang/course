<script lang='ts' setup>
import FooterLayout from './FooterLayout.vue'
import HeaderLayout from './HeaderLayout.vue'
import MyDialog from '@/components/MyDialog.vue'
import { onMounted } from 'vue'
import { useDialogStore } from '@/store'

const dialogStore = useDialogStore()
const closeDialogOnresize = () => {
  window.onresize = () => {
    dialogStore.isShow = false
  }
}
onMounted(() => {
  closeDialogOnresize()
})

</script>
<template>
  <!-- home header -->
  <HeaderLayout />
  <!-- home main -->
  <router-view />
  <!-- home footer -->
  <FooterLayout />
  <!-- dialog -->
  <MyDialog />
</template>
<style scoped>
</style>
