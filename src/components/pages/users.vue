<template>
  <AppModal v-model="dialog">
    <h1 v-if="!forms._id">Add User</h1>
    <h1 v-else>Edit User</h1>
    <form>
      <input
        type="text"
        v-model="forms.name"
        class="form-control my-2"
        placeholder="Name"
      />
      <input
        type="text"
        v-model="forms.surname"
        class="form-control my-2"
        placeholder="Surname"
      />
      <input
        type="number"
        v-model="forms.age"
        class="form-control my-2"
        placeholder="Age"
      />
      
      <select v-model="forms.is_diploma" class="form-control my-2">
        <option value="yes">yes</option>
        <option value="no">no</option>
      </select>


      <input
        type="text"
        v-model="forms.address"
        class="form-control my-2"
        placeholder="Address"
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
  name: "",
  surname: "",
  age: null,
  is_diploma: false,
  address: "",
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
        .post("/users/add", {
          name: forms.value.name,
          surname: forms.value.surname,
          age: forms.value.age,
          is_diploma: forms.value == 'yes' ? true : false,
          address: forms.value.address,
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
        .patch(`/users/update/${forms.value._id}`, {
          name: forms.value.name,
          surname: forms.value.surname,
          age: forms.value.age,
          is_diploma: forms.value == 'yes' ? true : false,
          address: forms.value.address,
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
