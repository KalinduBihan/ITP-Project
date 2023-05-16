import { useEffect, useState } from "react";
import WOHrequestsAllSingle from "./WOHrequestsAllSingle";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;


const WOHrequestsAll = () => {
  const [records, setRecords] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchAllRecords = async () => {
      const response = await fetch("/api/workonholiday/allWorkOnHolidayRecords");
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
        { text: "Employee Work on Holiday Records", style: "header" },
        {
          table: {
            headerRows: 1,
            widths: ["*", "*", "*", "*", "*", "*", "*"],
            body: [
              [
                { text: "User Id", style: "tableHeader" },
                { text: "Employee Name", style: "tableHeader" },
                { text: "Record Date", style: "tableHeader" },
                { text: "Requested Date", style: "tableHeader" },
                { text: "Comment", style: "tableHeader" },
                { text: "Status", style: "tableHeader" },
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
                  { text: record.requestedDate, style: "tableCell" },
                  { text: record.comment, style: "tableCell" },
                  { text: record.status, style: "tableCell" },
                ]),
            ],
          },
        },
      ],
      styles: styles,
    };

    const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
    pdfDocGenerator.download("Work_On_Holiday_Data.pdf");
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
      <button onClick={() => createPDF(records)} title="Download PDF"className="pdfBtn"><i class="fa-solid fa-file-pdf"></i></button>
      <table id="wohTbl">
      <thead>
        <tr>
        <th>User Id</th>
        <th>User Name</th>
        <th>Record Date</th>
        <th>Requested Date</th>
        <th>Comment</th>
        <th>Status</th>
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
                <WOHrequestsAllSingle key={record._id} record={record} />
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default WOHrequestsAll;
