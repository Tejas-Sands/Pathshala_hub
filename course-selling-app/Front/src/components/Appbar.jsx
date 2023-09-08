import { Typography,Button } from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

function Appbar(){
const navigate = useNavigate();
const [username, setUsername] = useState(null)
    useEffect(()=>{
        function callback2(data){
            if(data.username){
                setUsername(data.username)
            }          
        }
        function callback1(res){
            console.log("data")
            res.json().then(callback2)
            
        }
        fetch("http://localhost:3000/admin/me", {
            method:"GET",
            headers:{
                "Authorization":"Bearer " + localStorage.getItem("token")
            }
        }).then(callback1)
    },[])

if(username){
return(
    <>
    {username}
    <div><Button variant="contained" style={{
        marginRight:"8px"}} onClick={()=>{
        navigate("/l")
        }}>logOut</Button></div>
    </>
)
}
  
    return (
        <div 
        style={{display:"flex",
        justifyContent:"space-between",
        
        }}>
            
            <Typography style={{
            marginLeft:"18px",
            marginTop:'10px'
         }}>
            Coursera</Typography>
        <div style={{display:"flex",
                    marginTop:'10px'
                    }}>

            <div><Button variant="contained" style={{
                marginRight:"8px"}} onClick={()=>{
                    navigate("/Signin")
                }}>Sign up</Button></div>

            <div><Button variant="contained" style={{
                marginRight:"8px"}} onClick={()=>{
                navigate("/Signup")
                }}>Sign in</Button></div>

            <div><Button style={{
                marginRight:"9px"
            }}variant="contained" onClick={()=>{
                navigate("/addcourses")
                }}>AddCourses</Button></div>
                </div>
        </div>
    )
}

export default Appbar;