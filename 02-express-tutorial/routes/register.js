const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  const { name, id, cool } = req.body;
  console.log(name, id, cool);

  if (!name || !id || !cool) {
    return res.status(404).json({ success: false, data: [] });
  }

  return res.status(200).json({
    success: true,
    data: [{ name: name, id: id, cool: cool }],
  });
});

module.exports = router;
