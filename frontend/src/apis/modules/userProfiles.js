import auth from "../axios"
const resource = '/api'

export default {
    getAllUserProfiles: () => auth.get(`${resource}/userProfile/getAll`),
    // createUserProfiles: (payload) => api.post(`${resource}`),
    // updateUserProfiles: (id, payload) => api.patch(`${resource}/${id}`, payload),
    // deleteUserProfiles: (id) => api.delete(`${resource}/${id}`),
    // searchUserProfiles: () => api.get(``)
}

