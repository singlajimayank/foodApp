import React from 'react'
import { useDispatchContext, useStateContext } from '../../components/ContextReducer'
import OrderService from '../../services/Orders.service';
import SnackbarUtil, { MESSAGE_VARIANT } from '../../utils/Snackbar.util';

export default function MyCart() {
    let store = useStateContext();
    let dispatch = useDispatchContext();

    const { showSnackbar } = SnackbarUtil();

    if (store.length === 0) {
        return (
            <div>
                <div className="m-5 w-100 fs-3 text-center" style={{ color: 'white' }}>MyCart is Empty!</div>
            </div>
        )
    }

    const handleCheckOut = async () => {
        const email = localStorage.getItem("currentUser");
        try {
            const order = {
                email: email,
                order_data: store
            }
            let response = await OrderService.orderData(order);
            if (response.data.success === 'true') {
                dispatch({ type: "DROP" });
                showSnackbar("Order placed", MESSAGE_VARIANT.SUCCESS);
            }
        } catch (error) {
            console.error('Error during checkout ', error);
            showSnackbar("Something went wrong", MESSAGE_VARIANT.ERROR);
        }
    }

    let totalPrice = store.reduce((total, food) => total + food.price, 0);
    return (
        <div>
            <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md">
                <table className="table">
                    <thead className="text-success fs-4">
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>Name</th>
                            <th scope='col'>Quantity</th>
                            <th scope='col'>Option</th>
                            <th scope='col'>Amount</th>
                            <th scope='col'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            store.map((food, index) => (
                                <tr key={index} style={{ color: 'white' }}>
                                    <th scope='row'>{index + 1}</th>
                                    <td>{food.name}</td>
                                    <td>{food.qty}</td>
                                    <td>{food.size}</td>
                                    <td>{food.price}</td>
                                    <td>
                                        <button type="button" className="btn" style={{ color: 'white' }} onClick={() => { dispatch({ type: "REMOVE", index: index }) }}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <div>
                    <h1 className="fs-2" style={{ color: 'white' }}>Total Price: {totalPrice}-/</h1>
                </div>
                <div>
                    <button className="btn bg-success mt-5" onClick={handleCheckOut}>
                        Check Out
                    </button>
                </div>
            </div>
        </div>
    )
}
