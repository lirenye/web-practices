<script setup lang="ts">
import {login} from '../api/user'
import router from '@/router';

async function toLogin(){
  const {data: res} = await login()
  const accessToken = res.data.accessToken
  const refreshToken = res.data.refreshToken;

  localStorage.setItem('access_token', accessToken)
  localStorage.setItem('refresh_token', refreshToken)

  router.replace({path: '/'})
}
</script>

<template>
  <div>
    <h1>Login Component</h1>
    <h2>请打开控制台观察输出信息</h2>
    <button @click="toLogin">Login</button>
  </div>
</template>