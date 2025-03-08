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
        path: "sales",
        children: [
          {
            path: "",
            component: () => import("./views/dashboard/sales/sales.vue"),
            meta: { title: "Sales" },
          },
          {
            path: "orders",
            children: [
              {
                path: "",
                component: () => import("./views/dashboard/sales/orders/orders.vue"),
                meta: { title: "Orders" },
              },
              {
                path: "new",
                component: () => import("./views/dashboard/sales/orders/new.vue"),
                meta: { title: "New Order" },
              },
            ],
          },
          {
            path: "customers",
            component: () => import("./views/dashboard/sales/customers/customers.vue"),
            meta: { title: "Customers" },
          },
          {
            path: "customers/:id",
            component: () => import("./views/dashboard/sales/customers/single.vue"),
            meta: { title: "Customer details", withBackButton: true },
          },
          {
            path: "inventory",
            component: () => import("./views/dashboard/sales/inventory/products.vue"),
            meta: { title: "Inventory" },
          },
        ],
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
      //
      {
        path: "settings",
        children: [
          {
            path: "",
            component: () => import("./views/dashboard/settings/settings.vue"),
            meta: { title: "Settings", withBackButton: true },
          },
          {
            path: "user-roles",
            component: () => import("./views/dashboard/settings/user-roles.vue"),
            meta: { title: "Staff & Users (Roles)", withBackButton: true },
          },
        ],
      },
      { path: ":pathMatch(.*)*", component: () => import("./views/404.vue") },
    ],
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior() {
    return { left: 0, top: 0 };
  },
  routes,
});

router.beforeEach((to, _, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({
      path: "/auth/signin",
      // save the location we were at to come back later
      query: { redirect: to.fullPath },
    });
  }
  //
  next();
});

export default router;
