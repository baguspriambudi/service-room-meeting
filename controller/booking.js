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
    if (findRoom === null) {
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

exports.checkIn = async (req, res, next) => {
  try {
    const { room } = req.body;
    const booking = await Booking.findOne({ where: { roomId: room } });
    if (booking === null && booking.userId === req.user.id) {
      return httpNotFound(res, `can't check in, booking not found`);
    }
    const date = new Date();
    const getTimeNow = new Date(date.setHours(7, 0, 0, 0)).getTime();
    const getTimeBooking = new Date(booking.booking_time).getTime();
    if (getTimeNow !== getTimeBooking) {
      return httpAuthenticationFailed(res, `can't check in, please check check_in_time`);
    }
    const checkIn = await Booking.update({ check_in_time: date }, { where: { roomId: room } });
    // get email user from token
    const findEmail = await User.findByPk(req.user.id);
    const mailOptions = {
      from: 'baguspriambudi@gmail.com',
      to: findEmail.email,
      subject: 'testing',
      text: 'now you checkIn',
    };
    if (checkIn) {
      await transporter.sendMail(mailOptions);
    }
    res.status(200).json({
      status: 200,
      message: 'success checkIn, please check your email',
    });
  } catch (error) {
    next(error);
  }
};

exports.checkOut = async (req, res, next) => {
  try {
    const { room } = req.body;
    const booking = await Booking.findOne({ where: { roomId: room } });
    if (booking === null && booking.userId === req.user.id) {
      return httpNotFound(res, `can't check in, booking not found`);
    }
    if (booking.check_in_time === null) {
      return httpAuthenticationFailed(res, 'please checkIn');
    }
    const date = new Date();
    await Promise.all([
      [
        Booking.update({ check_out_time: date }, { where: { roomId: room } }),
        Room.update({ status: 'available' }, { where: { id: room } }),
      ],
    ]);
    res.status(200).json({
      status: 200,
      message: 'success checkOut',
    });
  } catch (error) {
    next(error);
  }
};
