<template>
  <div class="container">
    <countries ref="countries_modal" />
    <div class="btn-first mb-3">
      <button @click="createItem" class="btn btn-danger">Create User</button>
      <button @click="logOut" class="btn btn-danger">LogOut</button>
    </div>
    <div class="row">
      <div class="col-3 my-2" v-for="(item, index) in items" :key="index">
        <div class="card">
          <div class="card-header">
            <h1 class="text-center fs-6">{{ item.email }}</h1>
          </div>
          <div class="card-body">
            <h1 class="fs-3">{{ item.first_name }}</h1>
            <h1 class="fs-3">{{ item.last_name }}</h1>
            <p>{{ item.username }}</p>
          </div> 
          <div class="card-footer">
            <button class="btn btn-success" @click="editItem(item)">Edit</button>
            <button class="btn btn-success" @click="deleteItem(item._id)">
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
import countries from "../../components/pages/task.vue";
import { createToast } from "mosha-vue-toastify";

const toastdelete = () => {
  createToast("Deleted", {
    position: "top-right",
    type: "danger",
    transition: "bounce",
  });
};

const items = ref([]);
const countries_modal = ref();
const getCountries = () => {
  http
    .get("user/all")
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
    .delete(`/user/delete/${_id}`)
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
  countries_modal.value.openModal();
};

const editItem = (item) => {
  countries_modal.value.openModal(item);
};

const logOut = () => {
  localStorage.removeItem("token");
  location.reload();
};
getCountries();
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