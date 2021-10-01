import React,{useState,useEffect} from 'react';
import {Container,Row,Col} from 'react-bootstrap';
import {useToasts} from 'react-toast-notifications';
import axios from 'axios';
import Menu from './menu'


var status = ['','Normal','Special',"Today's Special"];

const AddFood = (props) => {
    let {} = props;
    const {addToast} = useToasts();
   
    //state goes here
    let [foodDetail,setFoodDetail] = useState({
        "category":"",
        "foodName":"",
        "flavor":"",
        "price":0,
        "discountPercent":0,
        "status":"",
        "description":"",
        "foodPictures":[],
        "errors":{}
    })

 

    let [auth,setAuth] = useState({
        "config":{
            "headers":{
                'authorization':`Bearer ${localStorage.getItem('token')}`
            }
        }
    })

    //effect goes here


    //handlers goes here
    const changeHandler = (e)=>{
        let {name,value } = e.target;
        setFoodDetail({
            ...foodDetail,
            [name]:value
        })
    }

    const imageHandler = (e)=>{
        let {name,files} = e.target;
        setFoodDetail({
            ...foodDetail,
            [name]:files
        })
    }

    const addFood = (e)=>{
        e.preventDefault();

        let fd = new FormData();
        fd.append('category',foodDetail.category);
        fd.append('foodName',foodDetail.foodName);
        fd.append('flavor',foodDetail.flavor);
        fd.append('price',foodDetail.price);
        fd.append('discountPercent',foodDetail.discountPercent);
        fd.append('status',foodDetail.status);
        fd.append('description',foodDetail.description);
        [...foodDetail.foodPictures].forEach((data)=>{
            fd.append('foodPictures',data)
        })

        axios.post(process.env.REACT_APP_URL+"addAItem",fd,auth.config)
        .then((response)=>{
           if(response.data.success == true)
           {
            addToast(response.data.message,{'appearance':"success",'autoDismiss':true});
            window.location.reload();
           }
           else
           {
              addToast(response.data.message,{'appearance':"error",'autoDismiss':true});
              setFoodDetail({
                  ...foodDetail,
                  ['errors']:response.data.error
              })
           }
        })
        .catch((err)=>{
            console.log(err);
        })

    }

    return (
        <React.Fragment>
            <Container fluid>
                <Row>
                    <Col lg={12}>
                        <div>
                            <h5 style={{color:"grey",fontSize:"24px",fontWeight:"bolder",margin:"10px 0px"}}> Add New Food </h5>
                            <form method="post" className="addFood" onSubmit={addFood}>
                                   <Row>
                                       <Col lg={6}>
                                           <div className='form-group'>
                                               <label> Category </label>
                                               <input type='text' className='form-control' name='category' value={foodDetail.category} placeholder="Category" onChange={(e)=>{changeHandler(e)}}/>
                                               {foodDetail['errors']['category']&& (<p> <small style={{color:"red"}}> *{foodDetail['errors']['category']} </small> </p>)}     
                                           </div>
                                       </Col>
                                       <Col lg={6}>
                                           <div className='form-group'>
                                               <label> Food name </label>
                                               <input type='text' className='form-control' name='foodName' value={foodDetail.foodName} placeholder="Foodname" onChange={(e)=>{changeHandler(e)}}/>
                                               {foodDetail['errors']['foodName']&& (<p> <small style={{color:"red"}}> *{foodDetail['errors']['foodName']} </small> </p>)} 
                                           </div>
                                       </Col>
                                   </Row> 

                                   <Row>
                                       <Col lg={4}>
                                            <div className='form-group'>
                                               <label> Flavor </label>
                                               <input type='text' className='form-control' name='flavor' value={foodDetail.flavor} placeholder="Flavor" onChange={(e)=>{changeHandler(e)}}/>
                                               {foodDetail['errors']['flavor']&& (<p> <small style={{color:"red"}}> *{foodDetail['errors']['flavor']} </small> </p>)} 
                                            </div>
                                       </Col>
                                       <Col lg={4}>
                                            <div className='form-group'>
                                               <label> Price </label>
                                               <input type='number' className='form-control' name='price' value={foodDetail.price} placeholder="Price" onChange={(e)=>{e.target.value=parseInt(e.target.value); changeHandler(e)}}/>
                                               {foodDetail['errors']['price']&& (<p> <small style={{color:"red"}}> *{foodDetail['errors']['price']} </small> </p>)} 
                                            </div>
                                       </Col>
                                       <Col lg={4}>
                                            <div className='form-group'>
                                               <label> Discount Percent </label>
                                               <input type='number' className='form-control' name='discountPercent' value={foodDetail.discountPercent} placeholder="Discount Percent" onChange={(e)=>{e.target.value=parseInt(e.target.value); changeHandler(e)}}/>
                                               {foodDetail['errors']['discountPercent']&& (<p> <small style={{color:"red"}}> *{foodDetail['errors']['discountPercent']} </small> </p>)} 
                                            </div>
                                       </Col>
                                   </Row>
                                   <Row>
                                       <Col lg={6}>
                                           <div className="form-group">
                                               <label> Food Status </label>
                                               <select className='form-control' name="status" onChange={(e)=>{changeHandler(e)}}>
                                                   {
                                                       status.map((val)=>{
                                                           return(
                                                               <option value={val} selected={foodDetail.status == val? true:false}>{val}</option>
                                                           )
                                                       })
                                                   }
                                               </select>
                                               {foodDetail['errors']['status']&& (<p> <small style={{color:"red"}}> *{foodDetail['errors']['status']} </small> </p>)} 
                                           </div>
                                       </Col>
                                       <Col lg={6}>
                                           <div className="form-group">
                                               <label> Pictures </label>
                                               <input type='file' className="form-control-file" name="foodPictures" onChange={(e)=>{imageHandler(e)}} accept="image/*" multiple/>
                                               {foodDetail['errors']['foodPictures']&& (<p> <small style={{color:"red"}}> *{foodDetail['errors']['foodPictures']} </small> </p>)} 
                                            </div>
                                       </Col>
                                   </Row>
                                   <Row>
                                       <Col lg={12}>
                                 
                                           <div className="form-group">
                                               <label> Description </label>
                                               <textarea className="form-control" name="description" onChange={(e)=>{changeHandler(e)}}>{foodDetail.description}</textarea>
                                               {foodDetail['errors']['description']&& (<p> <small style={{color:"red"}}> *{foodDetail['errors']['description']} </small> </p>)} 
                                            </div>
                                 
                                       </Col>
                                   </Row>
                                   {foodDetail['errors']['random']&& (<p className='text-center'> <small style={{color:"red"}}> *{foodDetail['errors']['random']} </small> </p>)} 
                                   <div className='text-center'>
                                       <button type='submit' name='addFood' className='btn btnQuizz btn-md mb-3' style={{width: '220px'}}>  Add </button>
                                   </div>
                            </form>
                        </div>
                    </Col>
                     <Menu/>                               
                  
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default AddFood
