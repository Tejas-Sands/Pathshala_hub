import {React , useState} from 'react'
import {Button, Card,Typography,TextField} from '@mui/material';
import {useNavigate} from "react-router-dom";
import './compo.css'

function SignupA(){

const navigate = useNavigate();

const [ username, setUsername] = useState('')
const [ password, setPassword] = useState('')

    return <>
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
            function callback1(data){
                localStorage.setItem("token", data.token)
                window.location ="./adminlogin"
            }
            function call(res){
                res.json().then(callback1);
            }
                // username,
                // password
                fetch("http://localhost:3000/admin/signup",{
                    method:"POST",
                    body:JSON.stringify({
                        username: username,
                        password: password
                    }),
                    headers:{
                        "Content-type":"application/json"
                    }
                }).then(call)
            }}>Register</Button>
            </div>
            <br/>
            <Typography color="GrayText">Already a User? <br/>please log in to your account</Typography>
            <Button variant='filled' onClick={()=>{
                    navigate("/adminlogin")
            }}>login</Button>
            <br/>
            </Card>
        </div>

</center>
</>
}

export default SignupA;