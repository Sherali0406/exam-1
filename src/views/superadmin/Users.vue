<template>
  <div class="container">
    <users ref="users_modal" />
    <div class="btn-first mb-3">
      <button @click="createItem" class="btn btn-danger">Create User</button>
      <button @click="logOut" class="btn btn-danger">LogOut</button>
    </div>

<div class="row">
      <div class="col-6 my-2" v-for="(item, index) in items.users" :key="index">
        <div class="card">
          <div class="card-header">
            <h7 class="text-center">User: {{ item._id }}</h7>
          </div>
          <div class="card-body">
            <h3>Ismi: {{ item.name }}</h3>
            <h3>Familiyasi: {{ item.surname }}</h3>
            <h4>Yoshi: {{ item.age }}</h4>
            <h4>Adress: {{ item.address }}</h4>
            <h4>Diplomi: {{ item.is_diploma }}</h4>
            <p>{{ item.username }}</p>
          </div>
          <div class="card-footer">
            <button class="btn btn-info" @click="editItem(item)">Edit</button>
            <button class="btn btn-danger" @click="deleteItem(item._id)">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
        </div>
</template>

<script setup>
import { ref } from "vue";
import http from "../../components/plugins/axios";
import users from "../../components/pages/users.vue";
import { createToast } from "mosha-vue-toastify";

const toastdelete = () => {
  createToast("Deleted", {
    position: "top-right",
    type: "danger",
    transition: "bounce",
  });
};

const items = ref([]);
const users_modal = ref();

const getUsers = () => {
  http
    .get("users")
    .then((res) => {
      res.data = res.data;
      items.value = res.data;
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

const deleteItem = (_id) => {
  http
    .delete(`/users/${_id}`)
    .then((res) => {
      console.log(res);
      if (res.status === 200) {
        toastdelete();
        setTimeout(() => {
          location.reload();
        }, 3000);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const createItem = () => {
  users_modal.value.openModal();
};

const editItem = (item) => {
  users_modal.value.openModal(item);
};

const logOut = () => {
  localStorage.removeItem("token");
  location.reload();
};
getUsers();
</script>
<style lang="scss" scoped>
.button-group {
  display: flex;
  justify-content: space-evenly;
  margin-top: 20px;
}

.card {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
}

.card:hover {
  transform: scale(1.05);
}

.card-header {
  background-color: #3498db;
  color: white;
  padding: 10px;
  text-align: center;
}

.card-footer {
  background-color: #f1f1f1;
  display: flex;
  justify-content: center;
  gap: 10px;
  padding: 10px;
}

.btn-info,
.btn-danger {
  width: 80px;
}
</style>