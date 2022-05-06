import React, { useState, useEffect } from 'react'
import "./IncomeAndExpense.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCirclePlus} from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import AuthService from "../services/auth.service"
import { useForm } from "react-hook-form";
import EditCategoryModal from './EditCategoryModal';

// This code copypasted from: https://codepen.io/fido123/pen/xzvxNw
// JavaScript is not included in this code, only html and css

export default function Category() {
    const [allCategory, setAllCategory] = useState([])
    const [forceRender, setForceRender] = useState(false)
    const currentUser = AuthService.getCurrentUser();
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onSubmit', reValidateMode: 'onSubmit' });
    // Count categories
    const categoryCount = allCategory.reduce((n, { amount }) => n + 1, 0)

    // Add category to database from the inputs
    const onSubmit = async (data) => {
        const response = await fetch(
            "http://localhost:8080/api/categories/",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${currentUser.accessToken}`
                },
                body: JSON.stringify({
                    "name": data.name
                })
            }
        )

        if (response.status === 201) {
            successMessage();
        }
        else {
            (errorMessage('Klaida!'))
        }

        setForceRender(!forceRender)
    }

    // Popup message configuration
    toast.configure()
    const successMessage = () => {
        toast.success('Pridėta!', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
            theme: "colored",
            pauseOnHover: false,
            hideProgressBar: true
        })
    }
    const errorMessage = (msg) => {
        toast.error(msg, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
            theme: "colored",
            pauseOnHover: false,
            hideProgressBar: true
        })
    }

    const removeCategory = async (id) => {
        await fetch(
            `http://localhost:8080/api/categories/${id}`,
            {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${currentUser.accessToken}`
                }
            }
        )

        setForceRender(!forceRender)
    }

    // Fetch all categories from database to display down below
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:8080/api/categories`,
                {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${currentUser.accessToken}`
                    }
                });
            const data = await response.json();
            setAllCategory(data);
        }

        fetchData();
    }, [forceRender]);


    return (
        <>
            <div className="jumbotron-fluid text-center">
                <div className="container">
                    <div className="top">
                        <div className="budget">
                            <div className="budget__title">
                                <h1 className="display-4 pt-3">
                                </h1>

                                <div>
                                    <div className="budget__expense">
                                        <div className="row">
                                            <div className="col-6 budget__expense-text">Išlaidų kategorijos</div>

                                            <div
                                                className="col-6 budget__expense-value">
                                                {categoryCount
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bottom mt-3">
                <div className="container">
                    <div className="add">
                        <div className="row text-center add__container">

                            <form onSubmit={handleSubmit(onSubmit)} className="col-12 col-sm-6 col-md-6 col-lg-6 input-group my-3">
                                <input
                                    {...register("name", { required: true, minLength: 4 })}
                                    type="text"
                                    className="form-control add__description"
                                    placeholder="Kategorijos pavadinimas"
                                />


                                <div className="input-group-append">
                                    <button className="btn" type="submit">
                                        <FontAwesomeIcon icon={faCirclePlus} className='add__btn__expense' />
                                    </button>
                                </div>
                            </form>

                        </div>

                        <div className="row ">
                            <div className="col-sm-4 col-4">
                                {errors?.name?.type === "required" && <p>Šis laukas yra privalomas</p>}
                                {errors?.name?.type === "minLength" && <p>Pavadinimas turi būti bent 4 simbolių ilgio</p>}
                            </div>

                        </div>
                    </div>
                </div>

                <div className="mt-5 list">
                    <div className="container">
                        <div className="col-12 expense">
                            <h2 className="expense__title">Kategorijos</h2>
                            <div className="container expense__list"></div>

                            {/* Display categories on the page */}
                            {allCategory.map(category => {

                                return (
                                    <div key={category.id}>
                                        <div className='row'>
                                            <div className='col-10'>
                                                {category.name}&nbsp;
                                            </div>


                                            <div className='col-2'>
                                                <EditCategoryModal
                                                    id={category.id}
                                                    categoryName={category.name}
                                                    forceRender={forceRender}
                                                    setForceRender={setForceRender}
                                                />

                                                <button
                                                    onClick={() => removeCategory(category.id)}
                                                    className="btn"
                                                    type="button"
                                                >
                                                    <FontAwesomeIcon icon="trash" className='add__btn' />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
