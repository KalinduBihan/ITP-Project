import api from "../axios";
const resource = '/api/empGoal';

export default {
   
    getGoalByEmmployee: (id) => api.get(`${resource}/EmployeeGoal/${id}`),
   
}