import React, { useEffect } from 'react'
import {
    Card,
    CardBody,
    CardHeader,
  } from 'reactstrap';
import OrdersTable from '../../components/Orders/OrdersTable';
import { getOrders }  from '../../redux/actions/OrderActions';
import { useSelector, useDispatch } from "react-redux";

export default function OrdersPage() {
    const dispatch = useDispatch();

    const orders = useSelector((state) => state.orders);
  
    const userProgressTableData = [
        {
          name: 'Tom',
          date: '3 month ago',
          progress: 75,
        },
        {
          name: 'Jenny',
          date: '1 year ago',
          progress: 60,
        },
        {
          name: 'Sim',
          date: '2 hour ago',
          progress: 50,
        },
        {
          name: 'Christine',
          date: 'a month ago',
          progress: 40,
        },
        {
          name: 'Bread',
          date: '6 months ago',
          progress: 30,
        },
        {
          name: 'Dan',
          date: '2 years ago',
          progress: 25,
        },
      ];

  useEffect(() => {
    dispatch(getOrders());
  },[orders])


  return (
    <div>
        <Card>
            
              <CardHeader>Orders</CardHeader>
              <CardBody>
                <OrdersTable
                  headers={[
                    'name',
                    'date',
                    'participation',
                  ]}
                  usersData={userProgressTableData}
                />
              </CardBody>
            </Card>
          
    </div>
  )
}
