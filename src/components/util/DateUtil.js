const yyyyMMdd = (date)=> {
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate())
}

export default { yyyyMMdd }