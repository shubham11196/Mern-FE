import React, { useState, useEffect } from 'react'
import {
    Card,
    CardBody,
    CardHeader
  } from 'reactstrap';
import PurchaseDetailsTable from '../../components/Orders/PurchaseDetailsTable';

export default function PurchaseOrderPage() {
    const [purchase, setPurchase] = useState([]);
    useEffect(()=>{
        fetch("http://localhost:5000/api/orders")
        .then(res=>res.json())
        // .then(res=> setOrders(res.data));
      },[]);
  return (
    <div>
        <Card>
            
            <CardHeader>Purchase Details</CardHeader>

            <CardBody>
                <PurchaseDetailsTable
                headers={[
                  'S No.',
                  'Date',
                  'Product Name',
                  'Quantity',
                  'Rate',
                  'Packing Bardana',
                  'Brokerage',
                  'Delivery Time',
                  'Firm Name',                    
                  'Status',
                  'Actions',
                  'Purchase Actions'
                ]}
                usersData={purchase}
              />
               
              
            </CardBody>
          </Card>
   
    </div>
  )
}
