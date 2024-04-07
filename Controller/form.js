const asyncHandler = require("express-async-handler");
const Question = require('../Model/Question');

const { green } = require('colors');
const redis = require('redis');

const client = redis.createClient({
  password: process.env.password,
  socket: {
    host: process.env.host,
    port: 11031
  }
});

client.on('ready', () => {
  console.log('redis is connected'.green);
});

client.on('error', (err) => {
  console.log('redis is disconnected: ', err);
});

(async () => {
  try {
    await client.connect();
  } catch (error) {
    console.error('error while connecting redis', error);
  }
})();



const questioncontroller = asyncHandler(async (req, res) => {
  const { name, email, question } = req.body;
  if (!name || !email || !question) {
    res.status(400);
    throw new Error("Please fill all the Reqd Details")
  }
  const reqd_details = await Question.create({
    name,
    question,
    email
  })
  if (reqd_details) {
    res.status(201).json({
      _id: reqd_details._id,
      name: reqd_details.name,
      email: reqd_details.email,
      message: reqd_details.question
    });
    console.log(reqd_details);
  } else {
    res.status(400);
    throw new Error("Failed to Create the Data Entry !!! Try Again ");
  }
});




const fetchallquestion = asyncHandler(async (req, res) => {
  const quesioncached = await client.get('questionscached');
  if (quesioncached) {
    return res.status(202).send(JSON.parse(quesioncached)); 
  }

  const allquestion = await Question.find({}).sort({ timestamp: -1 });
  await client.set('questionscached', JSON.stringify(allquestion), 'EX', 60);
  // client.expire('questionscached', 60);
  res.status(201).send(allquestion);
});


// we could refer https://medium.com/@sappaljagjeet/redis-driven-performance-boost-optimizing-node-js-for-lightning-fast-apis-3186bde5eaf6
// for db visit here 


module.exports = { questioncontroller, fetchallquestion };