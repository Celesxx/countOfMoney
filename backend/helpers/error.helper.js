

exports.contentNotFound = (res, type, request, id) => 
{   
    return res.status(404).json(
    {
        state: false,
        message: `The ${type} was not ${request}`,
        error: `The ${type} was not found with the following id : ${id}.`
    })
}

exports.contentEmpty = (res, type) => 
{   
    return res.status(200).json(
    {
        state: true,
        message: `The ${type} is empty`,
        data: []
    })
}

exports.contentFoundId = (res, type, request, id) => 
{   
    return res.status(200).json(
    {
        state: true,
        message: `The ${type} has been successfully ${request} !`,
        id: id,
    })
}

exports.contentFound = (res, type, request, data) => 
{   
    return res.status(200).json(
    {
        state: true,
        message: `The ${type} has been successfully ${request} !`,
        data: data,
    })
}

exports.contentFoundIdToken = (res, type, request, id, token) => 
{   
    return res.status(200).json(
    {
        state: true,
        message: `The ${type} has been successfully ${request} !`,
        id: id,
        token: token,
    })
}

exports.contentError = (res, type, request, error) => 
{   
    return res.status(400).json(
    {
        state: false,
        message: `The ${type} has not been ${request}`,
        error: `An error append during the process, the following error is : ${error.message }` 
    }) 
}

exports.contentNoAccess = (res, role) => 
{   
    return res.status(403).json(
    {
        state: false,
        message: `You dont have the right access with the role ${role}`
    }) 
}

exports.contentNotAuth = (res, auth, message, error) => 
{   
    return res.status(401).json(
    {
        state: false,
        isAuth: auth,
        message: message,
        error: error
    }) 
}