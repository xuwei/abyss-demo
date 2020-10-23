import firebase from '../../Firebase.js'
import TaskModel from '../model/TaskModel.js'
import DateUtil from '../util/DateUtil'
import TaskArchieveModel, { ArchiveFilter } from '../model/TaskArchiveModel'

const getUserTasks = (userId) => {

    return new Promise((resolve, reject) => {
        if (userId === null) { reject(new Error("UserId cannot be null")) }
        if (userId.length === 0) { reject(new Error("UserId cannot be null")) }
        const db = firebase.firestore()
        db.collection("userTasks").doc(userId).get().then((querySnapshot) => {
            const data = querySnapshot.data()
            if (data !== undefined && data.todos !== undefined) {
                const result = data.todos.map((task) => {
                    return new TaskModel(task.id, task.descriptions, task.state, task.assigned, userId, task.posted)
                })
                resolve(result)
            } else {
                resolve([])
            }
        }).catch((error) => {
            reject(error)
        })
    })
}

const saveUserTasks = (userId, tasks) => {
    
    return new Promise((resolve, reject) => {

        if (userId === null) { reject(new Error("UserId cannot be null")) }
        if (userId.length === 0) { reject(new Error("UserId cannot be null")) }
        var taskList = tasks.map((task) => ({
            id : task.id,
            descriptions : task.descriptions,
            posted : task.posted,
            lastModified : new Date(),
            createdBy : userId,
            state : task.state,
            assigned : task.assigned
        }))

        const todoList = { todos : taskList }

        const db = firebase.firestore()
        db.collection("userTasks").doc(userId).set(todoList).then(() => {
            resolve()
        }).catch((error) => {
            reject(error)
        })
    })
}

const deleteArchivedTask = (userId, dateString, taskId) => {
    return new Promise((resolve, reject) => {
        if (userId === null) { reject(new Error("UserId cannot be null")) }
        if (taskId === null) { reject(new Error("TaskId cannot be null")) }
        if (dateString === null) { reject(new Error("dateString cannot be null")) }

        const db = firebase.firestore()
        db.collection("archives").doc(userId).collection(dateString).doc(taskId).delete().then(()=>{
            resolve()
        }).catch((error)=>{
            reject(error)
        })
    })
}

const restoreArchivedUserTask = (userId, taskModel) => {
    return new Promise((resolve, reject) => {
        getUserTasks(userId).then((tasks)=> {
            tasks.push(taskModel)
            return saveUserTasks(userId, tasks)
        }).then(()=>{
            resolve()
        }).catch((error)=>{
            reject(error)
        })
    })
}

const getArchiveUserTasks = (userId, filter) => {

    return new Promise((resolve, reject) => {

        const fetchByDate = (uid, order, date)=>{
            return new Promise((res, rej) => {
                if (date.length === 0) { res(new TaskArchieveModel(order, date, [])) }
                const db = firebase.firestore()
                db.collection("archives").doc(uid).collection(date).get().then((querySnapshot)=>{
                    const tasks = querySnapshot.docs.map((doc)=>{
                        const data = doc.data()
                        return new TaskModel(doc.id, data.descriptions, data.state, data.assigned, data.createdBy, data.posted)
                    })
                    const model = new TaskArchieveModel(order, date, tasks)
                    res(model)
                }).catch((error)=> {
                    const model = new TaskArchieveModel(order, date, [])
                    res(model)
                })
            })    
        }

        var dates = [] 
        switch(filter) {
            case ArchiveFilter.LAST_7_DAYS:
                dates = DateUtil.last7days()
                break
            case ArchiveFilter.LAST_14_DAYS:
                dates = DateUtil.last14days()
                break
            case ArchiveFilter.LAST_21_DAYS: 
                dates = DateUtil.last21days()
                break
            default:
                dates = []
                break
        } 

        var promises = []
        for (var i = 0; i < dates.length; i++) {
            var dateObj = dates[i]
            promises.push(fetchByDate(userId, i+1, dateObj.date))
        }

        Promise.all(promises).then((archiveModels)=>{
            resolve(archiveModels)
        }).catch((error)=> {
            reject(error)
        })
    })
}

const archiveUserTask = (userId, task) => {

    return new Promise((resolve, reject) => {

        if (userId === null) { reject(new Error("UserId cannot be null")) }
        if (userId.length === 0) { reject(new Error("UserId cannot be null")) }
        var taskId = task.id
        var now = new Date()
        var dateString = DateUtil.yyyyMMdd(now)
        var archivedTask = {
            
            descriptions : task.descriptions,
            posted : task.posted,
            lastModified : new Date(),
            createdBy : userId,
            state : task.state,
            assigned : task.assigned
        }

        const db = firebase.firestore()
        db.collection("archives").doc(userId).collection(dateString).doc(taskId).set(archivedTask, { merge: true }).then(() => {
            resolve()   
        }).catch((error) => {
            reject(error)
        })
    })
}

export default { getUserTasks, saveUserTasks, deleteArchivedTask, getArchiveUserTasks, archiveUserTask, restoreArchivedUserTask }