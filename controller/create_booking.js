const nodemailer = require('nodemailer');
const Booking = require('../models/booking');
const Room = require('../models/room');
const User = require('../models/user');
const { httpOkResponse, httpNotFound, httpAuthenticationFailed } = require('../helper/http_respone');

const transporter = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: 'c9e816ffb3098f',
    pass: '008256610cee80',
  },
});

exports.bookingCreate = async (req, res, next) => {
  try {
    // get email user from token
    const findEmail = await User.findByPk(req.user.id);
    const mailOptions = {
      from: 'baguspriambudi@gmail.com',
      to: findEmail.email,
      subject: 'testing',
      text: 'success',
    };
    const { room, time, noted } = req.body;
    const findRoom = await Room.findByPk(room);
    if (!findRoom) {
      return httpNotFound(res, 'room not found');
    }
    if (findRoom.capacity === 0) {
      return httpAuthenticationFailed(res, 'room capacity full');
    }
    const create = await Booking.create({
      user_id: req.user.id,
      room_id: room,
      booking_time: time,
      noted,
    });
    if (create) {
      await Room.update({ capacity: findRoom.capacity - 1 }, { where: { id: room } });
      await transporter.sendMail(mailOptions);
      //   await Booking.update({ total_person: create.total_person + 1 }, { where: { id: create.id } });
    }
    httpOkResponse(res, 'success, please check your email', create);
  } catch (error) {
    next(error);
  }
};
