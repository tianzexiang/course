<script lang='ts' setup>
import { computed } from 'vue'
import CustomButton from '../custom-button/CustomButton.vue'
const props = withDefaults(defineProps<{
  visible?: boolean,
  title?: string
  footer?: boolean
}>(), {
  visible: false,
  title: '窗口标题',
  footer: true
})
const _title = computed(() => props.title)
const _footer = computed(() => props.footer)

// eslint-disable-next-line func-call-spacing
const emit = defineEmits<{
  (e: 'update:visible', isVisible: boolean): void
  (e: 'close'): void
  (e: 'confirm'): void
}>()
const _visible = computed({
  set (value: boolean) {
    emit('update:visible', value)
  },
  get () {
    return props.visible
  }
})

// 关闭弹窗
const handleClose = () => {
  _visible.value = false
  emit('close')
}

// 点击确认
const handleConfirm = () => {
  emit('confirm')
  handleClose()
}
</script>
<template>
  <div :class="['modal-container', _visible ? 'visible' : '']">
    <div class="dialog">
      <slot name="title">
        <div class="title">
          <div>{{ _title }}</div>
          <div class="close" @click="handleClose">×</div>
        </div>

      </slot>
      <slot name="content">
        <div class="content">
          <div>这是内容</div>
          <br />
          <div>这是内容</div>
          <br />
          <div>这是内容</div>
          <br />
          <div>这是内容</div>
        </div>
      </slot>
      <slot name="footer">
        <div class="footer" v-if="_footer">
          <CustomButton type="default" @click="handleClose">取消</CustomButton>
          <CustomButton type="primary" @click="handleConfirm">确认</CustomButton>
        </div>
      </slot>
    </div>
    <div class="mask" @click.stop="handleClose"></div>
  </div>

</template>
<style scoped lang="less">
.modal-base() {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.hide-style() {
  visibility: hidden;
  opacity: 0;
}

.visible-style() {
  visibility: visible;
  opacity: 1;
}

@trans-options: .3s ease-in-out;

.modal-container {
  .modal-base();
  .hide-style();
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  transition: @trans-options;

  .dialog {
    .hide-style();
    position: fixed;
    width: 600px;
    margin: auto;
    background: #fff;
    border-radius: 5px;
    box-shadow: inset 0 0 1px 0 #000;
    transition: @trans-options;
    z-index: 2000;
    transform: scale(.00001);
  }

  .mask {
    .modal-base();
    .hide-style();
    background: rgba(0, 0, 0, .45);
    z-index: 1000;
    transition: @trans-options;
  }
}

.title {
  padding: 15px 20px;
  font-size: 16px;
  display: flex;
  justify-content: space-between;

  .close {
    font-size: 22px;
    cursor: pointer;
  }
}

.content {
  padding: 30px 20px;
  border: #F1F1F1 1px solid;
}

.footer {
  display: flex;
  justify-content: flex-end;
  padding: 20px;
  gap: 20px;
}

.visible .dialog {
  .visible-style();
  transform: scale(1);
}

.visible .mask {
  .visible-style();
}

.visible.modal-container {
  .visible-style();
}
</style>
