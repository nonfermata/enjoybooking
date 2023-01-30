import React from "react";
import classes from "./contacts.module.css";

const Contacts = () => {
    return (
        <>
            <div className="mainTitle">Контакты</div>
            <div className={classes.contactsWrap}>
                <div className={classes.mapWrap}>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2623.9568829753557!2d2.3415275926594594!3d48.878098497424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e6a9d3f60b3%3A0xb37bdd6e415eb644!2zMzAgUnVlIGRlIEJlbGxlZm9uZCwgNzUwMDkgUGFyaXMsINCk0YDQsNC90YbQuNGP!5e0!3m2!1sru!2skz!4v1673116655778!5m2!1sru!2skz"
                        width="600"
                        height="450"
                        style={{ border: "0" }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
                <div className={classes.infoWrap}>
                    <div className={classes.item}>
                        <span className="fw600">Наш адрес:</span>
                        <br />
                        30 Rue de Bellefond
                        <br />
                        75009, Paris
                        <br />
                        France
                    </div>
                    <div className={classes.item}>
                        <span className="fw600">Телефон:</span>
                        <br />
                        +33 1 45 26 83 90
                    </div>
                    <div className={classes.item}>
                        <span className="fw600">E-mail:</span>
                        <br />
                        enjoy-hotel@orange.fr
                    </div>
                </div>
            </div>
        </>
    );
};

export default Contacts;
