import React from 'react';
import {Container,Row,Col} from 'react-bootstrap';


const QuizResult = (props) => {
    const {resultPoint,questionss} = props;


    let myPoint = parseInt(resultPoint / questionss);

    const getKeyWord = (phase)=>{
        if(phase == "phase1")
        {
            if(myPoint >= 70)
            {
                return "Congratulations!!!"
            }
            else
            {
                return "Sorry!!!"
            }
        }
        else if (phase == "phase2")
        {
            if(myPoint >= 70)
            {
                return "You have Passed:)"
            }
            else
            {
                return "You have failed:)"
            }
        }
    }

    return (
        <React.Fragment>
            <Container>
                <Row>
                    <Col lg={12}>
                        <div className="quizContainer">
                                <h5 className="text-center" style={{fontWeight:"bolder",color:"#4b1cac",fontSize:"32px"}}> {getKeyWord("phase1")}  </h5>
                                <p style={{textAlign:"center",color:"black",fontWeight:"bold"}}> You have achieved </p>
                                <p className="text-center" style={{fontSize:"25px",fontWeight:"bold",color:"#4b1cac",padding:"8px"}}> {myPoint}% </p>
                                <p className="text-center" style={{fontWeight:"bold",color:"black"}}> {getKeyWord("phase2")} </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default QuizResult
