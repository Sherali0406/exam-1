export default {
  path: "/superadmin",
  name: "superadmin",
  component: () => {
    return import("../views/superadmin/Superadmin.vue");
  },
  children: [
    {
      path: "/users",
      name: "users",
      component: () => {
        return import("../views/superadmin/Users.vue");
      },
    },

    {
      path: "/xexe",
      name: "Xexe",
      component: () => {
        return import("../views/superadmin/Users.vue");
      },
    },
  ],
};
