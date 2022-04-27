import React from 'react'
import { useForm } from "react-hook-form"
import AuthService from "../services/auth.service"

export default function EditIncomeModal({ id, incomeName, date, amount, forceRender, setForceRender }) {
    const currentUser = AuthService.getCurrentUser();
    const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onSubmit', reValidateMode: 'onSubmit' });

    const onSubmit = async (data) => {
        const response = await fetch(
            "http://localhost:8080/api/income/",
            {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${currentUser.accessToken}`
                },
                body: JSON.stringify({
                    "incomeId": id,
                    "incomeName": data.incomeName,
                    "date": data.date,
                    "amount": data.amount
                })
            }
        )

        setForceRender(!forceRender)
    }

    return (
        <>
            <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
            >
                Redaguoti
            </button>

            <div
                className="modal fade"
                id="staticBackdrop"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5
                                className="modal-title"
                                id="staticBackdropLabel"
                            >
                                Įrašo redagavimas
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close">
                            </button>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="modal-body">
                            <input
                                {...register("incomeName",
                                    {
                                        required: true,
                                        minLength: 4
                                    })
                                }
                                type="text"
                                className="form-control add__description"
                                placeholder="Aprašymas"
                                defaultValue={incomeName}
                            />
                            {errors?.incomeName?.type === "required" && <p>Laukas negali būti tuščias</p>}

                            <input
                                {...register("date", { required: true })}
                                type="date"
                                className="form-control add__date"
                                placeholder="Data"
                                defaultValue={date}
                            />
                            {errors?.date?.type === "required" && <p>Laukas negali būti tuščias</p>}

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
                                defaultValue={amount}
                            />
                            {errors?.amount?.type === "required" && <p>Laukas negali būti tuščias</p>}

                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                >
                                    Uždaryti
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    data-bs-dismiss="modal"
                                >
                                    Išsaugoti
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
