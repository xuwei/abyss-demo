import { auth, googleProvider, fbProvider } from '../../Firebase.js';
import { reactLocalStorage } from 'reactjs-localstorage';

const ProviderType = {
    UNKNOWN : "unknown",
    GUEST : "anonymous",
    GOOGLE : "google.com",
    FACEBOOK : "facebook.com"
}

const subscribedPlan = ()=> {
    return new Promise((resolve, reject) => {
        fetchUser().then((user)=> {
            resolve(user.claim)
        }).catch((err) => {
            reject(err)
        })
    })    
}

const currentProvider = () => {
    if (auth.currentUser === null) return ProviderType.UNKNOWN
    return auth.currentUser.providerData.length > 0 ? 
    auth.currentUser.providerData[0].providerId : ProviderType.GUEST
}

const loginFb = ()=> {
    return new Promise((resolve, reject) => {
        auth.signInWithPopup(fbProvider).then((result, error) => {
            if (error) {
                reject(error)
                return
            }
            const loggedInUser = result.user
            reactLocalStorage.setObject('user', loggedInUser)
            resolve(loggedInUser)
        })
    })
}

const loginAnonymously = ()=> {
    return new Promise((resolve, reject) => {
        auth.signInAnonymously().then((result, error) => {
            if (error) {
                reject(error)
                return
            }
            const loggedInUser = result.user
            reactLocalStorage.setObject('user', loggedInUser)
            resolve(loggedInUser)
        })
    })
}

const linkAnonymousToProvider = (provider)=> {
    return new Promise((resolve, reject) => {
        auth.currentUser.linkWithPopup(provider).then((result)=>{
            resolve(result)
        }).catch((error)=>{
            reject(error)
        })
    })
}

const loginGmail = ()=> {
    return new Promise((resolve, reject) => {
        auth.signInWithPopup(googleProvider()).then((result, error) => {
            if (error) {
                reject(error)
                return
            }
            const loggedInUser = result.user
            reactLocalStorage.setObject('user', loggedInUser)
            resolve(loggedInUser)
        })
    })
}

const logout = ()=> {
    return new Promise((resolve) => {
        auth.signOut().then(()=>{
            reactLocalStorage.remove('user')
            resolve()
        })
    })
}

const fetchUser = ()=> {
    return new Promise((resolve, reject) => {
        var existingUser = reactLocalStorage.getObject('user');
        if (existingUser.email) {
            resolve(existingUser)    
            return 
        }

        auth.onAuthStateChanged((user, error) => {
            // handling error if there's any 
            if (error) {
                reject(error)
                return
            }

            if (user) {
                reactLocalStorage.setObject('user', user);
                resolve(user)
            } else {
                resolve(null)
            }
        })
    })
}

export default { fetchUser, subscribedPlan,  loginGmail, loginFb, loginAnonymously, 
    logout, currentProvider, linkAnonymousToProvider }
export { ProviderType }