export const isUsernameTaken = async (username) => {
    console.log(username)
    const res = await fetch(`http://localhost:8080/api/users/userByUsername/${username}`)
    .then(res => res.json())

    return res
}

export const isEmailTaken = async (email) => {
    const res = await fetch(`http://localhost:8080/api/users/userByEmail/${email}`)
    .then(res => res.json())
    
    return res
}

export const getUserLikedCopypastas = async (userId) => {
    const res = await fetch(`http://localhost:8080/api/users/user/${userId}/likes`)
        .then(res => res.json())
    return res 
}