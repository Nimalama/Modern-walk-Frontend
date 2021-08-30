import React,{useState} from 'react'
import {Container,Row,Col,Table} from 'react-bootstrap'
import './quiz.css'
import useQuiz from './useQuiz'
import ParagraphQuiz from './stepComponent/paragraphQuiz'
import QuestionsQuiz from './stepComponent/questionsQuiz'
import {AiFillDelete} from 'react-icons/ai'


const Quiz = (props) => {
    const {} = props;
    const {questions,quizChangeHandler,quizDetail,answers,realAnswer} = useQuiz();

    //state goes here
    let [question,setQuestion] = useState("");
    let [answer,setAnswer] = useState("");
    let [correctAnswer,setCorrectAnswer] = useState("");
    let [questionBox,setQuestionBox] = useState([]);
    let [answerBox,setAnswerBox] = useState([]);
    let [correctAnswerBox,setCorrectAnswerBox] = useState([]);
    let [iteration,setIteration] = useState(0);
    let [step,setStep] = useState(1);

   
   
   //handlers
    const addQuestion = (e)=>{
        e.preventDefault();
        setQuestionBox([...questionBox,question])
        questions.push(question)
        setQuestion("");
    }

    const addAnswer = (e)=>{
        e.preventDefault();
        setAnswerBox([...answerBox,answer]);
        answers.push(answer.split("---"));
        setAnswer("");
    }

    const addCorrectAnswer = (e)=>{
        e.preventDefault();
        setCorrectAnswerBox([...correctAnswerBox,correctAnswer]);
        realAnswer.push(correctAnswer.split("---"));
        setCorrectAnswer("");
    }
  
    const removeQuestion = (index)=>{
        questionBox.splice(index,1);
        setIteration(
            questionBox
        )
        setIteration(iteration-1)
    }

    const removeAnswer = (index)=>{
        answerBox.splice(index,1);
        setIteration(
            answerBox
        )
        setIteration(iteration-1)
    }

    const removeCorrectAnswer = (index)=>{
        correctAnswerBox.splice(index,1);
        setIteration(
            correctAnswerBox
        )
        setIteration(iteration-1)
    }
    
    
    
    return (
        <React.Fragment>
            <Container>
                <Row>
                    <Col lg={12}>
                    <div className="quizContainer">
                       <Row>
                            <Col lg={12}>
                                <h5 className="text-center mb-3" style={{fontWeight:"bolder",color:"#4b1cac",fontSize:"32px"}}> Add Quiz Stuff </h5>
                            </Col>
                            {
                                step == 1?
                                (
                                    <>
                                    <Col lg={2} className="d-none d-md-none d-lg-block"></Col>
            
                                    <Col lg={8}>
                                        <form method = "post">
                                            <div className="form-group">
                                                <label> Paragraph </label>
                                                <textarea className="form-control" name="paragraph" onChange={(e)=>{quizChangeHandler(e)}}>{quizDetail.paragraph}</textarea>
                                                {quizDetail['errors']['paragraph']&& (<p> <small style={{color:"red"}}>  {quizDetail['errors']['paragraph']}  </small> </p>)}
                                            </div>
                                        </form>
                                    </Col>
                                                                    
                                    <Col lg={2} className="d-none d-md-none d-lg-block"></Col>
                                    </>
                                ) :
                                step == 2?
                                (
                                   <>
                                   <Col lg={2} className="d-none d-md-none d-lg-block"></Col>
                                    <Col lg={8}>
                                        <form method = "post" onSubmit={addQuestion}>
                                            <div className="form-group">
                                                <label> Question No {questionBox.length + 1} </label>  
                                                <input type="text" className="form-control" name="question" value={question} onChange={(e)=>{setQuestion(e.target.value)}} required></input>
                                                {quizDetail['errors']['questions']&& (<p> <small style={{color:"red"}}>  {quizDetail['errors']['questions']}  </small> </p>)}
                                            </div>

                                            <div className="text-center">
                                                <button className="btn btn-0 btn-md btnQuizz" type="submit" name="question"> Add Question </button> 
                                            </div>
                                        </form>

                                        {
                                            questionBox.length > 0 &&
                                            (
                                                <Table striped bordered hover className="tableDesign mt-3 mb-3">
                                                    <thead>
                                                        <tr className="text-center">
                                                            <th style={{fontWeight: 'bold'}}>QN</th>
                                                            <th>Question</th>
                                                            <th>Delete</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            questionBox&&
                                                            (
                                                                questionBox.map((val)=>{
                                                                return (
                                                                    <tr className="text-center"> 
                                                                    <td style={{fontWeight: 'bold'}}> {questionBox.indexOf(val)+1}.  </td> 
                                                                    <td> {val} </td>
                                                                    <td> <AiFillDelete onClick={()=>{removeQuestion(questionBox.indexOf(val))}} style={{fontSize:"25px",cursor: "pointer",color:"black"}}/> </td>
                                                                    </tr>
                                                                )
                                                            })
                                                            )   
                                                            
                                                        }
                                                    </tbody>
                                                    </Table>
                                            )
                                        }
                                        </Col>
                                        <Col lg={2} className="d-none d-md-none d-lg-block"></Col>
                                   </>
                                ):
                                step == 3?
                                (
                                    <>
                                        <Col lg={2} className="d-none d-md-none d-lg-block"></Col>
                                        <Col lg={8}>
                                            <form method = "post" onSubmit={addAnswer}>
                                                <div className="form-group">
                                                    <label> Options For Question {answerBox.length + 1} </label>  
                                                    <input type="text" className="form-control" name="question" value={answer} onChange={(e)=>{setAnswer(e.target.value)}} required></input>
                                                    <span className="mb-1"><small> *Separate options with --- </small></span>
                                                    {quizDetail['errors']['answers']&& (<p> <small style={{color:"red"}}>  {quizDetail['errors']['answers']}  </small> </p>)}
                                                </div>

                                                <div className="text-center">
                                                    <button className="btn btn-0 btn-md btnQuizz" type="submit" name="answer"> Add Answer </button> 
                                                </div>
                                            </form>
                                            {
                                                answerBox.length > 0 &&
                                                (
                                                    <Table striped bordered hover className="tableDesign mt-3 mb-3">
                                                        <thead>
                                                            <tr className="text-center">
                                                                <th style={{fontWeight: 'bold'}}>QN</th>
                                                                <th>Options</th>
                                                                <th>Delete</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                answerBox&&
                                                                (
                                                                    answerBox.map((val,i)=>{
                                                                    return (
                                                                        <tr className="text-center"> 
                                                                        <td style={{fontWeight: 'bold'}}> {answerBox.indexOf(val)+1}.  </td> 
                                                                        <td> {val} </td>
                                                                        <td> <AiFillDelete onClick={()=>{removeAnswer(i)}} style={{fontSize:"25px",cursor: "pointer",color:"black"}}/> </td>
                                                                        </tr>
                                                                    )
                                                                })
                                                                )   
                                                                
                                                            }
                                                        </tbody>
                                                        </Table>
                                                )
                                            }
                                        </Col>
                                        <Col lg={2} className="d-none d-md-none d-lg-block"></Col>
                                    </>
                                ):
                                step == 4?
                                (
                                    <>
                                    <Col lg={2} className="d-none d-md-none d-lg-block"></Col>
                                        <Col lg={8}>
                                            <form method = "post" onSubmit={addCorrectAnswer}>
                                                <div className="form-group">
                                                    <label> Correct Answer For Question {correctAnswerBox.length + 1} </label>  
                                                    <input type="text" className="form-control" name="question" value={correctAnswer} onChange={(e)=>{setCorrectAnswer(e.target.value)}} required></input>
                                                    <span className="mb-1"><small> *Separate multiple answers with --- </small></span>
                                                    {quizDetail['errors']['realAnswer']&& (<p> <small style={{color:"red"}}>  {quizDetail['errors']['realAnswer']}  </small> </p>)}
                                                </div>

                                                <div className="text-center">
                                                    <button className="btn btn-0 btn-md btnQuizz" type="submit" name="answer"> Add Correct Answer </button> 
                                                </div>
                                            </form>
                                            {
                                                correctAnswerBox.length > 0 &&
                                                (
                                                    <Table striped bordered hover className="tableDesign mt-3 mb-3">
                                                        <thead>
                                                            <tr className="text-center">
                                                                <th style={{fontWeight: 'bold'}}>QN</th>
                                                                <th>Answer</th>
                                                                <th>Delete</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                correctAnswerBox&&
                                                                (
                                                                    correctAnswerBox.map((val,i)=>{
                                                                    return (
                                                                        <tr className="text-center"> 
                                                                        <td style={{fontWeight: 'bold'}}> {correctAnswerBox.indexOf(val)+1}.  </td> 
                                                                        <td> {val} </td>
                                                                        <td> <AiFillDelete onClick={()=>{removeCorrectAnswer(i)}} style={{fontSize:"25px",cursor: "pointer",color:"black"}}/> </td>
                                                                        </tr>
                                                                    )
                                                                })
                                                                )   
                                                                
                                                            }
                                                        </tbody>
                                                        </Table>
                                                )
                                            }
                                        </Col>
                                        <Col lg={2} className="d-none d-md-none d-lg-block"></Col>
                                    </>
                                ):
                                (
                                    <></>
                                )  
                            }
                        
                            <Col lg={12} className="mt-4">
                                {
                                    step == 1 ?
                                    (
                                        <>
                                            <button type="button" className="btn btn-md btnQuiz"  name="firstComponent" onClick={()=>{setStep(step+1)}}>   Next  </button>
                                            <button type="button" className="btn btn-md btnQuiz d-none"  name="firstComponent" onClick={()=>{setStep(step-1)}}>   Previous  </button>  
                                        </>
                                    ):
                                    step == 5 ?
                                    (
                                        <>
                                            <button type="button" className="btn btn-md btnQuiz d-none"  name="firstComponent" onClick={()=>{setStep(step+1)}}>   Next  </button>
                                            <button type="button" className="btn btn-md btnQuiz"  name="firstComponent" onClick={()=>{setStep(step-1)}}>   Previous  </button>  
                                        </>   
                                    ):
                                    (
                                        <>
                                            <button type="button" className="btn btn-md btnQuiz"  name="firstComponent" onClick={()=>{setStep(step+1)}}>   Next  </button>
                                            <button type="button" className="btn btn-md btnQuiz"  name="firstComponent" onClick={()=>{setStep(step-1)}}>   Previous  </button>  
                                        </>
                                    )
                                }
                                
                                <div style={{clear:"both"}}></div>
                            </Col>
                        </Row>
                      
                    </div>
                      
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default Quiz
