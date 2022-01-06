import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:4000/',
    withCredentials: true
})

const getCryptos = async (keywords=null) => {
    // const keywordsString = keywords ? `?cmids=${keywords.join(',')}` : '';
    // console.log("keywords", keywordsString);
    return (await API.get('cryptos')).data;
}

// const getCryptos = async(keywords=null) => {
//     const keywordsString = keywords ? `?cmids=${keywords.join(',')}` : '';
//     console.log(keywordsString);
//     return (await API.get('cryptos'+keywordsString)).data;
// }

const getCryptoInfo = async (coin) => {
    const config = {
        headers: { "x-access-token": localStorage.getItem("token") },
    }
    return (await API.get(`cryptos/${coin}`, config)).data;
}

const getArticles = async (queries = null) => {
    const queryString = queries ? `?id=${queries.join(',')}` : '';
    return (await API.get('articles' + queryString)).data;
}

const getSources = async () => {
    return (await API.get(`articles/sources`)).data;
}

const getArticlesFromSource = async (source) => {
    return (await API.get(`articles/${source}`)).data
}

const login = async (payload) => {
    try {
        return (await API.post('users/login', payload)).data;
    } catch (e) {
        console.log(e)
        return false;
    }
}

const logout = async () => {
    try {
        const config = {
            headers: { "x-access-token": localStorage.getItem("token") },
        }
        let user = parseJwt(localStorage.getItem('token'))
        return (await API.post('users/logout/' + user.id, config)).data;
    } catch (e) {
        console.log(e)
        return false;
    }
}

function parseJwt(token) {
    if (!token) { return; }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
}

const currentUser = async () => {
    try {
        const config = {
            headers: { "x-access-token": localStorage.getItem("token") },
        }
        let user = parseJwt(localStorage.getItem('token'))
        return (await API.get('users/profile/' + user.id, config)).data;
    } catch (e) {
        console.log(e)
        return false;
    }
}

const currentUserUpdate = async (payload) => {
    try {
        return (await API.put('users/profile', payload)).data;
    } catch (e) {
        console.log(e)
        return false;
    }
}

const register = async (payload) => {
    try {
        return (await API.post('users/register/', payload)).data;
    } catch (e) {
        console.log(e)
        return false;
    }
}

const addArticle = async (payload) => {
    try {
        return (await API.post('articles', payload)).data;
    } catch (e) {
        console.log(e)
        return false;
    }
}

const addCrypto = async (payload) => {
    try {
        return (await API.post('cryptos', payload)).data;
    } catch (e) {
        console.log(e)
        return false;
    }
}

export default {
    getCryptos,
    getCryptoInfo,
    getArticles,
    getSources,
    getArticlesFromSource,
    login,
    logout,
    currentUser,
    currentUserUpdate,
    register,
    addArticle,
    addCrypto
}