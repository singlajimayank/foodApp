import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import Card from '../../components/Card'
import Footer from '../../components/Footer'
import FoodService from '../../services/food.service'

export default function Home() {
    const [search, setSearch] = useState('');
    const [foodCategories, setFoodCategories] = useState([]);
    const [foodItems, setFoodItems] = useState([]);

    const foodData = async () => {
        try {
            const [itemsResponse, categoriesResponse] = await Promise.all([
                FoodService.items(),
                FoodService.categories(),
            ])
            setFoodItems(itemsResponse.data);
            setFoodCategories(categoriesResponse.data);
        } catch (error) {
            console.error('Error fetching food Items and categories ', error);
        }
    }

    useEffect(() => {
        foodData();
    }, []);

    const handleChange = (event) => {
        setSearch(event.target.value);
    }

    return (
        <>
            <div> <Navbar /> </div>
            <div>
                <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: 'contain !important' }}>
                    <div className="carousel-inner" id="carousel">
                        <div className="carousel-caption" style={{ zIndex: "10" }}>
                            <div className="d-flex justify-content-centre">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="carousel-item active">
                            <img src="https://source.unsplash.com/random/300×500/?burgers" className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/900×700/?pizza" className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/900×700/?fries" className="d-block w-100" alt="..." />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>

            </div>
            <div className='container'>
                {
                    foodCategories.data && foodCategories.data.length !== 0
                        ? foodCategories.data.map((data) => {
                            return (
                                <div className='row mb-3'>
                                    <div key={data._id} className='fs-3 m-3'>{data.CategoryName}</div>
                                    <hr />
                                    {
                                        foodItems.data && foodItems.data.length !== 0
                                            ?
                                            foodItems.data.filter((items) => (items.CategoryName === data.CategoryName) && (items.name.toLowerCase().includes(search.toLowerCase())))
                                                .map((filterItems) => {
                                                    return (
                                                        <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                                                            <Card foodItem={filterItems}
                                                                options={filterItems.options[0]}
                                                            />
                                                        </div>
                                                    )
                                                })
                                            : <div key="no-data-found">No such data found</div>
                                    }
                                </div>
                            )
                        })
                        : <div> ***** </div>
                }
            </div>
            <div> <Footer /> </div>
        </>
    )
}
