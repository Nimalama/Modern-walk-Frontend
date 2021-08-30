import React,{useState,useEffect} from 'react'

const useQuiz = () => {
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
    let [step,setStep] = useState(1);
 
    let questions = [];
    let answers = [];
    let realAnswer = [];


    const quizChangeHandler = (e)=>{
        let {name,value} = e.target;
        setQuizDetail({
            ...quizDetail,
            [name]:value
        })
    }

    const stepHandler = (num)=>{
        setStep(
            num
        )
    }


    return {questions,answers,realAnswer,quizDetail,quizChangeHandler,step,stepHandler};
}

export default useQuiz
