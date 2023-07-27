const express = require('express');
const router = express.Router();
const User = require('./models/User');

router.post('/change-password', async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);
    await user.changePassword(oldPassword, newPassword);
    res.send('Password changed successfully');
  } catch (err) {
    res.status(500).send('An error occurred while changing the password');
  }
});

router.post('/reset-password', async (req, res) => {
  try {
    const { newPassword } = req.body;
    const user = await User.findById(req.user.id);
    await user.setPassword(newPassword);
    await user.save();
    res.send('Password reset successfully');
  } catch (err) {
    res.status(500).send('An error occurred while resetting the password');
  }
});

module.exports = router;

