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
    const { room, total, time, noted } = req.body;
    const formatDate = new Date(time).toISOString();
    // get email user from token
    const findEmail = await User.findByPk(req.user.id);
    const mailOptions = {
      from: 'baguspriambudi@gmail.com',
      to: findEmail.email,
      subject: 'testing',
      text: 'success',
    };
    const findRoom = await Room.findByPk(room);
    if (!findRoom) {
      return httpNotFound(res, 'room not found');
    }
    if (findRoom.status === 'not available') {
      return httpAuthenticationFailed(res, 'room not available');
    }
    const capacity = findRoom.capacity >= total;
    if (capacity === false) {
      return httpAuthenticationFailed(res, 'room over capacity');
    }
    const create = await Booking.create({
      userId: req.user.id,
      roomId: room,
      total_person: total,
      booking_time: formatDate,
      noted,
    });
    if (create) {
      await Room.update({ status: 'not available' }, { where: { id: room } });
      await transporter.sendMail(mailOptions);
    }
    httpOkResponse(res, 'success, please check your email', create);
  } catch (error) {
    next(error);
  }
};

// exports.checkIn = async (req, res, next) => {
//   try {
//   } catch (error) {
//     next(error);
//   }
// };
