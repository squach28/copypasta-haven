export const loginReducer = (state, action) => {
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
        

                case 'USER':
                    return state.map(err => {
                        if(err.name === 'user') {
                            err.status = action.status !== undefined? action.status : true
                            err.message = action.message
                        }
                        return err
                    })

        default: 
            return state
    }
    
}