export default class DialogModel {
    constructor(title, message, confirm, cancel) {
        this.title = title 
        this.message = message
        this.confirm = confirm
        this.cancel = cancel !== null ? cancel : ""
        this.callback = ()=>{} 
    }
}