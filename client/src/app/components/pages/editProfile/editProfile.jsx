import React, { useState, useEffect } from 'react';
import classes from './editProfile.module.css';
import Button from '../../common/button';
import TextField from '../../common/form/textField';
import validator from '../../../utils/validator';
import RadioField from '../../common/form/radioField';
import { useAuth } from '../../../hooks/useAuth';
import { useHistory } from 'react-router-dom';
import SpaceDiv from '../../common/spaceDiv';
import SelectAvatar from '../../common/form/selectAvatar';
import { toast } from 'react-toastify';

const EditProfile = () => {
    const { currentUser, updateUserData, getAllUsers } = useAuth();
    const [usersEmails, setUsersEmails] = useState();
    const [isChanged, setIsChanged] = useState(false);
    const history = useHistory();
    const [data, setData] = useState(currentUser);
    const [errors, setErrors] = useState({});

    const handleChangeData = (name, value) => {
        setData((prevState) => ({
            ...prevState,
            [name]: value
        }));
        if (!isChanged) {
            setIsChanged(true);
        }
    };

    const validatorConfig = {
        name: {
            isRequired: {
                message: 'Имя обязательно для заполнения'
            }
        },
        email: {
            isRequired: {
                message: 'E-mail обязателен для заполнения'
            },
            isEmail: {
                message: 'Некорректный e-mail'
            }
        }
    };

    useEffect(() => {
        validate();
    }, [data]);

    useEffect(() => {
        getAllUsers().then((result) =>
            setUsersEmails(result.map((item) => item.email))
        );
    }, []);

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    function isEmailExist(email) {
        return usersEmails.some(
            (item) => item === email && item !== currentUser.email
        );
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        if (!validate()) return;
        if (isEmailExist(data.email)) {
            setErrors({ email: 'Пользователь с таким e-mail уже существует!' });
            return;
        }
        try {
            await updateUserData(data);
            toast.success('Вы успешно изменили данные профиля 👌', {
                position: 'top-right'
            });
            history.goBack();
        } catch (e) {
            setErrors(e);
        }
    };

    const handleBack = (event) => {
        event.preventDefault();
        history.goBack();
    };

    return (
        <form onSubmit={onSubmit}>
            <div className={classes.formContainer}>
                <p className={classes.title}>Редактировать профиль</p>
                <TextField
                    name='name'
                    value={data.name}
                    onChange={handleChangeData}
                    error={errors.name}
                    placeholder='Ваше имя'
                />
                <TextField
                    name='email'
                    value={data.email}
                    onChange={handleChangeData}
                    error={errors.email}
                    placeholder='Ваш e-mail'
                />
                <RadioField
                    label='Ваш пол'
                    options={[
                        { name: 'Мужской', value: 'male' },
                        { name: 'Женский', value: 'female' }
                    ]}
                    name='sex'
                    value={data.sex}
                    onChange={handleChangeData}
                />
                <SelectAvatar
                    name='image'
                    value={data.image}
                    onChange={handleChangeData}
                />
                <Button color='blue' disabled={!isValid || !isChanged}>
                    Подтвердить
                </Button>
                <SpaceDiv height='30' />
                <Button color='grey' onClick={handleBack}>
                    Назад
                </Button>
            </div>
        </form>
    );
};

export default EditProfile;
