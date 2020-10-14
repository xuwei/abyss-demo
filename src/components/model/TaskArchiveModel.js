const ArchiveFilter = {
    LAST_7_DAYS : '7', 
    LAST_30_DAYS : '30',
    LAST_90_DAYS : '90'
}

// represent 1 section of archieve results
class TaskArchieveModel {
    constructor (dateString, tasks) {
        this.dateString = dateString
        this.tasks = [...tasks]
    }
}

export default TaskArchieveModel
export { ArchiveFilter }