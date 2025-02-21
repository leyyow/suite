<template>
  <div class="bg-brand-100 flex w-full h-screen overflow-hidden">
    <div class="flex flex-col flex-1 p-1.5 sm:p-4 overflow-auto md:justify-center md:items-center">
      <img src="../assets/images/auth.png" class="rounded-2xl md:hidden mb-4" />
      <!--  -->
      <div class="p-2 md:max-w-screen-sm md:mx-auto">
        <RouterView />
      </div>
    </div>
    <div class="items-center justify-center flex-1 hidden md:flex bg-brand-600">
      <img src="../assets/images/auth.svg" class="h-full object-cover" />
    </div>
  </div>
</template>
