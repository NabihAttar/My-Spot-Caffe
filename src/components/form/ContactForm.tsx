// "use client"
// import { toast } from 'react-toastify';

// interface FormEventHandler {
//     (event: React.FormEvent<HTMLFormElement>): void;
// }

// const ContactForm = () => {

//     const handleForm: FormEventHandler = (event) => {
//         event.preventDefault()
//         const form = event.target as HTMLFormElement;
//         form.reset()
//         toast.success("Thanks For Your Message")
//     }

//     return (
//         <>
//             <form className="contact-form contact-form" onSubmit={handleForm}>
//                 <div className="row">
//                     <div className="col-lg-12">
//                         <div className="form-group">
//                             <input className="form-control" id="name" name="name" placeholder="Name" type="text" autoComplete='off' required />
//                             <span className="alert-error"></span>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="row">
//                     <div className="col-lg-6">
//                         <div className="form-group">
//                             <input className="form-control" id="email" name="email" placeholder="Email*" type="email" autoComplete='off' required />
//                             <span className="alert-error"></span>
//                         </div>
//                     </div>
//                     <div className="col-lg-6">
//                         <div className="form-group">
//                             <input className="form-control" id="phone" name="phone" placeholder="Phone" type="text" autoComplete='off' required />
//                             <span className="alert-error"></span>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="row">
//                     <div className="col-lg-12">
//                         <div className="form-group comments">
//                             <textarea className="form-control" id="comments" name="comments" placeholder="Your Message *" autoComplete='off' required />
//                         </div>
//                     </div>
//                 </div>
//                 <div className="row">
//                     <div className="col-lg-12">
//                         <button type="submit" name="submit" id="submit">
//                             <i className="fa fa-paper-plane"></i> Get in Touch
//                         </button>
//                     </div>
//                 </div>
//                 <div className="col-lg-12 alert-notification">
//                     <div id="message" className="alert-msg"></div>
//                 </div>
//             </form>
//         </>
//     );
// };

// export default ContactForm;

"use client";

import React from "react";
import { toast } from "react-toastify";

interface FormEventHandler {
  (event: React.FormEvent<HTMLFormElement>): void;
}

const ContactForm = () => {
  const handleForm: FormEventHandler = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const phone = String(data.get("phone") || "");
    const comments = String(data.get("comments") || "");

    const message =
      `New Contact Message:%0A` +
      `Name: ${name}%0A` +
      `Email: ${email}%0A` +
      `Phone: ${phone}%0A` +
      `Message: ${comments}`;

    // ✅ WhatsApp number format: countrycode + number, no + / 00 / spaces
    const whatsappNumber = "96171592971";
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message.replace(/%0A/g, "\n")
    )}`;

    // Open WhatsApp (new tab)
    window.open(url, "_blank", "noopener,noreferrer");

    form.reset();
    toast.success("Thanks For Your Message");
  };

  return (
    <form className="contact-form" onSubmit={handleForm}>
      <div className="row">
        <div className="col-lg-12">
          <div className="form-group">
            <input
              className="form-control"
              id="name"
              name="name"
              placeholder="Name"
              type="text"
              autoComplete="off"
              required
            />
            <span className="alert-error"></span>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6">
          <div className="form-group">
            <input
              className="form-control"
              id="email"
              name="email"
              placeholder="Email*"
              type="email"
              autoComplete="off"
              required
            />
            <span className="alert-error"></span>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="form-group">
            <input
              className="form-control"
              id="phone"
              name="phone"
              placeholder="Phone"
              type="text"
              autoComplete="off"
              required
            />
            <span className="alert-error"></span>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <div className="form-group comments">
            <textarea
              className="form-control"
              id="comments"
              name="comments"
              placeholder="Your Message *"
              autoComplete="off"
              required
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <button type="submit" name="submit" id="submit">
            <i className="fa fa-paper-plane"></i> Get in Touch
          </button>
        </div>
      </div>

      <div className="col-lg-12 alert-notification">
        <div id="message" className="alert-msg"></div>
      </div>
    </form>
  );
};

export default ContactForm;
