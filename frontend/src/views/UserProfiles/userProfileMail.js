import {useRef} from 'react'
import emailjs from '@emailjs/browser';
import './CSS/userProfileMail.css';


const UserProfileMail = () => {
    const form = useRef()

    const sendEmail = (e) => {
        e.preventDefault();
    
        emailjs.sendForm('service_zon2ees', 'template_v6hnptg', form.current, 'olnXkKbfO1V58MbRL')
          .then((result) => {
            alert("Email sent Successful");
          }, (error) => {
            alert("Email sent failed");
          });
          e.target.reset()
      };

    return (
        <section>
            <div className = "mailContainer">
                <h2>Mail Section</h2>
                <br></br>
                <br></br>
                <form ref={form} onSubmit={sendEmail}>
                    <label>Full Name</label>
                    <input type = "text" placHolder = "Full Name" name = "user_name" required></input>
                    <label>Email</label>
                    <input type = "email" placHolder = "Email" name = "user_email" required></input>
                    <label>Subject</label>
                    <input type = "text" placHolder = "Subject" name = "subject" required></input>
                    <label>Message</label>
                    <textarea placHolder = "Message" name = "message" required></textarea>
                    <br></br>
                    <br></br>
                    <button className="mailSendBTn">Send</button>
                </form>
             </div>
        </section>
      );
}

export default UserProfileMail;