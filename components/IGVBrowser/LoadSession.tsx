import React, { useState, useEffect } from "react";
import { useRef } from "react"

export default function LoadSessionButton(props: any) {
    const fileRef = useRef()

    const handleClick = () => {
        return true
   /*     if (fileRef.current !== null) {
            fileRef.current.click();
        }*/
    }

    const handleFileChange = (e: any) => {
        const fileObj = e.target.files && e.target.files[0];
        if (!fileObj) return;
        const reader = new FileReader();
        reader.onload = (event: any) => {
            try{
                const jsonObj = JSON.parse(event.target.result);
                props.setSessionJSON(jsonObj);
            }
            catch(error) {
                console.error(error)
            }
        }

        reader.readAsText(fileObj)

        e.target.value = null;
    }

    return(
        <div>
            <input 
                type="file" 
               // ref={fileRef} 
                accept=".json" 
                style={{display: 'none'}}
                onChange={handleFileChange}
            ></input>
            <button onClick={handleClick}>Load Session</button>
        </div>
    )
}