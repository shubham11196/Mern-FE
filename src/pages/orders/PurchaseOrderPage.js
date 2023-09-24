import React, { useState, useEffect } from 'react'
import {
    Card,
    CardBody,
    CardHeader,
    FormGroup,
    Col,
    Button,
    Input,
    Row,
    Form
} from 'reactstrap';
import Page from '../../components/Page';
import { Label } from 'reactstrap';
import PurchaseDetailsTable from '../../components/Orders/PurchaseDetailsTable';
import axios from 'axios';

export default function PurchaseOrderPage() {
    const [order, setOrder] = useState([]);
    const [purchase, setPurchase] = useState([]);
    
    const [optionalFields, setOptionalFields] = useState({
        vehicleNo: "",
        driverName: "",
        loadingIncharge: "",
        kantaSilipWeight: "",
        dalalName: ""

    })
    
    const [addFields, setAddFields] = useState({
        qty: "",
        bardanaClaim: "",
        qualityClaimPercent: "",
        qualityClaim: ""
    }) 
    const handleChange = () => {

    }
    const id = localStorage.getItem("purchaseId");
    useEffect(() => {
        const res = fetch(`http://localhost:5000/api/orders/${id}`)
            .then(res => res.json())
            .then(res => {
                setPurchase(res.data[0].voucher);
                setOrder(res.data)
                console.log("responsee", res)
            });
    }, []);
    const onSubmit = () => {

    }
    const handlePurchaseChange = (e, product, i) =>{
      e.preventDefault();
      let oldPurchases = [...purchase];
      product[e.target.name] = e.target.value;
      oldPurchases[i] = product;
      setPurchase(oldPurchases);
    }

    const addNewPurchase = () => {
      let newPurchase = {
        productName: '',
        quantity: 0,
        unit:0,
        price:0
      };
      setPurchase(oldState => [...oldState, newPurchase]);
    }

    const savePurchase = () =>{
      console.log(purchase,'purchase data');
      axios.post('http://localhost:5000/api/orders/createVoucher/41',purchase).then(res=>console.log(res));
    }

    return (
        <div>
            <Card>

                <CardHeader>Purchase Details</CardHeader>

                <CardBody style={{marginLeft:"150px"}}>
                    {order.map((pur, index) => {
                    const today = new Date(pur.date);
                    const month = today.getMonth()+1;
                    const year = today.getFullYear();
                    const date = today. getDate();
                    const currentDate = month + "/" + date + "/" + year;
                    return(
                       <div class="container">
                       <div class="row">
                           <div class="col-sm-4">
                           <Label style={{fontWeight: "600"}}>Series : </Label>
                           &nbsp; &nbsp; 
                               {pur.productName}
                           </div>
                           <div class="col-sm-4">
                           <Label style={{fontWeight: "600"}}>Date : </Label>
                           &nbsp; &nbsp; 
                               {currentDate}
                               
                           </div>
                           <div class="col-sm-4">
                           <Label style={{fontWeight: "600"}}>Vch No : </Label>
                           &nbsp; &nbsp; 
                               {pur.voucherId}
                           </div>
                          

                       </div>

                       <div class="row">
                           <div class="col-sm-4">
                           <Label style={{fontWeight: "600"}}>Party : </Label>
                           &nbsp; &nbsp; 
                               Ashok Bansal Ji Gajraula
                           </div>
                           <div class="col-sm-4">
                           <Label style={{fontWeight: "600"}}>Mat Center : </Label>
                           &nbsp; &nbsp; 
                               Main Store
                           </div>
                           <div class="col-sm-4">
                          
                           </div>
                           
                       </div>
                    
                   </div>
                    )

                })}


                </CardBody>
            </Card>
            <br/>
            <Card>
                <CardBody>
                  <button onClick={()=>addNewPurchase()} className='btn btn-primary'>Add New</button>
                  <button onClick={()=>savePurchase()} className='btn btn-primary'>Save</button>
                    <table style={{marginLeft:"135px"}}>
                        <thead>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Unit</th>
                            <th>Price(Rs.)</th>
                            <th>Amount(Rs.)</th>

                        </thead>
                        <tbody>
                            {purchase.map((pur, idx) => (
                                <tr>
                                    <th>
                                        <input name='productName' onChange={(e)=> handlePurchaseChange(e, pur, idx)} value={pur.productName}></input>
                                    </th>
                                    <th>
                                        <input name='quantity' onChange={(e)=> handlePurchaseChange(e, pur, idx)} value={pur.quantity}></input>
                                    </th>
                                    <th>
                                        <input name='unit' onChange={(e)=> handlePurchaseChange(e, pur, idx)} value={pur.unit}></input>
                                    </th>
                                    <th>
                                        <input name='price' onChange={(e)=> handlePurchaseChange(e, pur, idx)} value={pur.price}></input>
                                    </th>
                                    <th>
                                        <input value={pur.price * pur.quantity}></input>
                                    </th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </CardBody>
            </Card>
            <br/>
          <Row>
            <Col md={6}>

            <Card style={{marginLeft:"40px"}}>
             <CardHeader>Optional Fields</CardHeader>

              <CardBody>
                <Form>
                  <FormGroup>
                    <Label for="vehicleNo">Vehicle No.</Label>
                    <Input
                      type="text"
                      name="vehicleNo"
                      placeholder="Enter Vehicle No."
                      value={optionalFields.vehicleNo}
                      onChange={handleChange}

                    />
                  </FormGroup>
                   <FormGroup>
                    <Label for="brokerage">Drivers Name</Label>
                    <Input
                      type="text"
                      name="driverName"
                      placeholder="Enter Driver Name"
                      value={optionalFields.driverName}
                      onChange={handleChange}

                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="loadingIncharge">Loading Incharge</Label>
                    <Input
                      type="text"
                      name="loadingIncharge"
                      placeholder="Enter Loading Incharge"
                      value={optionalFields.loadingIncharge}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="kantaSilipWeight">Kanta Silip Weight</Label>
                    <Input
                      type="text"
                      name="kantaSilipWeight"
                      placeholder="Enter Kanta Silip Weight"
                      value={optionalFields.kantaSilipWeight}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="dalalName">Dalal Name</Label>
                    <Input
                      type="text"
                      name="dalalName"
                      placeholder="Enter Dalal Name"
                      value={optionalFields.loadingIncharge}
                      onChange={handleChange}
                    />
                  </FormGroup>

                  <FormGroup check row>
                    <Col sm={{ size: 10, offset: 2 }}>
                      <Button onClick={onSubmit}>Submit</Button>
                    </Col>
                  </FormGroup>
                </Form>
              
            </CardBody>
          </Card>
           

          </Col>
          <Col md={6}>

            <Card style={{marginRight:"40px"}}>
             <CardHeader>Item Add Field / Description</CardHeader>

              <CardBody>
                <Form>
                  <FormGroup>
                    <Label for="qty">Qty</Label>
                    <Input
                      type="text"
                      name="qty"
                      placeholder="Enter Quantity"
                      value={addFields.qty}
                      onChange={handleChange}

                    />
                  </FormGroup>
                   <FormGroup>
                    <Label for="bardanaClaim">Bardana Claim</Label>
                    <Input
                      type="text"
                      name="bardanaClaim"
                      placeholder="Enter Bardana Claim"
                      value={addFields.bardanaClaim}
                      onChange={handleChange}

                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="qualityClaimPercent">Quality Claim %</Label>
                    <Input
                      type="number"
                      name="qualityClaimPercent"
                      placeholder="Enter Quality Claim %"
                      value={addFields.qualityClaimPercent}
                      onChange={handleChange}

                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="qualityClaim">Quality Claim</Label>
                    <Input
                      type="number"
                      name="qualityClaim"
                      placeholder="Enter Quantity"
                      value={addFields.qualityClaim}
                      onChange={handleChange}

                    />
                  </FormGroup>
                  <FormGroup check row>
                    <Col sm={{ size: 10, offset: 2 }}>
                      <Button onClick={onSubmit}>Submit</Button>
                    </Col>
                  </FormGroup>
                </Form>
              
            </CardBody>
          </Card>
           

          </Col>
        </Row>
      


        </div>
    )
}
