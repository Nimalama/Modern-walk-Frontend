import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {Container,Row,Col,Card} from 'react-bootstrap'
import Chart from 'chart.js/auto';
let dayChart
let dayChart1

let dayChart3
let dayChart4

const digitizer = (n)=>{
    let num = n;
    if(num < 10)
    {
        num = "0"+num
    }
    return num;
}

const getFormattedToday = (date)=>{
    return `${date.getFullYear()}-${digitizer(date.getMonth()+1)}-${digitizer(date.getDate())}`
}

let today = new Date();
today.setDate(today.getDate()-1)
let mainDate = getFormattedToday(today)

const Charts = (props) => {
    const {} = props;
    //variable goes here
    let user = JSON.parse(localStorage.getItem('user'));
    //state goes here
    let [date,setDate] = useState(mainDate);
    let [auth,setAuth] = useState({
        "config":{
            "headers":{
                "authorization":`Bearer ${localStorage.getItem('token')}`
            }
        }
    })

    let [userSatisfactions,setSatisfactions] = useState({})
    let [overallAnalysis,setAnalysis] = useState({});
    let [chart,setChart] = useState({});
    let [minDate,setMinDate] = useState(mainDate);
    let [fancyDate,setFancyDate] = useState("");
    let [dailyData,setDailyData] = useState({});

    //effect goes here
    useEffect(()=>{
        axios.get(process.env.REACT_APP_URL+"satisfactionMapping",auth.config)
        .then((response)=>{
            
            if(response.data.success == true)
            {
                setSatisfactions(response.data.data)
            }
            else
            {
                setSatisfactions({})
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])

    useEffect(()=>{
        axios.get(process.env.REACT_APP_URL+"getBusinessAnalysis/"+date,auth.config)
        .then((response)=>{
            console.log(response)
            if(response.data.success == true)
            {
                setAnalysis(response.data.master);
                setChart(response.data.chart);
                setMinDate(response.data.minDate)
            }
            else
            {
               
                setAnalysis({})
                setChart({});
                setMinDate(mainDate);
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    },[date])

    useEffect(()=>{
        axios.get(process.env.REACT_APP_URL+"dailyAnalysis/"+date,auth.config)
        .then((response)=>{
            console.log(response)
            if(response.data.success == true)
            {
                setFancyDate(response.data.date);
                setDailyData(response.data.data);
            }
            else
            {
                setFancyDate("")
                setDailyData(response.data.data)
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    },[date])

    console.log(dailyData)

    //charts
    useEffect(()=>{
       
        if(userSatisfactions  && Object.keys(userSatisfactions).length > 0)
        {
            setTimeout(()=>{


            },1000)
            let chartArea = document.querySelector('#satisfaction').getContext('2d');
            const data = {
                labels:Object.keys(userSatisfactions),
                datasets:[
                    {
                        label: "Satisfactions",
                        fill: true,
                        lineTension: 0.1,
                        borderColor: "black",
                        backgroundColor:"skyblue",
                        borderCapStyle: 'butt',
                        borderDash: [10,5],
                        borderDashOffset: 1.0,
                        borderWidth:0.5,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "black",
                        pointBackgroundColor: "black",
                        pointBorderWidth: 0,
                        pointHoverRadius: 2,
                        pointHoverBackgroundColor: "blue",
                        pointHoverBorderColor: "yellow",
                        pointHoverBorderWidth: 2,
                        pointRadius: 3,
                        pointHitRadius: 3,
                        // notice the gap in the data and the spanGaps: false
                        data:Object.values(userSatisfactions),
                        spanGaps: false

                    }
                ]
            }

            try{
                dayChart4 = new Chart(chartArea,{
                    type:"line",
                    data:data,
                    options:{
                        title:{
                          display:true,
                          text:'Day Sales',
                          fontSize:25
                        },
                        legend:{
                          display:true,
                          position:'right',
                          labels:{
                            fontColor:'white'
                          }
                        },
                        layout:{
                          padding:{
                            left:50,
                            right:0,
                            bottom:0,
                            top:0
                          }
                        },
                        tooltips:{
                          enabled:true
                        },
                        scales:{
                            y: {
                                beginAtZero: true
                              }
                        }
                      }
                })

            }
            catch(err)
            {
                try{
                    dayChart4.destroy();
                    dayChart4 = new Chart(chartArea,{
                        type:"line",
                        data:data,
                        options:{
                            title:{
                              display:true,
                              text:'Day Sales',
                              fontSize:25
                            },
                            legend:{
                              display:true,
                              position:'right',
                              labels:{
                                fontColor:'white'
                              }
                            },
                            layout:{
                              padding:{
                                left:50,
                                right:0,
                                bottom:0,
                                top:0
                              }
                            },
                            tooltips:{
                              enabled:true
                            },
                            scales:{
                                y: {
                                    beginAtZero: true
                                  }
                            }
                          }
                    })

                }
                catch(err2){}
            }

            
        }
    },[JSON.stringify(userSatisfactions)])

    useEffect(()=>{
       
        if(dailyData && Object.keys(dailyData).length > 0)
        {
            setTimeout(()=>{
                let chartArea = document.querySelector('#quantitySelling').getContext('2d');
                const data = {
                    labels:Object.keys(dailyData['quantityBox']),
                    datasets:[
                        {
                            label: "Quantity",
                            fill: true,
                            lineTension: 0.1,
                            borderColor: "black",
                            backgroundColor:"skyblue",
                            borderCapStyle: 'butt',
                            borderDash: [10,5],
                            borderDashOffset: 1.0,
                            borderWidth:0.5,
                            borderJoinStyle: 'miter',
                            pointBorderColor: "black",
                            pointBackgroundColor: "black",
                            pointBorderWidth: 0,
                            pointHoverRadius: 2,
                            pointHoverBackgroundColor: "blue",
                            pointHoverBorderColor: "yellow",
                            pointHoverBorderWidth: 2,
                            pointRadius: 3,
                            pointHitRadius: 3,
                            // notice the gap in the data and the spanGaps: false
                            data:Object.values(dailyData['quantityBox']).map((val)=>{return val[0]}),
                            spanGaps: false
    
                        }
                    ]
                }
    try{dayChart3 = new Chart(chartArea,{
        type:"bar",
        data:data,
        options:{
           
            plugins: {
                legend: {
                  display: false
                }
              },
            scales:{
                x: {
                    display: true
                },
                y: {
                    display: true
                }
            },
            layout: {
                padding: {
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                },
              }
        }
    })
}
    catch(err){
        
        try{
            dayChart3.destroy();

            dayChart3 = new Chart(chartArea,{
           
            type:"bar",
            data:data,
            options:{
               
                plugins: {
                    legend: {
                      display: false
                    }
                  },
                scales:{
                    x: {
                        display: true
                    },
                    y: {
                        display: true
                    }
                },
                layout: {
                    padding: {
                      left: 0,
                      right: 0,
                      top: 0,
                      bottom: 0,
                    },
                  }
            }
        })
}
        catch(err2){}
    }
   
                
            },1000)
           
        }
       
    },[JSON.stringify(dailyData),date])

    useEffect(()=>{
        if(dailyData  && Object.keys(dailyData).length > 0)
        {
            setTimeout(()=>{
                let chartArea = document.querySelector('#priceSelling').getContext('2d');
                const data = {
                    labels:Object.keys(dailyData['priceBox']),
                    datasets:[
                        {
                            label: "Price",
                            fill: true,
                            lineTension: 0.1,
                            borderColor: "black",
                            backgroundColor:"skyblue",
                            borderCapStyle: 'butt',
                            borderDash: [10,5],
                            borderDashOffset: 1.0,
                            borderWidth:0.5,
                            borderJoinStyle: 'miter',
                            pointBorderColor: "black",
                            pointBackgroundColor: "black",
                            pointBorderWidth: 0,
                            pointHoverRadius: 2,
                            pointHoverBackgroundColor: "blue",
                            pointHoverBorderColor: "yellow",
                            pointHoverBorderWidth: 2,
                            pointRadius: 3,
                            pointHitRadius: 3,
                            // notice the gap in the data and the spanGaps: false
                            data:Object.values(dailyData['priceBox']).map((val)=>{return val[1]}),
                            spanGaps: false
    

                        }
                    ]
                }
                try
                {
                    dayChart1 = new Chart(chartArea,{
                        type:"bar",
                        data:data,
                        options:{
                            title:{
                              display:true,
                              text:'Day Sales',
                              fontSize:25
                            },
                            legend:{
                              display:true,
                              position:'right',
                              labels:{
                                fontColor:'white'
                              }
                            },
                            layout:{
                              padding:{
                                left:50,
                                right:0,
                                bottom:0,
                                top:0
                              }
                            },
                            tooltips:{
                              enabled:true
                            },
                            scales:{
                                y: {
                                    beginAtZero: true
                                  }
                            }
                          }
                    })
                }
                catch(err) {
                    try{
                        dayChart1.destroy();
                        dayChart1 = new Chart(chartArea,{
                            type:"bar",
                            data:data,
                            options:{
                                title:{
                                  display:true,
                                  text:'Day Sales',
                                  fontSize:25
                                },
                                legend:{
                                  display:true,
                                  position:'right',
                                  labels:{
                                    fontColor:'white'
                                  }
                                },
                                layout:{
                                  padding:{
                                    left:50,
                                    right:0,
                                    bottom:0,
                                    top:0
                                  }
                                },
                                tooltips:{
                                  enabled:true
                                },
                                scales:{
                                    y: {
                                        beginAtZero: true
                                      }
                                }
                              }
                        })
                    }
                    catch(err2){}
                }
                
    
                
            },1000)
           
        }
      
    },[JSON.stringify(dailyData),date])

    useEffect(()=>{
        if(chart && Object.keys(chart).length > 0)
        {
            setTimeout(()=>{
                let chartArea = document.querySelector('#businessPoint').getContext('2d');
                const data = {
                    labels:Object.keys(chart),
                    datasets:[
                        {
                            label: "Business Point",
                            fill: true,
                            lineTension: 0.1,
                            borderColor: "black",
                            backgroundColor:"skyblue",
                            borderCapStyle: 'butt',
                            borderDash: [10,5],
                            borderDashOffset: 1.0,
                            borderWidth:0.5,
                            borderJoinStyle: 'miter',
                            pointBorderColor: "black",
                            pointBackgroundColor: "black",
                            pointBorderWidth: 0,
                            pointHoverRadius: 2,
                            pointHoverBackgroundColor: "blue",
                            pointHoverBorderColor: "yellow",
                            pointHoverBorderWidth: 2,
                            pointRadius: 3,
                            pointHitRadius: 3,
                            // notice the gap in the data and the spanGaps: false
                            data:Object.values(chart),
                            spanGaps: false
    
                        }
                    ]
                }
    
                try
                {
                    dayChart = new Chart(chartArea,{
                        type:"line",
                        data:data,
                        options:{
                            title:{
                              display:true,
                              text:'Day Sales',
                              fontSize:25
                            },
                            legend:{
                              display:true,
                              position:'right',
                              labels:{
                                fontColor:'white'
                              }
                            },
                            layout:{
                              padding:{
                                left:50,
                                right:0,
                                bottom:0,
                                top:0
                              }
                            },
                            tooltips:{
                              enabled:true
                            },
                            scales:{
                                y: {
                                    beginAtZero: true
                                  }
                            }
                          }
                    })
    
                }
                catch(err)
                {
                    try{
                        dayChart.destroy();
                        dayChart = new Chart(chartArea,{
                            type:"line",
                            data:data,
                            options:{
                                title:{
                                  display:true,
                                  text:'Day Sales',
                                  fontSize:25
                                },
                                legend:{
                                  display:true,
                                  position:'right',
                                  labels:{
                                    fontColor:'white'
                                  }
                                },
                                layout:{
                                  padding:{
                                    left:50,
                                    right:0,
                                    bottom:0,
                                    top:0
                                  }
                                },
                                tooltips:{
                                  enabled:true
                                },
                                scales:{
                                    y: {
                                        beginAtZero: true
                                      }
                                }
                              }
                        })
    
                    }
                    catch(err2){}
                }
             
            },1000)
             
        }
        
    },[JSON.stringify(chart)])

    //handlers goes here
    const changeHandler = (e)=>{
        setDate(e.target.value);
    }

    const displayTable = ()=>{
        if(userSatisfactions)
        {
            let totalData = Object.keys(userSatisfactions).slice(0,10);
            if(totalData.length > 0)
            {
                return (
                    <table className="table table-hover">
                        <thead>
                            <tr className="text-center">
                                <th>User</th>
                                <th> Points </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                totalData.map((val)=>{
                                    return (
                                        <tr className="text-center">
                                            <td> {val} </td>
                                            <td> {userSatisfactions[val]} </td>
                                        </tr>
                                    )
                                })
                            }
                            
                        </tbody>
                    </table>
                )
            }
            else
            {
                return (
                    <p className="text-center"> No records. </p>
                )
            }
        }
        else
        {
            return (
                <p className="text-center"> No records. </p>
            )
        }
    }

    const displaySellings = ()=>{
        if(Object.keys(dailyData).length > 0)
        {
            let totalData = Object.keys(dailyData['quantityBox']).slice(0,10);
            if(totalData.length > 0)
            {
                return (
                    <table className="table table-hover">
                        <thead>
                            <tr className="text-center">
                                <th>Product</th>
                                <th> Quantity sold </th>
                                <th> Price Collected </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                totalData.map((val)=>{
                                    return (
                                        <tr className="text-center">
                                            <td> {val} </td>
                                            <td> {dailyData['quantityBox'][val][0]} </td>
                                            <td> Rs {dailyData['quantityBox'][val][1]} </td>
                                        </tr>
                                    )
                                })
                            }
                            
                        </tbody>
                    </table>
                )
            }
            else
            {
                return (
                    <p className="text-center"> No records. </p>
                )
            }
        }
        else
        {
            return (
                <p className="text-center"> No records. </p>
            )
        }
    }

    const displaySellingsPrice = ()=>{
        if(Object.keys(dailyData).length > 0)
        {
            let totalData = Object.keys(dailyData['priceBox']).slice(0,10);
            if(totalData.length > 0)
            {
                return (
                    <table className="table table-hover">
                        <thead>
                            <tr className="text-center">
                                <th>Product</th>
                                <th> Quantity sold </th>
                                <th> Price Collected </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                totalData.map((val)=>{
                                    return (
                                        <tr className="text-center">
                                            <td> {val} </td>
                                            <td> {dailyData['priceBox'][val][0]} </td>
                                            <td> Rs {dailyData['priceBox'][val][1]} </td>
                                        </tr>
                                    )
                                })
                            }
                            
                        </tbody>
                    </table>
                )
            }
            else
            {
                return (
                    <p className="text-center"> No records. </p>
                )
            }
        }
        else
        {
            return (
                <p className="text-center"> No records. </p>
            )
        }
    }
    

    return (
        <React.Fragment>
               <Container>
                   <Row>
                       <Col lg={12}>
                            <div className="item__wrapper">
                                <h5 className="text-center" style={{fontWeight:"bolder",color:"white",fontSize:"21px"}}> Analysis  </h5>
                                <Row>
                                    <Col lg={2}>
                                        <div className="userImg">
                                            {
                                                user.profileImg == "no-img.jpg"?
                                                (
                                                    <img src="logo192.png" alt="img" className="d-block"/>
                                                ):
                                                (
                                                    <img src={`${process.env.REACT_APP_URL}${user.profileImg}`} alt="img" className="d-block"/>
                                                )
                                            }
                                            
                                        </div>
                                    </Col>
                                    <Col lg={5}>
                                        <div className="adminDetails ml-3 mt-5" style={{color:"black"}}>
                                                <p className="mb-1"> <strong>Full name: </strong> {user.fname} {user.lname} </p>
                                                <p className="mb-1"> <strong>Email: </strong> {user.Email} </p>
                                                <p className="mb-1"> <strong>Username: </strong> {user.Username} </p>
                                                <p className="mb-1"><strong>UserType: </strong> {user.UserType} </p>
                                        </div>       
                                    </Col>
                                    <Col lg={12}>       
                                        <Row>
                                            <Col lg={4} className="d-none d-md-none d-lg-block"></Col>
                                            <Col lg={4}>
                                                <form method = "post">
                                                    <div className="form-group">
                                                        <input type="date" className="form-control" name="date" onChange={(e)=>{changeHandler(e)}}  max={mainDate} value={date}/>
                                                    </div>
                                                </form>
                                            </Col>       
                                            <Col lg={4} className="d-none d-md-none d-lg-block"></Col>
                                            <Col lg={12}>
                                                <p className="text-center mb-2" style={{fontWeight:"bolder"}}>  {fancyDate} </p>
                                            </Col>
                                        </Row>
                                    </Col>        
                                    {
                                            overallAnalysis&&
                                            (
                                                
                                    <Container className="mb-2 mt-4">
                                    <Row>
                                         <Col lg={3}>
                                             
                                              <Card className="analysisCard">
                                                  
                                                  <Card.Body>
                                                      <Card.Title>Total Quantity Sold</Card.Title>
                                                      {
                                                          overallAnalysis['quantity']?
                                                          (
                                                              <Card.Text style={{fontWeight:"bolder",fontSize:"22px"}}>
                                                                  {overallAnalysis['quantity']}
                                                              </Card.Text>
                                                          ):
                                                          (
                                                              <Card.Text style={{fontWeight:"bolder",fontSize:"22px"}}>
                                                                  0
                                                              </Card.Text>
                                                          )   
                                                      }
                                                    
                                                      
                                                  </Card.Body>
                                              </Card>
                                         </Col> 
                                         <Col lg={3}>
                                              <Card className="analysisCard">
                                                  
                                                  <Card.Body>
                                                      <Card.Title>Total Price Collected</Card.Title>
                                                      
                                                      {
                                                          overallAnalysis['priceCollected']?
                                                          (
                                                              <Card.Text style={{fontWeight:"bolder",fontSize:"22px"}}>
                                                                 Rs {overallAnalysis['priceCollected']}
                                                              </Card.Text>
                                                          ):
                                                          (
                                                              <Card.Text style={{fontWeight:"bolder",fontSize:"22px"}}>
                                                                 Rs 0
                                                              </Card.Text>
                                                          )   
                                                      }
                                                      
                                                  </Card.Body>
                                              </Card>
                                         </Col> 
                                         <Col lg={3}>
                                              <Card className="analysisCard">
                                                  
                                                  <Card.Body>
                                                      <Card.Title>Commision</Card.Title>
                                                      
                                                      {
                                                          overallAnalysis['commision']?
                                                          (
                                                              <Card.Text style={{fontWeight:"bolder",fontSize:"22px"}}>
                                                                  Rs {overallAnalysis['commision']}
                                                              </Card.Text>
                                                          ):
                                                          (
                                                              <Card.Text style={{fontWeight:"bolder",fontSize:"22px"}}>
                                                                  Rs 0
                                                              </Card.Text>
                                                          )   
                                                      }
                                                  </Card.Body>
                                              </Card>
                                         </Col> 
                                         <Col lg={3}>
                                              <Card className="analysisCard">
                                                  
                                                  <Card.Body>
                                                      <Card.Title>Commision View</Card.Title>
                                                    
                                                      {
                                                          overallAnalysis['businessPoint']?
                                                          (
                                                              <Card.Text style={{fontWeight:"bolder",fontSize:"22px"}}>
                                                                  {overallAnalysis['businessPoint']}%
                                                              </Card.Text>
                                                          ):
                                                          (
                                                              <Card.Text style={{fontWeight:"bolder",fontSize:"22px"}}>
                                                                  0%
                                                              </Card.Text>
                                                          )   
                                                      }
                                                  </Card.Body>
                                              </Card>
                                         </Col> 
                                    </Row>
                                    </Container> 
                                                           
                                             )
                                    }

                                        <p className="text-center" style={{fontWeight:"bolder",color:"black",marginLeft:"10px"}}> Chart </p>

                                          <Container className="mt-2 mb-2">
                                            <Row>
                                                <Col lg={7}>
                                                    <p className="text-center" style={{fontWeight:"bolder",fontSize:"21px"}}> Top Sellings (According to Quantity) </p>
                                                    
                                                       
                                                            <div>
                                                            <canvas id="quantitySelling"></canvas>
                                                        </div>
                                                        
                                                    
                                                  
                                                </Col>
                                                <Col lg={5}>
                                                    <p className="text-center" style={{fontWeight:"bolder"}}> Top 10 Sellings </p>
                                                    {
                                                        displaySellings()
                                                    }
                                                </Col>
                                            </Row>
                                        </Container> 

                                         <Container className="mt-2 mb-2">
                                            <Row>
                                                <Col lg={7}>
                                                    <p className=" text-center" style={{fontWeight:"bolder",fontSize:"21px"}}> Top Sellings (According to Price) </p>
                                                    <div>
                                                        <canvas id="priceSelling"></canvas>
                                                    </div>
                                                </Col>
                                                <Col lg={5}>
                                                    <p className=" text-center" style={{fontWeight:"bolder"}}> Top 10 Sellings </p>
                                                    {
                                                        displaySellingsPrice()
                                                    }
                                                </Col>
                                            </Row>
                                        </Container>    

                                          <Container className="mt-2 mb-2">
                                            <Row>
                                                <Col lg={12}>
                                                    <p className=" text-center" style={{fontWeight:"bolder",fontSize:"21px"}}> Commision View Chart </p>
                                                   
                                                        <div>
                                                            <canvas id="businessPoint"></canvas>
                                                        </div>
                                                       
                                                   
                                                </Col>
                                               
                                            </Row>
                                        </Container>   

                                        <Container className="mt-2 mb-2">
                                            <Row>
                                                <Col lg={8}>
                                                    <p className=" text-center" style={{fontWeight:"bolder",fontSize:"21px"}}> Overall User Satisfactions(Not According to date) </p>
                                                    <div>
                                                        <canvas id="satisfaction"></canvas>
                                                    </div>
                                                </Col>
                                                <Col lg={4}>
                                                    <p className=" text-center" style={{fontWeight:"bolder"}}> Top 10 Satisfactions </p>
                                                    {
                                                        displayTable()
                                                    }
                                                </Col>
                                            </Row>
                                        </Container>    

                                            


                                  
                                </Row>
                            </div>
                       </Col>
                   </Row>
               </Container> 
        </React.Fragment>
    )
}

export default Charts
