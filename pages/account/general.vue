<script lang="ts" setup>
useSeoMeta({
  title: 'Account',
})
</script>
<template>
  <UCard :ui="{ body: 'grid grid-cols-12 gap-6 md:gap-8' }">
    <div class="col-span-12 lg:col-span-4">
      <div class="text-lg font-semibold mb-2">Profile information</div>
      <div class="text-sm opacity-80">
        Update your account's profile information and email address.
      </div>
    </div>
    <div class="col-span-12 lg:col-span-8">
      <AccountUpdateProfile />
    </div>
    <USeparator class="col-span-12" />
    <div class="col-span-12 lg:col-span-4">
      <div class="text-lg font-semibold mb-2">Update Password</div>
      <div class="text-sm opacity-80">
        Ensure your account is using a long, random password to stay secure.
      </div>
    </div>
    <div class="col-span-12 lg:col-span-8">
      <AccountUpdatePassword />
    </div>
  </UCard>
</template>
