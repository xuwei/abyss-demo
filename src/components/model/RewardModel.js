const RewardLevel = {
    level1 : 10,
    level2 : 100,
    level3 : 200,
    level4 : 400,
    level5 : 800,
    level6 : 1600,
    level7 : 3200,
    level8 : 6400,
    level9 : 12800,
    level10 : 25600,
    level11 : 51200,
    level12 : 102400,
    levelMax : -1
}

const currentGoal = (level) => {
    switch(level) {
        case 1:
            return RewardLevel.level1
        case 2:
            return RewardLevel.level2
        case 3:
            return RewardLevel.level3
        case 4:
            return RewardLevel.level4
        case 5:
            return RewardLevel.level5
        case 6:
            return RewardLevel.level6
        case 7:
            return RewardLevel.level7
        case 8:
            return RewardLevel.level8
        case 9:
            return RewardLevel.level9
        case 10:
            return RewardLevel.level10
        case 11:
            return RewardLevel.level11
        case 12:
            return RewardLevel.level12
        default:
            return RewardLevel.levelMax
    }
}

class RewardModel {
    constructor(userId, claps, level = 1) {
        this.userId = userId
        this.claps = claps
        this.level = level
        this.goal = currentGoal(level)
        this.progress = Math.floor(((parseInt(this.claps) / parseInt(this.goal)) * 100))
    }
}

export default RewardModel