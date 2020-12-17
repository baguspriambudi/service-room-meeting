const User = require('./user');
const Booking = require('./booking');
const Room = require('./room');

User.hasMany(Booking);
Booking.belongsTo(User);

Room.hasMany(Booking);
Booking.belongsTo(Room);
