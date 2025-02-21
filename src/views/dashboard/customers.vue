<script setup>
import EmptyData from "~/components/dashboard/empty-data.vue";
</script>

<template>
  <div>
    <EmptyData
      variant="customer"
      title="No Customer"
      subtitle="You have no saved customer yet"
      action-label="Add a Customer"
    />
  </div>
</template>
