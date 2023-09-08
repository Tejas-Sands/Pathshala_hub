import React from "react";
import { Button} from "@mui/material";
import {useNavigate} from "react-router-dom";
import './compo.css'

function Landing(){
const navigate = useNavigate();
    return <>
    <center>
        <div className="maintext">
        <h1>Welcome to PathshalaHub</h1>
        </div>
        <div className="user">
           
            <div className="UserImg"></div>
            <div className="asUser"> <p id="p1">Welcome to Tech Learning Academy, where you can discover the world of technology! 
            Are you prepared to set off on a journey that will lead to countless opportunities? 
            Our academy provides a wide selection of cutting-edge classes taught by knowledgeable business professionals. 
            We offer the ideal curriculum for you whether you are a tech enthusiast wanting to explore programming languages, 
            an aspiring developer looking to create immersive applications, or a curious thinker keen to comprehend the
            power of artificial intelligence.</p>
            <Button variant="contained" onClick={()=>{
                navigate("/usersignup")
                }}>Proceed As User</Button>
            </div>
        </div>
        <br/>
        <div className="admin">
            
           
            <div className="asAdmin">
                <p id="p2">Calling all computer sector professionals and enthusiastic course designers! 
                    Join the Tech Learning Academy to help inspire the subsequent wave of digital innovators. 
                    Share your skills, knowledge, and expertise with a global community of curious students 
                    who are all eager to learn about the newest technological developments.</p>
            <Button style={{}}variant="contained" onClick={()=>{
                navigate("/adminsignup")
                }}>Proceed As Admin</Button>
            </div>
            <div className="AdminImg"></div>
        </div>
    </center>
    </>
}

export default Landing;