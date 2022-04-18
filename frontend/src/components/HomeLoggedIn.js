import React from 'react'
import AuthService from "../services/auth.service";
import Header from './Header'
import Navbar from './Navbar'
import SideBar from './SideBar'

export default function HomeLoggedIn() {
    const currentUser = AuthService.getCurrentUser();

    return (
        <>
            <div>
                <h2>Sveiki {currentUser.email}</h2>
            </div>

            <div>
                <Header />
            </div>
            <div className='row'>
                <div className='row col-8 ps-4'>
                    <div className='col-12 mt-4'><Navbar /></div>
                    <h2>Some content</h2>
                </div>
                <div className='col-4'>
                    <SideBar />
                </div>
            </div>
        </>
    )
}
