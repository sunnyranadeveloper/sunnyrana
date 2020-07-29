import React from 'react';
import ReactDOM from 'react-dom';

function Footer() {
    return (
        <footer>
            <div className="copy-right">
                <div className="container">
                    <p>Sunny Rana</p>
                    <ul className="social-nav">
                        <li><i className="flaticon-facebook-logo"></i></li>
                        <li><i className="flaticon-twitter"></i></li>
                        <li><i className="flaticon-google-plus-logo"></i></li>
                        <li><i className="flaticon-dribbble-logo"></i></li>
                    </ul>
                </div>
            </div>
            <span id="go-to-top" className="go-to-top"><i className="flaticon-up-arrow"></i></span>
        </footer>
    );
}

export default Footer;