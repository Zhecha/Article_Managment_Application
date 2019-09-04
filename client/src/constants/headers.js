export const headerPostPut = (token) => {
    return  {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }
}

export const headerGet = (token) => {
    return {
        headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
            Accept: "application/json",
        }
    }
}