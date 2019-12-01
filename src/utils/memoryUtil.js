import localstorageUtil from './localstorageUtil'

const user = localstorageUtil.getUser() || {}
export default {
    user,
    product: {}
}