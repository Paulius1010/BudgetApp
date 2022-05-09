import React, { useState, useEffect } from 'react';
import "./IncomeAndExpense.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthService from "../services/auth.service";
import { useForm } from "react-hook-form";
import EditExpenseModal from './EditExpenseModal';

// This code copypasted from: https://codepen.io/fido123/pen/xzvxNw
// JavaScript is not included in this code, only html and css
export default function Expense() {
    const [allExpense, setAllExpense] = useState([]);
    const [allCategory, setAllCategory] = useState([]);
    const [forceRender, setForceRender] = useState(false);
    const currentUser = AuthService.getCurrentUser();
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onSubmit', reValidateMode: 'onSubmit' });
    // Sums user's expense
    const expenseSum = allExpense.reduce((n, { amount }) => n + amount, 0);

    // This is used to figure out today's date, and format it accordingly
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;


    useEffect(() => {
        const fetchCategoryData = async () => {
            const categoryResponse = await fetch(`http://localhost:8080/api/categories`,
                {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${currentUser.accessToken}`
                    }
                });
            const categoryData = await categoryResponse.json();
            setAllCategory(categoryData);
        };
        fetchCategoryData();
    }, [forceRender]);



    // Add user's expense to database from the inputs
    const onSubmit = async (data) => {
        const response = await fetch(
            "http://localhost:8080/api/expense/",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${currentUser.accessToken}`
                },
                body: JSON.stringify({
                    "expenseName": data.expenseName,
                    "categoryId": data.categoryId,
                    "date": data.date,
                    "amount": data.amount
                })
            }
        );

        if (response.status === 201) {
            successMessage();
        }
        else {
            (errorMessage('Klaida!'));
        }
        setForceRender(!forceRender);
    };

    // Popup message configuration
    toast.configure();
    const successMessage = () => {
        toast.success('Pridėta!', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
            theme: "colored",
            pauseOnHover: false,
            hideProgressBar: true
        });
    };
    const errorMessage = (msg) => {
        toast.error(msg, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
            theme: "colored",
            pauseOnHover: false,
            hideProgressBar: true
        });
    };

    const removeExpense = async (id) => {
        await fetch(
            `http://localhost:8080/api/expense/${id}`,
            {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${currentUser.accessToken}`
                }
            }
        );
        setForceRender(!forceRender);
    };

    // Fetch all user's expense from database to display down below
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:8080/api/expense/user/${currentUser.id}`,
                {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${currentUser.accessToken}`
                    }
                });
            const data = await response.json();
            setAllExpense(data);
        };
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
                                    <div className="my-2 budget__expense">
                                        <div className="row">
                                            <div className="col-4 budget__expense-text">Išlaidos</div>
                                            <div
                                                className="col-5 budget__expense-value">
                                                {/* Round the number to two decimal places */}
                                                {Math.round(expenseSum * 100) / 100
                                                }
                                            </div>
                                            <div className="col-3 budget__expense-percentage">&euro;&nbsp;</div>
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
                                    {...register("expenseName", { required: true, minLength: 4 })}
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

                                <select {...register("categoryId",
                                    {
                                        required: true,
                                    })
                                }
                                    className="form-control add__description"
                                    type="text"
                                    placeholder="Kategorija"
                                >
                                    {allCategory.map((option) => (
                                        <option value={option.id}>{option.name}</option>
                                    ))}
                                </select>

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
                                        <FontAwesomeIcon icon={faCirclePlus} className='add__btn__expense' />
                                    </button>
                                </div>
                            </form>

                        </div>

                        <div className="row ">
                            <div className="col-sm-3 col-3">
                                {errors?.expenseName?.type === "required" && <p>Šis laukas yra privalomas</p>}
                                {errors?.expenseName?.type === "minLength" && <p>Aprašymas turi būti bent 4 simbolių ilgio</p>}
                            </div>
                            <div className="col-sm-3 col-3">
                                {errors?.date?.type === "required" && <p>Šis laukas yra privalomas</p>}
                                {errors?.date?.type === "max" && <p>Naujesnių nei šiandien įrašų negali būti</p>}
                            </div>
                            <div className="col-sm-3 col-3">
                                {errors?.categoryId?.type === "required" && <p>Šis laukas yra privalomas</p>}
                                {errors?.categoryId?.type === "minLength" && <p>Aprašymas turi būti bent 4 simbolių ilgio</p>}
                            </div>

                            <div className="col-sm-3 col-3">
                                {errors?.amount?.type === "required" && <p>Šis laukas yra privalomas</p>}
                                {errors?.amount?.type === "min" && <p>Mažiausias įvestinų pajamų kiekis yra 1 &euro;</p>}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-5 list">
                    <div className="container">
                        <div className="col-12 expense">
                            <h2 className="expense__title">Išlaidos</h2>
                            <div className="container expense__list"></div>
                            {/* Display user's expense on the page */}
                            {allExpense.map(expense => {

                                return (
                                    <div key={expense.id}>
                                        <div className='row'>
                                            <div className='col-3'>
                                                {expense.expenseName}&nbsp;
                                            </div>
                                            <div className='col-3'>
                                                {expense.date}&nbsp;
                                            </div>

                                            <div className='col-3'>
                                                {expense.expensesCategory.name}&nbsp;
                                            </div>
                                            <div className='col-1'>
                                                {expense.amount}&euro;&nbsp;
                                            </div>

                                            <div className='col-2'>
                                                <EditExpenseModal
                                                    id={expense.id}
                                                    expenseName={expense.expenseName}
                                                    date={expense.date}
                                                    amount={expense.amount}
                                                    category={expense.expensesCategory.name}
                                                    forceRender={forceRender}
                                                    setForceRender={setForceRender}
                                                    allCategory={allCategory}
                                                />

                                                <button
                                                    onClick={() => removeExpense(expense.id)}
                                                    className="btn"
                                                    type="button"
                                                >
                                                    <FontAwesomeIcon icon="trash" className='add__btn' />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}
