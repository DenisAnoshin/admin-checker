<template>
  <div class="header" v-if="route.meta.header">
  
        
        <router-link to="/" title="Заявки" class="service">
            <img src="/assets/svg/cards-page.svg" class="service-svg"> 
        </router-link>

        <router-link to="/add-request" title="Создать заявку"  class="service">
            <img src="/assets/svg/telegram-page.svg" class="service-svg"/>
        </router-link>

        <div class="delimeter"></div>

        <router-link to="/notifications" title="Создать заявку"  class="service">
            <img src="/assets/svg/notification-new.svg" class="service-svg"/>
            <span v-if="notifs > 0">{{ notifs }}</span>
        </router-link>

        <div class="delimeter"></div>

        <div @click="logout()" class="service">
            <img class="service-svg" src="/assets/svg/logout-page.svg"/>
        </div>
    
</div>
</template>
<script setup lang="ts">
    import Api from '../services/api/Api.ts'
    import { ref, onMounted } from 'vue'
    import { useRoute, useRouter } from 'vue-router'
   const route = useRoute()
   const router = useRouter()

    defineProps<{ msg?: string }>()

    const notifs = ref(0)

    const logout = () =>{
        localStorage.clear();
        router.push({name: 'Login'})
    }

    onMounted(async () => { 
        await loadCountNotifs();
    }) 

    const loadCountNotifs = async () => {
        const result = await Api.getCountNewNotifications()
        if(result.data.success){
            notifs.value = result.data.result.count_notification
        }
        setTimeout( async ()=>{ await loadCountNotifs(); }, 10000)
    }

</script>


<style scoped>
.header{
    width: auto;
    border-radius: 0.5em;
    
    margin-top: 30px;
    padding: 10px;
    display: flex;
    box-shadow: 0 0;
    text-align:end;
    justify-content:center;
    background-color: var(--surface-color);
    vertical-align:middle;
}


.service{
    width: 3.4em;
    height: 3.4em;
    background: var(--surface-color-variant) none repeat scroll 0% 0%;
    border-radius: 0.5em;
    margin: 0 .25em;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    position: relative;
}

.service span{
    font-size: 10px;
    background: red;
    border-radius: 3px;
    color: #fff;
    right: 0;
    text-align: center;
    top: 0;
    margin-right: 5px;
    margin-top: 5px;
    padding: 3px;
    position: absolute;
    display: inline-block;
    min-width: 15px;
}
.service-svg{
    width: 2.25em;
    height: 2.25em;
}

.main-inner{
    width: 100%;
    height: 100%;
    top: 0;
    padding: 0 0.25em;
    display: flex;
    flex-direction: row;
    align-items: center;
}

.left{
    width: 100%;
    height: 100%;
    top: 0;
    padding: 0 0.25em;
    display: flex;
    flex-direction: row;
    align-items: center;
}

.service-left{
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
    padding-right: 0;
    margin-right: 0;
}
.service-right{
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
    margin-left: 0;
    width: fit-content;
    padding-right: 0.5em;
}

.delimeter{
    background: var(--surface-color-variant) none repeat scroll 0% 0%;
    height: 3em;
    width: 0.1em;
    border-radius: 5em;
    margin: 0 0.25em;
}

</style>
