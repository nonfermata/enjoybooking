const express = require('express');
const User = require('../models/User');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const router = express.Router({ mergeParams: true });
const tokenService = require('../services/token.service');
const getServerError = require('../utils/getServerError');

function getErrors(req, res) {
    const errors = validationResult(req);
    return !errors.isEmpty()
        ? res.status(400).json({
              error: {
                  message: 'INVALID_DATA',
                  code: 400,
                  errors: errors.array()
              }
          })
        : false;
}

router.post('/signUp', [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Минимальная длина пароля – 8 символов').isLength({
        min: 8
    }),
    async (req, res) => {
        try {
            if (getErrors(req, res)) {
                return;
            }
            const { email, password } = req.body;
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({
                    error: {
                        message: 'EMAIL_EXISTS',
                        code: 400
                    }
                });
            }
            const hashedPassword = await bcrypt.hash(password, 12);
            const newUser = await User.create({
                ...req.body,
                password: hashedPassword
            });
            const tokens = tokenService.generate({ _id: newUser._id });
            await tokenService.save(newUser._id, tokens.refreshToken);
            res.status(201).send({ ...tokens, userId: newUser._id });
        } catch (e) {
            getServerError(res);
        }
    }
]);

router.post('/signInWithPassword', [
    check('email', 'Некорректный email').normalizeEmail().isEmail(),
    check('password', `Поле "Пароль" обязательно для заполнения`).exists(),
    async (req, res) => {
        try {
            if (getErrors(req, res)) {
                return;
            }
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({
                    error: {
                        message: 'EMAIL_NOT_FOUND',
                        code: 400
                    }
                });
            }
            const isPasswordsEqual = await bcrypt.compare(
                password,
                user.password
            );
            if (!isPasswordsEqual) {
                return res.status(400).json({
                    error: {
                        message: 'INVALID_PASSWORD',
                        code: 400
                    }
                });
            }
            const tokens = tokenService.generate({ _id: user._id });
            await tokenService.save(user._id, tokens.refreshToken);
            res.send({ ...tokens, userId: user._id });
        } catch (e) {
            getServerError(res);
        }
    }
]);

function isTokenInvalid(data, dbToken) {
    return !data || !dbToken || data._id !== dbToken?.user?.toString();
}

router.post('/token', async (req, res) => {
    try {
        const { refresh_token: refreshToken } = req.body;
        const data = tokenService.validateRefresh(refreshToken);
        const dbToken = await tokenService.findToken(refreshToken);

        if (isTokenInvalid(data, dbToken)) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const tokens = tokenService.generate({ _id: data._id });
        await tokenService.save(data._id, tokens.refreshToken);
        res.send({ ...tokens, userId: data._id });
    } catch (e) {
        getServerError(res);
    }
});

module.exports = router;
