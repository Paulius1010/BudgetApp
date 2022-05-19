import React, { useEffect, useState } from 'react';
import AuthService from "../services/auth.service";
// import Header from './Header';
// import SideBar from './SideBar';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

export default function HomeLoggedIn() {
    const currentUser = AuthService.getCurrentUser();

    const [income, setIncome] = useState([]);
    const [expense, setExpense] = useState([]); //mine

    const chartIncomeAmount = income.map(x => x.amount);
    const chartIncomeNames = income.map(x => x.incomeName);
    const chartExpenseAmount = expense.map(x => x.amount); //mine
    const chartExpenseNames = expense.map(x => x.expenseName); //mine

    const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
    const chartIncomeColors = [];
    const chartIncomeColorsBorder = [];
    const chartExpenseColors = []; //mine
    const chartExpenseColorsBorder = []; //mine

    // Generates random RGB values for the displayed incomes
    for (let i = 1; i <= income.length; i++) {
        const r = randomBetween(0, 255);
        const g = randomBetween(0, 255);
        const b = randomBetween(0, 255);
        const rgb = `rgb(${r}, ${g}, ${b}, 0.2)`; // Collect all to a css color string
        const rgbBorder = `rgb(${r}, ${g}, ${b}, 1)`;

        chartIncomeColors.push(rgb);
        chartIncomeColorsBorder.push(rgbBorder);
        chartExpenseColors.push(rgb); //mine
        chartExpenseColorsBorder.push(rgbBorder); //mine
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
    }, []) //mine


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

    ChartJS.register(ArcElement, Tooltip, Legend); //mine
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
    }; //mine

    return (
        // <>
        //     <div>
        //         <h2>Sveiki {currentUser.email}</h2>
        //     </div>

        //     {/* <div>
        //         <Header />
        //     </div> */}
        //     <div className='row'>
        //         <div className='row col-8 ps-4'>
        //             <div className='col-12 mt-4'><NavbarAna /></div>
        //             <h2>Some content</h2>
        //         </div>
        //         <div className='col-4'>
        //             <SideBar />
        //         </div>
        //     </div>
        // </>

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
    );
}
