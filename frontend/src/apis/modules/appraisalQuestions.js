import api from "../axios";
const resource = '/api/appraisal';

export default {
    getAppraisalQuestions: () => api.get(`${resource}/appraisalquestions`),
    getAppraisalQuestion: (id) => api.get(`${resource}/appraisalquestions/${id}`),
    createAppraisalQuestion: (payload) => api.post(`${resource}/appraisalquestions`, payload),
    updateAppraisalQuestion: (id, payload) => api.patch(`${resource}/appraisalquestions/${id}`, payload),
    deleteAppraisalQuestion: (id) => api.delete(`${resource}/appraisalquestions/${id}`),
}
