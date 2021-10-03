import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {Table,Row,Col} from 'react-bootstrap';
import useCommon from '../common/useCommon';


const GenerateBill = (props) => {
    const {} = props;
    const {auth} = useCommon();

    //variable goes here
    let user = JSON.parse(localStorage.getItem('user'));
    
    //state goes here
    let [order,setOrder] = useState([]);
    let [orderId,setOrderId] = useState([]);
    let [billStatus,setBillStatus] = useState([]);
    let [count,setCount] = useState(0);


    //effect goes here
    useEffect(()=>{
        axios.post(process.env.REACT_APP_URL+"generateABill",{'userName':user.Username,'decision':"Generate"},auth.config)
        .then((response)=>{
            if(response.data.success == true)
            {
                setOrder(
                    response.data.data
                )
                setBillStatus(
                    response.data.billStatus
                )

                setOrderId(
                    response.data.data.map((val)=>{return val._id.toString()})
                )
            }
            else
            {
                setOrder([]);
                setBillStatus([]);
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    },[]);


    const orderCheck = (e)=>{
        let orderIdDetail = e.target.id.split('-')[1];
        let orders = orderId.map((val)=>{return val});
        let priceBox = billStatus.map((val)=>{return val});
        let orderFiltration = order.filter((val)=>{return val._id.toString() == orderIdDetail});
        let price = orderFiltration[0].hotelFoodId.discountPercent > 0 ? orderFiltration[0].hotelFoodId.newPrice * orderFiltration[0].quantity : orderFiltration[0].hotelFoodId.price * orderFiltration[0].quantity;
        if(orders.includes(orderIdDetail))
        {
            let index = orders.indexOf(orderIdDetail);
            orders.splice(index,1);
            priceBox[0] = priceBox[0] - price;
        }
        else
        {
            orders.push(orderIdDetail);
            priceBox[0] = priceBox[0] + price;
        }

        priceBox[1] = Math.ceil((0/100)*priceBox[0]); //future ma fetch from hotel(VAT and service charge)
        priceBox[2] = Math.ceil((0/100)*priceBox[0]); 
        priceBox[3] = priceBox[1]+priceBox[2]+ priceBox[0];


        setOrderId(orders);
        setBillStatus(priceBox)

        setCount(count+=1);
    }

    return (
        <React.Fragment>
            <div class="modal fade" id="genBill" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">My Bill</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    {
                        order.length > 0?
                        (
                            <>
                                <p style={{fontWeight: 'bold'}}> {order.length} Orders To Pay. </p>
                                <Table className="table table-striped myTable w-100">
                                    <thead>
                                        <tr className="text-center">
                                            <th></th>
                                            <th> Foodname  </th>
                                            <th> Flavor </th>
                                            <th> Quantity </th>
                                            <th> Price </th> 
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            order.map((val)=>{
                                                return(
                                                    <tr className="text-center">
                                                       <td> 
                                                          <input type="checkbox" id={`order-${val._id}`} checked = {orderId.includes(val._id.toString())? true:false} onChange={(e)=>{orderCheck(e)}} />
                                                       </td>
                                                        <td>{val.hotelFoodId.foodName}</td>
                                                        <td> {val.hotelFoodId.flavor} </td>
                                                        <td> {val.quantity} </td>
                                                        <td>
                                                            {
                                                                val.hotelFoodId.discountPercent > 0?
                                                                (
                                                                  <>  Rs {val.hotelFoodId.newPrice * val.quantity} </>
                                                                ):
                                                                (
                                                                    <>  Rs {val.hotelFoodId.price * val.quantity} </>
                                                                )
                                                            }
                                                        </td>
                                                    </tr>
                                                )
                                                
                                            })
                                        }
                                    </tbody>
                                </Table>

                                <h5 className="text-center mt-4"> Calculation </h5>
                                        <Table className="table table-striped myTable w-100">
                                            <tbody>
                                                <tr>
                                                <th> Total </th>
                                                <td style={{textAlign: 'right'}}> Rs {billStatus[0]} </td>
                                                </tr>
                                                <tr>
                                                <th> VAT </th>
                                                <td style={{textAlign: 'right'}}> Rs {billStatus[1]} </td>
                                                </tr>
                                                <tr>
                                                <th> Service Charge </th>
                                                <td style={{textAlign: 'right'}}> Rs {billStatus[2]} </td>
                                                </tr>
                                                <tr>
                                                <th> Total with VAT and Service Charge </th>
                                                <td style={{textAlign: 'right'}}> Rs {billStatus[3]} </td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                        
                            </>
                        ):
                        (
                            <p className="text-center" style={{fontWeight: 'bolder',color:'black'}}>  No Orders to generate a bill. </p>
                        )
                    }
                </div>
                </div>
                </div>
                </div>
        </React.Fragment>
    )
}

export default GenerateBill
