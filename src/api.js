import axios from "axios"

const baseUrl = 'https://backend-project-news-api-f5wp.onrender.com/api/'

export const getAllArticles = () => {
    return axios.get(baseUrl+'articles').then(({data}) => {
        return data
    })
}

export const getArticleById = (id) => {
    return axios.get(baseUrl+'articles/'+id).then(({data}) => {
        return data
    })
}

export const convertTime = (time) => {
    return(time.split('T')[0])
}