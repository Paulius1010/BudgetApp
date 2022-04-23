import React from "react";
import "./NavbarAna.css"

export default function Navbar() {

    return <>
        <div className="row mb-4">
            <button type="button" className="btn btn-success col-lg-4 mx-3">IŠLAIDOS</button>
            <button type="button" className="btn btn-success col-lg-4 mx-3">PAJAMOS</button>
            <button type="button" className="btn btn-success col-lg-4 mx-3">BENDRA STAT.</button>
        </div>
        <hr></hr>

    </>
}