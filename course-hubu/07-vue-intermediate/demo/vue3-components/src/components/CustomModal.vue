<template>
  <div :class="visible ? 'modal modal-visible' : 'modal'">
    <div class="modal-mask" @click="handleClose" />
    <div class="modal-box">
      <div class="modal-head">
        <span>{{title}}</span>
        <svg
          viewBox="64 64 896 896"
          focusable="false"
          data-icon="close"
          width="1em"
          height="1em"
          fill="currentColor"
          aria-hidden="true"
          class="modal-close"
          @click="handleClose"
        >
          <path
            d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"
          ></path>
        </svg>
      </div>
      <div class="modal-body"><slot></slot></div>
      <div class="modal-footer"><slot name="footer"></slot></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    visible: Boolean,
    title: String,
  },
  emits: ["close"],
  setup(_props, ctx) {
    const handleClose = () => {
      ctx.emit("close");
    }
    return {
      handleClose,
    };
  },
});
</script>

<style scoped>
.modal {
  visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}
.modal-mask {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 100;
  transition: all 0.4s ease-in-out;
  opacity: 0;
}
.modal-box {
  box-sizing: border-box;
  position: relative;
  z-index: 101;
  width: 520px;
  background: #fff;
  border-radius: 5px;
  transition: all 0.3s ease-in-out;
  opacity: 0;
  transform: scale(0.7);
}
.modal-visible {
  visibility: visible;
}
.modal-visible .modal-mask {
  opacity: 1;
}
.modal-visible .modal-box {
  opacity: 1;
  transform: scale(1);
}
.modal-head {
  border-bottom: 1px solid #f0f0f0;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #333;
  font-size: 16px;
  font-weight: 500;
}
.modal-close {
  cursor: pointer;
  opacity: 0.7;
}
.modal-close:hover {
  opacity: 1;
}
.modal-body {
  padding: 24px;
  font-size: 14px;
  color: #333;
  line-height: 1.6em;
}
.modal-footer {
  border-top: 1px solid #f0f0f0;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.modal-footer > * {
  margin-left: 10px;
}
</style>