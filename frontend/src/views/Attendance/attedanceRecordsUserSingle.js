const AttendanceRecordsUserSingle = ({ record }) => {
  return (
    <tr>
      <td>{record.recordDate}</td>
      <td>{record.inTime}</td>
      <td>{record.inTimeComment}</td>
      <td>{record.outTime}</td>
      <td>{record.outTimeComment}</td>
      <td>{record.totalTime}</td>
    </tr>
  );
};
export default AttendanceRecordsUserSingle;
