import "./Contact.css";

import { BsFillTelephoneFill } from "react-icons/bs";
import { HiMail } from "react-icons/hi";
import { IoLocationSharp } from "react-icons/io5";
import { FaTwitter, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { AiOutlineInstagram } from "react-icons/ai";

const Contact = () => {
  return (
    <main className="contact-page">
      <div className="contact-container" id="contact-id">
        <h1>Contact us</h1>
        <div className="phone">
          <div className="contact-svgs">
            <BsFillTelephoneFill style={{ height: "100%" }} />
          </div>

          <p>0308-0129892 </p>
        </div>
        <div className="email">
          <HiMail style={{ color: "white", fontSize: "3em" }} />
          <p>contact@PizzaPoint.com</p>
        </div>
        <div className="map">
          <IoLocationSharp style={{ color: "white", fontSize: "3em" }} />

          <p>Ned University Of Engineering And Technology,Karachi,Pakistan.</p>
        </div>
        <div className="social-links">
          <p>Follow Us on Social Media</p>
          <a href="https://www.facebook.com">
            <FaFacebookF style={{ color: "white", fontSize: "3em" }} />
          </a>
          <a href="https://www.twitter.com">
            <FaTwitter style={{ color: "white", fontSize: "3em" }} />
          </a>
          <a href="https://www.instagram.com">
            <AiOutlineInstagram style={{ color: "white", fontSize: "3em" }} />
          </a>
          <a href="https://www.linkedin.com/in/muhammad-abdullah-aziz-48a430243/">
            <FaLinkedinIn style={{ color: "white", fontSize: "3em" }} />
          </a>
        </div>
      </div>
    </main>
  );
};

export default Contact;
