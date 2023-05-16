
import { useEffect, useState } from 'react';
import goalTable from '../../../apis/modules/goalTable';
import SingleGoalDetails from './singleGoalDetails';
import GoalTableForm from './goalTableForm';
import GoalsAdminNavbar from '../../../components/goalsAdminNavbar';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import './singleGoalDetail.css';
import '../../../styles/goals.css'

pdfMake.vfs = pdfFonts.pdfMake.vfs;


const GoalTableHome = () => {

  const [goals, setGoals] = useState([]);
  const [search, setSearch] = useState("");


  useEffect(() => {
    const fetchAllGoals = async () => {
      const response = await (await goalTable.getAllGoalTables()).data

      setGoals(response);

    }

    fetchAllGoals()
  }, [])

  const styles = {
    header: {
      fontSize: 18,
      bold: true,
      margin: [0, 0, 0, 10]
    },
    subheader: {
      fontSize: 14,
      bold: true,
      margin: [0, 10, 0, 5]
    },
    tableExample: {
      margin: [0, 5, 0, 15]
    },
    tableHeader: {
      bold: true,
      fontSize: 13,
      color: 'black'
    }
  };
  const createPDF = (goals) => {
    const documentDefinition = {
      content: [
        { text: "Goal Record Details", style: "header" },
        {
          table: {
            headerRows: 1,
            widths: ['*', '*', '*', '*', '*'],
            body: [
              [
                { text: "Goal Category", style: 'tableHeader' },
                { text: 'Goal Title', style: 'tableHeader' },
                { text: 'Deadline', style: 'tableHeader' },
                { text: 'Description', style: 'tableHeader' },
                { text: 'Submissions', style: 'tableHeader' }

              ],
              ...goals
                .filter((goals) => {
                  if (search === "") {
                    return goals;
                  } else if (
                    goals.goalType.toLowerCase().includes(search.toLowerCase()) ||
                    goals.goalCategory.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return goals;
                  }
                })
                .map((goals) => [
                  goals.goalCategory,
                  goals.goalType,
                  goals.goalDeadline,
                  goals.description,
                  goals.submissions === "true" ? "Need Submissions" : "No submissions"
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
      }
    };

    const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
    pdfDocGenerator.download("Goal Table Report.pdf");
  };


  return (
    <div>
      <GoalsAdminNavbar />
      <h1 style={{ marginLeft: "20px", marginTop:"35px"}}>List Of Goals</h1>
      <div className="goalsHome">
      <div className="goals-container">
        <div className="goals">
          <h1>{goals.goalType}</h1>
         
          <input
            type="text"
            style={{ width: "500px" }}
            placeholder="Search By Goal Title or Category"
            className="inputBar"
            onChange={(e) => setSearch(e.target.value)}
          ></input>
          <button  className="blueButton" onClick={() => createPDF(goals)}>Generate Report</button>
          {goals &&
            goals
              .filter((goals) => {
                if (search === "") {
                  return goals;
                } else if (
                  goals.goalType.toLowerCase().includes(search.toLowerCase()) ||
                  goals.goalCategory.toLowerCase().includes(search.toLowerCase())
                ) {
                  return goals;
                }
              })
              .map((goal) => (

                <SingleGoalDetails key={goal._id} goal={goal} />
              ))}
        </div>
        <div clasName="goals-2">
        <GoalTableForm />
        </div>
        </div>

      </div>
      
    </div>
  );
}

export default GoalTableHome;