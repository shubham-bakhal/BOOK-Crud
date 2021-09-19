const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log(`Server is connected to db`))
  .catch(err => console.log(err.message));

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose connection is disconnected');
});

process.on('SIGNINT', async () => {
  await mongoose.connection.close();
  process.exit(0);
});
