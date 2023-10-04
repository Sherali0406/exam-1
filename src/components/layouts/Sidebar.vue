<template>
  <div class="sidebar">
    <router-link
      class="sidebar-link"
      v-for="(item, index) in items"
      :key="index"
      :to="item.path"
    >
      {{ item.title }}
    </router-link>
  </div>
</template>

<script setup>
const props = defineProps({
  items: {
    type: Array,
  },
});
</script>

<style lang="scss" scoped>
.sidebar {
  width: 100%;
  height: 100%;
  background-color: rgb(69, 118, 102);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  .sidebar-link {
    text-decoration: none;
    color: black;
    font-size: 30px;
  }
}
</style>
