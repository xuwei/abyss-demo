const StateOfTask = {
    Pending : 'p', 
    Edit : 'e',
    Done : 'd'
}

class TaskModel {
    constructor (id, descriptions, state, assigned, createdBy, posted) {
        this.id = id
        this.descriptions = descriptions
        this.state = state
        this.assigned = assigned
        this.createdBy = createdBy
        this.posted = posted
    }
}

export default TaskModel
export { StateOfTask }