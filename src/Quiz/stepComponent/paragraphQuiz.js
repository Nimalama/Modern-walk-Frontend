import React,{useState,useEffect} from 'react';
import {Col} from 'react-bootstrap';
import useQuiz from '../useQuiz';

const ParagraphQuiz = (props) => {
    const {} = props;
    const {quizChangeHandler,quizDetail,stepHandler} = useQuiz()

    
    return (
        <React.Fragment>
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
            
           
        </React.Fragment>
    )
}

export default ParagraphQuiz
