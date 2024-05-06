import React from "react";
import style from "./notfound.module.css";
import Image from "next/image";
const NotFound = () =>{
    return(
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh', /* Adjust height as needed */
        }}>
            <div style={{
                position: 'relative',
            }}>
                <Image
                    src="/notfound.png"
                    alt="Centered Image"
                    width={500}
                    height={350}
                />
                <div style={{textAlign:"center"}}>
                <h2>Page Not Found</h2>
                <p>Sorry, we can’t seem to find the page you’re looking for ...</p>
                <a href="https://app.recruitinn.ai"> <button style={{padding: "16px 64px", backgroundColor : "#6137db", borderRadius : "24px", border:"none", color: "white", fontSize: "16px"
            }}>Back to home</button> </a>
            </div>
            </div>
        </div>
    )
}
export default NotFound;