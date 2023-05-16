import { useEffect, useState } from "react";
import EventSingle from "./eventSingle";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const EventsAll = () => {
  const [records, setRecords] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchAllRecords = async () => {
      const response = await fetch("/api/events/all");
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
        { text: "Event Records", style: "header" },
        {
          table: {
            headerRows: 1,
            widths: ["*", "*", "*", "*", "*", "*", "*"],
            body: [
              [
                { text: "Event Name", style: "tableHeader" },
                { text: "Event Date", style: "tableHeader" },
                { text: "Description", style: "tableHeader" },
                { text: "Event Type", style: "tableHeader" },
              ],
              ...records
                .filter((record) => {
                  if (search === "") {
                    return record;
                  } else if (
                    record.eventName
                      .toLowerCase()
                      .includes(search.toLowerCase())
                  ) {
                    return record;
                  }
                })
                .map((record) => [
                  { text: record.eventName, style: "tableCell" },
                  { text: record.eventDate, style: "tableCell" },
                  { text: record.eventType, style: "tableCell" },
                  { text: record.comment, style: "tableCell" },
                ]),
            ],
          },
        },
      ],
      styles: styles,
    };

    const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
    pdfDocGenerator.download("Event-Data.pdf");
  };
  
  return (
    <div>
      <input
        type="text"
        style={{ width: "500px" }}
        placeholder="Search By event Name"
        className="inputBar"
        onChange={(e) => setSearch(e.target.value)}
      ></input>
      <button
        onClick={() => createPDF(records)}
        title="Download PDF"
        className="pdfBtn"
      >
        <i class="fa-solid fa-file-pdf"></i>
      </button>
      <table>
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Event Date</th>
            <th>Comment</th>
            <th>Event type</th>
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
                  record.eventName.toLowerCase().includes(search.toLowerCase())
                ) {
                  return record;
                }
              })
              .map((record) => (
                <EventSingle key={record._id} record={record} />
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventsAll;
