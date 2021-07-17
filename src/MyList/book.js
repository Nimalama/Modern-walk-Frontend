import React,{ useState, useEffect} from 'react'
import axios from 'axios'
import swal from 'sweetalert'

const Book = (props) => {
    const {data} = props;
    let [bookDetails,setDetails] = useState({
        "address":"",
        "phoneNo":"",
        "phoneNo2":"",
        "bid":data._id,
        "config":{
            "headers":{
                "authorization":`Bearer ${localStorage.getItem('token')}`
            }
        }
    })

    const changeHandler = (e) => {
        let {name,value} = e.target;
        setDetails({
            ...bookDetails,
            [name]:value
        })
    }
    
    const bookProduct = (e)=>{
        e.preventDefault();
        axios.post(process.env.REACT_APP_URL+"bookProduct",bookDetails,bookDetails.config)
        .then((response)=>{
            if(response.data.success == true)
            {
                swal({
                    title:"Success",
                    text:response.data.message,
                    icon:'success'
                })
                window.location.reload();
            }
            else
            {
                swal({
                    title:"Error",
                    text:response.data.message,
                    icon:'error'
                })
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    return (
        <React.Fragment>
            <div class="modal fade" id={`book${data._id}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Book {data.product_id.pname}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form method="post" onSubmit={bookProduct}>
                        <div className="form-group">
                            <label> Shipping Address </label>
                            <input type="text" className="form-control" name="address" placeholder="Add Shipping Address" value={bookDetails.address} onChange={(e)=>{changeHandler(e)}} required/>
                        </div>
                        <div className="form-group">
                            <label> Phone no 1 </label>
                            <input type="text" maxlength="10" className="form-control" name="phoneNo" placeholder="Add Phone number 1" value={bookDetails.phoneNo} onChange={(e)=>{changeHandler(e)}} required/>
                        </div>
                        <div className="form-group">
                            <label> Phone no 2 </label>
                            <input type="text" maxLength="10" className="form-control" name="phoneNo2" placeholder="Add Phone number 2" value={bookDetails.phoneNo2} onChange={(e)=>{changeHandler(e)}} required/>
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary btn-md w-50" name="book">Book</button>
                        </div>
                    </form>
                </div>
                </div>
                </div>
                </div>
        </React.Fragment>
    )
}

export default Book
