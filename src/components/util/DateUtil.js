import moment from 'moment'

const yyyyMMdd = (date)=> {
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate())
}

const last7days = ()=> {
    moment().format('YYYY-MM-DD')
    const today = moment().calendar()
    const end = moment().add(7, 'days').calendar()
    return datesByRange(today, end)
}

const last30days = ()=> {
    moment().format('YYYY-MM-DD')
    const today = moment().calendar()
    const end = moment().add(30, 'days').calendar()
    return datesByRange(today, end)
}

const last90days = ()=> {
    moment().format('YYYY-MM-DD')
    const today = moment().calendar()
    const end = moment().add(90, 'days').calendar()
    return datesByRange(today, end)
}

const datesByRange = (from, to) => {
    var dates = []
    const range = moment().range(from, to)
    debugger;
}

export default { yyyyMMdd, datesByRange, last7days, last30days, last90days }