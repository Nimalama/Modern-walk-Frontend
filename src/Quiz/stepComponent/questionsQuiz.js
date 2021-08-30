import React,{useState,useEffect} from 'react';
import {Col,Table} from 'react-bootstrap'
import useQuiz from '../useQuiz'
import {AiFillDelete} from 'react-icons/ai'

const QuestionsQuiz = (props) => {
    const {} = props;
    const {questions} = useQuiz();

    let [question,setQuestion] = useState("");
    let [questionBox,setQuestionBox] = useState([]);

    const addQuestion = (e)=>{
        e.preventDefault();
        setQuestionBox([...questionBox,question])
        setQuestion("");
    }
  
    return (
        <React.Fragment>
            <Col lg={2} className="d-none d-md-none d-lg-block"></Col>
            <Col lg={8}>
                <form method = "post" onSubmit={addQuestion}>
                    <div className="form-group">
                        <label> Question No {questionBox.length + 1} </label>  
                        <input type="text" className="form-control" name="question" value={question} onChange={(e)=>{setQuestion(e.target.value)}} required></input>
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
                                               <td> <AiFillDelete style={{fontSize:"25px",cursor: "pointer",color:"black"}}/> </td>
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
        </React.Fragment>
    )
}

export default QuestionsQuiz
