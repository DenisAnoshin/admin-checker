import cookie from 'vue-cookies'

export const date = (unix:number) => {
    return new Date(unix * 1000).toLocaleString()
}

export const getStatus = (statusCode:number) => {
   if(statusCode == -1) return 'Отклонен' 
   if(statusCode == 0) return 'Закрыта' 
   if(statusCode == 1) return 'В процессе' 
} 

export const auth = () => {
    return false
    if(!localStorage.getItem('auth') && localStorage.getItem('auth') == '') {
        return false
    }
    return true
}