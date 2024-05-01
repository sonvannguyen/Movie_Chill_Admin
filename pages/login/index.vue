<template>
  <div class="h-screen relative">
    <img
      src="https://annenberg.usc.edu/sites/default/files/styles/article_full_content_1240x600/public/AII-6.29.23.jpg?itok=q_ke7xZ6"
      className="w-screen h-screen object-cover"
      alt="auth banner"
    />

    <div
      className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50"
    ></div>

    <div
      class="absolute top-[40%] left-1/2 translate-x-[-50%] translate-y-[-50%] w-[540px] md:w-[400px]d md:p-10"
    >
      <h1 class="text-center text-3xl font-bold mb-10 text-[#ffffff]">
        LOGIN ADMIN
      </h1>
      <v-card
        class="mx-auto pa-12 pb-8"
        elevation="8"
        max-width="448"
        rounded="lg"
      >
        <div class="text-subtitle-1 text-medium-emphasis">Username</div>

        <v-text-field
          v-model="username"
          density="compact"
          placeholder="Enter your username..."
          prepend-inner-icon="mdi-account"
          variant="outlined"
        ></v-text-field>

        <div
          class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
        >
          Password
        </div>

        <v-text-field
          v-model="password"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="Enter your password..."
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible = !visible"
        ></v-text-field>

        <h4 v-if="isError" class="my-2 italic font-bold text-red-400 text-sm">
          Bạn phải nhập đầy đủ username và password !
        </h4>

        <v-btn
          block
          class="mb-3"
          color="#3cba9f"
          size="large"
          variant="tonal"
          @click="handleSubmit"
        >
          Log In
        </v-btn>
      </v-card>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ALERT_TYPE } from '~/constants/common';
import adminApi from '~/services/admin-api';
import { useAlertStore } from '~/stores/alert/alert-store'

const username = ref()
const password = ref()
const visible = ref(false)
const isError = ref(false)
const alertStore = useAlertStore()

onMounted(async () => {})

const handleSubmit = async () => {
  if (!username.value?.trim() || !password.value?.trim()) {
    isError.value = true
    return
  }
  const resultLogin = await adminApi.login({
    username: username.value,
    password: password.value,
  })

  if (typeof resultLogin === 'object') {
    localStorage.setItem('movie_access_token', resultLogin.accessToken)
    localStorage.setItem('movie_userId', resultLogin.user._id)
    localStorage.setItem('username', resultLogin.user.username)
    console.log('login success')
    alertStore.setAlertMessage({
      message: 'Đăng nhập thành công',
      type: ALERT_TYPE.SUCCESS,
    })
    navigateTo('/dashboard')
  } else {
    alertStore.setAlertMessage({
      message: 'Tài khoản hoặc mật khẩu không đúng !',
      type: ALERT_TYPE.ERROR,
    })
  }
}
</script>

<style scoped lang="scss">
@use 'sass:map';
</style>
