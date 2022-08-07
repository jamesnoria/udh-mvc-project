import User from '../models/userModel.js';
import CatchAsync from '../utils/catchAsync.js';

export const getAllUsers = CatchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users
    }
  });
});
