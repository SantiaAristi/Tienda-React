import React from "react";
import '../stylesheets/ShowFooter.css';
  
const CompShowFooter = () => {
  return (
    <div className="container-footer">
      <div className="container-left-text">
        <p className="text">
          Somos <strong className="name-shop">Online Shop</strong> y te ayudamos a cumplir tus deseos en una experiencia agradable y con la más alta calidad.
        </p>
        <p className="profit">
          Non-commercial or non-profit page.
        </p>
      </div>

      <div className="container-right">
        <span>Síguenos</span>
        <a href="https://es-la.facebook.com/" target='_blank' rel="noreferrer noopener"><img className="right-img" src={require("../images/facebookED.png")} alt="Facebook" /></a>
        <a href="https://www.instagram.com/" target='_blank' rel="noreferrer noopener"><img className="right-img" src={require("../images/instagramED.png")} alt="Instagram" /></a>
        <a href="https://co.linkedin.com/" target='_blank' rel="noreferrer noopener"><img className="right-img" src={require("../images/linkedinED.png")} alt="Linkedin" /></a>
        <input className="btn-contactanos" type="button" value="Contáctanos" />
      </div>
    </div>
  )
};


export default CompShowFooter;