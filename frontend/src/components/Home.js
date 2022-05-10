import React from "react";
import "./Home.css"

const Home = () => {
    return (
        <>

            <div className="container-fluid mb-4" style={{background: "#8aa82d"}}>
                {/* image, qoute row */}
                <div className="row first_section">
                    <div className="col-4">
                        <div className="quote_config">
                            <div className="text_config">
                                ❞Gain control over your money or the lack of it will forever control you❝
                            </div>
                            <div className="text2_config">
                                -Dave Ramsey
                            </div>
                        </div>
                    </div>
                    <div className="col-8 first_section p-0" style={{overflow: "hidden"}}>
                        <img className="hero_config" src={require("../images/hero_1.jpg")}></img>
                    </div>
                </div>
                {/* why use a budget app row */}
                <div className="row bg-white justify-content-center">
                    {/* d-flex justify-content-center if needed for bot div */}
                    <div className="container">
                        <div className="col-7 bg-white second_section container" style={{marginTop: "-150px"}}> 
                            <div className="row">
                                <div className="col-12" id="second_section_header">Kodėl verta sekti savo biudžetą?</div>
                            </div>
                            <div className="row">
                                <div className="col-4 brd">
                                    content
                                </div>
                                <div className="col-4 brd">
                                    content
                                </div>
                                <div className="col-4 brd">
                                    content
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* benefits for you row */}
                <div className="row brd">

                </div>
                {/* <h2>Asmeninio biudžeto analizės aplikacija</h2>
                <p>Sužinokite kiek,kam ir kada išleidote pinigų.</p>
                <div className="hero" style={{ backgroundImage: `url(${require("../images/hero_1.jpg")})` }} /> */}
            </div>



        </>
    );
};
export default Home;
