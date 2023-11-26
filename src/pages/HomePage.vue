<template>
    <div class="container">
        <h1>Заявки</h1>
        <main>
            <div class="main-inner">
                <table>
                    <thead>
                        <tr>
                            <td>#</td>
                            <td>Дата и время</td>
                            <td>Id платежа</td>
                            <td>Сумма</td>
                            <td>Ваше сообщение</td>
                            <td>Сообщение трейдера</td>
                            <td>Статус</td>
                            <td>More</td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr class="tr" v-for="item in data" :key="item.id">
                            <td>{{ item.id }}</td>
                            <td>{{ date(item.created_at) }}</td>
                            <td>{{ item.payment_id }}</td>
                            <td>{{ item.amount }}</td>
                            <td>{{ item.message_checker }}</td>
                            <td>{{ item.message_trader }}</td>
                            <td>{{ getStatus(item.status) }}</td>
                            <td><router-link :to="`/request/${item.id}`">Подробнее</router-link></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">


import Api from '../services/api/Api.ts'
import { date, getStatus } from '../helpers/helper.ts'
import { ref, onMounted } from 'vue'

const data:any = ref([])

onMounted(async () => {
  const result = await Api.getRequests()
  if(result.data.success){
    data.value = result.data.result
  }
})

</script>

<style >

thead td {
    background:  rgba(255,255,255, 0.2)
}
table {
    border-spacing: 0;
}

table tr {
    padding: 10px;
    background:  rgba(255,255,255, 0.04)
}

td {
    padding: 10px;
    border: 1px solid rgba(255,255,255, 0.2)
}

</style>