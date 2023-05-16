import { useState } from "react"
import {useCoursesContext} from "../../hooks/useCoursesContext"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CourseForm = () => {
const {dispatch} = useCoursesContext()

    const [name, setName] = useState('')
    const [courseCode, setcourseCode] = useState('')
    const [duration, setDuration] = useState('')
    const [description, setDescription] = useState('')
    const [file, setFile] = useState(null)
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const course = {name, courseCode, duration, description, file}

        let data = new FormData();
        data.append('name', course.name);
        data.append('courseCode', course.courseCode);
        data.append('duration', course.duration);
        data.append('description', course.description);
        data.append('file', course.file)
        

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:4000/api/courses',
            data : data
          };
          
        axios.request(config)
        .then((response) => {
            console.log(response);
            response.statusCode = 200;
            window.location.reload(); // reload the page on successful submission
        })
        .catch((error) => {
            console.log(error);
            if(error.response.status === 400){
                toast(error.response.data.error)
            }
        });
    }
    
    return (
        <div>
            <form className="create" onSubmit={handleSubmit}>
                <h3>Create a New Course</h3>
                <br/>

                <lable>Course Name :</lable>
                <input 
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    className={emptyFields.includes('title') ? 'error' : ''}
                />

                <lable>Course Code :</lable>
                <input 
                    type="text"
                    onChange={(e) => setcourseCode(e.target.value)}
                    value={courseCode}
                    className={emptyFields.includes('courseCode') ? 'error' : ''}
                />

                <lable>Duration :</lable>
                <input 
                    type="number"
                    onChange={(e) => setDuration(e.target.value)}
                    value={duration}
                    className={emptyFields.includes('duration') ? 'error' : ''}
                />

                <lable>Description :</lable>
                <textarea name="description" 
                    type="text"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    className={emptyFields.includes('description') ? 'error' : ''}
                    style={{ width: "379px", height: "100px", marginBottom: "10px" }}
                />
                <label>Thumbnail : </label>
                <input 
                    type="file" 
                    id="myfile"
                    onChange={(e) => setFile(e.target.files[0])}
                    className={emptyFields.includes('file') ? 'error' : ''}
                    accept="image/*" //only accept image files
                    name="filename"
                />
                
                <button className="TrainingButton">Create</button>
                {error && <div className="error">{error}</div>}
            </form>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

        </div>
    )
}

export default CourseForm
