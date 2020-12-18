const cron = require('node-cron');
const nodemailer = require('nodemailer');
const Booking = require('../models/booking');
const User = require('../models/user');

const transporter = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: 'c9e816ffb3098f',
    pass: '008256610cee80',
  },
});

const date = new Date();
const getTimeNow = new Date(date.setHours(7, 0, 0, 0)).getTime();
// function get data date
async function getData() {
  console.log('-----');
  const result = await Booking.findAll({
    include: [
      {
        model: User,
        as: 'User',
      },
    ],
  });
  // eslint-disable-next-line array-callback-return
  result.map(async (val) => {
    const mailOptions = {
      from: 'baguspriambudi@gmail.com',
      to: val.User.email,
      subject: 'testing',
      text: 'please checkIn now',
    };
    const dataDate = new Date(val.booking_time).getTime();
    if (dataDate === getTimeNow) {
      await transporter.sendMail(mailOptions);
    }
  });
}
// running function every 15  minute
cron.schedule('*/15 * * * *', () => {
  getData();
});
