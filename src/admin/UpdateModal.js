import axios from 'axios';
import React, { useState } from 'react';

import swal from 'sweetalert';

const UpdateModal = (props) => {
    const { item } = props;
    let [product, setProduct] = useState({
        "pname": item.pname,
        "pdesc": item.pdesc,
        "pprice": item.pprice,
        "pimage": item.pimage,
        "availableStock": item.availableStock,
        "brand": item.pBrand,
        "discount": item.discount,
        "onSale": item.onSale,
        "id":item._id,
        "config": {
            "headers": {
                "authorization": `Bearer ${localStorage.getItem("token")}`
            }
        }

    })



    const changeHandler = (e) => {
        var { name, value } = e.target;
        setProduct(
            {
                ...product,
                [name]: value
            }
        )
    }

    const fileHandler = (e) => {
        var { name, files } = e.target;
        setProduct(
            {
                ...product,
                [name]: files[0]
            }
        )
    }
    const updatePost=(e)=>{
        e.preventDefault();
        let formData= new FormData();
        formData.append("pname",product.pname)
        formData.append("pdesc",product.pdesc)
        formData.append("pprice",product.pprice)
        formData.append("pimage",product.pimage)
        formData.append("availableStock",product.availableStock)
        formData.append("discount",product.discount)
        formData.append("onSale",product.onSale)
        formData.append("brand",product.brand)
        formData.append("id",product.id)
        console.log(formData)
        axios.post("http://localhost:90/product/update",formData,product.config)
        .then((response)=>{
            if(response.data.success === true)
            {
                swal({
                    title:"Successfully Update",
                    text:response.data.message,
                    icon:"success"
                })
                window.location.reload();
            }
            else
            {
                swal({
                    title:"Error",
                    text:response.data.message,
                    icon:"error"
                })
            }
        })
        .catch((err)=>{
            console.log(err);
        })
 
    }

    


    return (
        <React.Fragment>
            <div class="modal fade" id={`updateProduct${item._id}`} data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">Update {product.pname}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form method="post"  onSubmit={updatePost}>
                                <div className="form-group">
                                    <label>Product Name</label>
                                    <input type="text" className="form-control" name="pname" value={product.pname} onChange={(event)=>{changeHandler(event)}} required />
                                </div>
                                <div className="form-group">
                                    <label>Product Price</label>
                                    <input type="text" className="form-control" name="pprice" value={product.pprice} onChange={(event)=>{changeHandler(event)}} required />
                                </div>
                                <div className="form-group">
                                    <label>Product Description</label>
                                    <textarea type="text" className="form-control" name="pdesc" value={product.pdesc} onChange={(event)=>{changeHandler(event)}} required />
                                </div>
                                <div className="form-group">
                                    <label>Product Image</label>
                                    <input type="file" className="form-control-file" name="pimage" onChange={(event)=>{fileHandler(event)}} required />
                                </div>
                                <div className="form-group">
                                    <label>Product Discount</label>
                                    <input type="text" className="form-control" name="discount" value={product.discount} onChange={(event)=>{changeHandler(event)}} required />
                                </div>
                                <div className="form-group">
                                    <label>Product availableStock</label>
                                    <input type="text" className="form-control" name="availableStock" value={product.availableStock} onChange={(event)=>{changeHandler(event)}} required />
                                </div>
                                <div className="form-group">
                                    <label>Product Brand</label>
                                    <input type="text" className="form-control" name="brand" value={product.brand} onChange={(event)=>{changeHandler(event)}} required />
                                </div>
                            

                                <div className="text-center">
                                    <button className="btn btn-primary btn-md" type="submit" name="Submit">Submit</button>
                                </div>
                            </form>




                        </div>
                    </div>
                </div>
            </div>

        </React.Fragment>
    )

}
export default UpdateModal;
