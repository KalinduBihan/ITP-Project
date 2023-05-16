import api from "../axios";
const resource = '/api/AssignGoal';

export default {
    getAllgoalAssign: () => api.get(`${resource}/goalAssign`),
    getOnegoalAssign: (id) => api.get(`${resource}/goalAssign/${id}`),
    creategoalAssign: (payload) => api.post(`${resource}/goalAssign`, payload),
    updategoalAssign: (id, payload) => api.patch(`${resource}/goalAssign/${id}`, payload),
    deletegoalAssign: (id) => api.delete(`${resource}/goalAssign/${id}`),
}