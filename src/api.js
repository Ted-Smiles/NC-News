import axios from "axios"

const Client = axios.create({
    baseURL: 'https://backend-project-news-api-f5wp.onrender.com/api/',
    timeout: 10000,
})

export const getAllUSers = () => {
    return Client.get('users').then(({data}) => {
        return data
    })
}

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

export const getAllCommentFromId = (id, page) => {
    return Client.get('articles/'+id+'/comments?p='+page).then(({data}) => {
        return data
    })
}

export const changeArticleVote = (id, change) => {
    const increment = change === '+' ? 1 : -1
    return Client.patch('articles/'+id, {inc_votes: increment})
}

export const changeCommentVote = (id, body) => {
    const increment = body === '+' ? 1 : -1
    return Client.patch('comments/'+id, {inc_votes: increment})
}

export const postNewComment = (id, comment) => {
    const {author, body} = comment
    return Client.post('articles/'+id+'/comments', {author, body})
}

export const convertTime = (time) => {
    return(time.split('T')[0])
}