import React, { useEffect, useRef, useState } from 'react'
import { useDispatchContext, useStateContext } from './ContextReducer';
import SnackbarUtil, { MESSAGE_VARIANT } from '../utils/Snackbar.util';

export default function Card(props) {
    let dispatch = useDispatchContext();
    let store = useStateContext();
    const { showSnackbar } = SnackbarUtil();

    let options = props.options;
    let quantityOptions = Object.keys(options);

    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");

    const priceRef = useRef();

    const handleAddToCart = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            showSnackbar("Please log in to add items to cart", MESSAGE_VARIANT.ERROR);
            return;
        }
        let food = []
        for (const item of store) {
            if (item.id === props.foodItem._id) {
                food = item;

                break;
            }
        }
        // if (food !== []) {
        if (!Array.isArray(food) || food.length === 0) {

            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
                showSnackbar("Item quantity updated in cart", MESSAGE_VARIANT.SUCCESS);
                return
            }
            else if (food.size !== size) {
                await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size, img: props.foodItem.img })
                showSnackbar("Item added to cart", MESSAGE_VARIANT.SUCCESS);
                return
            }
            return
        }
        await dispatch({
            type: "ADD", id: props.foodItem._id, name: props.foodItem.name, img: props.foodItem.img, qty: qty, sizy: size,
            price: finalPrice
        })
        showSnackbar("Item added to cart", MESSAGE_VARIANT.SUCCESS);
    }

    let finalPrice = qty * parseInt(options[size]);

    useEffect(() => {
        setSize(priceRef.current.value);
    }, []);

    return (
        <div>
            <div className="card mt-3" style={{ "width": "19rem", "maxHeight": "360px" }}>
                <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: "100px", objectFit: "fill" }} />
                <div className="card-body">
                    <h5 className="card-title">{props.foodItem.name}</h5>
                    <div className="container w-100">
                        <select className="m-2 h-100 bg-success rounded" onChange={(e) => setQty(e.target.value)}>
                            {Array.from(Array(6), (_, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                )
                            })}
                        </select>
                        <select className="m-2 h-100 bg-success rounded" ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                            {
                                quantityOptions.map((data) => {
                                    return (
                                        <option key={data} value={data}>{data}</option>
                                    )
                                })
                            }
                        </select>
                        <div className='d-inline h-100 fs-5'>
                            ₹{finalPrice}/-
                        </div>
                    </div>
                    <hr>
                    </hr>
                    <button className='btn bg-success justify-center ms-2' onClick={handleAddToCart}>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    )
}
