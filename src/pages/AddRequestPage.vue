<template>
  <div class="container">
    <div class="header-block">
        <h1>Создать заявку</h1> 
        
    </div>
    <form>
        <input type="number" placeholder="Id платежа" v-model="payment_id" :class="{border: check && payment_id.length == 0}">
        <input type="number" placeholder="Сумма" v-model="amount"  :class="{border: check && amount.length == 0}">
        <input type="text" placeholder="Сообщение" v-model="message_checker"  :class="{border: check && message_checker.length == 0}">
        <div class="block_files" v-if="files.length > 0">
            <div class="file" v-for="(file, i) in files" :key="i" >
                <span @click="deleteFile(i)">x</span>
                {{ file.name }}
            </div>
        </div>
        <input type="file" class="custom-file-input" multiple @change="changeFiles($event)"/>
    </form>
    <div v-if="error != ''" class="errors"> {{ error }} </div>
    <div class="send-block">
        <button @click="send()">
            <template v-if="loading">Loading...</template>
            <template v-else>Отправить заявку</template>
        </button>
    </div>
   </div>

</template>
<script setup lang="ts">
   import Api from '../services/api/Api.ts'
   import { useRouter } from 'vue-router'
   import {ref } from 'vue'
   const router = useRouter()

   const payment_id = ref('')
   const amount = ref('')
   const message_checker = ref('')

   const error = ref('')
   const loading = ref(false)
   const files = ref<any>([])
   const check = ref<any>(false)

   const deleteFile = (id:number) =>{
    files.value.splice(id, 1)
   }
   const changeFiles = (e:any) =>{
    files.value = []
    for( var i = 0; i < e.target.files.length; i++ ){
        files.value.push(e.target.files[i])
    }
   }

   const send = async () => {
        if(payment_id.value == '' || amount.value == '' || message_checker.value == ''){
            check.value = true
            return;
        }
        error.value = ''
        loading.value = true
        check.value = true
        let formData = new FormData();
        

        for(var i = 0; i < files.value.length; i++ ){
            let file = files.value[i];
            formData.append('files[' + i + ']', file);
        }

        formData.append('payment_id', payment_id.value);
        formData.append('amount', amount.value);
        formData.append('message_checker', message_checker.value);
        formData.append('method', 'create-request');

        const res = await Api.createRequest(formData)
        console.log(res)
        if(res.data.success){
            router.push({path: `request/${res.data.result.id}`})
        }else{
            error.value = res.data.result
        }

        loading.value = false
   }
  
</script>
<style scoped>
    .errors{
        color: red;
        text-align: center;
        padding: 10px;   
    }
    .send-block{
        text-align: center;
        margin-top: 50px;
    }
    form{
    display: block;
    width: 100%;
    }
    input{
        width: 100%;
        margin-bottom: 5px;
        display: block;
        background: none;
        border: 1px solid rgba(255,255,255, 0.2);
        padding: 10px;
    }
    .custom-file-input {
  color: transparent;
}
.custom-file-input::-webkit-file-upload-button {
  visibility: hidden;
}
.custom-file-input::before {
  content: 'Прикрепить файл';
  color: black;
  display: inline-block;
  background: -webkit-linear-gradient(top, #f9f9f9, #e3e3e3);
  border: 1px solid #999;
  border-radius: 3px;
  padding: 5px 8px;
  outline: none;
  white-space: nowrap;
  -webkit-user-select: none;
  cursor: pointer;
  text-shadow: 1px 1px #fff;
  font-weight: 700;
  font-size: 10pt;
}
.custom-file-input:hover::before {
  border-color: black;
}
.custom-file-input:active {
  outline: 0;
}
.custom-file-input:active::before {
  background: -webkit-linear-gradient(top, #e3e3e3, #f9f9f9); 
}
    .block_files .file span:hover{
        cursor: pointer;
        opacity: 0.8;
    }
    .block_files .file span{
        padding: 0 3px;
        color: red;
        display: inline-block;
        margin-right: 10px;
    }
    .block_files .file{
        padding: 5px;
        font-size: 14px;
    }
    .block_files{
        margin: 10px 0;
    }
    .border{
        border: 1px solid red;
    }
</style>