<script setup>
import { Icon } from "@iconify/vue";
import { computed, ref } from "vue";
import { toast } from "vue3-toastify";
import AppButton from "~/components/common/app-button.vue";
import Chip from "~/components/common/chip.vue";
import DropdownMenu from "~/components/common/dropdown-menu.vue";
import SearchBar from "~/components/common/search-bar.vue";
import InviteUserModal from "~/components/dashboard/settings/invite-user-modal.vue";

const tab = ref("staff");

const tabLists = [
  { label: "Staff & Users", value: "staff" },
  { label: "Manage Roles", value: "roles" },
];

const action = () => toast("Coming soon");
const menuItems = computed(() => [
  { label: "Cancel invitation", icon: "uim:box", action },
  { label: "Reactivate", icon: "uim:box", action },
  { label: "Suspend", icon: "uim:box", action },
  { label: "Remove", icon: "mdi:delete", class: "text-error", action },
]);

const showInvite = ref(false);
</script>

<template>
  <div>
    <div class="flex border-b border-brand-200 mb-4">
      <button
        v-for="v in tabLists"
        :key="v"
        type="button"
        :class="[
          'flex-1 text-sm py-2 px-3 text-center font-medium',
          tab === v.value ? 'border-b border-brand-500 text-brand-500' : 'text-brand-300',
        ]"
        @click="tab = v.value"
      >
        {{ v.label }}
      </button>
    </div>

    <div v-if="tab === 'staff'">
      <h3 class="text-base font-semibold mb-2">All Staff ({{ 4 }})</h3>
      <div class="flex gap-3 items-center">
        <SearchBar placeholder="Search by name..." />
        <AppButton label="Invite" small @click="showInvite = true" />
      </div>

      <section class="mt-6 divide-y divive-brand-200">
        <div v-for="n in 4" :key="n" class="grid grid-cols-5 items-center gap-4 py-3 px-2">
          <div class="col-span-3">
            <div class="flex items-center gap-1">
              <h4 class="text-sm truncate font-medium">Theophilus Ojochegbe</h4>
              <Chip label="Manager" dense />
            </div>
            <p class="text-xs text-brand-300">symplytheo@gmail.com</p>
          </div>
          <div class="text-sm text-center">Active</div>
          <div class="text-right">
            <DropdownMenu :items="menuItems">
              <template #label>
                <Icon icon="tabler:dots" class="text-lg" />
              </template>
            </DropdownMenu>
          </div>
        </div>
      </section>
    </div>

    <div v-if="tab === 'roles'">
      <ul>
        <li v-for="y in ['Admin', 'Manager', 'Staff']" :key="y" class="px-3 py-2 text-sm">
          {{ y }}
        </li>
      </ul>
    </div>

    <!--  -->
    <InviteUserModal v-model="showInvite" />
  </div>
</template>
