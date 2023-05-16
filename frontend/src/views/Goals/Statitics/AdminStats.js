import { useState, useEffect, useRef } from "react";
import BarChart from "../Charts/BarChart";
import PieChart from "../../Attendance/components/PieChart";
import '../GoalTables/singleGoalDetail.css';
import '../../../styles/goals.css'
import GoalsAdminNavbar from '../../../components/goalsAdminNavbar';
import goalStat from '../../../apis/modules/goalStat';
import jsPDF from "jspdf";
import html2canvas from 'html2canvas';


const AdminStats = () => {


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
        const fetchGoalStat = async () => {
            const { data } = await goalStat.getGoalByCatergory();

            const ChartData = ({
                labels: data.map(data => data._id),
                datasets: [{
                    label: "Total Goals",
                    data: data.map(data => data.totalGoals),
                    backgroundColor: ['red', 'green', 'blue', 'yellow', 'purple']
                }],
                borderColor: "black",
                boderWidth: 2
            })

            setUserData(ChartData)



            const { data: data1 } = await goalStat.getGoalByStatus();
            console.log(data1)
            const ChartData1 = ({
                labels: data1.map(data => data._id),
                datasets: [{
                    label: "Total Employees",
                    data: data1.map(data => data.totalGoals),
                    backgroundColor: ['red', 'green', 'blue', 'yellow', 'purple']
                }],
                borderColor: "black",
                boderWidth: 2
            })

            setUserData1(ChartData1)

        }
        fetchGoalStat()
    }, [])
    const chartRef = useRef(null);

    const handleDownloadPdf = async () => {
        try {
            const input = chartRef.current
            const canvas = await html2canvas(input);
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF();
            pdf.addImage(imgData, "PNG", 0, 0);
            pdf.save("chart.pdf");
        } catch (error) {
            console.error(error);
        }
    };



    return (
        <div style={{ alignItems: "center"}}>
            <GoalsAdminNavbar />
            <button className="blueButton" onClick={handleDownloadPdf}>Download A report</button>
            <div style={{ backgroundColor: "#f0f0f0",
        marginLeft:"100px" }}>



                <div ref={chartRef} style={{ 
                    backgroundColor: "#fff", 
                    padding: "10px", 
                    borderRadius: "10px", 
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                    }}>


                  
                    <div style={{ width: 500 }}>
                    <h1 style={{ margin: "20px" }}>Total Goals in each Category</h1>
                        <BarChart chartData={userData} id="bar-chart" />
                    </div>

                
                    <div style={{ width: 300 }}>
                    <h1 style={{ margin: "20px" }}>Overall Status of Goals</h1>
                        <PieChart chartData={userData1} id="pie-chart" />

                    </div>
                </div>

            </div>
        </div>

    );
}

export default AdminStats;