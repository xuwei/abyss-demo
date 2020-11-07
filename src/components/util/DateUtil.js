import Moment from 'moment';
import { DateFormat } from '../Configs'
import { extendMoment } from 'moment-range';
import RandomUtil from './RandomUtil'
const moment = extendMoment(Moment);

const subtractRandomMinsFromNow = ()=> {
    const RANGE = 360
    const randomMins = RandomUtil.randomIndexByRange(RANGE)
    const randomMinsFromNow = moment().subtract(randomMins, "minutes")
    return randomMinsFromNow
}

const yyyyMMdd = (date)=> {
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + ("0" + date.getDate()).slice(-2)
}

const datesByRange = (from, to) => {

    const range = moment().range(from, to)
    const dates = Array.from(range.by('day'))
    const formattedDates = dates.map((date, index) => {
        return { "order" : index, "date" : moment(date).format(DateFormat.DefaultFormat) }
    })
    return formattedDates
}

const last7days = ()=> {
    moment().format(DateFormat.DefaultFormat)
    const end = moment()
    const start = moment().subtract(6, 'days')
    return datesByRange(start, end)
}

const last14days = ()=> {
    moment().format(DateFormat.DefaultFormat)
    const end = moment()
    const start = moment().subtract(13, 'days')
    return datesByRange(start, end)
}

const last21days = ()=> {
    moment().format(DateFormat.DefaultFormat)
    const end = moment()
    const start = moment().subtract(20, 'days')
    return datesByRange(start, end)
}

export default { yyyyMMdd, datesByRange, last7days, last14days, last21days, subtractRandomMinsFromNow }