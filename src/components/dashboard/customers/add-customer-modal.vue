<script setup>
import { Icon } from "@iconify/vue";
import { computed, ref, toRefs, watch } from "vue";
import { toast } from "vue3-toastify";
import AppButton from "~/components/common/app-button.vue";
import Modal from "~/components/common/modal.vue";
import SelectInput from "~/components/common/select-input.vue";
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
  name: "",
  phone: "",
  email: "",
  gender: { label: "", value: "" },
  birthday: eighteenYearsAgo.value,
  address: "",
  image: null,
});

watch(
  () => props.modelValue,
  (val) => {
    if (val && edit.value && item.value?.id) {
      form.value = {
        name: item.value.name || "",
        phone: item.value.phone || "",
        email: item.value.email || "",
        gender: { label: item.value.gender || "", value: item.value.gender || "" },
        birthday: item.value.birthday?.slice(0, 10) || eighteenYearsAgo.value,
        address: item.value.address || "",
        image: null,
      };
      avatar.value = item.value.image || null;
    } else {
      form.value = {
        name: "",
        phone: "",
        email: "",
        gender: { label: "", value: "" },
        birthday: eighteenYearsAgo.value,
        address: "",
        image: null,
      };
      avatar.value = null;
    }
  },
);

const onSubmit = () => {
  let payload = { ...form.value, gender: form.value.gender?.value };

  if (edit.value) {
    payload = Object.fromEntries(
      Object.entries(payload).filter(([key, value]) =>
        key === "birthday" ? value !== item.value[key]?.slice(0, 10) : value !== item.value[key],
      ),
    );
  }

  if (Object.keys(payload).length) {
    const formData = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      if (value instanceof File || value instanceof Blob) {
        formData.append(key, value, value.name);
      } else {
        formData.append(key, value);
      }
    });

    emit("submit", payload);
  } else {
    toast("Nothing changed");
    emit("update:modelValue", false);
  }
};

const avatar = ref(null);

const onFileChange = (event) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    avatar.value = e.target.result;
    form.value.image = event.target.files[0];
  };
  reader.readAsDataURL(event.target.files[0]);
};
</script>

<template>
  <Modal
    :open="modelValue"
    :title="edit ? `Edit Customer - ${item?.name || ''}` : 'Add New Customer'"
    size="md"
    @update:open="emit('update:modelValue', $event)"
  >
    <form class="flex flex-col gap-4" @submit.prevent="onSubmit">
      <div class="flex justify-center">
        <label for="avatar">
          <img v-if="form.image" :src="avatar" class="h-24 w-24 rounded-lg" />
          <span
            v-else
            class="h-24 w-24 rounded-lg bg-brand-200 flex flex-col items-center justify-center text-brand-300"
          >
            <Icon icon="mdi:account" class="text-brand-500 h-16 w-16" />
          </span>
          <input id="avatar" type="file" accept="image/*" class="hidden" @change="onFileChange" />
        </label>
      </div>

      <TextInput v-model="form.name" label="Full Name" placeholder="e.g. Theo Ojochegbe" required />

      <TextInput
        v-model="form.phone"
        type="tel"
        label="Phone Number"
        placeholder="e.g. 08032616345"
        required
      />

      <TextInput v-model="form.email" type="email" label="Email" placeholder="example@gmail.com" />

      <SelectInput
        v-model="form.gender"
        label="Gender"
        :options="['Male', 'Female'].map((v) => ({ label: v, value: v }))"
      />

      <TextInput
        v-model="form.birthday"
        type="date"
        label="Date of Birth"
        :max="eighteenYearsAgo"
      />

      <TextAreaInput v-model="form.address" label="Address" rows="2" />

      <AppButton
        type="submit"
        :label="edit ? 'Save Changes' : 'Add Customer'"
        :loading="loading"
        class="w-full"
      />
    </form>
  </Modal>
</template>
