import api from "../axios";
const resource = '/api/appraisal';

export default {
    getAllAppraisals: () => api.get(`${resource}/appraisalrequest/all`),
    getSingleAppraisalProcess: (id) => api.get(`${resource}/appraisalprocess/${id}`),
    createAppraisalProcess: (payload) => api.post(`${resource}/appraisalprocess`, payload),
    markAppraisal: (payload) => api.post(`${resource}/markappraisal`, payload),
    updateAppraisalProcess: (id, payload) => api.patch(`${resource}/appraisalprocess/${id}`, payload),
    closeAppraisalProcess: (id) => api.patch(`${resource}/closeprocess/${id}`),
    getAppraisalRequestForUser: () => api.get(`${resource}/appraisalrequest`),
    getMyAppraisals: () => api.get(`${resource}/myappraisals`),
    deleteAppraisalProcess: (id) => api.delete(`${resource}/appraisalprocess/${id}`),
    acceptAppraisalRequest: (payload) => api.patch(`${resource}/accept`, payload),
    declineAppraisalRequest: (payload) => api.patch(`${resource}/decline`, payload),

    // getAllUserProfiles: () => api.get('/auth/userProfile/getAll')
}
