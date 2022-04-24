import React from 'react'
import "./Income.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



// This code copypasted from: https://codepen.io/fido123/pen/xzvxNw
// JavaScript is not included in this code, only html and css



export default function Income() {
    return (
        <>
            <div className="jumbotron-fluid text-center">
                <div className="container">
                    <div className="top">
                        <div className="budget">
                            <div className="budget__title">

                                <h1 className="display-4 pt-3">
                                    Available Budget in <span className="budget__title-month">%Month%</span>:
                                </h1>

                                <div className="mt-3 mb-5 budget__value">+ 2,345.66</div>

                                <div className="row">
                                    <div className="col-12 col-sm-10 col-md-8 col-lg-6 my-2 budget__income">
                                        <div className="row">
                                            <div className="col-4 budget__income-text">Income</div>
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
                <div className="add">
                    <div className="container">
                        <div className="row text-center add__container">

                            <div className="col-12 col-sm-6 col-md-6 col-lg-6 input-group my-3">
                                <input type="text" className="form-control add__description" placeholder="Description" />


                                <input type="number" className="form-control add__value" placeholder="Value" />

                                <div className="input-group-append">

                                    <button className="btn" type="button">
                                        <FontAwesomeIcon icon="circle-check" className='add__btn' />

                                    </button>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mt-5 list">
                    <div className="col-12 income">
                        <h2 className="income__title">Income</h2>
                        <div className="container income__list"></div>
                    </div>
                </div>
            </div>
        </>

    )
}
