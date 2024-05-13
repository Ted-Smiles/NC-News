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

export const getAllArticles = (topic, sort, order, page) => {
    const params = {
        order,
        p: page
    }

    if (topic !== '') {
        params.topic = topic
    }
    if (sort !== '') {
        params.sort_by = sort
    }

    return Client.get('articles', { params
      }).then(({data}) => {
        return data
    })
}

export const getAllTopics = () => {
    return Client.get('topics').then(({data}) => {
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

export const deleteComment = (id) => {
    return Client.delete('comments/'+id)
}

export const convertTime = (time) => {
    return(time.split('T')[0])
}