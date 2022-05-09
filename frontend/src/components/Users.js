import React, { useState, useEffect } from 'react'
import "./IncomeAndExpense.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCirclePlus} from '@fortawesome/free-solid-svg-icons'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import AuthService from "../services/auth.service"
import { useForm } from "react-hook-form";
import EditUserModal from './EditUserModal';


export default function Users() {
    const [allUsers, setAllUsers] = useState([])
    const [forceRender, setForceRender] = useState(false)
    const currentUser = AuthService.getCurrentUser();
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onSubmit', reValidateMode: 'onSubmit' });    

    // This is used to figure out today's date, and format it accordingly
    // let today = new Date();
    // const dd = String(today.getDate()).padStart(2, '0');
    // const mm = String(today.getMonth() + 1).padStart(2, '0');
    // const yyyy = today.getFullYear();
    // today = yyyy + '-' + mm + '-' + dd;

    // Add new user to database from the inputs
    const onSubmit = async (data) => {
        const response = await fetch(
            "http://localhost:8080/api/auth/signupAdmin",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${currentUser.accessToken}`
                },
                body: JSON.stringify({
                    "username": data.username,
                    "email": data.email,
                    "password": data.password, 
                    "roles": data.roles
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

    const removeUser = async (id) => {
        await fetch(
            `http://localhost:8080/api/user/${id}`,
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

    // Fetch all users from database to display down below
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:8080/api/user/all`,
                {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${currentUser.accessToken}`
                    }
                });
            const data = await response.json();
            setAllUsers(data);
        }

        fetchData();
    }, [forceRender]);


    return (
        <>
            <div className="bottom mt-3">
                <div className="container">
                    <div className="add">
                        <div className="row text-center add__container ">

                            <form onSubmit={handleSubmit(onSubmit)} className="input-group my-3">
                                <input
                                    {...register("username", 
                                        { 
                                            required: true,
                                            minLength: 4 
                                        })}
                                    type="text"
                                    className="form-control add__description"
                                    placeholder="Vardas"
                                />

                                <input
                                    {...register("email",
                                        {
                                            required: true,
                                            minLength: 4
                                        })
                                    }
                                    type="text"
                                    className="form-control add__value"
                                    placeholder="El-paštas"
                                    
                                />

                                <input
                                    {...register("password",
                                        {
                                            required: true,
                                            minLength: 6
                                        })
                                    }
                                    type="password"
                                    className="form-control add__value"
                                    placeholder="Slaptažodis"
                                    
                                />
                                
                                <input
                                    {...register("roles",
                                        {
                                            
                                            
                                        })
                                    }
                                    id="ROLE_USER"
                                    type="checkbox"
                                    className="form-control add__value"
                                    value="ROLE_USER"
                                    
                                    checked
                                />
                                
                                <div className="input-group-append">
                                    <button className="btn" type="submit">
                                        <FontAwesomeIcon icon= {faCirclePlus} className='add__btn__income'/>
                                    </button>
                                </div>
                            </form>

                        </div>

                        <div className="row ">
                            <div className="col-sm-4 col-4 ">
                                {errors?.username?.type === "required" && <p>Šis laukas yra privalomas</p>}
                                {errors?.username?.type === "minLength" && <p>Vardas turi būti bent 4 simbolių ilgio</p>}
                            </div>
                            <div className="col-sm-4 col-4">
                                {errors?.email?.type === "required" && <p>Šis laukas yra privalomas</p>}
                                {errors?.email?.type === "minLength" && <p>El-paštas turi būti sudarytas iš bent 4 simbolių</p>}
                            </div>
                            <div className="col-sm-4 col-4">
                                {errors?.password?.type === "required" && <p>Šis laukas yra privalomas</p>}
                                {errors?.password?.type === "minLength" && <p>Slaptažodis turi būti bent 6 simbolių ilgio </p>}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-5 list">
                    <div className="container">
                        <div className="col-12 username">
                            <h2 className="income__title">Vartotojai</h2>
                            <div className="container income__list"></div>

                            {/* Display users on the page */}
                            {allUsers.map(users => {

                                return (
                                    <div key={users.id}>
                                        <div className='row'>
                                            <div className='col-4'>
                                                {users.username}&nbsp;
                                            </div>
                                            <div className='col-4'>
                                                {users.email}&nbsp;
                                            </div>
                                            <div className='col-2'>
                                            {/* {users.roles.map(roles => {
                                                return(
                                                    <div key={roles.id}>
                                                        {roles.name}
                                                    </div>
                                                )
                                            })} */}
                                            {users.roles.map(roles => <p>{roles.name}</p>)}
                                                
                                            </div>

                                            <div className='col-2'>
                                                <EditUserModal
                                                    id={users.id}
                                                    username={users.username}
                                                    email={users.email}
                                                    password={users.password}
                                                    roles={users.roles}

                                                    forceRender={forceRender}
                                                    setForceRender={setForceRender}
                                                />

                                                <button
                                                    onClick={() => removeUser(users.id)}
                                                    className="btn"
                                                    type="button"
                                                >
                                                    <FontAwesomeIcon icon="trash" className='add__btn__income' style={{"width":"20px"}}/>
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
