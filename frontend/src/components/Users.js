import React, { useState, useEffect, useRef } from 'react';
import "./IncomeAndExpense.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthService from "../services/auth.service";
import { useForm } from "react-hook-form";
import EditUserModal from './EditUserModal';

export default function Users() {
    const [allUsers, setAllUsers] = useState([]);
    const [forceRender, setForceRender] = useState(false);
    const currentUser = AuthService.getCurrentUser();
    const { register, watch, handleSubmit, reset, formState: { errors } } = useForm({ mode: 'onSubmit', reValidateMode: 'onSubmit' });

    // Add new user to database from the inputs
    const onSubmit = async (data) => {
        let admin = "";

        if (data.admin) {
            admin = "admin";
        }

        const response = await fetch(
            "http://localhost:8080/api/auth/signup",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "username": data.username,
                    "email": data.email,
                    "password": data.password,
                    "role": [admin, "user"]
                })
            }
        );

        if (response.status === 200) {
            successMessage();
            reset();
        }
        else {
            (errorMessage('Klaida!'));
        }

        setForceRender(!forceRender);
    };

    // Popup message configuration
    toast.configure();
    const successMessage = () => {
        toast.success('Vartotojas sukurtas', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
            theme: "colored",
            pauseOnHover: false,
            hideProgressBar: true,
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
        );

        setForceRender(!forceRender);
    };

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
        };

        fetchData();
    }, [forceRender]);

    const password = useRef({});
    password.current = watch("password", "");

    return (
        <>
            <div className="bottom mt-4">
                <div className="container">
                    <div className="add" style={{ padding: 4, paddingTop: 12 }}>
                        <h2 className="income__title">Pridėti naują vartotoją</h2>
                        <div className="row text-center add__container ">

                            <form onSubmit={handleSubmit(onSubmit)}
                                className="input-group my-2 justify-content-center"
                            >
                                <div className="col-2 p-0 pe-2" >
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
                                    {
                                        errors?.username?.type === "required" &&
                                        <p>Šis laukas yra privalomas</p>
                                    }
                                    {
                                        errors?.username?.type === "minLength" &&
                                        <p>Vardas turi būti bent 4 simbolių ilgio</p>
                                    }
                                </div>

                                <div className="col-2 p-0 pe-2" >
                                    <input
                                        {...register("email",
                                            {
                                                required: true,
                                                minLength: 4
                                            })
                                        }
                                        type="email"
                                        className="form-control add__value"
                                        placeholder="El. paštas"
                                    />
                                    {
                                        errors?.email?.type === "required"
                                        && <p>Šis laukas yra privalomas</p>
                                    }
                                    {
                                        errors?.email?.type === "minLength" &&
                                        <p>El-paštas turi būti sudarytas iš bent 4 simbolių</p>
                                    }
                                </div>

                                <div className="col-2 p-0 pe-2" >
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
                                    {
                                        errors?.password?.type === "required" &&
                                        <p>Šis laukas yra privalomas</p>
                                    }
                                    {
                                        errors?.password?.type === "minLength" &&
                                        <p>Slaptažodis turi būti bent 6 simbolių ilgio </p>
                                    }
                                </div>

                                <div className="col-2 p-0" >
                                    <input
                                        {...register("password_repeat",
                                            {
                                                validate: value =>
                                                    value === password.current || "Slaptažodžiai nesutampa"
                                            })
                                        }
                                        type="password"
                                        className='form-control'
                                        placeholder='Pakartoti slaptažodį'
                                    />
                                    {errors.password_repeat && <p>{errors.password_repeat.message}</p>}
                                </div>

                                <div className="col-4 p-0" >
                                    <label
                                        htmlFor="admin"
                                        className="ms-1"
                                    >
                                        Admin.?
                                    </label>
                                    <input
                                        {...register("admin")}
                                        name='admin'
                                        type="checkbox"
                                        className="ms-1"
                                    />

                                    <button className="btn" type="submit">
                                        <FontAwesomeIcon icon={faCirclePlus} className='add__btn__income' />
                                    </button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>

                <div className="mt-4 list">
                    <div className="container">
                        <div className="col-12 username" style={{ paddingLeft: 0, paddingRight: 0 }}>
                            <h2 className="income__title">Vartotojai</h2>
                            <div className="container income__list"></div>

                            {/* Display users on the page */}
                            {allUsers.map(users => {

                                return (
                                    <div key={users.id}>
                                        <div className='row'>
                                            <div className='col-3'>
                                                {users.username}&nbsp;
                                            </div>
                                            <div className='col-4' style={{ paddingLeft: 40 }}>
                                                {users.email}&nbsp;
                                            </div>
                                            <div className='col-3' style={{ paddingLeft: 50 }}>
                                                {/* {users.roles.map(roles => {
                                                return(
                                                    <div key={roles.id}>
                                                        {roles.name}
                                                    </div>
                                                )
                                            })} */}
                                                {users.roles.map(roles => <p>{roles.name}</p>)}

                                            </div>

                                            <div className='col-2' style={{ textAlign: "right", paddingRight: 0 }}>
                                                <EditUserModal
                                                    id={users.id}
                                                    username={users.username}
                                                    email={users.email}
                                                    roles={users.roles}

                                                    forceRender={forceRender}
                                                    setForceRender={setForceRender}
                                                />

                                                <button
                                                    onClick={() => removeUser(users.id)}
                                                    className="btn"
                                                    type="button"
                                                >
                                                    <FontAwesomeIcon icon="trash" className='add__btn__income' style={{ "width": "20px" }} />
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
