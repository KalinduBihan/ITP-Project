import api from "../axios";
const resource = '/api/userProfileStat';

export default {
    getProfileByGender: () => api.get(`${resource}/profGenderCount/`),
    getProfileByRole: () => api.get(`${resource}/profRoleCount/`)
}