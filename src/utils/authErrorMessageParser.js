export default function(errorCode){

    switch(errorCode){

        case "auth/invalid-email":
            return("Invalid email")
        case "auth/user-not-found":
            return("User not found")
        case "auth/weak-password":
            return("Weak password")
        case "auth/email-already-in-use":
                return("Email already in use")
        case "auth/invalid-login":
                return("Invalid login")  
            
        default :
            return(errorCode)    
    }
}