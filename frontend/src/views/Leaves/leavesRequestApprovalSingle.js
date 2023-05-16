const LeavesRequestApprovalSingle = ({ record }) => {
  return (
      <tr>
      <td>{record.userId}</td>
      <td>{record.userName}</td>
      <td>{record.recordDate}</td>
      <td>{record.startDate}</td>
      <td>{record.endDate}</td>
      <td>{record.noOfDays}</td>
      <td>{record.leaveType}</td>
      <td>{record.comment}</td>
      <td>{record.relief}</td>
      <td>{record.status}</td>
      <td>
        <a href={"./leaveRequestApprovalForm/" + record._id}>
          <button className="blueButton">Update</button>
        </a>
      </td>
      </tr>
  );
};

export default LeavesRequestApprovalSingle;