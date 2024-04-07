const express = require("express");
const { questioncontroller, fetchallquestion} = require("../../Controller/form");
const router = express.Router();

router.get('/', (req, res) => {
  res.send("working route");
});
router.post('/Question', questioncontroller);
router.get('/getallquestion',fetchallquestion);

module.exports = router;
