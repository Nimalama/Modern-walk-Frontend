import React,{useState,useEffect} from 'react';


const useCommon = () => {
    //variable declarations and initialization goes here.
    const timeBox = {
        "13":1,"14":2,"15":3,"16":4,"17":5,"18":6,"19":7,"20":8,"21":9,"22":10,"23":11
    }
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
    const day = ["Sunday", "Monday", "Tuesday", "Wednesday","Thursday","Friday", "Saturday"];

    //state goes here
    let [auth,setAuth] = useState({
        "config":{
            "headers":{
                "authorization":`Bearer ${localStorage.getItem('token')}`
            }
        }
    })

    const digitizer = (num)=>{
        let n = num;
        n = n<10? "0"+n : n;
        return n;
    }

    const getFormattedTime = (hour,minute)=>{
        let timeValue = hour >= 12? "PM":"AM";
        let time = hour <= 12?  `${hour}:${digitizer(minute)} ${timeValue}`:`${timeBox[hour.toString()]}:${digitizer(minute)} ${timeValue}`;
        return time;
    }

    const getFancyDate = (date)=>{
        return `${date.getDate()} ${month[date.getMonth()]},${date.getFullYear()}-${day[date.getDay()]}`;
    }

    return {auth,getFormattedTime,getFancyDate}
}

export default useCommon
