<template>
  <AppModal v-model="dialog" :style="{ backgroundColor: 'yellow' }">
    <h1 v-if="!forms._id">Add User</h1>
    <h1 v-else>Edit User</h1>
    <form>
      <input
        type="text"
        v-model="forms.first_name"
        class="form-control my-2"
        placeholder="Firstname"
      />
      <input
        type="text"
        v-model="forms.last_name"
        class="form-control my-2"
        placeholder="Lastname"
      />
      <input
        type="text"
        v-model="forms.username"
        class="form-control my-2"
        placeholder="Username"
      />
      <input
        type="email"
        v-model="forms.email"
        class="form-control my-2"
        placeholder="Email"
      />
      <input
        type="password"
        v-model="forms.password"
        class="form-control my-2"
        placeholder="Password"
      />
      <input
        type="password"
        v-model="forms.confirm_password"
        class="form-control my-2"
        placeholder="Confirm password"
      />
      <button class="btn btn-danger" @click="save">save</button>
    </form>
  </AppModal>
</template>

<script setup>
import AppModal from "../ui/app-modal.vue";
import { ref, watch } from "vue";
import http from "../plugins/axios";
import { createToast } from "mosha-vue-toastify";
import { Form, Field } from "vee-validate";
const dialog = ref(false);

const toastcreate = () => {
  createToast(" Created! ", {
    position: "top-right",
    type: "success",
    transition: "bounce",
  });
};

const toastedit = () => {
  createToast(" Edited ", {
    position: "top-right",
    type: "success",
    transition: "bounce",
  });
};

const forms = ref({
  first_name: "",
  last_name: "",
  username: "",
  email: "",
  password: "",
  confirm_password: "",
});

watch(dialog, (value) => {
  if (!value) {
    forms.value = {};
  }
});
const openModal = (value) => {
  if (value) forms.value = { ...value };
  dialog.value = true;
};

const save = (e) => {
  e.preventDefault();
  try {
    if (!forms.value._id) {
      http
        .post("/user/registration", {
          first_name: forms.value.first_name,
          last_name: forms.value.last_name,
          username: forms.value.username,
          email: forms.value.email,
          password: forms.value.password,
          confirm_password: forms.value.confirm_password,
        })
        .then((res) => {
          console.log(res);
          toastcreate();
          setTimeout(() => {
            location.reload();
          }, 3000);
        });
    } else {
      http
        .put(`/user/update/${forms.value._id}`, {
          first_name: forms.value.first_name,
          last_name: forms.value.last_name,
          username: forms.value.username,
          email: forms.value.email,
          password: forms.value.password,
        })
        .then((res) => {
          console.log(res);
          toastedit();
          setTimeout(() => {
            location.reload();
          }, 3000);
        });
    }
  } catch (err) {
    console.log(err);
  }
};
defineExpose({ openModal });
</script>

<style lang="scss" scoped></style>
