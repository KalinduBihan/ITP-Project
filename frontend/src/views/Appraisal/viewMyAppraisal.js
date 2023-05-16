import { useLocation } from "react-router-dom";
import React from 'react';
import '../../styles/appraisal.css'
import { CircularProgressbar } from "react-circular-progressbar";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "react-circular-progressbar/dist/styles.css";
import _ from 'lodash'

const bigCirclePercentage = 75; // change this value to change the big circle's percentage

const ViewMyAppraisal = () => {
    const location = useLocation();
    const { appraisalResult } = location.state ? location.state : {};

    const handleDownloadPDF = () => {
        // Get the HTML element containing the circular progress bars
        const element = document.getElementById("progress-bars");

        // Use html2canvas to render the element as an image
        html2canvas(element).then((canvas) => {
            // Create a new jsPDF instance and add the image to it
            const pdf = new jsPDF();
            pdf.setFontSize(20);
            pdf.text("Appraisal Report", 85, 20);
            pdf.addImage(canvas.toDataURL("image/jpeg"), "JPEG", -20, 30, 250, 0);

            // Download the PDF file
            pdf.save("appraisal.pdf");
        });
    };

    return (
        <>
            <button className="appraisal-home-button" style={{ width: "130px", marginLeft: "1250px" }} onClick={handleDownloadPDF}>Download PDF</button>
            <div id="progress-bars">
                {appraisalResult.map(e => (
                    <>
                        <h1 style={{ textAlign: "center" }}>Appraiser Name - {e.appraiserName}</h1>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "30px" }}>
                            <div style={{ width: "200px", height: "200px", margin: "10px" }}>
                                <CircularProgressbar
                                    value={((e.total) / (e.result.length * 50)) * 100}
                                    text={`${(((e.total) / (e.result.length * 50)) * 100).toFixed(2)}%`}
                                />
                            </div>
                            <div style={{ display: "flex", flexWrap: "wrap", width: "600px" }}>
                                {e.result.map((o) => (
                                    <div key={o.name} style={{ width: "80px", height: "80px", margin: "10px", marginLeft: "30px", fontSize: "15px" }}>
                                        <CircularProgressbar
                                            value={o.marks * 2}
                                            text={`${o.marks * 2}%`}
                                        />
                                        <p style={{ textAlign: "center" }}>{o.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                ))}
            </div>
        </>
    );
}
export default ViewMyAppraisal