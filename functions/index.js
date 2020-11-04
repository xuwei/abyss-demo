const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()

exports.addMessage = functions.https.onRequest((request, response) => {
    return new Promise((resolve, reject)=> {
        const original = request.query.text
        admin.firestore().collection("messages").add({original : original }).then((result)=>{
            resolve(response.json({result: 'Message with ID ' + result.id + ' added.'}))
        }).catch((error)=>{
            reject(error)
        })
    })
});

// make uppercase
exports.makeUppercase = functions.firestore.document('/messages/{documentId}').onCreate((snap, context) => {
    return new Promise((resolve, reject)=>{
        const original = snap.data().original
        functions.logger.log('Uppercasing', context.params.documentId, original)
        const uppercase = original.toUpperCase()
        snap.ref.set({ uppercase }, {merge : true}).then(()=>{
            resolve(uppercase)
        }).catch((error)=>{
            reject(error)
        })
    })
    
})
