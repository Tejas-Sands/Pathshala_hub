import {React , useState} from "react";
import {Button, Card, TextField, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import './compo.css'

export default function Adlog(){

const navigate = useNavigate();

const [ username, setUsername] = useState('')
const [ password, setPassword] = useState('')

    return(
        <>
    <center>
    
    <div style={{
        // border:"3px solid black",
                width:"360px",
                padding:"20px",
                 marginTop:"16px",
                borderRadius:"5px",
                height:"150px",
}}>
    <div className='SignAfont'>Welcome to PathshalaHub!<br/> Excited for the journey ahead with us! </div>
    <br/>
    <Card  varint={"outlined"} style={{padding:"30px"}}>
    <br/>
        <TextField fullWidth={true}  onChange={(e)=>{
            setUsername(e.target.value)
        }} label ="Email"  variant="outlined"/>
        <br/>
        <br/>
        <TextField fullWidth={true} onChange={(e)=>{
            setPassword(e.target.value)}} label ="Password" variant="outlined" type={'password'}/>     
        <br/>
        <br/>
        <div style={{
            display:"flex",
            justifyContent:"space-evenly"
        }}>
        
        </div>
        <br/>
        <div  style={{
            display:"flex",
            justifyContent:"space-between"}}>
        <Button variant='filled' onClick={()=>{

            fetch("https://back-5wxx.onrender.com/admin/login",{
                method:"POST",
                body:JSON.stringify({
                username: username,
                password: password
                }),
                headers:{
                    "Content-type":"application/json",
                    // "username": "username",
                    // "password": "password"
                }
            }).then(call)        

              function call(res){
                res.json().then(callback1);
            }
                // username,
                // password
                
        function callback1(data){
           
            localStorage.setItem("token", data.token)
            navigate('/coursespage')
        

        }
      
        }}>Login</Button>
        </div>
        <br/>
       
        </Card>
    </div>

</center>   
        </>
    )
}