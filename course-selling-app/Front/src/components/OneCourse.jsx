import {useState , useEffect} from  'react';
import { Typography, Card , Button, Paper, TextField} from '@mui/material';
import { useParams , useNavigate} from 'react-router-dom';

export default function Courseone(){

   let {courseId} = useParams();

    const[courses, setCourses] = useState([]);
    useEffect(() => {
        function callback1(data){
           setCourses(data.courses) //added "courses" otherwise was showing map is not a function
        }
        function call(res){
            res.json().then(callback1);
        }
            // username,
            // password
            fetch("http://localhost:3000/admin/courses",{
                method:"GET",
               
                headers:{
                    "Authorization":"Bearer " + localStorage.getItem("token")
                }
            }).then(call)
        },[])

// let course = null; 
// for(let i =0; i< courses.length; i++){
//     if(courses[i].id == courseId ){
//             course = courses[i]
//     }
// }
const course = courses.find(course => course.courseId === courseId);
if(course){return <>

    {/* {JSON.stringify(course)} */}
    <CourseCard course={course}></CourseCard>
    <UpdateC course ={course}></UpdateC>
    
    </>
    }
else{
    return <div>
        <Typography>Loding...</Typography>
    </div>
}


}
function CourseCard(props){
    const course = props.course;
    return (<>
    <center>
<Card style={{
    marginTop:"25px",
    minHeight:"300px",
    width:"300px",
}}>
    <div><img src={course.imgLink} style={{
        width:"300px",
        height:"200px"
    }}></img>
    </div>    
    <div>   
    <Typography textAlign={'center'} variant='h4'> 
    {course.title}</Typography>  {/*course and not courses because we are sending "course" in map function?! */}
    <Typography textAlign={'center'} variant='subtitle1'> 
    {course.description}</Typography>
    </div>
</Card>

</center>
    </>)
}

function UpdateC(props){

    const [ coursename, setCoursename] = useState('')
    const [ desc, setDesc] = useState('')
    const [ price, setPrice] = useState('')
    const [ img, setImg] = useState('')
    const navigate = useNavigate();
    const course = props.courses;

    return(
        <>
        <center>
        <Paper elevation={3} style={{
            width:"400px",
            minHeight:"280px",
            marginTop:"50px",
            padding:"20px",

        }}>
        <TextField fullWidth={true}  onChange={(e)=>{
            setCoursename(e.target.value)
            }} label ="Course Name"  variant="outlined"/>
            <br/>
            <br/>
        <TextField fullWidth={true}  onChange={(e)=>{
            setDesc(e.target.value)
            }} label ="Description"  variant="outlined"/>
            <br/>
            <br/>
        <TextField fullWidth={true} onChange={(e)=>{
            setPrice(e.target.value)
            }} label = "Price" variant="outlined"/>     
            <br/>
            <br/>
        <TextField fullWidth={true} onChange={(e)=>{
            setImg(e.target.value)
            }} label = "Image" variant="outlined"/>     


        <Button variant='contained' style={{
            marginTop:"10px",
            padding:"10px"
        }} onClick={()=>{

        function callback1(){
            alert("course updated");
            navigate('/coursespage')
        }
        function call(res){

            
            res.json().then(callback1);
        }
            // username,
            // password
            fetch(`https://back-5wxx.onrender.com/admin/courses/${course.courseId}` ,{
                method:"PUT",
                body:JSON.stringify({
                    title: coursename,
                    description: desc,
                    price: price,
                    imgLink: img,
                    published: true
                }),
                headers:{
                    "Content-type":"application/json",
                    "Authorization":"Bearer " + localStorage.getItem("token")
                }
            }).then(call)
        }}>Update Course</Button>
        </Paper>
        </center>
        </>
    )
}













// function Courses(props){

//     let c = props.course;

//     return<> <div >
// <center>
//     <Card style={{
//         width:"260px",
//         margin:"10px",
//         minHeight:"200px"
//     }}>
//     <Typography textAlign={'center'} variant='h4'> 
//     {props.course.title}</Typography>  {/*course and not courses because we are sending "course" in map function?! */}
//     <Typography textAlign={'center'} variant='subtitle1'> 
//     {props.course.description}
//     <img src={props.course.imgLink} style={{
//         width:"200px",
//         height:"150px"
//     }}></img>
//     </Typography>
//     </Card>
// </center> 
//     </div>
// </>
// }

