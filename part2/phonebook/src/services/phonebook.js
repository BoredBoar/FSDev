import axios from 'axios'
const url = 'https://cryptic-shelf-25222.herokuapp.com/api/persons'

const getAll =  () => {
    const request = axios.get(url)
    return request.then(response => response.data)
}

const create = newPerson => {
    const request = axios.post(url,newPerson)
    return request.then(response => response.data)
}

const update = updatePerson => {
    const request = axios.put(`${url}/${updatePerson.id}`, updatePerson)
    return request.then(response => response.data)
}

const remove = deleteID => {
    const request = axios.delete(`${url}/${deleteID}`)
    return request.then(response => response.data)
}

export default {getAll, create, update, remove}