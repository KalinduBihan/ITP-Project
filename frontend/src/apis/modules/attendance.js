import api from "../axios";
const resource = '/api/attendance';

export default {

    // get All Attendance Records
    getAllAttendanceRecords:() => api.get(`${resource}/allAttendanceRecords`),
    
    // get one Attendance Record
    getAttendanceRecord:(id)=> api.get(`${resource}/attendanceRecords/${id}`),
    
    //enter in time
    enterInTime:(userId,payload)=>api.post(`${resource}/attendanceRecords/inTime/${userId}`,payload),
    
    //enter out time
    enterOutTime:(userId,payload)=>api.patch(`${resource}/attendanceRecords/outTime/${userId}`,payload),
    
    //get all the attendance records of one user
    getUserAllAttendanceRecords:(userId)=>api.get(`${resource}/userAttendanceRecords/${userId}`),
    
    //delete an attendance record
    deleteAttendanceRecord:(id)=>(`${resource}/deleteAttendanceRecords/${id}`),
    
    //update an attendance record
    updateAttendanceRecord:(id,payload)=>(`${resource}//updateAttendanceRecord/${id}`,payload)
}
