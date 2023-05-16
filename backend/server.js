const mongoose = require('mongoose');
const express = require('express')
const cors = require("cors");

const userProfileRoutes = require('./routes/userProfileRoutes');
const userProfileStatRoutes = require('./routes/userProfileStatRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const appraisalQuestionRoutes = require('./routes/appraisalQuestionRoutes');
const appraisalProcessRoutes = require('./routes/appraisalProcessRoutes')
const userLoginRoutes = require('./routes/userLoginRoutes')
const goalAssignedRoutes = require('./routes/goalAssignedRoute')
const goalTableRoutes = require('./routes/goalsTableRoute')
const goalTypeRoutes = require('./routes/goalsTypeRoutes')
const courseRoutes = require('./routes/courses')
const courseContentRoutes = require('./routes/courseContents')
const enrolledCourses = require('./routes/coursesEnrolled')
// const courseMaterialRoutes = require('./routes/courseMaterials')
const path = require('path')
const workOnHolidayRoutes = require('./routes/WOHroutes')
const goalstatRouter = require('./routes/goalStatRouter');
const golasViewRoute = require('./routes/goalsViewRoute')
const leaveRoutes = require('./routes/leaveRoutes')
// const eventCreationRoutes = require('./routes/eventCreationFormRoutes')
const uploadGoalRoutes = require('./routes/uploadGoalRoutes');
const whoIsInTodayRoutes = require('./routes/whoIsInRoutes')
const eventRoutes = require('./routes/eventRoutes')

require('dotenv').config();

// express app
const app = express()
const port = process.env.PORT || 3000;
const URL = process.env.MONGO_URI;

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
})

app.use(express.json());
app.use(cors());

//training management module uploads
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'uploads')))

//goal manaement uplaods
app.use(express.static(path.join('goals')))

//use Router
app.use('/api', userProfileRoutes);
app.use('/api/userProfileStat/', userProfileStatRoutes);
app.use('/auth/login', userLoginRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/appraisal', appraisalQuestionRoutes, appraisalProcessRoutes);
app.use('/goals/goalType', goalTypeRoutes);
app.use('/api/goals', goalTableRoutes);
app.use('/api/AssignGoal', goalAssignedRoutes);

app.use('/api/courses', courseRoutes)
app.use('/api/courseContents', courseContentRoutes)
app.use('/api/myCourses', enrolledCourses)
// app.use('/api/courseMaterials', courseMaterialRoutes)

app.use('/api/workonholiday', workOnHolidayRoutes);

app.use('/api/workonholiday', workOnHolidayRoutes);
app.use('/api/goalStat/', goalstatRouter);
app.use('/api/empGoal/', golasViewRoute);
app.use('/api/leaves', leaveRoutes);

// app.use('/api/eventCreationFormRoutes',eventCreationRoutes);
app.use(uploadGoalRoutes);

app.use('/api/whoIsInToday', whoIsInTodayRoutes);
app.use('/api/events', eventRoutes)


// listen for requests
app.listen(port, () => {
  console.log('listening on port', process.env.PORT)
})

mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB connection successful!'));


