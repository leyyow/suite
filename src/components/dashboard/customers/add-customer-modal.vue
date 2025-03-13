<script setup>
import { computed, ref, toRefs, watch } from "vue";
import { toast } from "vue3-toastify";
import AppButton from "~/components/common/app-button.vue";
import Modal from "~/components/common/modal.vue";
import TextAreaInput from "~/components/common/text-area-input.vue";
import TextInput from "~/components/common/text-input.vue";

const props = defineProps({
  modelValue: Boolean,
  loading: Boolean,
  edit: Boolean,
  item: { type: Object, default: () => ({}) },
});

const { edit, item } = toRefs(props);
const emit = defineEmits(["update:modelValue", "submit"]);

const eighteenYearsAgo = computed(() => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 18);
  return date.toISOString().split("T")[0];
});

const form = ref({
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  line1: "",
  city: "",
  dob: "",
  line2: "",
  state: "",
  instagram: "",
});

watch(
  () => props.modelValue,
  (val) => {
    if (val && edit.value && item.value?.id) {
      form.value = {
        first_name: item.value.first_name || "",
        last_name: item.value.last_name || "",
        email: item.value.email || "",
        phone: item.value.phone || "",
        line1: item.value.line1 || "",
        city: item.value.city || "",
        dob: item.value.dob?.slice(0, 10) || "",
        line2: item.value.line2 || "",
        state: item.value.state || "",
        instagram: item.value.instagram || "",
      };
    } else {
      form.value = {
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        line1: "",
        city: "",
        dob: "",
        line2: "",
        state: "",
        instagram: "",
      };
    }
  },
);

const onSubmit = () => {
  let payload = { ...form.value };

  if (edit.value) {
    payload = Object.fromEntries(
      Object.entries(payload).filter(([key, value]) =>
        key === "dob" ? value !== item.value[key]?.slice(0, 10) : value !== item.value[key],
      ),
    );
  }

  if (Object.keys(payload).length) {
    emit("submit", payload);
  } else {
    toast("Nothing changed");
    emit("update:modelValue", false);
  }
};

// const avatar = ref(null);

// const onFileChange = (event) => {
//   const reader = new FileReader();
//   reader.onload = (e) => {
//     avatar.value = e.target.result;
//     form.value.image = event.target.files[0];
//   };
//   reader.readAsDataURL(event.target.files[0]);
// };
</script>

<template>
  <Modal
    :open="modelValue"
    :title="
      edit ? `Edit Customer - ${item?.first_name + ' ' + item.last_name}` : 'Add New Customer'
    "
    size="md"
    @update:open="emit('update:modelValue', $event)"
  >
    <form class="flex flex-col gap-4" @submit.prevent="onSubmit">
      <!-- <div class="flex justify-center">
        <label for="avatar">
          <img v-if="form.image" :src="avatar" class="h-24 w-24 rounded-lg" />
          <span
            v-else
            class="h-24 w-24 rounded-lg bg-brand-200 flex flex-col items-center justify-center text-brand-300"
          >
            <Icon icon="duo-icons:user" class="text-brand-500 h-16 w-16" />
          </span>
          <input id="avatar" type="file" accept="image/*" class="hidden" @change="onFileChange" />
        </label>
      </div> -->

      <div class="grid grid-cols-2 gap-4">
        <TextInput v-model="form.first_name" label="First Name" placeholder="e.g. Theo" required />
        <TextInput
          v-model="form.last_name"
          label="Last Name"
          placeholder="e.g. Ojochegbe"
          required
        />
      </div>

      <TextInput
        v-model="form.phone"
        type="tel"
        label="Phone Number"
        placeholder="e.g. 08032616345"
        required
      />
      <TextInput v-model="form.email" type="email" label="Email" placeholder="example@gmail.com" />

      <TextInput v-model="form.dob" type="date" label="Date of Birth" :max="eighteenYearsAgo" />

      <TextAreaInput
        v-model="form.line1"
        label="Address Line 1"
        placeholder="e.g. 123 Main St"
        rows="2"
      />
      <TextAreaInput
        v-model="form.line2"
        label="Address Line 2"
        placeholder="e.g. Apartment 4B"
        rows="2"
      />
      <div class="grid grid-cols-2 gap-4">
        <TextInput v-model="form.city" label="City" placeholder="e.g. Ikeja" />
        <TextInput v-model="form.state" label="State" placeholder="e.g. Lagos State" />
      </div>

      <TextInput v-model="form.instagram" label="Instagram Handle" placeholder="@username" />

      <AppButton
        type="submit"
        :label="edit ? 'Save Changes' : 'Add Customer'"
        :loading="loading"
        class="w-full"
      />
    </form>
  </Modal>
</template>
