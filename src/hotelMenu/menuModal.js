import React,{useState,useEffect} from 'react';
import {Container,Row,Col} from 'react-bootstrap';
import axios from 'axios';
import {useToasts} from 'react-toast-notifications';


var status = ['','Normal','Special',"Today's Special"];

const MenuModal = (props) => {
    const {nomenclature,data,data2} = props;
    const {addToast} = useToasts();


    //state goes here
    let [foodDetail,setFoodDetail] = useState({
        "category":data2 != undefined ? data2.category : data.category,
        "foodName":data.foodName,
        "flavor":data.flavor,
        "price":data.price,
        "discountPercent":data.discountPercent,
        "status":data.status,
        "description":data.description,
        'foodId':data._id,
        "foodPictures":[],
        "hotelMenuId":data2 != undefined && data2._id ,
        "order": data2 != undefined && data2.order,
        "errors":{}
    })



    let [auth,setAuth] = useState({
        "config":{
            'headers':{
                'authorization':`Bearer ${localStorage.getItem('token')}`
            }
        }
    })

   
    if(nomenclature == "updateDetails")
    {
        var heading = <> Update Details </>
    }

    if(nomenclature == "updatePicture")
    {
        var heading = <> Update Picture </>
    }

    if(nomenclature == "deleteFood")
    {
        var heading = <> Unshow Food </>
    }

    if(nomenclature == "showFood")
    {
        var heading = <> Show Food </>
    }

    if(nomenclature == "changePoints")
    {
        var heading = <> Change Points </>
    }

    //handlers goes here
    const updateFood = (e)=>{
        e.preventDefault();

        axios.put(process.env.REACT_APP_URL+"updateFood",foodDetail,auth.config)
        .then((response)=>{
            if(response.data.success == true)
            {   
                addToast(response.data.message,{'appearance':'success','autoDismiss':true});
                window.location.reload();
            }   
            else
            {
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

    const changePicture = (e)=>{
        e.preventDefault();

        let fd = new FormData();
        fd.append('foodId',foodDetail.foodId);
        [...foodDetail.foodPictures].forEach((data)=>{
            fd.append('foodPictures',data)
        })

   
        
        axios.put(process.env.REACT_APP_URL+"updatePictures",fd,auth.config)
        .then((response)=>{
            if(response.data.success == true)
            {
                addToast(response.data.message,{'appearance':'success','autoDismiss':true});
                window.location.reload();
            }
            else
            {
                addToast(response.data.message,{'appearance':'error','autoDismiss':true});
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    const toggleFood = (e)=>{
        axios.put(process.env.REACT_APP_URL+"toggleFoodStatus/"+foodDetail.foodId,{},auth.config)
        .then((response)=>{
            if(response.data.success == true)
            {
                addToast(response.data.message,{'appearance':'success','autoDismiss':true});
                window.location.reload();
            }
            else
            {
                addToast(response.data.message,{'appearance':'error','autoDismiss':true});
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    const changePoints = (e)=>{
        e.preventDefault();
        axios.put(process.env.REACT_APP_URL+"manageOrder",foodDetail,auth.config)
        .then((response)=>{
            if(response.data.success == true)
            {
                addToast(response.data.message,{'appearance':'success','autoDismiss':true});
                window.location.reload();
            }
            else
            {
                addToast(response.data.message,{'appearance':'error','autoDismiss':true});
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    const changeHandler = (e)=>{
        let {name,value} = e.target;
        setFoodDetail({
            ...foodDetail,
            [name]:value
        })
    }

    const imageHandler = (e)=>{
        if(e.target.files.length > 5)
        {
            foodDetail['errors']['foodPictures']  = "Only 5 pictures accepted.";
            e.target.value = [];
        }
        let {name,files} = e.target;
        setFoodDetail({
            ...foodDetail,
            [name]:files
        })    
    }
    
    return (
        <React.Fragment>
            <div className="modal fade" id={`${nomenclature}${nomenclature == "changePoints"? data2._id:data._id}`} data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div className={nomenclature == "updateDetails"? "modal-dialog modal-xl":"modal-dialog"}>
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="staticBackdropLabel">{heading}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        {
            nomenclature == "updateDetails"?
            (
                <form method="post" className="addFood" onSubmit={updateFood}>
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
                                       <button type='submit' name='addFood' className='btn btnQuizz btn-md mb-3' style={{width: '220px'}}>  Update </button>
                                   </div>
                            </form>
            ):
            nomenclature == "updatePicture"?
            (
               <form method='post' onSubmit={changePicture}>
                   <div className='form-group'>
                       <label> Pictures </label>
                       <input type='file' className='form-control-file' name='foodPictures' onChange={(e)=>{imageHandler(e)}} accept='image/*' multiple required/> 
                   </div>
                   {foodDetail['errors']['random']&& (<p className='text-center'> <small style={{color:"red"}}> *{foodDetail['errors']['random']} </small> </p>)} 
                   <div className='text-center'>
                        <button type='submit' name='addFood' className='btn btnQuizz btn-md mb-3' style={{width: '220px'}}>  Change </button>
                    </div>
               </form>
            ):
            nomenclature == "deleteFood"?
            (
                <>
                <p> Do you really want to unshow {data.foodName} for selling? </p>
                <div className="text-center">
                    <button type='button' name='addFood' className='btn btnQuizz btn-md mb-3'  onClick={(e)=>{toggleFood(e)}} style={{width: '220px'}}>  Unshow </button>   
                </div>
               </>

            ):
            nomenclature == "showFood"?
            (
                <>
                    <p> Do you really want to show {data.foodName} for selling? </p>
                    <div className="text-center">
                        <button type='button' name='addFood' className='btn btnQuizz btn-md mb-3'  onClick={(e)=>{toggleFood(e)}} style={{width: '220px'}}>  Show </button>   
                    </div>
                </>
            ):
            nomenclature == "changePoints"?
            (
                <form method='post' onSubmit={changePoints}>
                    <div className="form-group">
                       <label> Category </label>
                       <input type="text" className="form-control" value={foodDetail.category} readOnly/>
                    </div>
                    <div className='form-group'>
                        <label> Order </label>
                        <input type="number" className="form-control" name="order" value={foodDetail.order} placeholder="Order" onChange={(e)=>{changeHandler(e)}}/>
                    </div>
                    <div className='text-center'>
                        <button type='submit' name='addFood' className='btn btnQuizz btn-md mb-3' style={{width: '220px'}}>  Change Order </button>
                    </div>
                </form>
            ):
            (
                <></>
            )
        }
      </div>
      </div>
      </div>
      </div>
        </React.Fragment>
    )
}

export default MenuModal
