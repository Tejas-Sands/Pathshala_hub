import {React , useState} from 'react'
import {Button, Card,Typography,TextField} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function SignupU(){
    
const [ username, setUsername] = useState('')
const [ password, setPassword] = useState('')
const navigate = useNavigate();
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
        <div className='signUfont'>Welcome to PathshalaHub!<br/> Register as User</div>
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
            <Button variant='filled' onClick={()=>{
            function callback1(data){
                localStorage.setItem("token", data.token)
                window.location ="./userlogin"
            }
            function call(res){
                res.json().then(callback1);
            }
                // username,
                // password
                fetch("https://back-5wxx.onrender.com/users/signup",{
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
            <br/>
            <br/>
            <Typography color="GrayText">Already a User? <br/>please log in to your account</Typography>
            <Button variant='filled' onClick={()=>{
                    navigate("/userlogin")
            }}>login</Button>
            </Card>
        </div>

</center>
</>
}

export default SignupU;