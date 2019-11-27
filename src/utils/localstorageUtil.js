import store from 'store'
const USER_KEY = 'user_key'
export default {
    saveUser(user) {
        // return localStorage.setItem(USER_KEY, JSON.stringify(user))
        return store.set(USER_KEY, user)
    },
    getUser() {
        // return JSON.parse(localStorage.getItem(USER_KEY) || '{}')
        //store已经转换好了各式，所以当没有值时，直接返回空对象
        return store.get(USER_KEY) || {}
    },
    removeUser() {
        // return localStorage.removeItem(USER_KEY)
        return store.remove(USER_KEY)
    }
}