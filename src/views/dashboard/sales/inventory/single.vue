<script setup>
import { Icon } from "@iconify/vue";
import { computed, ref } from "vue";
import AppButton from "~/components/common/app-button.vue";
import Switch from "~/components/common/switch.vue";
import ManageVariantsModal from "~/components/dashboard/inventory/manage-variants-modal.vue";
import SummaryCard from "~/components/dashboard/sales/summary-card.vue";
import { formatNaira } from "~/utilities/formatNaira";

const summaryStats = computed(() => [
  { label: "Total Quantity", value: "7", icon: "solar:tag-bold-duotone", color: "text-brand-500" },
  {
    label: "Total Sold",
    value: formatNaira(310000),
    icon: "uim:graph-bar",
    color: "text-blue-600",
  },
  {
    label: "Returns",
    value: "0%",
    icon: "jam:refresh-reverse",
    color: "text-indigo-500",
  },
  {
    label: "Variant Option",
    value: "50",
    icon: "solar:bag-heart-bold-duotone",
    color: "text-purple-500",
  },
]);

const productDetails = computed(() => [
  { icon: "uim:box", label: "Price", value: formatNaira(12000) },
  {
    icon: "uim:box",
    label: "Date Added",
    value: new Date().toLocaleString("en-US", { dateStyle: "medium" }),
  },
  {
    icon: "uim:box",
    label: "Description",
    value:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid praesentium vel, quisquam veritatis quasi odit, ut debitis expedita inventore laudantium, quos porro repudiandae a",
  },
]);

const showManage = ref(false);
const enabled = ref(true);
</script>

<template>
  <div>
    <div class="flex justify-end mb-4">
      <AppButton label="Show more" variant="text" />
    </div>

    <SummaryCard :items="summaryStats" />

    <div class="flex flex-col items-center justify-center gap-1 mt-6">
      <span class="h-16 w-16 rounded-lg bg-brand-200 flex items-center justify-center">
        <Icon icon="solar:bag-4-bold-duotone" class="text-brand-500 h-10 w-10" />
      </span>
      <h3 class="text-lg font-semibold text-center">Derby Shoes</h3>
    </div>

    <section class="mt-4 mb-6 text-sm">
      <div class="flex justify-end mb-4">
        <AppButton variant="outlined" smaller label="Edit" icon="mdi:pencil" />
      </div>
      <div
        v-for="(item, v) in productDetails"
        :key="v"
        class="flex justify-between gap-1 py-2.5"
        :class="item.label === 'Description' ? 'flex-col' : 'flex-row'"
      >
        <div class="inline-flex gap-2 text-brand-400 items-center">
          <Icon :icon="item.icon" class="h-5 w-5 text-brand-300" />
          <p>{{ item.label }}</p>
        </div>
        <span
          class="font-medium"
          :class="item.label === 'Description' ? 'text-left' : 'text-right'"
          >{{ item.value }}</span
        >
      </div>
    </section>

    <section class="space-y-2.5">
      <div class="flex justify-between items-center">
        <h4 class="text-base font-medium text-center">Variants</h4>
        <AppButton
          variant="outlined"
          smaller
          label="Manage variants"
          icon="mdi:pencil"
          @click="showManage = true"
        />
      </div>
      <div
        v-for="x in ['Red', 'Blue', 'Green']"
        :key="x"
        class="w-full bg-brand-50 border border-brand-200 p-3 rounded-xl cursor-pointer text-left mb-2"
      >
        <div class="flex gap-2.5">
          <div class="text-sm flex-1 truncate">
            <h4 class="text-sm text-brand-300 truncate mb-1">{{ x }} / Medium</h4>
            <p class="truncate font-medium">{{ formatNaira(20000) }}</p>
          </div>
          <div v-if="showActions">
            <Dropdown :items="menuItems">
              <template #label>
                <Icon icon="tabler:dots" class="text-lg" @click="emit('open:dropdown')" />
              </template>
            </Dropdown>
          </div>
        </div>
        <hr class="border-brand-200 my-2" />
        <div class="flex items-center justify-between gap-1">
          <Switch v-model="enabled" dense label="Available" disabled />

          <div class="inline-flex gap-1 items-center">
            <AppButton icon="mdi:minus" smaller variant="tonal" />
            <span
              class="border border-brand-200 rounded-full font-medium flex items-center justify-center h-8 w-8 text-sm"
            >
              {{ 4 }}
            </span>
            <AppButton icon="mdi:plus" smaller variant="tonal" />
          </div>
        </div>
      </div>
    </section>

    <!--  -->
    <ManageVariantsModal v-model="showManage" />
  </div>
</template>
