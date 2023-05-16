import api from "../axios";
const resource = '/api/goalStat';

export default {
    getGoalByCatergory: () => api.get(`${resource}/goalCatCount/`),
    getGoalByStatus: () => api.get(`${resource}/goalStatusCount/`)
}