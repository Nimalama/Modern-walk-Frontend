import React from 'react';
import { Container,Row } from 'react-bootstrap'
import bb from '../assets/aboutus.jpg';
import {FaTruckMoving,FaPercentage} from 'react-icons/fa';
import {BsArrowLeftRight,BsPersonFill} from 'react-icons/bs'

const AboutUs = () => {
  return (
    <React.Fragment>
      <Container fluid className="bg-primary py-5">

        <div className="row align-items-center py-5">
          <div className="col-md-8  py-3">
            <h1 className="text-black"><strong>About Us</strong></h1>
            <p className="text-white">
              About Us is a contemporary clothing brand known for its trend-driven styles with affordable prices.
              Drawing inspiration from the latest trends, from street style to runway,
              About Us clothing brand offers an array of styles that is fit for the fashion loving girl.
              From workwear to street style, night out, About Us label can keep you going from day-to-night.
              Shop the latest collection from About Us clothing line, ranging in dresses to tops, sweater knits, rompers, pants and outerwear.

                    </p>
          </div>
          <div className="col-md-4 aboutimg">
            <img src={bb} alt="About Hero" />
          </div>
        </div>

      </Container>

      <Container className=" py-5">
        <div className="row text-center pt-5 pb-3">
          <div className="col-lg-6 m-auto">
            <h1 className="h1">Our Services</h1>
            <p>
             Daily Services, Shipping and Return, Promotion, 24hours services
                </p>
          </div>
        </div>
        <Row>

          <div className="col-md-6 col-lg-3 pb-5">
            <div className="h-100 py-5 services-icon-wap shadow">
              <div className="h1 text-success text-center"><FaTruckMoving/></div>
              <h2 className="h5 mt-4 text-center">Delivery Services</h2>
            </div>
          </div>

          <div className="col-md-6 col-lg-3 pb-5">
            <div className="h-100 py-5 services-icon-wap shadow">
              <div className="h1 text-success text-center"><BsArrowLeftRight/></div>
              <h2 className="h5 mt-4 text-center">Shipping & Return</h2>
            </div>
          </div>

          <div className="col-md-6 col-lg-3 pb-5">
            <div className="h-100 py-5 services-icon-wap shadow">
              <div className="h1 text-success text-center"><FaPercentage/></div>
              <h2 className="h5 mt-4 text-center">Promotion</h2>
            </div>
          </div>

          <div className="col-md-6 col-lg-3 pb-5">
            <div className="h-100 py-5 services-icon-wap shadow">
              <div className="h1 text-success text-center"><BsPersonFill/></div>
              <h2 className="h5 mt-4 text-center">24 Hours Service</h2>
            </div>
          </div>
        </Row>
      </Container>

    


    </React.Fragment>
  )
}

export default AboutUs
