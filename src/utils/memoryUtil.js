import localstorageUtil from './localstorageUtil'
export default {
    user: localstorageUtil.getUser() || {}
}