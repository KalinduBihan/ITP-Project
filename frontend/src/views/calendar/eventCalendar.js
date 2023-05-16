import React, { useRef, useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import { useNavigate } from "react-router-dom";
import "./events.css";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const EventCalendar = ()=>{
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  let navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events/all");
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEvents();
  }, []);

  const handleEventClick = (info) => {
    const eventId = info.event.id;
    navigate("/updateEvent/" + eventId);
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
        { text: "Event Records", style: "header" },
        {
          table: {
            headerRows: 1,
            widths: ["*", "*", "*", "*"],
            body: [
              [
                { text: "Event name", style: "tableHeader" },
                { text: "Comment", style: "tableHeader" },
                { text: "Event Date", style: "tableHeader" },
                { text: "Event Type", style: "tableHeader" },
              ],
              ...events.map((record) => [
                { text: record.eventName, style: "tableCell" },
                { text: record.comment, style: "tableCell" },
                { text: record.eventDate, style: "tableCell" },
                { text: record.eventType, style: "tableCell" },
              ]),
            ],
          },
        },
      ],
      styles: styles,
      pageSize: "A4",
      pageSize: {
        width: 1000,
        height: 700,
      },
    };

    const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
    pdfDocGenerator.download("Event-Data.pdf");
  };

  return (
    <section className="calendarSection">
      <a href={"./addEvent"}>
        <button className="addBtnCalendar"><i class="fa-solid fa-plus"></i></button>
      </a>
      <button
        onClick={() => createPDF(events)}
        title="Download PDF"
        className="pdfBtnCalendar"
      >
        <i class="fa-solid fa-file-pdf"></i>
      </button>
      <a href={"./allEvents"}>
        <button className="addBtnCalendar"><i class="fa-solid fa-list"></i></button>
      </a>

      <div style={{ position: "relative", zIndex: 0 }}>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          eventClick={handleEventClick}
          events={events.map((event) => ({
            id: event._id,
            title: event.eventName,
            start: new Date(event.eventDate),
          }))}
        />
      </div>

    </section>
  );
}

export default EventCalendar