const Booking = require('../models/booking');
const Room = require('../models/room');
const { httpOkResponse, httpNotFound, httpAuthenticationFailed } = require('../helper/http_respone');

exports.bookingCreate = async (req, res, next) => {
  try {
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
    console.log(create.id);
    if (create) {
      await Room.update({ capacity: findRoom.capacity - 1 }, { where: { id: room } });
      //   await Booking.update({ total_person: create.total_person + 1 }, { where: { id: create.id } });
    }
    httpOkResponse(res, 'success', create);
  } catch (error) {
    next(error);
  }
};
