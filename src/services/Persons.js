import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {

    const response = axios.get(baseUrl)
    return response.then(response => response.data).catch(error => console.log("axios.get failed: " + error))
}

const create = (newObject) => {
    const response = axios.post(baseUrl, newObject)
    return response.then(response => response.data).catch(error => console.log("axiso.post failed: " + error))
}

const remove = (id) => {
    const response = axios.delete(baseUrl + "/" + id)
    return response.then(response => response.data).catch(error => console.log("axios.delete failed: " + error))
}

const update = (id, newObject) => {
    const response = axios.put(baseUrl + "/" + id, newObject)
    return response.then(response => response.data).catch(error => console.log("axios.put failed:" + error))
}

export default { getAll, create, remove, update }