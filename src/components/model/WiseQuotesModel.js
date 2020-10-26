const QuotesType = {
    MOTIVATIONAL : 'motivational'
}

class WiseQuotesModel {
    constructor(quote, author) {
        this.quote = quote 
        this.author = author
    }
}

export default WiseQuotesModel
export { QuotesType } 