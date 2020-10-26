import firebase from '../../Firebase.js'
import WiseQuotesModel from '../model/WiseQuotesModel.js'

const getWiseQuote = () => {
    return new Promise((resolve, reject)=> {
        var index = Math.floor(Math.random() * 100)
        const db = firebase.firestore()
        db.collection("wisequotes").doc(index).get().then((querySnapshot) => {
            const data = querySnapshot.data()
            if (data !== undefined && data.quote !== undefined && data.author !== undefined) {
                const wiseQuote = new WiseQuotesModel(data.quote, data.author)
                resolve(wiseQuote)
            } else {
                reject(new Error("Quote not found"))
            }
        }).catch((error) => {
            reject(error)
        })
    })
}

export { getWiseQuote }