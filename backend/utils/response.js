const response = (res, status, success, data) => {
  return res.status(status).json({ success, data });
};

module.exports = response;
