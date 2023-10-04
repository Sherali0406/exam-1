<template>
  <div class="card container mt-5">
    <div class="card-header text-center">
      <h1>LogIn</h1>
    </div>
    <div class="card-body text-center">
      <Form class="d-flex text-center" @submit="savebnt">
        <Field
          rules="required"
          :modelValue="info.email"
          v-slot="{ errors }"
          name="Email"
        >
          <input
            type="text"
            placeholder="Name"
            class="form-control"
            v-model="info.email"
          />
          <p class="text-success" v-if="errors && errors.length">
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
            placeholder="Password"
            class="form-control"
            v-model="info.password"
          />
          <p class="text-danger" v-if="errors && errors.length">
            {{ errors[0] }}
          </p>
        </Field>

        <div class="card-footer">
          <button type="submit" class="btn btn-success">Sign In</button>
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
import { useRouter } from "vue-router";
import $http from "../components/plugins/axios";
const router = useRouter();
import { Form, Field } from "vee-validate";

const info = ref({
  email: "",
  password: null,
});

const savebnt = () => {
  // if (info.value.name == "admin" && info.value.password == 1234) {
  //   router.push({ name: "admin" });
  // } else if (info.value.name == "superadmin" && info.value.password == 5678) {
  //   router.push({ name: "superadmin" });
  // } else {
  //   toast();
  // }

  $http
    .post("/user/login", {
      email: info.value.email,
      password: info.value.password,
    })
    .then((res) => {
      if (res.data.accessToken) {
        localStorage.setItem("token", res.data.accessToken);
        router.push({ name: "tasks" });
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
    type: "success",
    transition: "bounce",
  });
};
</script>

<style lang="scss" scoped>
.d-flex {
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.form-control {
  width: 50%;
}
</style>
