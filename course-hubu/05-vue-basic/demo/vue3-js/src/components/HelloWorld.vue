<template>
  <div>Hello {{name}}!</div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    name: String
  }
}
</script>