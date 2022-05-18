import React, { useEffect, useState } from 'react';
import AuthService from "../services/auth.service";
// import Header from './Header';
// import NavbarAna from './NavbarAna';
// import SideBar from './SideBar';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

export default function HomeLoggedIn() {
    const currentUser = AuthService.getCurrentUser();

    const [income, setIncome] = useState([]);

    const chartIncomeAmount = income.map(x => x.amount);
    const chartIncomeNames = income.map(x => x.incomeName);

    const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
    const chartIncomeColors = [];
    const chartIncomeColorsBorder = [];

    // Generates random RGB values for the displayed incomes
    for (let i = 1; i <= income.length; i++) {
        const r = randomBetween(0, 255);
        const g = randomBetween(0, 255);
        const b = randomBetween(0, 255);
        const rgb = `rgb(${r}, ${g}, ${b}, 0.2)`; // Collect all to a css color string
        const rgbBorder = `rgb(${r}, ${g}, ${b}, 1)`;

        chartIncomeColors.push(rgb);
        chartIncomeColorsBorder.push(rgbBorder);
    }

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
            setIncome(data);
        };

        fetchData();
    }, []);

    ChartJS.register(ArcElement, Tooltip, Legend);
    const data = {
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
                <p>Šio mėnesio pajamos:</p>

                <div className="col-6">
                    <Doughnut
                        data={data}
                        width={400}
                        height={400}
                        options={{ maintainAspectRatio: false }}
                    />
                </div>
            </div>
        </div>
    );
}
