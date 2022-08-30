<template>
  <h1>lifecircle {{ val }}</h1>
  <CustomButton @click="handleClick">click me to update</CustomButton>
</template>

<script lang="ts">
import {
  defineComponent,
  onBeforeMount,
  onBeforeUnmount,
  onBeforeUpdate,
  onMounted,
  onUnmounted,
  onUpdated,
  ref,
} from "vue";
import CustomButton from "./CustomButton.vue";

export default defineComponent({
  components: { CustomButton },
  beforeCreate: () => {
    console.log("before create")
  },
  created: () => {
    console.log("created")
  },
  beforeMount: () => {
    console.log("before mount")
  },
  setup() {
    const val = ref(0);
    onBeforeMount(() => {
      console.log("component before mounted");
    });
    onMounted(() => {
      console.log("component mounted");
    });
    onBeforeUpdate(() => {
      console.log("component before update");
    });
    onUpdated(() => {
      console.log("component updated");
    });
    onBeforeUnmount(() => {
      console.log("component before unMount");
    });
    onUnmounted(() => {
      console.log("component unMounted");
    });
    const handleClick = () => {
      val.value++;
    };
    return {
      val,
      handleClick,
    };
  },
});
</script>
