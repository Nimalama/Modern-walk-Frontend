import React,{useState} from 'react'
import axios from 'axios';
import {useToasts} from 'react-toast-notifications'

const useQuiz = () => {
    const {addToast} = useToasts();
    //state goes here
    let [quizDetail,setQuizDetail] = useState({
        "paragraph":"",
        "questions":[],
        "answers":[],
        "realAnswer":[],
        "startAt":"",
        "startTime":"",
        "endTime":"",
        "chance":1,
        "errors":{}
    })
 



    const quizChangeHandler = (e)=>{
        let {name,value} = e.target;
        setQuizDetail({
            ...quizDetail,
            [name]:value
        })
    }


    
    const addQuiz = (e)=>{
        e.preventDefault();
        axios.post(process.env.REACT_APP_URL+"addQuiz",quizDetail)
        .then((response)=>{
            if(response.data.success == true) 
            {
                addToast(response.data.message,{
                    "appearance":"success",
                    "autoDismiss":true
                })
                window.location.reload();
            }
            else
            {
                addToast(response.data.message,{
                    "appearance":"error",
                    "autoDismiss":true
                })
                setQuizDetail({
                    ...quizDetail,
                    ['errors']:response.data.error
                })
            }
        })
        .catch((err)=>{
            console.log(err) ;       
        })
    }



    return {quizDetail,quizChangeHandler,addQuiz,setQuizDetail};
}

export default useQuiz
