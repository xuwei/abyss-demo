import StreamEventModel, { StreamEventType } from '../model/StreamEventModel'
import firebase from '../../Firebase.js'
import RandomUtil from '../util/RandomUtil'
import DateUtil from '../util/DateUtil'
import uuid from 'react-uuid'

const getStream = ()=> {
    return new Promise((resolve, reject)=>{
        const RECENT_STREAM_LENGTH = 200
        var promises = []
        for (var i = 0; i < RECENT_STREAM_LENGTH; i++) {
            const promise = generateRandomBotStreamEvent() 
            promises.push(promise)
        }
        
        Promise.all(promises).then((streamEventModels)=>{
            debugger;
            resolve(streamEventModels)
        }).catch((error)=> {
            reject(error)
        })
    })
}

const generateRandomBotStreamEvent = ()=>{
    
    return new Promise((resolve, reject)=>{
        const BOT_ID_RANGE = 1200
        const events = [StreamEventType.CompletedTask, StreamEventType.CreatedTask, StreamEventType.ArchivedTask, StreamEventType.GaveClaps, StreamEventType.ActiveOnline]
        const index = RandomUtil.randomIndexByRange(events.length)
        const randomEventType = events[index]
        const botId = RandomUtil.randomIndexByRange(BOT_ID_RANGE) + ""
        const db = firebase.firestore()
        db.collection("todobots").doc(botId).get().then((doc)=>{   
            const data = doc.data()
            if (data !== undefined && data.avatarUrl !== undefined && data.username !== undefined) {        
                const randTime = DateUtil.subtractRandomMinsFromNow()
                const streamEventModel = new StreamEventModel(uuid(),
                                            randomEventType,
                                            uuid(),
                                            data.avatarUrl, "",
                                            data.username, 
                                            randTime,
                                            generateTaskDescription(data.username, randomEventType))
                                            
                resolve(streamEventModel)
            } else {
                reject(new Error("Todobots not found"))
            }
        }).catch((error) => {
            reject(error)
        })
    }) 
}

const generateTaskDescription = (displayname, eventType) => {
    switch(eventType) {
        case StreamEventType.CompletedTask:
            return displayname + " completed a task."
        case StreamEventType.CreatedTask:
            return displayname + " created a task."
        case StreamEventType.ArchivedTask:
            return displayname + " archieved a task."
        case StreamEventType.GaveClaps:
            return displayname + " gave some claps."
        case StreamEventType.ActiveOnline:
            return displayname + " is active online."
        default:
            return ""
    }
}

export default { getStream }