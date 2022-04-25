import React, { useState } from 'react'
import "./Income.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AuthService from "../services/auth.service"

// This code copypasted from: https://codepen.io/fido123/pen/xzvxNw
// JavaScript is not included in this code, only html and css

export default function Income() {
    const [incomeName, setIncomeName] = useState("")
    const [amount, setAmount] = useState("")
    const currentUser = AuthService.getCurrentUser();

    const addIncome = async () => {
        const response = await fetch(
            "http://localhost:8080/api/income/",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${currentUser.accessToken}`
                },
                body: JSON.stringify({
                    "incomeName": incomeName,
                    "date": "2021-04-25",
                    "amount": amount
                })
            }
        )
    }

    return (
        <>
            <div className="jumbotron-fluid text-center">
                <div className="container">
                    <div className="top">
                        <div className="budget">
                            <div className="budget__title">
                                <h1 className="display-4 pt-3">
                                    <span className="budget__title-month">%Month%</span> mėnesio pajamos
                                </h1>
                                <div className="mt-3 mb-5 budget__value">+ 2,345.66</div>

                                <div className="row">
                                    <div className="col-12 col-sm-10 col-md-8 col-lg-6 my-2 budget__income">
                                        <div className="row">
                                            <div className="col-4 budget__income-text">Pajamos</div>
                                            <div className="col-5 budget__income-value">+ 4,300.00</div>
                                            <div className="col-3 budget__income-percentage">&nbsp;</div>
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
                            <div className="col-12 col-sm-6 col-md-6 col-lg-6 input-group my-3">

                                <input type="text"
                                    className="form-control add__description"
                                    placeholder="Aprašymas"
                                    onChange={e => setIncomeName(e.target.value)}
                                />
                                <input type="date" className="form-control add__date" placeholder="Date" />

                                <input type="number"
                                    className="form-control add__value"
                                    placeholder="Kiekis"
                                    onChange={e => setAmount(e.target.value)}
                                />

                                <div className="input-group-append">
                                    <button onClick={() => addIncome()} className="btn" type="button">
                                        <FontAwesomeIcon icon="circle-check" className='add__btn' />
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-5 list">
                    <div className="container">
                        <div className="col-12 income">
                            <h2 className="income__title">Pajamos</h2>
                            <div className="container income__list"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
