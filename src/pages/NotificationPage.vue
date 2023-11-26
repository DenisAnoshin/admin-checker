<template>
    <div class="container">
        <h1>Уведомления</h1>
        <main>
            <table>
                <thead>
                    <tr>
                        <td style="width: 100px;">#</td>
                        <td style="width: 180px;">Дата и время</td>
                        <td>Сообщение</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr class="tr" v-for="item in data" :key="item.id">
                        <td>{{ item.id }}</td>
                        <td>{{ date(item.created_at) }}</td>
                        <td>{{ item.message }}</td>
                    </tr>
                </tbody>
            </table>
        </main>
    </div>
</template>

<script setup lang="ts">
 import { date } from '../helpers/helper.ts'

import Api from '../services/api/Api.ts'

import { ref, onMounted } from 'vue'

const data:any = ref([])

onMounted(async () => {
  const result = await Api.getNotifications()
  if(result.data.success){
    data.value = result.data.result
  }
})

</script>

<style scoped >






</style>