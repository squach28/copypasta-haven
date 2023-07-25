export const postReducer = (state, action) => {
    switch(action.type) {
        case 'TITLE_EMPTY':
            return state.map(err => {
                if(err.name === 'title') {
                    err.status = true
                    err.message = 'Title cannot be empty'
                }

                return err
            })



            case 'TITLE_NOT_EMPTY':
                return state.map(err => {
                    if(err.name === 'title') {
                        err.status = false
                        err.message = ''
                    }
    
                    return err
                })

                case 'CONTENT_EMPTY':
                    return state.map(err => {
                        if(err.name === 'content') {
                            err.status = true
                            err.message = 'Content cannot be empty'
                        }
        
                        return err
                    })
        
        
        
                    case 'CONTENT_NOT_EMPTY':
                        return state.map(err => {
                            if(err.name === 'content') {
                                err.status = false
                                err.message = ''
                            }
            
                            return err
                        })
                    

                    default:
                        return state
    }

}