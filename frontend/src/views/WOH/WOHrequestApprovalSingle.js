const WOHrequestApprovalSingle = ({ record }) => {
  return (
      <tr>
      <td>{record.userId}</td>
      <td>{record.userName}</td>
      <td>{record.recordDate}</td>
      <td>{record.requestedDate}</td>
      <td>{record.comment}</td>
      <td>{record.status}</td>
      <td>
        <a href={"./WOHrequestApprovalForm/" + record._id}>
          <button className="appButton">Approve/Reject</button>
        </a>
      </td>
      </tr>
  );
};
export default WOHrequestApprovalSingle;
