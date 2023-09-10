import {useState , useEffect} from  'react';
import { Typography, Card, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';


export default function Coursesp(props){

const navigate = useNavigate();

const[courses, setCourses] = useState([]);
 
    // Function to fetch courses
    function fetchCourses() {
      fetch("https://back-5wxx.onrender.com/admin/courses", {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      })
        .then(res => res.json())
        .then(data => setCourses(data.courses))
        .catch(error => console.error(error));
    }
    useEffect(() => {
    // Call fetchCourses when the component mounts
    fetchCourses();

  }, []);

  // Function to delete a course
  function deleteCourse() {
    fetch(`https://back-5wxx.onrender.com/admin/courses/${props.course.courseId}`, {
      method: 'DELETE',
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token"),
        // "Content-type":"application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          // Course deletion was successful, fetch updated course list
          fetchCourses();
          alert("Course Deleted");
        } else {
          // Handle the error case
          alert("Failed to delete course");
        }
      })
      .catch(error => {
        console.error(error);
        alert("An error occurred while deleting the course");
      }).then(()=>window.location.reload('/coursespage'));
  }



// function click(){
//     fetch(`http://localhost:3000/admin/courses/${props.course.courseId}`,{
//             method:'DELETE',    
//             headers:{
//                 "Authorization":"Bearer " + localStorage.getItem("token"),
//                 // "Content-type":"application/json"
//             }
//         }).then(call)

//     function call(res){
//         // setCourses(courses.filter((course) => course.courseId !== props.course.courseId))
//         alert("Course Deleted")
//     }

        // username,
        // password
        
// }
    return<> <div >
    <Card style={{
        width:"260px",
        margin:"10px",
        minHeight:"250px"
    }}>
    <div><img src={props.course.imgLink} style={{
        width:"275px",
        height:"150px"
    }}></img>
    </div>    
    <div>   
    <Typography textAlign={'center'} variant='h4'> 
    {props.course.title}</Typography>  {/*course and not courses because we are sending "course" in map function?! */}
    <Typography textAlign={'center'} variant='subtitle1'> 
    {props.course.description}</Typography>
    <div style={{
      display:"flex",
      justifyContent:"space-between",
      padding:"5px"
    }}>
    <Button variant='contained' onClick={()=>{
        navigate(`/course/${props.course.courseId}`)  //for using ${} thing we have to use `` and not '' , ' ' this can be use if we do ''+ that thing
    }}>
    Update    
    </Button>
    
    <Button variant='contained' onClick={()=>{
        deleteCourse()         
    }}>
    Delete
    </Button>
    </div>
    </div>
    </Card> 
    </div>
</>
}