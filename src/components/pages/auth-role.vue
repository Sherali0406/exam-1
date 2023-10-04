<template>
  <AppModal v-model="dialog">
    <h1 class="text-center mb-4">choose the roole</h1>
    <div class="main" v-for="(item, index) of data" :key="index">
      <button class="btn btn-primary" @click="btnn(item)">{{ item }}</button>
    </div>
  </AppModal>
</template>

<script setup>
import AppModal from "../ui/app-modal.vue";
import { ref } from "vue";
import { createToast } from "mosha-vue-toastify";
const dialog = ref(false);
import { useRouter } from "vue-router";
const router = useRouter();

const toastcreate = () => {
  createToast("Successfully created! (Reloading...)", {
    position: "top-right",
    type: "success",
    transition: "bounce",
  });
};

const openModal = (value) => {
  dialog.value = true;
};

const btnn = (admin) => {
  if (admin == "admin") router.push({ name: "tasks" });
  else if (admin == "superadmin") router.push({ name: "users" });
  try {
  } catch (err) {
    console.log(err);
  }
};
defineExpose({ openModal });

const props = defineProps({
  data: {
    type: Array,
  },
});
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  justify-content: center;
  gap: 20px;
}
</style>