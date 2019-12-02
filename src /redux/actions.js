/*
    生成action的工厂函数(返回值为对象的可以称为工厂函数)
*/
import { INCREAMENT, DECREAMENT } from './cation-types'


export const increament = (number) => ({ type=INCRRAMENT, number })

export const decreament = (number) => ({ type=DECRRAMENT, number })
