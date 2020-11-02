import FeedbackModel from '../model/FeedbackModel'
import { StaticImages } from '../Configs'

const getFeedbacks = ()=> {
    var feedbacks = []

    const user02 = new FeedbackModel("This is just so intuitive! I don't need to fiddle around too much, just focus on my school work.",
    StaticImages.user02, "Ezequiel", "Law student")
    feedbacks.push(user02)

    const user04 = new FeedbackModel("Alot of people ends up with an unrealistic list of todo items. TodoCloud keeps me on track on what's possible TODAY !!!",
    StaticImages.user04, "Emma", "Business consultant")
    feedbacks.push(user04)

    const user06 = new FeedbackModel("WFH has been so stressful for me and my team. Eventually, we decided to simplify tasking as much as we can with todocloud.",
    StaticImages.user06, "Michael", "Product manager")
    feedbacks.push(user06)

    const user05 = new FeedbackModel("I just can't be bothered to waste time on fancy software. Glad I found todocloud.",
    StaticImages.user05, "Anastasia", "Personal trainer")
    feedbacks.push(user05)

    const user07 = new FeedbackModel("I love the firework effects when my task is completed. The aesthetics is important, as long as it does the job.",
    StaticImages.user07, "Michelle", "Finance student")
    feedbacks.push(user07)

    const user08 = new FeedbackModel("Todocloud is perfect. There was way too many buttons and things I can do on other platforms. Things that I just don't give a f*** about.",
    StaticImages.user08, "Dave", "Mechanic")
    feedbacks.push(user08)

    const user09 = new FeedbackModel("I got my kids to use my todocloud account for track their homework items. Keeps them focused on deliverables each week.",
    StaticImages.user09, "Wendy", "Mum")
    feedbacks.push(user09)

    const user10 = new FeedbackModel("Jira has always been the standard tool for us to manage our tickets. But it was stressful for us to manage having to WFH. Glad our team moved to todocloud.",
    StaticImages.user10, "Ella", "IT support")
    feedbacks.push(user10)

    return feedbacks
}

export default { getFeedbacks }