export default {
  path: "/:catchAll(.*)",
  name: "Not Found",
  component: () => {
    return import("../components/404/PageNotFound.vue");
  },
};
