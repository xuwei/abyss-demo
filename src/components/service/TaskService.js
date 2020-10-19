import firebase from '../../Firebase.js'
import TaskModel from '../model/TaskModel.js'
import DateUtil from '../util/DateUtil'

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

const getArchiveUserTasks = (userId, filter) => {
    // var now = new Date() 
    // var dates = []
    
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

export default { getUserTasks, saveUserTasks, getArchiveUserTasks, archiveUserTask }