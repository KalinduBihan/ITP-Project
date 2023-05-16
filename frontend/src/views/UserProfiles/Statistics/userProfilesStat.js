import { useState, useEffect, useRef } from "react";
import BarChart from "../Charts/profBarChart";
import PieChart from "../Charts/profPieChart";
import jsPDF from "jspdf";
import html2canvas from 'html2canvas';
import userProfileStat from "../../../apis/modules/userProfileStat";
import '../CSS/userProfileStat.css';

const UserProfileStat = () => {


    const [userData, setUserData] = useState({
        labels: [],
        datasets: [{
            label: "Users Gained",
            data: [],
            backgroundColor: ['cyan', 'darkcyan', 'crimson']
        }],
        borderColor: "black",
        borderWidth: 2
    });

    const [userData1, setUserData1] = useState({
        labels: [],
        datasets: [{
            label: "Users Gained",
            data: [],
            backgroundColor: ['green', 'blue']
        }],
        borderColor: "black",
        borderWidth: 2
    });


    useEffect(() => {
        const fetchProfileStat = async () => {
            const { data } = await userProfileStat.getProfileByRole();

            const ChartData = ({
                labels: data.map(data => data._id),
                datasets: [{
                    label: "Employees",
                    data: data.map(data => data.totalProfiles),
                    backgroundColor: ['red', 'green', 'blue', 'yellow', 'purple']
                }],
                borderColor: "black",
                boderWidth: 2
            })

            setUserData(ChartData)



            const { data: data1 } = await userProfileStat.getProfileByGender();
            console.log(data1)
            const ChartData1 = ({
                labels: data1.map(data => data._id),
                datasets: [{
                    label: "Total Employees",
                    data: data1.map(data => data.totalProfiles),
                    backgroundColor: ['red', 'green', 'blue', 'yellow', 'purple']
                }],
                borderColor: "black",
                boderWidth: 2
            })

            setUserData1(ChartData1)

        }
        fetchProfileStat()
    }, [])
    const chartRef = useRef(null);

    const handleDownloadPdf = async () => {
        try {
          const input = chartRef.current;
          const { offsetWidth, offsetHeight } = input;
          const canvas = await html2canvas(input, {
            width: offsetWidth,
            height: offsetHeight
          });
          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF({
            orientation: "landscape"
          });
          pdf.addImage(imgData, "PNG", 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
          pdf.save("chart.pdf");
        } catch (error) {
          console.error(error);
        }
      };



    return (
        <div className = "userProfStat">
            <button className="blueButton" onClick={handleDownloadPdf}>Download A report</button>
            <div style={{ backgroundColor: "#f0f0f0",marginLeft:"100px" }}>



                <div ref={chartRef} style={{ 
                    backgroundColor: "#fff", 
                    padding: "10px", 
                    borderRadius: "10px", 
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                    }}>


                  
                    <div style={{ width: 500 }}>
                    <h1 style={{ margin: "20px" }}>Total Users in each Category</h1>
                        <BarChart chartData={userData} id="bar-chart" />
                    </div>

                
                    <div style={{ width: 300 }}>
                    <h1 style={{ margin: "20px" }}>Overall Users</h1>
                        <PieChart chartData={userData1} id="pie-chart" />

                    </div>
                </div>

            </div>
        </div>

    );
}

export default UserProfileStat;