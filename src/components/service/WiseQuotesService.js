import firebase from '../../Firebase.js'
import WiseQuotesModel from '../model/WiseQuotesModel.js'

const getWiseQuote = () => {
    return new Promise((resolve, reject)=> {
        const index = Date.now() % 100
        const db = firebase.firestore()
        db.collection("wisequotes").doc(index + "").get().then((doc)=>{   
            const data = doc.data()
            if (data !== undefined && data.quote !== undefined && data.author !== undefined) {
                resolve(new WiseQuotesModel(data.quote, data.author))
            } else {
                reject(new Error("Quote not found"))
            }
        }).catch((error) => {
            reject(error)
        })
    })
}

export default { getWiseQuote }