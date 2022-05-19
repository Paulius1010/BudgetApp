import React, { useEffect, useState } from 'react';
import AuthService from "../services/auth.service";
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

export default function HomeLoggedIn() {
    const currentUser = AuthService.getCurrentUser();

    const [income, setIncome] = useState([]);
    const [expense, setExpense] = useState([]);

    const chartIncomeAmount = income.map(x => x.amount);
    const chartIncomeNames = income.map(x => x.incomeName);
    const chartExpenseAmount = expense.map(x => x.amount);
    const chartExpenseNames = expense.map(x => x.expenseName);

    const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
    const chartIncomeColors = [];
    const chartIncomeColorsBorder = [];
    const chartExpenseColors = [];
    const chartExpenseColorsBorder = [];

    // Generates random RGB values for the displayed incomes
    for (let i = 1; i <= income.length; i++) {
        const r = randomBetween(0, 255);
        const g = randomBetween(0, 255);
        const b = randomBetween(0, 255);
        const rgb = `rgb(${r}, ${g}, ${b}, 0.2)`; // Collect all to a css color string
        const rgbBorder = `rgb(${r}, ${g}, ${b}, 1)`;

        chartIncomeColors.push(rgb);
        chartIncomeColorsBorder.push(rgbBorder);
        chartExpenseColors.push(rgb);
        chartExpenseColorsBorder.push(rgbBorder);
    }

    // Fetch all user's income from database to display down below
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const response = await fetch(`http://localhost:8080/api/income/user/${currentUser.id}`,
    //             {
    //                 method: "GET",
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'Authorization': `Bearer ${currentUser.accessToken}`
    //                 }
    //             });

    //         const data = await response.json();
    //         setIncome(data);
    //     };

    //     fetchData();
    // }, []);

    // Fetch current user's this month's all income
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
            setIncome(data);
        };

        fetchData();
    }, []);

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
            setExpense(data);
        };

        fetchData();
    }, [])


    ChartJS.register(ArcElement, Tooltip, Legend);
    const incomeData = {
        labels: chartIncomeNames,
        datasets: [
            {
                label: 'Šio mėnesio pajamos:',
                data: chartIncomeAmount,
                backgroundColor: chartIncomeColors,
                borderColor: chartIncomeColorsBorder,
                borderWidth: 1,
            },
        ],
    };

    ChartJS.register(ArcElement, Tooltip, Legend);
    const expenseData = {
        labels: chartExpenseNames,
        datasets: [
            {
                label: 'Šio mėnesio išlaidos:',
                data: chartExpenseAmount,
                backgroundColor: chartExpenseColors,
                borderColor: chartExpenseColorsBorder,
                borderWidth: 1,
            },
        ],
    };

    return (
        <>
            <div className='row'>
                <h2>Sveiki {currentUser.email}</h2>
            </div>

            <div className='row'>
                <div className='row col-8 ps-4 mt-4'>
                    <div className="row mb-4" style={{ margin: "0" }}>
                        <button type="button" className="btn btn-success col-3 mx-3">IŠLAIDOS</button>
                        <button type="button" className="btn btn-success col-3 mx-3">PAJAMOS</button>
                        <button type="button" className="btn btn-success col-3 mx-3">BENDRA STAT.</button>
                    </div>
                </div>
                <div className='col-4'>
                    <div style={{ borderLeft: "solid 1px #696969" }}>
                        <div className="row mt-3">
                            <div className="col-2">
                                <img src="https://via.placeholder.com/60x60?text=$" alt="placeholder" className="img-config"></img>
                            </div>
                            <div className="col-3">
                                <h4>Likutis</h4>
                                <h3>$YYYYYYY,00</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr></hr>


            <div className="container">
                <div className="row">
                    <div className='col-6'>
                        <p>Šio mėnesio pajamos:</p>
                        <div>
                            <Doughnut
                                data={incomeData}
                                width={400}
                                height={400}
                                options={{ maintainAspectRatio: false }}
                            />
                        </div>
                    </div>

                    <div className='col-6'>
                        <p>Šio mėnesio išlaidos:</p>
                        <div>
                            <Doughnut
                                data={expenseData}
                                width={400}
                                height={400}
                                options={{ maintainAspectRatio: false }}
                            />
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}
