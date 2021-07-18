import React,{useState,useEffect} from 'react'
import axios from 'axios';
import swal from 'sweetalert'

const AcceptDeclineModal = (props) => {
    let {nomenclature,data} = props

    let [delivery,setDelivery] = useState({
        bookingCode:"",
        decision:"",
        bid:data._id,
        config:{
            "headers":{
                "authorization":`Bearer ${localStorage.getItem('token')}`
            }
        }
    })
    
    if(nomenclature == "acceptBooking")
    {
        var heading = <> Accept the delivery </>
    }
    else if(nomenclature == "declineBooking")
    {
        var heading = <> Decline delivery </>
    }
    else if(nomenclature == "successBooking")
    {
        var heading = <> Are you satisfied with the product? </>
    }
    else if(nomenclature == "replaceBooking")
    {
        var heading = <> Not satisfied with the product? </>
    }
    else
    {
        var heading = <></>
    }

    //handler goes here
    const changeHandler = (e)=>{
        const {name,value} = e.target;
        setDelivery({
            ...delivery,
            [name]:value
        })
    }

    const deliveryWork = (e,work)=>{
        e.preventDefault();
        delivery['decision'] = work;
        axios.post(process.env.REACT_APP_URL+"deliverStatus",delivery,delivery.config)
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

    const successReplace = (e,values)=>{
        axios.post(process.env.REACT_APP_URL+"sucessOrReplacement",{"bid":data._id,"decision":values},delivery.config)
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

    return (
        <React.Fragment>
            <div class="modal fade" id={`${nomenclature}${data._id}`} data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">{heading}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    
                    {
                        nomenclature == "acceptBooking"?
                        (
                            <form method = "post" onSubmit={(event)=>{deliveryWork(event,"received")}}>
                                <div className="form-group">
                                    <label> Booking Code </label>
                                    <input type="text" className="form-control" name="bookingCode" placeholder="Enter booking code" value={delivery.bookingCode} onChange={(event)=>{changeHandler(event)}} required/>
                                </div>
                                <div className="text-center">
                                    <button className="btn btn-primary btn-md w-50" type="submit" name="acceptBooking"> Accept Booking </button>
                                </div>
                            </form>
                        ):
                        nomenclature == "declineBooking"?
                        (
                            <>
                                <p> Do you really want to decline booking? </p>
                                <div className="text-center">
                                        <button className="btn btn-danger btn-md w-50" type="button" name="declineBooking" onClick={(event)=>{deliveryWork(event,"decline")}}> Decline Booking </button>
                                </div>
                            </>
                        ):
                        nomenclature == "successBooking"?
                        (
                            <>
                             
                                <div className="text-center">
                                <button className="btn btn-success btn-md w-50" type="button" name="declineBooking" onClick={(event)=>{successReplace(event,"Success")}}> Success </button>
                                </div>
                            </>
                        ):
                        nomenclature == "replaceBooking"?
                        (
                            <>
                            
                                <div className="text-center">
                                <button className="btn btn-danger btn-md w-50" type="button" name="declineBooking" onClick={(event)=>{successReplace(event,"Replacement Needed")}}> Replacement Needed </button>
                                </div>
                            </>
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

export default AcceptDeclineModal
