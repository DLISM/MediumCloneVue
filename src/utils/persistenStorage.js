 export const getItem= key=>{
    try {
        return JSON.parse(localStorage.getItem(key))
    }catch (e) {
        console.log('Error getting data form localStorage', e)
        return null
    }
 }

 export const setItem = (key, data) =>{
    try {
        localStorage.setItem(key, JSON.stringify(data))
    }catch (e){
        console.log('Error setting data in localStorage', e)
    }
 }