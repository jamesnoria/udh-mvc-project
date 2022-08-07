import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import CatchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';

export const signup = CatchAsync(async (req, res, next) => {
  const { name, lastName, email, password, passwordConfirm } = req.body;

  const newUser = await User.create({
    name,
    lastName,
    email,
    password,
    passwordConfirm
  });

  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser
    }
  });
});

export const login = CatchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Por favor ingrese un usuario y contraseña', 400));
  }

  const user = await User.findOne({ email }).select('+password');

  const token = '';
  res.status(200).json({
    status: 'success',
    token
  });
});
