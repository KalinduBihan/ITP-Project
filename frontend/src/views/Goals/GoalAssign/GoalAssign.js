
import '../GoalTables/singleGoalDetail.css';
import '../../../styles/goals.css'
import { useEffect, useState } from 'react';
import goalAssign from '../../../apis/modules/goalAssign';
import SingleGoalDetails from './singleGoalDetails';
import GoalAssignForm from './goalAssignForm';
import GoalsAdminNavbar from '../../../components/goalsAdminNavbar';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;


const GoalAssignHome = () => {

  const [goals, setGoals] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchAllAssigns = async () => {
      const response = await (await goalAssign.getAllgoalAssign()).data

      setGoals(response);

    }

    fetchAllAssigns()
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
        { text: "Goal Assign Details", style: "header" },
        {
          table: {
            headerRows: 1,
            widths: ['*', '*', '*', '*', '*', '*'],
            body: [
              [
                { text: "Employee ID", style: 'tableHeader' },
                { text: "Goal Type", style: 'tableHeader' },
                { text: "Goal Title", style: 'tableHeader' },
                { text: "Assigned Date", style: 'tableHeader' },
                { text: "Goal Deadline", style: 'tableHeader' },
                { text: "Status", style: 'tableHeader' },


              ],
              ...goals
                .filter((goals) => {
                  if (search === "") {
                    return goals;
                  } else if (
                    goals.Employee.toLowerCase().includes(search.toLowerCase()) ||
                    goals.status.toLowerCase().includes(search.toLowerCase()) ||
                    goals.goalType.toLowerCase().includes(search.toLowerCase())


                  ) {
                    return goals;
                  }
                })
                .map((goals) => [
                  goals.Employee,
                  goals.goalType,
                  goals.goalTitle,
                  goals.assignedDate,
                  goals.goalDeadline,
                  goals.status

                ]),
            ],
          },
        },
      ],
      styles: styles,
      pageSize: 'A3',
      pageSize: {
        width: 1000,
        height: 800
      }

    };

    const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
    pdfDocGenerator.download("Goal Assignments Report.pdf");
  };
  return (
    <div>
      <GoalsAdminNavbar />
      <h1 style={{ marginLeft: "20px", marginTop: "35px" }}>Goal Assignments</h1>
      <div className="goalsHome">
        <div className="goals-container">
          <div className="goals">
            <h1>{goals.goalType}</h1>


            <input
              type="text"
              style={{ width: "500px" }}
              placeholder="Search By Employee ID, Category"
              className="inputBar"
              onChange={(e) => setSearch(e.target.value)}
            ></input>
            <button className="blueButton" onClick={() => createPDF(goals)}>Generate Report</button>
            {goals && goals
              .filter((goals) => {
                if (search === "") {
                  return goals;
                } else if (
                  goals.Employee.toLowerCase().includes(search.toLowerCase()) ||
                  goals.status.toLowerCase().includes(search.toLowerCase()) ||
                  goals.goalType.toLowerCase().includes(search.toLowerCase())

                ) {
                  return goals;
                }
              })

              .map((goal) => (

                <SingleGoalDetails key={goal._id} goal={goal} />
              ))}
          </div>

          <GoalAssignForm />
        </div>
        
    </div>
      </div>
    
  );
}

export default GoalAssignHome;