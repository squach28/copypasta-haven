export const getUsernameForCopypasta = async (userId) => {
    const username = await fetch(`http://localhost:8080/api/users/user/username/${userId}`)
    .then(res => res.json())
    return username
}

export const isCopypastaLikedByUser = async (userId, postId) => {
    const res = await fetch(`http://localhost:8080/api/users/user/like?userId=${userId}&postId=${postId}`)
      .then(res => res.json())
      .catch(err => console.log(err))
    return res
}

export const isCopypastaDislikedByUser = async (userId, postId) => {
    const res = await fetch(`http://localhost:8080/api/users/user/dislike?userId=${userId}&postId=${postId}`)
      .then(res => res.json())
      .catch(err => console.log(err))
    return res
}

export const addCopypastaToUserLikes = async (userId, postId) => {
    const res = await fetch(`http://localhost:8080/api/users/user/addPostToLikes?userId=${userId}&postId=${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })
        .then(res => res.json())
    return res 
} 

export const addCopypastaToUserDislikes = async (userId, postId) => {
    const res = await fetch(`http://localhost:8080/api/users/user/addPostToDislikes?userId=${userId}&postId=${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })
        .then(res => res.json())
    return res 
} 

export const incrementCopypastaLikes = async (postId) => {
    const res = await fetch(`http://localhost:8080/api/copypasta/incrementCopypastaLikes/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })
        .then(res => res.json())
    
    return res
}

export const removeCopypastaFromUserLikes = async (userId, postId) => {
    const res = await fetch(`http://localhost:8080/api/users/user/removePostFromLikes?userId=${userId}&postId=${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })
        .then(res => res.json())
    return res 
} 

export const removeCopypastaFromUserDislikes = async (userId, postId) => {
    const res = await fetch(`http://localhost:8080/api/users/user/removePostFromDislikes?userId=${userId}&postId=${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })
        .then(res => res.json())
    return res 
} 

export const decrementCopypastaLikes = async (postId) => {
    const res = await fetch(`http://localhost:8080/api/copypasta/decrementCopypastaLikes/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })
        .then(res => res.json())
    
    return res
}