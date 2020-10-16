import { auth, provider } from '../../Firebase.js';
import { reactLocalStorage } from 'reactjs-localstorage';

const subscribedPlan = ()=> {
    return new Promise((resolve, reject) => {
        fetchUser().then((user)=> {
            resolve(user.claim)
        }).catch((err) => {
            reject(err)
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

const login = ()=> {
    return new Promise((resolve, reject) => {
        auth.signInWithPopup(provider).then((result, error) => {
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

export default { fetchUser, subscribedPlan,  login, loginAnonymously, logout }