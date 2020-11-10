import RewardModel from '../model/RewardModel'
import firebase from '../../Firebase.js'

const getReward = (userId) => {
    return new Promise((resolve, reject)=>{
        const db = firebase.firestore()
        db.collection("rewards").doc(userId).get().then((doc)=>{   
            const data = doc.data()
            if (data !== undefined && data.userId !== undefined && data.claps !== undefined && data.level !== undefined) {        
                const rewardModel = new RewardModel(data.userId, data.claps, data.level)             
                resolve(rewardModel)
            } else {
                // data is not defined, we will create a new Rewards config for user 
                const newReward = new RewardModel(userId, 0, 1)
                // transform to pure JS object
                const rewardObj = Object.assign({}, newReward)
                db.collection("rewards").doc(userId).set(rewardObj, { merge: true }).then(()=>{
                    resolve(newReward)
                }).catch((err)=>{
                    reject(err)
                })
            }
        }).catch((error) => {
            reject(error)
        })
    })
}

export default { getReward }