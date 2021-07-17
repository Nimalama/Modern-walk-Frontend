import React,{useState,useEffect} from 'react';
import {Container,Col,Row,Card} from 'react-bootstrap';
import axios from 'axios';
import {Link} from 'react-router-dom'
import swal from 'sweetalert'
import {TiTick} from 'react-icons/ti'

const ShowGiveaway = (props) => {
    const {} = props;
    let [count,setCount] = useState(0);
    let [giveawayCodes,setGiveawayCodes] = useState([]);
    let [giveaway,setGiveaway] = useState([]);
    let [auth,setAuth] = useState({
        "config":{
            "headers":{
                "authorization":`Bearer ${localStorage.getItem("token")}`
            }
        }
    })
    let [winners,setWinners] = useState([]);
    let [myParticipation,setParticipation] = useState([]);

    useEffect(() =>{
        axios.get("http://localhost:90/getOngoingCount")
        .then((response)=>{
            if(response.data.success == true)
            {
                setCount(
                    response.data.data
                )
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    },[count])


    useEffect(()=>{
        axios.get("http://localhost:90/giveAwayDistinct")
        .then((response)=>{
            
            if(response.data.success == true)
            {
                setGiveawayCodes(
                    response.data.data
                )
            }
            else
            {
                setGiveawayCodes(
                   []
                ) 
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])

    useEffect(()=>{
        axios.get("http://localhost:90/giveawayInstances")
        .then((response)=>{
            console.log(response)
            if(response.data.success == true)
            {
                setGiveaway(
                    response.data.data
                )
            }
            else
            {
                setGiveaway(
                    []
                )
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])


    useEffect(()=>{
        axios.get("http://localhost:90/getWinners")
        .then((response)=>{
            
            if(response.data.success == true)
            {
                setWinners(
                    response.data.data
                )
            }
            else
            {
                setWinners(
                    []
                )
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])

    useEffect(()=>{
        axios.get("http://localhost:90/myParticipantRecord",auth.config)
        .then((response)=>{
            console.log(response);
            if(response.data.success == true)
            {
                setParticipation(
                    response.data.data
                )
            }
            else
            {
                setParticipation(
                    []
                )
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])

    const participation = (e,code)=>{
        axios.post("http://localhost:90/participateGiveaway/"+code,{},auth.config)
        .then((response)=>{
            if(response.data.success == true)
            {
                swal({
                    "title":"Success",
                    "text":response.data.message,
                    "icon":"success"
                })
                window.location.reload();
            }
            else
            {
                swal({
                    "title":"Error",
                    "text":response.data.message,
                    "icon":"error"
                })
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    let dataLoad = {};
    if(giveaway.length > 0)
    {
        for(var i of giveaway)
        {
           
            dataLoad[i.giveAwayCode] = ["",i.startingFrom,i.endAt,i.resultAt,i.status,i.sponsor]
        }
    }

    
    
    const token = localStorage.getItem("token");

    return (
        <React.Fragment>
            <Container fluid>
                <Row>
                    <Col lg={12}>
                    <div className="wrapper2">
                            <Row>
                                <Container>
                                <Row>
                                    <Col lg={3} className="d-none d-md-none d-lg-block"></Col>
                                    <Col lg={6} xs={12}>
                                        <div className="details__futsal" style={{marginTop:"16%"}}>
                                            <h4 className="text-center" style={{color:"#ff8c20"}}> Participate in Giveaway  </h4>
                                            <p className="text-center text-white"> Pay your luck and get a chance to win items. </p>
                                            <p className="text-center text-white mb-1"><small> {count} ongoing giveaway. </small></p>
                                            <div className="text-center">
                                                <button type="button" className="btn btn-md btn-primary mt-3" data-toggle="modal" data-target="#winners"> Winners </button>
                                            </div>

                                            
                                        </div>
                                        <div class="modal fade" id="winners" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div class="modal-dialog modal-xl">
                                                <div class="modal-content modal__design">
                                                <div class="modal-header">
                                                    <h5 class="modal-title text-white" id="exampleModalLabel">Winners</h5>
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true" className="text-white">&times;</span>
                                                    </button>
                                                </div>
                                                <div class="modal-body">
                                                    <table className="table table-hover w-100">
                                                        <thead>
                                                            <tr className="text-center">
                                                            <th> Giveaway From </th>
                                                            <th> Items </th>
                                                            
                                                            <th> Winners </th>
                                                            <th> Result Generated At </th>
                                                            </tr>
                                                        </thead>

                                                        <tbody>
                                                            {
                                                                winners.length > 0?
                                                                (
                                                                    winners.map((val)=>{
                                                                        return(
                                                                            <tr className="text-center">
                                                                                <td> <strong>{val.giveaway_id.sponsor}</strong></td>
                                                                                <td> {val.giveaway_id.mergedItem} </td>
                                                                                
                                                                                <td> {val.winners} </td>
                                                                                <td> {val.resultGeneratedAt} </td>
                                                                            </tr>
                                                                        )
                                                                    })
                                                                ):
                                                                (
                                                                    <></>
                                                                )
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div>
                                                </div>
                                                </div>
                                            </div>
                                    </Col>

                                    
                                    </Row> 
                                </Container>
                            </Row>
                        </div>
                    </Col>
                </Row>

                <Container>
                    <Row>
                        <Col lg={12}>
                            <div className="text-center mt-2 mb-2"> 
                                <h5 style={{fontSize:"22px"}}> Giveaway Items </h5>
                             </div>

                            {
                                giveaway.length > 0 ?
                                (
                                    <Row>
                                        {
                                            giveawayCodes.map((code)=>{
                                                return(
                                                   
                                                        <Col lg={12} className="giveaway__basket mt-2 mb-2">
                                                       
                                                        <h5 className="text-center mb-2"> Giveaway from {dataLoad[code][0]} </h5>
                                                            <Row>
                                                            {
                                                                giveaway.map((val)=>{
                                                                  
                                                                    return (
                                                                        code == val.giveAwayCode &&
                                                                        (
                                                                           <Col lg={3}>
                                                                           <Card className="timeCard3">
                                                                            <Card.Img variant="top" src={`http://localhost:90/${val.image}`}/>
                                                                            <Card.Body>
                                                                               <Card.Title className="text-center"> </Card.Title>
                                                                                <p className="mb-1"> <strong> Item Name: </strong> {val.item} </p>
                                                                                <p className="mb-1"> <strong> Quantity: </strong> {val.quantity} </p>
                                                                                
                                                                                
                                                                            </Card.Body>
                                                                            </Card>
                                                                           </Col>     
                                                                        )
                                                                    )
                                                                    
                                                                })
                                                            }
                                                            </Row>
                                                            <div className="detaill">
                                                                <table class="table table-hover w-100">
                                                                    <thead>
                                                                        <th colSpan="2" className="text-center"> Giveaway information </th>
                                                                        <tr>
                                                                            <th> Giveaway Status </th>
                                                                            <td>  {dataLoad[code][4]}  </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <th> Participation Starts From  </th>
                                                                            <td>  {dataLoad[code][1]}  </td>
                                                                        </tr>

                                                                        <tr>
                                                                            <th> Participation Ends At  </th>
                                                                            <td>  {dataLoad[code][2]}  </td>
                                                                        </tr>

                                                                        <tr>
                                                                            <th> Result At </th>
                                                                            <td>  {dataLoad[code][3]}  </td>
                                                                        </tr>
                                                                    </thead>
                                                                </table>
                                                                
                                                            </div>
                                                            <div className="text-center mt-3 mb-2">
                                                                {
                                                                    token?
                                                                    (
                                                                        dataLoad[code][4] == "Ongoing"?
                                                                        (
                                                                            myParticipation.includes(code)?
                                                                            (
                                                                                <button className="btn btn-success btn-md w-25 h-50" type="button" name="participate"> <TiTick style={{fontSize:"20px",paddingBottom:"1px"}}/> Participated  </button>  
                                                                               
                                                                            ):
                                                                            (
                                                                                <button className="btn btn-primary btn-md w-25 h-50" type="button" name="participate" onClick={(event)=>{participation(event,code)}}> Participate </button>  
                                                                            )
                                                                        
                                                                        ):
                                                                         (
                                                                        <button className="btn btn-primary btn-md w-25 h-50" type="button" name="participate" disabled> Participate </button>
                                                                            )
                                                                    ):
                                                                    (
                                                                        <Link className="btn btn-primary btn-md w-25 h-50" to="/login">Login</Link>
                                                                    )
                                                                   
                                                                }
                                                               
                                                            </div>
                                                        </Col>
                                                  
                                                )
                                            })
                                        }
                                    </Row>
                                ):
                                (
                                    <p className="text-center" style={{fontSize:"42px",color:"black",fontWeight:"bold",marginTop:"10px"}}> No giveaway records</p>
                                )
                            } 
                        </Col>
                    </Row>
                </Container>
            </Container>
        </React.Fragment>
    )
}

export default ShowGiveaway
