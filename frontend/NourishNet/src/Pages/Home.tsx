import React from 'react'
import Header from '../Components/Header'
import "./Home.css"
import cover1 from '../assets/cover2.png'
import cardImage1 from "../assets/card1.png"
import card2 from "../assets/card2.png"
import card3 from "../assets/card3.png"
// import vector1 from "../assets/vector1.jpg"
import Footer from '../Components/Footer'

const Home:React.FC = () => {
  return (
    <>   
        <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
        </head>
        <Header></Header>

        <div className='d-flex justify-content-center flex-column'>
            <div className='d-flex justify-content-center mt-5 flex-column'>
                <div className='d-flex justify-content-center'>
                    <h1 className='custom-font'>Do not <span className='text-warning'>feed</span> Your Bin 🤚</h1>
                </div>

                <div className='d-flex justify-content-center mx-5 mt-4'>
                    <h6 className='coverDesc'>
                        Every year, vast amounts of edible food are wasted while countless people go hungry. 
                        At NourishNet, we believe in the power of sharing and encourage individuals and businesses
                        to donate surplus food rather than discard it. By donating, you not only help reduce food
                        waste but also provide meals and hope to those in need. 
                        Let's work together to fight hunger, reduce waste, and create a more sustainable future. <br/>
                        <center><span className='fs-3 sloganMargin text-success fw-bolder'>Do not feed your bin,feed the people who need it!</span></center>
                    </h6>
                </div>

                <div className='d-flex justify-content-center mt-2'>
                    <button className='btn btn-dark mx-2 buttonCustom'><a href='/donor/login' style={{color:"inherit", textDecoration:"none"}}>Donate Food</a></button>
                    <button className='btn btn-dark mx-2 buttonCustom'><a href='/recipient/login' style={{color:"inherit", textDecoration:"none"}}>Receive Food</a></button>
                </div>
                
            </div>
            
            <div className='d-flex justify-content-center'>
              <img src={cover1} className='cover1 img-fluid'/>
            </div>
        </div>
        <hr className='mx-5'/>

        <div className='container-fluid d-flex flex-column'>
            <center><h1 className='mb-5'>What NourishNet Does?</h1></center>
            <div className='d-flex flex-wrap justify-content-center'>
                <div className="card mx-4 mb-4 mb-md-0 cardComponent">
                    <img src={cardImage1} className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <center><h5 className="card-title">Donate Foods</h5></center>
                        <p className="card-text text-center">
                            At NourishNet, we enable donors to contribute their surplus food to those in need, 
                            ensuring that no meal goes to waste. By donating excess food, our donors help fight 
                            hunger and make a meaningful impact on the community, 
                            promoting sustainability and reducing food waste. 
                            Join us in making a difference, one meal at a time.
                        </p>
                        <center><a href="/donor/register" className="btn btn-primary">Sign Up As Donor</a></center>
                    </div>
                </div>

                <div className="card mx-4 mb-4 mb-md-0 cardComponent ">
                    <img src={card2} className="card-img-top" alt="..."/>
                    <div className="card-body">
                    <center><h5 className="card-title">Recieve Donations</h5></center>
                        <p className="card-text text-center">At NourishNet, recipients have the opportunity to collect 
                            donated surplus food from generous donors. 
                            This food can be used for personal consumption or distributed to others in need, 
                            ensuring that it reaches those who can benefit from it the most. 
                            By connecting donors and recipients, we help reduce food waste and support community well-being.</p>
                        <center><a href="/recipient/register" className="btn btn-primary">Sign Up As Recipient</a></center>
                    </div>
                </div>

                <div className="card mx-4 mb-4 mb-md-0 cardComponent">
                    <img src={card3} className="card-img-top" alt="..."/>
                    <div className="card-body">
                    <center><h5 className="card-title">Reduce Food waste</h5></center>
                        <p className="card-text text-center">As a group, we are committed to combating food waste by 
                            promoting responsible food management and encouraging donations of surplus food. 
                            Through our collective efforts, we strive to ensure that perfectly good food is 
                            redirected to those in need, reducing waste and fostering a more sustainable future 
                            for everyone.
                        </p>
                        <center><a href="#" className="btn btn-primary">View Our Policies</a></center>
                    </div>
                </div>

            </div>
        </div>

<div className="container-fluid border-2 border-dark mt-4 ">
    <div className="h4-margin">
        <center><h4 className='mt-5'>Frequently asked questions</h4></center>
    </div>

    <div className="mx-5">
        <div className="accordion accordion-flush" id="accordionExample">
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  How to Donate a Foods in NourishNet?
                </button>
              </h2>
              <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                  You need to create a Donor account and then you can add a Post including the food you try to donate. Then <strong> 
                    Recipient</strong> will request to recieve your foods
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  How to Recieve food , what is the method 
                </button>
              </h2>
              <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                    After connecting with Donor or recipient You can contact them o arrange how you gonna have the food transaction. Thats totaly can be a decided by you
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                  Can i add any service i want?
                </button>
              </h2>
              <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                  No you can not. But you can do this , you can email us that you want to add a specific service where you gonna work on jobs related to that service , our team will contact you and add that service for you
                </div>
              </div>
            </div>
          </div>
    </div>
    
</div>

<div className="container-fluid d-flex justify-content-center align-items-center bg-white mt-5 mb-5">
    <div className="row mt-5 container-fluid">
        <h1 className="text-center text-dark">Newsletter</h1>
        
        <div className="d-flex justify-content-center align-items-center mb-5">
            <div className="w-75">
                <input type="email" className="mt-2 w-100 border border-dark border-2 py-3 px-3" placeholder="Enter you email to get latest updates"/>
            </div>

            <div className="mx-1 flex-2">
                <button className="btn btn-dark py-3 mt-2 px-3"><span className="material-symbols-outlined send-icon-size">send</span></button>
            </div>

        </div>

    </div>

</div>

    <Footer></Footer>

    <div>
      <h1>This text was added to check jenkins pipeline Automation!!!</h1>
    </div>
    </>
    
  )
}

export default Home
