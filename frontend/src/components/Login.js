import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import AuthService from "../services/auth.service";
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onSubmit', reValidateMode: 'onSubmit' });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const onSubmit = data => AuthService.login(data.email, data.password)
        .then(() => {
            navigate("/welcome")
            window.location.reload();
        })
        .catch(() => setMessage("Email or password is incorrect"));

    return (
        <div className="col-md-12">
            <div className="card card-container">
                <img src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="profile-img" className="profile-img-card" />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label className='mb-2'>Email</label>
                        <input {...register("email", { required: true })} className="form-control" />
                        {errors?.email?.type === "required" && <p>This field is required</p>}
                    </div>
                    <div className="form-group">
                        <label className='mb-2'>Password</label>
                        <input {...register("password", { required: true })} type="password" className='form-control' />
                        {errors?.password?.type === "required" && <p>This field is required</p>}
                        {message && message}
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary btn-block mt-5" type='submit'>Log in</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
