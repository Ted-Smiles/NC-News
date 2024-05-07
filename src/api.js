import axios from "axios"

const Client = axios.create({
    baseURL: 'https://backend-project-news-api-f5wp.onrender.com/api/',
    timeout: 1000,
})

export const getAllArticles = () => {
    return Client.get('articles').then(({data}) => {
        return data
    })
}

export const getArticleById = (id) => {
    return Client.get('articles/'+id).then(({data}) => {
        return data
    })
}

export const getAllCommentFromId = (id) => {
    return Client.get('articles/'+id+'/comments').then(({data}) => {
        return data
    })
}

export const changeArticleVote = (id, change) => {
    const increment = change === '+' ? 1 : -1
    return Client.patch('articles/'+id, {inc_votes: increment})
}

export const changeCommentVote = (id, change) => {
    const increment = change === '+' ? 1 : -1
    return Client.patch('comments/'+id, {inc_votes: increment})
}

export const convertTime = (time) => {
    return(time.split('T')[0])
}