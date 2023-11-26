<template>

   <div class="login-block">
      <h1>ADMIN CHECKER</h1>
      <div class="errors" v-if="error">
         Логин и/или пароль не верны
      </div>
      <div class="input-container">
         <input placeholder="Логин" v-model="login">
      </div> 

      <div class="input-container">
         <input placeholder="Пароль" v-model="password">
      </div>

      <button type="button" @click="loginSend()">
         <template v-if="loading">Loading...</template>
         <template v-else>Войти</template>
      </button>

       
   </div>
</template>

<script setup lang="ts">
   import Api from '../services/api/Api.ts'
   import { useRouter } from 'vue-router'
   import {ref } from 'vue'

   const router = useRouter()

   const login = ref('')
   const password = ref('')
   
   const error = ref(false)
   const loading = ref(false)

   const loginSend = async () =>{
      error.value = false
      loading.value = true
      const result = await Api.login(login.value, password.value)
      
      if(result.data.success){
         localStorage.setItem('auth', result.data.result.token);
         router.push({name: 'Home'})
      }else{
         error.value = true
      }
      loading.value = false
   }
</script>

<style scoped>
.login-block{
   text-align: center;
   max-width: 500px;
   margin: 100px auto;
}

.errors{
   color: red;
   padding: 10px;
}
</style>
