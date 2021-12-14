document.getElementById("loginForm").addEventListener("submit",(event)=>{
    event.preventDefault()
})

firebase.auth().onAuthStateChanged((user)=>{
    if(user){
        location.replace("welcome.html")
    }
})

auth.onAuthStateChanged(user => {
    if (user) {
        console.log(user)
        userLoggedIn(user)
    } else {
        console.log("No user is signed in.. Sign Up")
    }
})

const signUpUser = (email, pass) => {
    auth.createUserWithEmailAndPassword(email, pass)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            errorHandler(err)
        })
}

const signInUser = (email, pass) => {
    auth.signInWithEmailAndPassword(email, pass)
        .then(res => {
            // No need of handling anything here auth.onAuthStateChanged function got this
            console.log("Signed In")
                // console.log(res)
        })
        .catch(err => {
            errorHandler(err)
        })
}

const signOutUser = () => {
    auth.signOut()
        .then(() => {
            console.log("You are signed out")
            userLoggedOut()
        })
        .catch(err => {
            console.log(err)
            errorHandler(err)
        })
}

const verifyEmail = () => {
    const user = auth.currentUser
    user.sendEmailVerification()
        .then(() => {
            errorHandler({ message: "Email is sent.\nCheck your Mail's." }, true)
        })
        .catch(err => {
            errorHandler(err)
        })
}

const resetPassword = (email) => {
    auth.sendPasswordResetEmail(email)
        .then(() => {
            errorHandler({ message: "Email is sent.\nCheck your Mail's." }, true)
        })
        .catch(err => {
            errorHandler(err)
        })
}
