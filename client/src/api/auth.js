export const login = async (user) => {
    const res = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify(user)
    })
    .then(res => res.json())

    return res
}

export const register = async (user) => {
    const res = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(res => res.json())

    return res
}