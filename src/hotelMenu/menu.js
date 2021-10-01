import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {Container,Row,Col,Card} from 'react-bootstrap';
import {BiSearchAlt} from 'react-icons/bi';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {FiEdit} from 'react-icons/fi';
import {AiFillDelete,AiOutlineSwap} from 'react-icons/ai';
import {ImFilePicture} from 'react-icons/im';
import {TiTick} from 'react-icons/ti';
import MenuModal from './menuModal';


const Menu = (props) => {
    let {} = props;
    let user = JSON.parse(localStorage.getItem('user'));
    let token = localStorage.getItem('token');

    //state goes here
    let [menu,setMenu] = useState([]);
    let [category,setCategory] = useState([]);
    let [search,setSearch] = useState("");
    let [filterBy,setFilterBy] = useState("Category");

    //effect goes here
    useEffect(()=>{
        axios.get(process.env.REACT_APP_URL+"fetchMenuAccordingToHotel")
        .then((response)=>{
            if(response.data.success == true)
            { 
               setCategory(response.data.data);
               setMenu(response.data.hotelFood);   
            }
            else
            {
               setCategory([]);
               setMenu([]);
            }
        })
        .catch((err)=>{
            console.log(err);
        })
      },[]);

      //handlers goes here
      let filterCategory = filterBy == "Category"? category.filter((val)=>{return val.category.toLowerCase().trim().startsWith(search.toLowerCase().trim())}) : category.map((val)=>{return val});
      let filterFood = filterBy == "Food"?menu.filter((val)=>{return val.foodName.toLowerCase().trim().startsWith(search.toLowerCase().trim())}):menu.map((val)=>{return val});
      
      const filterMenu = (data)=>{
        let content = [];
        let menuFiltration = [];
        if(user && user.UserType == "Buyer")
        {
           menuFiltration =  filterFood.filter((val)=>{return data._id.toString() == val.hotelMenuId._id.toString() && val.showStatus == true});
        }
        else
        {
           menuFiltration =  filterFood.filter((val)=>{return data._id.toString() == val.hotelMenuId._id.toString()});
        }
        if(menuFiltration.length > 0)
        {
           for(var j of menuFiltration)
           {
               content.push(
                  <Col lg={3}>
                       <Card className="mb-5 cardDesignn">
                       <Slider {...settings}>
                            {
                                j.foodPictures.length > 0 &&
                                (
                                    j.foodPictures.map((val)=>{
                                         return(
                                            <div className='foodImg'>
                                                <img src={`${process.env.REACT_APP_URL}${val}`} alt="img" className="d-block"/>
                                            </div>  
                                         )   
                                    })
                                    
                                )
                            }   
                        </Slider>
                         
                           <Card.Body className="p-4">
                               <Card.Title className="text-center" style={{fontWeight:"bolder",color:"black"}}>{j.foodName}</Card.Title>
                               <div>
                                    <p style={{float:"right"}}> <span style={{fontWeight:"700"}}>Speciality:</span> {j.status} </p>
                                   <p>  <span style={{fontWeight:"700"}}>Flavor:</span> {j.flavor} </p>
                               </div>
                               <Card.Text style={{textAlign:"justify"}}>
                                    {j.description.slice(0,180)}.......
                               </Card.Text>
                              <p>  <span style={{fontWeight:"700"}}>Price:</span> 
                                 {
                                     j.discountPercent > 0?
                                     (
                                         <>
                                         <span className="ml-1" style={{textDecoration:"line-through"}}> Rs {j.price}  </span>  
                                         <span className="ml-1"> Rs {j.newPrice}  </span>  
                                         <span className="ml-1" style={{color:"grey"}}> ({j.discountPercent}% off) </span>
                                         </> 
                                     ):
                                     (
                                        <span className="ml-1"> Rs {j.price}  </span> 
                                     )
                                 } 
                             </p>
                             {
                                 user&&
                                 (
                                     user.UserType == "Admin"?
                                     (
                                        <>
                                           <Row>
                                                <Col lg={2} className="d-none d-md-none d-lg-block"></Col>
                                               <Col lg={2}>
                                                    <button type="button" className="btn btn-md btnQuizz" data-toggle='modal' data-target={`#updateDetails${j._id}`}> <FiEdit/> </button> 
                                                    <MenuModal nomenclature="updateDetails" data={j} data2={data}  key={`updateDetails${j._id}`}/>
                                               </Col>
                                              
                                               <Col lg={2}>
                                                    <button type="button" className="btn btn-md btnQuizz" style={{backgroundColor:"blue"}} data-toggle='modal' data-target={`#updatePicture${j._id}`}> <ImFilePicture/> </button> 
                                                    <MenuModal nomenclature="updatePicture" data={j} data2={data} key={`updatePicture${j._id}`}/>
                                                </Col>

                                                {
                                                    j.showStatus == true?
                                                    (
                                                        <Col lg={2}>
                                                            <button type="button" className="btn btn-md btnQuizz" style={{background:"red"}} data-toggle='modal' data-target={`#deleteFood${j._id}`}> <AiFillDelete/> </button>    
                                                            <MenuModal nomenclature="deleteFood" data={j} data2={data} key={`deleteFood${j._id}`}/>
                                                        </Col>
                                                    ):
                                                    (
                                                        <Col lg={2}>
                                                            <button type="button" className="btn btn-md btnQuizz" style={{background:"green"}} data-toggle='modal' data-target={`#showFood${j._id}`}> <TiTick style={{color:"white"}}/> </button>    
                                                            <MenuModal nomenclature="showFood" data={j} data2={data} key={`showFood${j._id}`}/>
                                                        </Col>
                                                    )    
                                                }
                                               
                                                <Col lg={4} className="d-none d-md-none d-lg-block"></Col>

                                           </Row> 
                                        </>
                                     ):
                                     user.UserType == "Buyer"?
                                     (
                                         <div className="text-center">
                                           <button className='btn btnQuizz w-50' type='button' name="menuToggle"> Order </button>
                                        </div>
                                     ):
                                     (
                                         <></>
                                     )
                                 )
                             }
                             
                           </Card.Body>
                       </Card>
                  </Col>     
               )
           }
        }
        
        return content;
      }

      const loadMenu = ()=>{
          let content = [];
           
          if(filterCategory.length > 0)
          {
             for(var i of filterCategory)
             {
                 let menuFiltration = [];
                 if(user && user.UserType == "Buyer")
                 {
                    menuFiltration =  filterFood.filter((val)=>{return i._id.toString() == val.hotelMenuId._id.toString() && val.showStatus == true});
                 }
                 else
                 {
                    menuFiltration =  filterFood.filter((val)=>{return i._id.toString() == val.hotelMenuId._id.toString()});
                 }
                
                 
                
                
                if(menuFiltration.length > 0)
                {
                    content.push(
                        <Col lg={12}>
                            <p className='text-center mb-3'> <strong> {i.category}   {
                                token&& user&&
                                (
                                    user.UserType == "Admin"?
                                    (
                                        <>

                                        ({i.order})

                                        <button className="btn btnQuizz" name="changeOrder" type="button" data-toggle="modal" data-target={`#changePoints${i._id}`}> <AiOutlineSwap/> </button> 
                                        
                                        </>
                                    ):
                                    (
                                        <div style={{margin:"0px auto 20px auto",background:"#4b1cac",width:"35px",height:"3px"}}></div>
                                    )
                                )
                            } </strong> </p>
                            <MenuModal nomenclature="changePoints" data={menuFiltration[0]} data2={i} key={`changePoints${i._id}`}/>
                            
                        
                            <Row>
                            {
                               filterMenu(i).map((val)=>{
                                   return (val);
                               })   
                            }
                            </Row>
                        </Col>
                    )
                }   
                
              
             } 
          }

          if(content.length <= 0)
          {
              content.push(<Col lg={12}><p className='text-center mt-3' style={{fontWeight:"bolder",color:"black"}}> No Foods Available. </p></Col>)
          }

          return content;
      }

      var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
    
    return (
        <React.Fragment>
            <Container fluid>
                <Row>
                <Col lg={12}>
                    <h5 style={{color:"grey",fontSize:"24px",fontWeight:"bolder",margin:"10px 0px"}}> Menu </h5>
                    <Row>
                        <Col lg={4} className="d-none d-md-none d-lg-block"></Col>
                        <Col lg={3}>
                            <form method = "post">
                                <div className="form-group">
                                    <div className="input-group">
                                       <input type="text" className="form-control" name='search' placeholder={`Search by ${filterBy}...`} onChange={(e)=>{setSearch(e.target.value)}}/>  
                                       <span className="icon-inside"><BiSearchAlt style={{color:"#4b1cac",fontSize:"28px"}}/></span>
                                    </div>
                                </div>
                            </form>
                        </Col>
                        <Col lg={2}>
                        <form method = "post">
                                <div className="form-group">
                                    <select className="form-control" name="filterBy" onChange={(e)=>{setFilterBy(e.target.value)}}>
                                           <option value="Category" selected={filterBy == "Category"? true:false}> Category </option>
                                           <option value="Food" selected={filterBy == "Food"? true:false}> Food </option>             
                                    </select>
                                      
                                    
                                </div>
                            </form>   
                        </Col>
                        <Col lg={3} className="d-none d-md-none d-lg-block"></Col>
                        
                        <Col lg={12}>
                        <Row>
                            {
                                loadMenu().map((val)=>{
                                    return(
                                        val
                                    )
                                })
                            }
                        </Row>
                           
                        </Col>
                    </Row>
                </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default Menu
