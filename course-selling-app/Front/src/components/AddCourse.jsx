import {Paper, TextField, Button} from "@mui/material";
import {useState} from "react"
import { useNavigate } from "react-router-dom";

export default function AddCourse(){

    const [ coursename, setCoursename] = useState('')
    const [ desc, setDesc] = useState('')
    const [ price, setPrice] = useState('')
    const [ img, setImg] = useState('')
    const navigate = useNavigate();

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
            alert("course added");
            navigate('/coursespage')
        }
        function call(res){
            res.json().then(callback1);
        }
            // username,
            // password
            fetch("http://localhost:3000/admin/courses",{
                method:"POST",
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
        }}>Add Course</Button>
        </Paper>
        </center>
        </>
    )
}