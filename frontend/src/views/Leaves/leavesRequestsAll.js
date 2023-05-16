import { useEffect, useState } from "react";
import LeavesRequestsAllSingle from "./leavesRequestsAllSingle";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const LeavesRequestsAll = () => {
  const [records, setRecords] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchAllRecords = async () => {
      const response = await fetch("/api/leaves/allLeaveRecords");
      const json = await response.json();
      if (response.ok) {
        setRecords(json);
      }
    };
    fetchAllRecords();
  }, []);

  const styles = {
    table: {
      padding: 5,
    },
    header: {
      fontSize: 18,
      bold: true,
      margin: [0, 0, 0, 10],
    },
    subheader: {
      fontSize: 14,
      bold: true,
      margin: [0, 10, 0, 5],
    },
    tableExample: {
      margin: [0, 5, 0, 15],
    },
    tableHeader: {
      bold: true,
      fontSize: 13,
      color: "black",
    },
    tableCell: {
      fontSize: 12,
      color: "black",
    },
  };

  const createPDF = (records) => {
    const documentDefinition = {
      content: [
        { text: "Employee Leave Records", style: "header" },
        {
          table: {
            headerRows: 1,
            body: [
              [
                { text: "User Id", style: "tableHeader" },
                { text: "Employee Name", style: "tableHeader" },
                { text: "Record Date", style: "tableHeader" },
                { text: "From Date", style: "tableHeader" },
                { text: "End Date", style: "tableHeader" },
                { text: "No of Days", style: "tableHeader" },
                { text: "Leave Type", style: "tableHeader" },
                { text: "Comment", style: "tableHeader" },
                { text: "Status", style: "tableHeader" },
                { text: "Relief", style: "tableHeader" }
              ],
              ...records
                .filter((record) => {
                  if (search === "") {
                    return record;
                  } else if (
                    record.userId
                      .toLowerCase()
                      .includes(search.toLowerCase()) ||
                    record.userName.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return record;
                  }
                })
                .map((record) => [
                  { text: record.userId, style: "tableCell" },
                  { text: record.userName, style: "tableCell" },
                  { text: record.recordDate, style: "tableCell" },
                  { text: record.startDate, style: "tableCell" },
                  { text: record.endDate, style: "tableCell" },
                  { text: record.noOfDays, style: "tableCell" },
                  { text: record.leaveType, style: "tableCell" },
                  { text: record.comment, style: "tableCell" },
                  { text: record.status, style: "tableCell" },
                  { text: record.relief, style: "tableCell" }
                ]),
            ],
          },
        },
      ],
      styles: styles,
      pageSize:'A3',
      pageSize:{
        width:1500,
        height:800
      },

    };

    const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
    pdfDocGenerator.download("Leave-Data.pdf");
  };
  return (
    <div>
      <input
        type="text"
        style={{ width: "500px" }}
        placeholder="Search By ID or Name"
        className="inputBar"
        onChange={(e) => setSearch(e.target.value)}
      ></input>
      <button
        onClick={() => createPDF(records)}
        title="Download PDF"
        className="pdfBtn"
      >
        <i className="fa-solid fa-file-pdf"></i>
      </button>
      <table  id="leaveTable">
      <thead>
        <tr>
        <th>User Id</th>
        <th>User Name</th>
        <th>Record Date</th>
        <th>From Date</th>
        <th>End Date</th>
        <th>No of Days</th>
        <th>Leave Type</th>
        <th>Comment</th>
        <th>Status</th>
        <th>Relief</th>
        <th>Delete</th>
        <th>Update</th>
        </tr>
      </thead>
        <tbody>
          {records &&
            records
              .filter((record) => {
                if (search === "") {
                  return record;
                } else if (
                  record.userId.toLowerCase().includes(search.toLowerCase()) ||
                  record.userName.toLowerCase().includes(search.toLowerCase())
                ) {
                  return record;
                }
              })
              .map((record) => (
                <LeavesRequestsAllSingle key={record._id} record={record} />
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeavesRequestsAll;
