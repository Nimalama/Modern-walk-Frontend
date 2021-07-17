
import React,{useState,useEffect} from 'react';
import {Container,Col,Row} from 'react-bootstrap';
import {AiFillDelete} from 'react-icons/ai';
import axios from 'axios';
import swal from 'sweetalert';


var item = {};
var namings = ["itemName","itemQuantity","startingAt","endingAt"];
var defaultData = ["Item Name","Quantity","starting","ending"];
let gItems = [];
let pushed = [];
const AddGiveaway = (props) => {
    const {} = props;
    
    let [rows,setRows] = useState(0);   
    let [endDate,setEndDate] = useState(true)
    let [giveAwayDetails,setDetails] = useState({
        "sponsor":"",
        "startingFrom":"",
        "endAt":"",
        "item":"",
        "quantity":"",
        "selectedFutsal":"",
        "giveawayItems":[],
        "config":{
            "headers":{
                "authorization":`Bearer ${localStorage.getItem("token")}`
            }
        },
        "error":""
    })


    useEffect(()=>{
        

        var starts = document.querySelector("#startingAt");
        var today = new Date();
        var today2 = new Date();
        today.setDate(today.getDate()+1);
        today2.setDate(today.getDate()+15);
        var minMap = `${today.getFullYear()}-${dateDigit(today.getMonth()+1)}-${dateDigit(today.getDate())}`
        var maxMap = `${today2.getFullYear()}-${dateDigit(today2.getMonth()+1)}-${dateDigit(today2.getDate())}`
        starts.setAttribute("min",minMap);
        starts.setAttribute("max",maxMap);
    },[])


    


    const checkData = (e)=>{
        var selectedClassName = e.target.id;
        if(namings.includes(selectedClassName))
        {
            var valuee = document.querySelector(`#${selectedClassName}`).value
            var index = namings.indexOf(selectedClassName);
            if(valuee.length <= 0)
            {
                document.querySelector(`.${selectedClassName}`).innerHTML = defaultData[index]
            }
            else
            {
                document.querySelector(`.${selectedClassName}`).innerHTML = valuee; 
            }
            
        }
    }

    const imageChange = (e)=>{
        var imgContainer = document.querySelector("#addImage");
        imgContainer.src = URL.createObjectURL(e.target.files[0])
       
    }

    const operation = (operator,key)=>{
      
      var quantity = parseInt(item[key][0]);
      switch(operator)
      {
          case "minus":
              if(quantity > 1)
              {
                  quantity--;
                  item[key][0] = quantity;
              }
              break;

          case "add":
              quantity++;
               item[key][0] = quantity;   
               break;
          
         default:
             break;
      }
      
      var keyGen = key.replace(" ","");
      document.querySelector(`.count${keyGen}`).innerHTML = quantity;

    }
   
    
   const deleteItem = (key)=>{
       var keyss = Object.keys(item);
       var index = keyss.indexOf(key);
       delete item[key];
       gItems.splice(index, 1);
       pushed.splice(index,1);
       setRows(gItems.length);
       if(gItems.length <= 0)
       {
        document.querySelector(".dateForm").style.display = "none";
        document.querySelector(".itemTable").style.display = "none";
        document.querySelector(".startingAt").innerHTML = "starting";
        document.querySelector(".endingAt").innerHTML = "ending";
       }
   }
 
    
    const loadData = ()=>{
        
        if(item == null)
        {
            document.querySelector(".items").innerHTML = "No Items";
            
        }
        else
        {
            
            document.querySelector(".dateForm").style.display = "inline-block";
            document.querySelector(".itemTable").style.display = "inline-block";
            
            for(var i in item)
            {
               if(!pushed.includes(i))
               {
                gItems.push(
                    <tr className="text-center">
                        <td>
                            <img src={URL.createObjectURL(item[i][3])} alt="logo"  style={{width:"50px",height:"50px",borderRadius:"50%",border:"1px solid white",marginLeft:"auto",marginRight:"auto"}} className="d-block"/>
                        </td>
                        <td> {i} </td>
                        <td><span onClick = {()=>{operation('minus',i)}} style={{background:"darkblue", padding:"4px", fontSize:"10px", cursor:"pointer", marginRight:"5px"}}> - </span>  <span className={`count${i.replace(" ","")}`}>{item[i][0]}</span>  <span onClick = {()=>{operation('add',i)}} style={{background:"darkblue", padding:"4px", fontSize:"10px", cursor:"pointer", marginLeft:"5px"}} > + </span></td>
                        <td><small onClick = {()=>{deleteItem(i)}} style={{color:"white", textDecoration:"underline", cursor:"pointer"}}> Delete </small> </td>
                    </tr>
                    )
                    pushed.push(i);
                    
               }
               
              
                
                
            }

           setRows(gItems.length)
           
        }
    }

    const addToItem = (e)=>{
        e.preventDefault();
        if(!Object.keys(item).includes(document.querySelector(`.${namings[0]}`).innerHTML))
        {
        var dataCollector = [];
        for(var i=1; i<namings.length; i++)
        {
            dataCollector.push(document.querySelector(`.${namings[i]}`).innerHTML);
        }
        
        dataCollector.push(document.querySelector("#img").files[0]);
        
        item[document.querySelector(`.${namings[0]}`).innerHTML] = dataCollector
          
        
        
        for(var i=0; i<namings.length; i++)
        {
           document.querySelector(`.${namings[i]}`).innerHTML = defaultData[i];
           document.querySelector(`#${namings[i]}`).value = "";
        }
        document.querySelector("#img").value = [];
        var img = document.querySelector("#addImage");
        img.src="imageAdd.png"
        
        loadData();
    }
    else
    {
        swal({
            "title":"Success",
            "text":"Items already exits",
            "icons":"info"
        })
        for(var i=0; i<namings.length; i++)
        {
           document.querySelector(`.${namings[i]}`).innerHTML = defaultData[i];
           document.querySelector(`#${namings[i]}`).value = "";
        }
        document.querySelector("#img").value = [];
    }
    }

    const dateDigit = (val)=>{
        var given = val;
        if(given < 10)
        {
            given = "0"+given;
        }
        return given;
    }

    const dateMapping = (e)=>{
        var endForm = document.querySelector("#endingAt");
        endForm.value = "";
        var startDate = new Date(e.target.value);
        var startDate2 = new Date(e.target.value);
        startDate.setDate(startDate.getDate()+2);
        startDate2.setDate(startDate2.getDate()+7);

        var minMap = `${startDate.getFullYear()}-${dateDigit(startDate.getMonth()+1)}-${dateDigit(startDate.getDate())}`
        var maxMap = `${startDate2.getFullYear()}-${dateDigit(startDate2.getMonth()+1)}-${dateDigit(startDate2.getDate())}`

        endForm.setAttribute('min',minMap);
        endForm.setAttribute('max',maxMap);

        setEndDate(false);
    }

    const changeHandler = (e)=>{
       
        var {name,value} = e.target;
        setDetails(
            {
                ...giveAwayDetails,

                [name]:value
            }
        )
    }

    const changer = (e,id,fname)=>{
        setDetails(
            {
                ...giveAwayDetails,
                ["futsal_id"]:id,
                ["selectedFutsal"]:fname
            }
        )
    }

    const addGiveaway = (e)=>{
        e.preventDefault();
        var items = Object.keys(item);
        var quantityContainer = [];
        var images = [];
        for(var i in item)
        {
            quantityContainer.push(item[i][0]);
            images.push(item[i][3]);
        }
        
        giveAwayDetails["item"] = items.join(",")
        giveAwayDetails["quantity"] = quantityContainer.join(",");
        giveAwayDetails["giveawayItems"] = images.map((val)=>{return val});
        

        if(giveAwayDetails["sponsor_id"] == "")
        {
            setDetails({
                ...giveAwayDetails,
                ["error"]:"Please Select a sponsor"
            })

            
        }
        else
        {
            
           
            let fd = new FormData();
            fd.append("item",giveAwayDetails.item);
            fd.append("quantity",giveAwayDetails.quantity);
            fd.append("startingFrom",giveAwayDetails.startingFrom);
            fd.append("endAt",giveAwayDetails.endAt);
            [...giveAwayDetails.giveawayItems].forEach(image=>{
                fd.append("giveawayItems",image)
            })
            fd.append("sponsor",giveAwayDetails.sponsor);
           
            axios.post("http://localhost:90/addGiveAway",fd,giveAwayDetails.config)
            .then((response)=>{
                if(response.data.success == true) {
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
    }

    return (
        <React.Fragment>
            <Container>
                <Row className="mt-2 mb-2">
                    <Col lg={12} className="mt-2 mb-2">
                        <h5 className="text-primary text-center" style={{fontWeight:"bolder"}}> Add Giveaway </h5>
                    </Col>
                    <Col lg={4} className="d-none d-md-block"></Col>
                    <Col lg={4}>
                        <div className="giveAwayDetails">
                            <div className="item__img">
                                <img src="logo512.png" alt="cloth" id="addImage" className='d-block'/> 
                            </div>
                            <h5 className="text-center itemName mb-0"> Item Name </h5>
                            <p className="text-center mb-0"> <small className="itemQuantity"> Quantity </small> </p>
                            <p className="text-center mb-0"> <small className="startingAt"> starting </small> | <small className="endingAt"> ending </small>   </p>
                        </div>

                        <div className="giveaway__form">
                            <form method="post" onSubmit={addToItem}>
                            
                           

                                <div className="form-group">
                                    <label> Item Name </label>
                                    <input type="text" className="form-control" name="itemName" id="itemName" onInput={(event)=>{checkData(event)}} required/>
                                </div>

                                <div className="form-group">
                                    <label> Quantity</label>
                                    <input type="number" className="form-control" name="itemQuantity" id="itemQuantity" onInput={(event)=>{checkData(event)}} required/>
                                </div>

                               

                                <div className="form-group">
                                    <label> Image </label>
                                    <input type="file" className="form-control-file" accept="image/*" name="img" id="img" onChange={(event)=>{imageChange(event)}} required/>
                                </div>

                                <div className="text-center">
                                    <button className="btn btn-primary btn-md w-50" name="addGiveaway" type="submit"> Add </button>
                                </div>

                            </form>
                        </div>
                    </Col>
                    <Col lg={4} className="d-none d-md-block"></Col>

                    <Col lg={2} className="d-none d-md-block"></Col>
                    <Col lg={8} className="itemTable">
                    <table class="table table-striped item__table">
                        <thead>
                            <tr className="text-center">
                            <th scope="col">Item Image</th>  
                            <th scope="col">Item Name</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody className="items">
                           {
                               gItems.length > 0?
                               (
                                 gItems.map((val)=>{
                                     return (val);
                                 })
                               ):
                               (
                                   <></>
                               )
                           }
                        </tbody>
                    </table>
                    <Row>
                        <Col lg={3} className="d-none d-md-block"></Col>
                        <Col lg={6} className="dateForm">
                       
                            <form method="post" className="giveaway__form" onSubmit={addGiveaway}>
                            <div className="form-group">
                                    <label>Choose Sponsor</label>
                                   <input type="text" className="form-control" placeholder="Sponsor name" name="sponsor" value={giveAwayDetails['sponsor']} onChange={(event)=>{changeHandler(event)}} required />

                                            
                                </div>
                            <div className="form-group">
                                    <label> Starting At</label>
                                    <input type="date" className="form-control" name="startingFrom" id="startingAt" onChange={(event)=>{checkData(event); dateMapping(event); changeHandler(event)}} required/>
                                </div>

                                <div className="form-group">
                                    <label> Ending At</label>
                                    <input type="date" className="form-control" name="endAt" id="endingAt" onChange={(event)=>{checkData(event);changeHandler(event)}} disabled={endDate} required/>
                                </div>
                                {giveAwayDetails["error"] &&  (<p className="text-center" style={{color:"white",textDecoration:"underline"}}> {giveAwayDetails["error"]} </p>)}
                                <div className="text-center">
                                    <button type="submit" className="btn btn-primary btn-md w-50" name="giveaway"> Add Giveaway </button>
                                </div>
                            </form>
                        </Col>
                    </Row>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default AddGiveaway
