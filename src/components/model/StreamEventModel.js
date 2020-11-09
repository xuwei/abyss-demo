const StreamFilter = {
    GLOBAL_STREAM : 'GlobalStream', 
    FRIENDS_STREAM : 'FriendsStream',
    TEAM_STREAM : 'TeamStream'
}

const StreamEventType = {
    CreatedTask : 'CreatedTask',
    CompletedTask : 'CompletedTask',
    ActiveOnline : 'ActiveOnline',
    ArchivedTask : 'Archived',
    GaveClaps : "GaveClaps"
}


class StreamEventModel {
    constructor(id, eventType, postedBy, avatarUrl, country, displayName, created, descriptions) {
        this.id = id
        this.eventType = eventType
        this.postedBy = postedBy
        this.avatarUrl = avatarUrl
        this.country = country
        this.displayName = displayName
        this.created = created
        this.descriptions = descriptions
        this.timeAgo = ""
        this.claps = 0
    }
}

export default StreamEventModel
export { StreamEventType, StreamFilter }