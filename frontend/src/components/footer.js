const Footer = () => {
  return (
    <div>
      <section className="footer">
        <div className="footer-items">
          <div className="grid-container">
            <div className="grid-item">
              <p className="grid-topic">CONTACT US</p>
              <p>Unicorn Solutions AS.</p>
              <p>
                <i className="fa-solid fa-location-dot fa-sm"></i>{" "}
                21/8A Chandra Silva Mawatha, Pagoda Rd, Nugegoda
              </p>
              <p>
                <i className="fa-solid fa-phone fa-sm"></i> 0123456789
              </p>
              <p>
                <i className="fa-solid fa-envelope fa-sm"></i>{" "}
                info@unicorn-solutions.com
              </p>
            </div>
            <div className="grid-item">
              <p className="grid-topic">QUICK LINKS</p>
              <p>Home</p>
              <p>Company Policies</p>
              <p>About Us</p>
              <p>Contact Us</p>
            </div>
            <div className="grid-item">
              <p className="grid-topic">FOLLOW US ON</p>
              <i className="fa-brands fa-instagram fa-2xl"></i>
              <i className="fa-brands fa-facebook fa-2xl"></i>
              <i className="fa-brands fa-linkedin fa-2xl"></i>
              <i className="fa-brands fa-twitter fa-2xl"></i>
              <br />
              <br />
              <br />
              <img src={require('../styles/unicorn-solutions-logo.png')} className="unicorn-logo" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Footer;
