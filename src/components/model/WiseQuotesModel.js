const QuotesType = {
    MOTIVATIONAL : 'motivational'
}

class WiseQuotesModel {
    constructor(quotes, author) {
        this.quotes = quotes 
        this.author = author
    }
}

export default WiseQuotesModel
export { QuotesType } 