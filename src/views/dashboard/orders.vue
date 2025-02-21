<script setup>
import EmptyData from "~/components/dashboard/empty-data.vue";
</script>

<template>
  <div>
    <EmptyData
      variant="order"
      title="No Orders"
      subtitle="You have no pending order"
      action-label="Record Order"
    />
  </div>
</template>
