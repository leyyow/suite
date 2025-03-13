import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useSalesStore = defineStore(
  "sales",
  () => {
    /*** Customers ***/
    const customers = ref([]);
    const totalCustomers = computed(() => customers.value.length);

    const setCustomers = (customerList) => {
      customers.value = customerList;
    };

    const addCustomer = (customer) => {
      customers.value.unshift(customer);
    };

    const updateCustomer = (updatedCustomer) => {
      const index = customers.value.findIndex((c) => c.id === updatedCustomer.id);
      if (index !== -1) {
        customers.value[index] = updatedCustomer;
      }
    };

    const removeCustomer = (customerId) => {
      customers.value = customers.value.filter((customer) => customer.id !== customerId);
    };

    const getCustomerById = (id) => {
      return customers.value.find((customer) => customer.id === id) || null;
    };

    /*** Products/Inventory ***/
    const products = ref([]);
    const totalProducts = computed(() => products.value.length);

    const setProducts = (productList) => {
      products.value = productList;
    };

    const addProduct = (product) => {
      products.value.unshift(product);
    };

    const getProductById = (id) => {
      return products.value.find((prod) => prod.id === id) || null;
    };

    return {
      customers,
      totalCustomers,
      setCustomers,
      addCustomer,
      updateCustomer,
      removeCustomer,
      getCustomerById,
      //
      products,
      totalProducts,
      setProducts,
      addProduct,
      getProductById,
    };
  },
  { persist: true },
);
