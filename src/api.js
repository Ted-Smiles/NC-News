import axios from "axios"

const baseUrl = 'https://backend-project-news-api-f5wp.onrender.com/api/'

export const getAllArticles = () => {
    return axios.get(baseUrl+'articles').then(({data}) => {
        console.log(data)
        return data
    })
}

export const convertTime = (time) => {
    return(time.split('T')[0])
}