import React, { useState, useEffect } from 'react'
import "./IncomeAndExpense.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCirclePlus} from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import AuthService from "../services/auth.service"
import { useForm } from "react-hook-form";
import EditIncomeModal from './EditIncomeModal';
import DeleteIncomeModal from './DeleteIncomeModal';

// This code copypasted from: https://codepen.io/fido123/pen/xzvxNw
// JavaScript is not included in this code, only html and css

export default function Income() {
    const [allIncome, setAllIncome] = useState([])
    const [forceRender, setForceRender] = useState(false)
    const currentUser = AuthService.getCurrentUser();
    const [displayDeleteIncomeModal, setDisplayDeleteIncomeModal] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onSubmit', reValidateMode: 'onSubmit' });
    // Sums user's income
    const incomeSum = allIncome.reduce((n, { amount }) => n + amount, 0)

    // This is used to figure out today's date, and format it accordingly
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;

    // Add user's income to database from the inputs
    const onSubmit = async (data) => {
        const response = await fetch(
            "http://localhost:8080/api/income/",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${currentUser.accessToken}`
                },
                body: JSON.stringify({
                    "incomeName": data.incomeName,
                    "date": data.date,
                    "amount": data.amount
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
            hideProgressBar: true,
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

    const removeIncome = async (id) => {
        await fetch(
            `http://localhost:8080/api/income/${id}`,
            {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${currentUser.accessToken}`
                }
            }
        );

        setForceRender(!forceRender);
        setDisplayDeleteIncomeModal(false);
    };

    const showDeleteModal = () => {
        setDisplayDeleteIncomeModal(true);
    };

    const hideConfirmationModal = () => {
        setDisplayDeleteIncomeModal(false);
    };


    // Fetch all user's income from database to display down below
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:8080/api/income/user/${currentUser.id}`,
                {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${currentUser.accessToken}`
                    }
                });
            const data = await response.json();
            setAllIncome(data);
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
                                    <div className="my-2 budget__income">
                                        <div className="row">
                                            <div className="col-4 budget__income-text">Pajamos</div>
                                            <div
                                                className="col-5 budget__income-value">
                                                {/* Round the number to two decimal places */}
                                                {Math.round(incomeSum * 100) / 100
                                                }
                                            </div>
                                            <div className="col-3 budget__income-percentage">&euro;&nbsp;</div>

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

                            <form onSubmit={handleSubmit(onSubmit)} className="input-group my-3">
                                <input
                                    {...register("incomeName", { required: true, minLength: 4 })}
                                    type="text"
                                    className="form-control add__description"
                                    placeholder="Aprašymas"
                                />

                                <input
                                    {...register("date",
                                        {
                                            required: true,
                                            max: today
                                        })
                                    }
                                    type="date"
                                    className="form-control add__date"
                                    placeholder="Data"
                                />

                                <input
                                    {...register("amount",
                                        {
                                            required: true,
                                            min: 1
                                        })
                                    }
                                    type="number"
                                    className="form-control add__value"
                                    placeholder="Kiekis"
                                    step="0.01"
                                />

                                <div className="input-group-append">
                                    <button className="btn" type="submit">
                                        <FontAwesomeIcon icon= {faCirclePlus} className='add__btn__income'/>
                                    </button>
                                </div>
                            </form>

                        </div>

                        <div className="row ">
                            <div className="col-sm-4 col-4">
                                {errors?.incomeName?.type === "required" && <p>Šis laukas yra privalomas</p>}
                                {errors?.incomeName?.type === "minLength" && <p>Aprašymas turi būti bent 4 simbolių ilgio</p>}
                            </div>
                            <div className="col-sm-4 col-4">
                                {errors?.date?.type === "required" && <p>Šis laukas yra privalomas</p>}
                                {errors?.date?.type === "max" && <p>Naujesnių nei šiandien įrašų negali būti</p>}
                            </div>
                            <div className="col-sm-4 col-4">
                                {errors?.amount?.type === "required" && <p>Šis laukas yra privalomas</p>}
                                {errors?.amount?.type === "min" && <p>Mažiausias įvestinų pajamų kiekis yra 1 &euro;</p>}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-5 list">
                    <div className="container">
                        <div className="col-12 income">
                            <h2 className="income__title">Pajamos</h2>
                            <div className="container income__list">

                            {/* Display user's income on the page */}
                            {allIncome.map(income => {

                                return (
                                    <div key={income.id}>
                                        <div className='row'>
                                            <div className='col-4'>
                                                {income.incomeName}&nbsp;
                                            </div>
                                            <div className='col-4'>
                                                {income.date}&nbsp;
                                            </div>
                                            <div className='col-2'>
                                                {income.amount}&euro;&nbsp;
                                            </div>

                                            <div className='col-2'>
                                                <EditIncomeModal
                                                    id={income.id}
                                                    incomeName={income.incomeName}
                                                    date={income.date}
                                                    amount={income.amount}
                                                    forceRender={forceRender}
                                                    setForceRender={setForceRender}
                                                />

                                                <DeleteIncomeModal
                                                    showModal={displayDeleteIncomeModal}
                                                    hideModal={hideConfirmationModal}
                                                    confirmModal={removeIncome}
                                                    id={income.id}
                                                />

                                                <button
                                                    onClick={() => showDeleteModal()}
                                                    className="btn"
                                                    type="button"
                                                    style={{paddingTop: 0, paddingBottom: 10}}
                                                >
                                                    <FontAwesomeIcon icon="trash" className='add__btn' style={{"width":"20px"}}/>
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
            </div>
        </>

    )
}
