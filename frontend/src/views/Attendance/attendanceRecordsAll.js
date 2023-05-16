import { useEffect, useState } from "react";
import AttendanceRecordsSingle from "./attedanceRecordsSingle";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./leavepage.css";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const AttendanceRecordsDetails = () => {
  const [records, setRecords] = useState(null);
  const [search, setSearch] = useState("");
  const [searchDate, setSearchDate] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const fetchAllRecords = async () => {
      const response = await fetch("/api/attendance/allAttendanceRecords");
      const json = await response.json();
      if (response.ok) {
        setRecords(json);
      }
    };
    fetchAllRecords();
  }, []);

  const handleSearchDateChange = (date) => {
    const searchDate = new Date(date)
    const searchDatelocal = date.toLocaleDateString("en-GB");
    setSearchDate(searchDatelocal);
    setSelectedDate(searchDate)
  };

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
        { text: "Employee Attendance Records", style: "header" },
        {
          table: {
            headerRows: 1,
            widths: ["*", "*", "*", "*", "*", "*", "*", "*"],
            body: [
              [
                { text: "User Id", style: "tableHeader" },
                { text: "Employee Name", style: "tableHeader" },
                { text: "Record Date", style: "tableHeader" },
                { text: "In Time", style: "tableHeader" },
                { text: "In Time Comment", style: "tableHeader" },
                { text: "Out Time", style: "tableHeader" },
                { text: "Out Time Comment", style: "tableHeader" },
                { text: "Total time", style: "tableHeader" },
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
                  { text: record.inTime, style: "tableCell" },
                  { text: record.inTimeComment, style: "tableCell" },
                  { text: record.outTime, style: "tableCell" },
                  { text: record.outTimeComment, style: "tableCell" },
                  { text: record.totalTime, style: "tableCell" },
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
    pdfDocGenerator.download("Attendance-Data.pdf");
  };

  return (
    <div>
      <input
        type="text"
        style={{ width: "500px" }}
        placeholder="Search By ID or Name"
        className="inputSearch"
        onChange={(e) => setSearch(e.target.value)}
      ></input>
      {/* <DatePicker
          placeholderText={"dd/mm/yyyy"}
          selected={selectedDate}
          onChange={handleSearchDateChange}
        /> */}
      <button
        onClick={() => createPDF(records)}
        title="Download PDF"
        className="pdfBtn"
      >
        <i class="fa-solid fa-file-pdf"></i>
      </button>
      <br />
      <table id="attTbl">
        <thead>
          <tr>
            <th>User Id</th>
            <th>Name</th>
            <th>Record Date</th>
            <th>In Time</th>
            <th>In Time Comment</th>
            <th>Out Time</th>
            <th>Out Time Comment</th>
            <th>Total time</th>
            <th>Delete</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {records &&
            records
              .filter((record) => {
                if (search === "" && searchDate===null) {
                  return record;
                } else if (
                  record.userId.toLowerCase().includes(search.toLowerCase()) ||
                  record.userName.toLowerCase().includes(search.toLowerCase())
                ) {
                  return record;
                }
              })
              .map((record) => (
                <AttendanceRecordsSingle key={record._id} record={record} />
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceRecordsDetails;
