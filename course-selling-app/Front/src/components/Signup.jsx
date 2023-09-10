import {React , useState} from 'react'
import {Button, Card,Typography,TextField} from '@mui/material';

function Signup(){
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
        <Typography>Welcome to Our WebSite</Typography>
        <br/>
        <Card  varint={"outlined"} style={{padding:"30px"}}>
        <br/>
            <TextField fullWidth={true}  onChange={(e)=>{
                setUsername(e.target.value)
            }} label ="Naam Bta"  variant="outlined"/>
            <br/>
            <br/>
            <TextField fullWidth={true} onChange={(e)=>{
                setPassword(e.target.value)}} label ="password" variant="outlined" type={'password'}/>     
            <br/>
            <br/>
            <Button variant='filled' onClick={()=>{
            function callback1(data){
                localStorage.setItem("token", data.token)
                window.location ="./addcourses"
            }
            function call(res){
                res.json().then(callback1);
            }
                // username,
                // password
                fetch("https://back-5wxx.onrender.com/admin/signup",{
                    method:"POST",
                    body:JSON.stringify({
                        username: username,
                        password: password
                    }),
                    headers:{
                        "Content-type":"application/json"
                    }
                }).then(call)
            }}>SignUp</Button>
            <br/>
            <br/>
            </Card>
        </div>

</center>
</>
}

export default Signup;