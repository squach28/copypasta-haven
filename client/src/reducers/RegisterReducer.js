export const registerReducer = (state, action) => {
    switch(action.type) {
        case 'USERNAME_EMPTY':
            return state.map(err => {
                if(err.name === 'username') {
                    err.status = true
                    err.message = 'Username cannot be empty'
                }

                return err
            })

            case 'USERNAME_NOT_EMPTY':
                return state.map(err => {
                    if(err.name === 'username') {
                        err.status = false
                        err.message = ''
                    }
    
                    return err
                })
            
            case 'USERNAME_TAKEN':
                return state.map(err => {
                    if(err.name === 'username') {
                        err.status = true
                        err.message = 'Username is already taken'
                    }
                    return err
                })

            case 'USERNAME_CLEAR_ERROR':
                return state.map(err => {
                    if(err.name === 'username') {
                        err.status = false
                        err.message = ''
                    }
    
                    return err
                })

            case 'EMAIL_EMPTY':
                return state.map(err => {
                    if(err.name === 'email') {
                        err.status = true
                        err.message = 'Email cannot be empty'
                    }
        
                    return err
                })
        
        
            case 'EMAIL_NOT_EMPTY':
                return state.map(err => {
                    if(err.name === 'email') {
                        err.status = false
                        err.message = ''
                    }
            
                    return err
            })

            case 'EMAIL_INVALID':
                return state.map(err => {
                    if(err.name === 'email') {
                        err.status = true
                        err.message = 'Email is not valid'
                    }
                    return err
                })

                case 'EMAIL_TAKEN':
                    return state.map(err => {
                        if(err.name === 'email') {
                            err.status = true
                            err.message = 'Email is already taken'
                        }
                        return err
                    })

                    case 'EMAIL_CLEAR_ERROR':
                        return state.map(err => {
                            if(err.name === 'email') {
                                err.status = false
                                err.message = ''
                            }
                            return err
                        })

        



            case 'PASSWORD_EMPTY':
                return state.map(err => {
                    if(err.name === 'password') {
                        err.status = true
                        err.message = 'Password cannot be empty'
                    }
    
                    return err
                })
    


            case 'PASSWORD_NOT_EMPTY':
                return state.map(err => {
                    if(err.name === 'password') {
                        err.status = false
                        err.message = ''
                    }
        
                    return err
                })

            case 'CONFIRM_PASSWORD_EMPTY':
                return state.map(err => {
                    if(err.name === 'confirmPassword') {
                        err.status = true
                        err.message = 'Password cannot be empty'
                    }
        
                    return err
                })
        
            case 'CONFIRM_PASSWORD_NOT_EMPTY':
                return state.map(err => {
                    if(err.name === 'confirmPassword') {
                        err.status = false
                        err.message = ''
                    }
            
                    return err
                })

            case 'MISMATCHING_PASSWORDS':
                return state.map(err => {
                    if(err.name === 'mismatchingPasswords') {
                        err.status = true
                        err.message = 'Passwords do not match'
                    }
                    return err
                })

            case 'MATCHING_PASSWORDS':
                return state.map(err => {
                    if(err.name === 'mismatchingPasswords') {
                        err.status = false
                        err.message = ''
                    }
                    return err
                }) 

                default: 
                    return state
    }
}