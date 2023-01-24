<script setup lang="ts">
import router from '@/router';
import { ref, onMounted } from 'vue';
import {verifyTokenAPI} from '../api/user'

const validToken = ref(true)


/**
 * @description 退出登陆
 */
function loginOut(){
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')

  router.replace({path: '/login'})
};


/**
 * @description 验证token
 */
async function verifyToken() {
  const {data: res} = await verifyTokenAPI()
  console.log(res);
}

onMounted(()=>{
  const clearId = setTimeout(()=>{
    validToken.value = false;
    clearTimeout(clearId);
  }, 3000)
})
</script>

<template>
  <div>
    <h1>Home Component</h1>
    <div><button @click="loginOut">login out</button></div>
    <div>
      <h3 v-show="validToken">三秒后`连接token`过期，备用token 6秒有效</h3>
      <h3 v-show="!validToken">连接token已过期</h3>
    </div>
    <div>
      <button @click="verifyToken">verify token</button>
      <span>请注意控制台信息</span>
    </div>
  </div>
</template>
