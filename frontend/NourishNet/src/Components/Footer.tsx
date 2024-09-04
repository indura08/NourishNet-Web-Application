import React from 'react'
import instagram from "../assets/instagram.png"
import facebook from "../assets/facebook.png"
import twitter from "../assets/twitter.png"
import linkedin from "../assets/linkedin.png"
import "./Footer.css"

const Footer:React.FC = () => {
  return (
    <>  
        <div className="container-fluid d-flex py-3 bg-dark">
            <div className="w-50 d-flex row">
                <div>
                    <span className="fs-2 text-white">NourishNet</span>
                </div>

                <div>
                    <span className="fs-7 text-white">Do not feed your bin, feed the people who need it!</span>
                </div>

                <div className="d-flex mt-3">
                    <div className=""><img src={instagram} className="image-resize mx-2"/></div>
                    <div className=""><img src={facebook} className="image-resize-linked-in mx-2"/></div>
                    <div className=""><img src={twitter} className="image-resize mx-2"/></div>
                    <div className=""><img src={linkedin} className="image-resize mx-2"/></div>
                </div>
            </div>

            <div className="w-25 div-text-wrap">
                <span className="fs-7 text-white">More NourishNet</span><br/>
                <a href="#" className="a-decorations">sign up as Donor</a><br/>
                <a href="#" className="a-decorations">sign up as Recipient</a><br/>
                <a href="#" className="a-decorations">View services</a><br/>
                <a href="#" className="a-decorations">Price policy</a><br/>
            </div>

            <div className="w-25">
                <h6 className="text-white">Contact-Us</h6>

                <div className="row mt-2">
                    <div className="d-flex mb-2">
                        {/* <img src="assets/location.png" className="image-resize"/> */}
                        <span className="text-white">508/3, heiyanthuduwa, heiyanthuduwa</span>
                    </div>

                    <div className="d-flex mb-2">
                        {/* <img src="assets/email.png" className="image-resize-linked-in"/> */}
                        <span className="text-white">nourishnet&#64;info.nourishnetmail.com</span>
                    </div>

                    <div className="d-flex">
                        {/* <img src="assets/tele.png" className="image-resize"/> */}
                        <span className="text-white">011-5745659 / 0770267931</span>
                    </div>

                </div>
        </div>
        </div>
    </>
  )
}

export default Footer
