import React, { useState, useEffect } from 'react';
import '../style.css';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Container, Row, Col } from 'react-bootstrap';
import { AiFillPlusCircle } from 'react-icons/ai';
import { MdTimer } from 'react-icons/md';
import TabPanel from './tabPanel';

import AddProduct from './AddProduct';
import UpdateDelete from './UpdateDelete';
import Task from './task';


const Admin = () => {
    let [value, setValue] = useState(0);
    const handleChange = (e, val) => {
        setValue(
            val
        )
    }
    return (
        <React.Fragment>
            <Container fluid style={{background:"#878383"}}>
                <Row>
                    <Col lg={3} className="d-none d-md-block " ></Col>
                    <Col lg={6}>
                        <div className="tab__toggle mt-2">
                            <AppBar position="static" style={{ background:"skyblue" }}>
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    variant="fullWidth"
                                >
                                    <Tab icon={<AiFillPlusCircle style={{ fontSize: "31px" }} />} label="Add Product" />
                                    <Tab icon={<MdTimer style={{ fontSize: "31px" }} />} label="Update/Delete" />
                                    <Tab icon={<MdTimer style={{ fontSize: "31px" }} />} label="Task" />

                                </Tabs>
                            </AppBar>
                            <TabPanel value={value} index={0}>
                                <AddProduct />
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <UpdateDelete />
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                                <Task />
                            </TabPanel>
                            
                        </div>
                    </Col>
                    <Col lg={3} className="d-none d-md-block"></Col>
                </Row>
            </Container>

        </React.Fragment>
    )
}

export default Admin;