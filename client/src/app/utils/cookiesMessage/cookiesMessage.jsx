import React, { useEffect, useState } from 'react';
import classes from './cookiesMessage.module.css';
import Button from '../../components/common/button';

const CookiesMessage = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [messageClass, setMessageClass] = useState('');
    const handleClick = () => {
        localStorage.setItem('cookies', 'ok');
        setMessageClass('');
        setTimeout(() => {
            setIsVisible(false);
        }, 1000);
    };
    useEffect(() => {
        if (!localStorage.getItem('cookies')) {
            setIsVisible(true);
            setTimeout(() => {
                setMessageClass(classes.messageWrapShown);
            }, 50);
        }
    }, []);
    if (isVisible) {
        return (
            <div className={classes.messageWrap + ' ' + messageClass}>
                <div className={classes.message}>
                    Мы используем на сайте файлы cookies.
                    <br /> Без них ничего нормально не работает.
                </div>
                <Button onClick={handleClick}>OK</Button>
            </div>
        );
    } else {
        return null;
    }
};

export default CookiesMessage;
