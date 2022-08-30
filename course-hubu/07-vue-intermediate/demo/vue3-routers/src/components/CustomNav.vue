<template>
  <nav class="nav">
    <router-link to="/" class="nav-item" exact-active-class="nav-active">Home</router-link>
    <router-link to="/about" class="nav-item" exact-active-class="nav-active">About</router-link>
  </nav>
</template>

<style>
.nav {
  display: flex;
  height: 60px;
  align-items: center;
  border-bottom: 1px solid #f4f4f4;
  padding: 0 20px;
}
.nav-item {
  color: #333;
  text-decoration: none;
  cursor: pointer;
  display: inline-block;
  padding: 5px 10px;
  margin-right: 15px;
}
.nav-active, .nav-item:hover {
  background: #333;
  color: #fff;
}
</style>