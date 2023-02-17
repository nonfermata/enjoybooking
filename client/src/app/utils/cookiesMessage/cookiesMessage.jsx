import React, { useEffect, useState } from 'react';
import Button from '../../components/common/button';
import classes from './cookiesMessage.module.css';

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
                    Мы используем на сайте <span className="no_wrap">файлы cookies.</span>
                    <br /> Без них ничего <span className="no_wrap">нормально не работает.</span>
                </div>
                <Button onClick={handleClick}>OK</Button>
            </div>
        );
    } else {
        return null;
    }
};

export default CookiesMessage;
