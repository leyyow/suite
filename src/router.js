import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "./stores/auth";

const routes = [
  {
    path: "/",
    component: () => import("./layouts/default.vue"),
    children: [
      { path: "", component: () => import("./views/home.vue") },
      { path: ":pathMatch(.*)*", component: () => import("./views/404.vue") },
    ],
  },
  {
    path: "/auth",
    component: () => import("./layouts/auth.vue"),
    children: [
      {
        path: "signin",
        component: () => import("./views/auth/signin.vue"),
        meta: { title: "Sign In" },
      },
      {
        path: "signup",
        component: () => import("./views/auth/signup.vue"),
        meta: { title: "Sign Up" },
      },
      {
        path: "forgot-password",
        component: () => import("./views/auth/forgot-password.vue"),
        meta: { title: "Forgot Password" },
      },
      {
        path: "reset-password",
        component: () => import("./views/auth/reset-password.vue"),
        meta: { title: "Reset Password" },
      },
      {
        path: "verify-email",
        component: () => import("./views/auth/verify-email.vue"),
        meta: { title: "Verify Account" },
      },
      { path: ":pathMatch(.*)*", component: () => import("./views/404.vue") },
    ],
  },
  {
    path: "/dashboard",
    component: () => import("./layouts/dashboard.vue"),
    children: [
      {
        path: "",
        component: () => import("./views/dashboard/overview.vue"),
        meta: { title: "Dashboard" },
      },
      {
        path: "inventory",
        component: () => import("./views/dashboard/inventory.vue"),
        meta: { title: "Inventory" },
      },
      {
        path: "orders",
        component: () => import("./views/dashboard/orders.vue"),
        meta: { title: "Orders" },
      },
      {
        path: "customers",
        component: () => import("./views/dashboard/customers.vue"),
        meta: { title: "Customers" },
      },
      {
        path: "expenses",
        component: () => import("./views/dashboard/expenses/expenses.vue"),
        meta: { title: "Expenses" },
      },
      {
        path: "expenses/:id",
        component: () => import("./views/dashboard/expenses/single-expense.vue"),
        meta: { title: "Expense details" },
      },
      { path: ":pathMatch(.*)*", component: () => import("./views/404.vue") },
    ],
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior() {
    // to, from, savedPosition
    return { left: 0, top: 0 }; //savedPosition ||
  },
  routes,
});

router.beforeEach((to, _, next) => {
  // instead of having to check every route record with
  // to.matched.some(record => record.meta.requiresAuth)
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    next({
      path: "/auth/signin",
      // save the location we were at to come back later
      query: { redirect: to.fullPath },
    });
  }
  // if (to.meta.title) {
  //   document.title = `${to.meta.title} - Leyyow`;
  // } else {
  //   document.title = "Leyyow";
  // }
  next();
});

export default router;
