<template>
  <div class="decorative-card container mt-5">
    <authRole :data="modalData.rollar" ref="auth_modal" />
    <div class="decorative-card-header text-center">
      <h1>Welcome Back!</h1>
    </div>
    <div class="decorative-card-body text-center">
      <Form class="decorative-form d-flex text-center" @submit="savebnt">
        <Field
          rules="required"
          :modelValue="info.username"
          v-slot="{ errors }"
          name="Username"
        >
          <input
            type="text"
            placeholder="Your Username"
            class="form-control decorative-input"
            v-model="info.username"
          />
          <p class="text-danger" v-if="errors && errors.length">
            {{ errors[0] }}
          </p>
        </Field>

        <Field
          rules="required"
          :modelValue="info.password"
          v-slot="{ errors }"
          name="Password"
        >
          <input
            type="password"
            placeholder="Your Password"
            class="form-control decorative-input"
            v-model="info.password"
          />
          <p class="text-danger" v-if="errors && errors.length">
            {{ errors[0] }}
          </p>
        </Field>

        <div class="decorative-card-footer">
          <button type="submit" class="btn btn-decorative">Sign In</button>
        </div>
      </Form>
    </div>
  </div>
  
  <template>
    <button @click="toast">Toast it!</button>
  </template>
</template>

<script setup>
import { ref } from "vue";
import $http from "../components/plugins/axios";
import { Form, Field } from "vee-validate";

const info = ref({
  username: "",
  password: "",
});

let roles = ref();
const savebnt = () => {
  $http
    .post("/admins/login", {
      username: info.value.username,
      password: info.value.password,
    })
    .then((res) => {
      roles = res.data.roles;
      auth_modal.value.openModal();
      modalData.value.rollar = roles;
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }
    })
    .catch((err) => {
      toast();
      console.log(err);
    });
};

import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";
const toast = () => {
  createToast("Name or password is wrong!", {
    position: "top-right",
    type: "danger",
    transition: "bounce",
  });
};

import authRole from "../components/pages/auth-role.vue";
const auth_modal = ref();

const modalData = ref({
  rollar: roles,
});
</script>

<style>
  .decorative-card {
    max-width: 400px;
    margin: 0 auto;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .decorative-card-header {
    background-color: #3498db;
    color: #fff;
    padding: 20px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  .decorative-card-body {
    padding: 20px;
  }

  .decorative-form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .decorative-input {
    margin: 10px 0;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    width: 100%;
    box-sizing: border-box;
  }

  .decorative-card-footer {
    margin-top: 20px;
  }

  .btn-decorative {
    background-color: #27ae60;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
</style>
