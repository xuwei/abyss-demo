import BiosModel from '../model/BiosModel'
import firebase from '../../Firebase.js'

const getBios = (user) => {
    return new Promise((resolve, reject) => {
        const userId = user.uid 
        const displayName = user.displayName
        const db = firebase.firestore()
        db.collection("bios").doc(userId).get().then((doc)=>{
            const data = doc.data()
            if (data !== undefined && data.userId !== undefined && data.descriptions !== undefined && data.lastModified !== undefined) {        
                const biosModel = new BiosModel(data.userId, data.descriptions, data.lastModified)             
                resolve(biosModel)
            } else {
                // data is not defined, we will create a new Bios model for user 
                const basicIntro = "Hi all, I'm " + displayName
                const newBios = new BiosModel(userId, basicIntro, Date.now())
                // transform to pure JS object
                const newBiosObj = Object.assign({}, newBios)
                db.collection("bios").doc(userId).set(newBiosObj, { merge: true }).then(()=>{
                    resolve(newBios)
                }).catch((err)=>{
                    reject(err)
                })
            }
        }).catch((error)=>{
            reject(error)
        })
    })
}

const updateBios = (userId, updatedBios) => {
    return new Promise((resolve, reject) => {
        const newBiosObj = Object.assign({}, updatedBios)
        const db = firebase.firestore()
        db.collection("bios").doc(userId).set(newBiosObj, { merge: true }).then(()=>{
            resolve(updatedBios)
        }).catch((err)=>{
            reject(err)
        })
    })
}

export default { updateBios, getBios }