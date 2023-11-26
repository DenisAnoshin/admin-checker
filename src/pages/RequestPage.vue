<template>
    <div class="container">
        <div class="header-block">
            <h1>Заявки # {{ data.id }}</h1> 
            <!--<button class="btn">Изменить</button>-->
        </div>
        
        <div class="main">
            <div class="main-inner">
                <table>
                    <tbody>
                        <tr><td>Дата и время заявкм</td><td>{{date(data.created_at) }}</td></tr>
                        <tr><td>ID платежа</td><td>{{data.payment_id}}</td></tr>
                        <tr><td>Сумма</td><td>{{data.amount}}</td></tr>
                        <tr><td>Ваше сообщение</td><td>{{data.message_checker}}</td></tr>
                        <tr><td>Сообщение трейдера</td><td>{{data.message_trader}}</td></tr>
                        <tr><td>Файлы</td>
                            <td>
                               <div v-for="(item, i) in files" :key="i"><a target="_blank" :href="`http://merchants-api.loc/files/${item}`">{{ item }}</a></div> 
                            </td>
                        </tr>
                        <tr><td>Статус</td><td>{{ getStatus(data.status) }}</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useRoute } from 'vue-router'
    import { date, getStatus } from '../helpers/helper.ts'
    import Api from '../services/api/Api.ts'
    const route = useRoute()
    import { ref, onMounted } from 'vue'

    let data:any = ref([])
    let files:any = ref([])

    onMounted(async () => { 
        const result = await Api.getRequest(Number(route.params.id))

        if(result.data.success){
            data.value = result.data.result
            files.value = JSON.parse(result.data.result.files)
        }
    }) 



</script>

<style scoped>
.main-inner{
    display: block;
    width: 100%;
}
.main{
    padding: 10px;
    border-radius: 5px;
    widows: 100%;
    background: var(--surface-color) none repeat scroll 0% 0%;
    box-shadow: rgba(0, 0, 0, 0.3) 0 .5em 1.9em, rgba(0, 0, 0, 0.22) 0 .75em .6em;
}

table tr td{
    text-align: left;
}
table tr td:first-child{
    width: 30%;
}
table{
    width: 100%;
}


.color-green{
  color: green;
}
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