import React from "react";
import "./Home.css"

const Home = () => {
    return (
        <>

            <div className="container-fluid mb-4" style={{background: "#8aa82d"}}>

                {/* header row, introduction */}
                <div className="row justify-content-center intro_row">
                    <div className="col-12 intro_font">
                        <div style={{textAlign: "center"}}>Asmeninio biudžeto analizės aplikacija</div>
                        <div style={{textAlign: "center"}}>Sekite kada, kam ir kiek išleidote pinigų</div>
                    </div>
                </div>

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
                        <img className="hero_config" src={require("../images/hero_2.png")}></img>
                    </div>
                </div>

                {/* why use a budget app row */}
                <div className="row bg-white">
                    {/*  justify-content-center */}
                    {/* d-flex justify-content-center if needed for bot div */}
                    <div className="container">
                        <div className="col-7 bg-white second_section container" style={{marginTop: "-150px"}}> 
                            {/* <div className="row">
                                <div className="col-12" id="second_section_header">Kodėl verta sekti savo biudžetą aplikacijoje?</div>
                                
                            </div>
                            <hr></hr> */}
                            <div className="row">
                                <div className="row ss_header">
                                    <div className="col-4">
                                        <div>Atraskite savo blogus išlaidų įpročius</div>
                                    </div>
                                    <div className="col-4">
                                        <div>Lengviau, nei rinkti kvitus</div>
                                    </div>
                                    <div className="col-4">
                                        <div>Siekite savo finansinių tikslų</div>
                                    </div>
                                </div>
                                <div className="row ss_content">
                                    <div className="col-4">
                                        <div>Su "taupyk" aplikacijos įrankiais, sekdami savo pajamas ir išlaidas, galite identifikuoti savo blogus išlaidų įpročius. Taip kitą kartą sutaupysite, nepirkdami nereikalingų produktų.</div>
                                    </div>
                                    <div className="col-4">
                                        <div>Galite pamiršti apie kaupiamus kvitus savo piniginėje ar striukės kišenėje, nes visas savo išlaidas galite sekti savo paskyroje.</div>
                                    </div>
                                    <div className="col-4">
                                        <div>Turite kokį finansinį tikslą? Norite sutaupyti naujam automobiliui? O gal išvykti į užsienį atostogoms? Lengvai planuokites savo finansus ir sekite užsibriežtų tikslų su "taupyk".</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* benefits for you row */}
                <div className="row bg-white third_section">
                    <div className="container">
                        <div className="col-7 container">
                            <div className="row">
                                <div className="col-4 ss_header">Planuokites lengviau</div>
                                <div className="col-8 ss_content">Geras pinigų valdymas – tai kruopštus planavimas. Lengva pasimesti savo išlaidose, jei tiksliai nematote kiek, kur ir kada išleidote savo turimas lėšas.</div>  
                            </div>
                        </div>
                    </div>
                </div>
                {/* <h2>Asmeninio biudžeto analizės aplikacija</h2>
                <p>Sužinokite kiek,kam ir kada išleidote pinigų.</p>
                <div className="hero" style={{ backgroundImage: `url(${require("../images/hero_1.jpg")})` }} /> */}
            </div>



        </>
    );
};
export default Home;
