// middleware/passengerValidator.js

module.exports = function validatePassengers(req, res, next) {
  const { adults, children, infants } = req.body;

  const a = Number(adults);
  const c = Number(children);
  const i = Number(infants);

  if (isNaN(a) || isNaN(c) || isNaN(i)) {
    return res.status(400).json({
      message: "Passenger counts must be numeric values"
    });
  }

  // RULE 1 – At least 1 adult required
  if (a < 1) {
    return res.status(400).json({
      message: "At least one adult passenger is required"
    });
  }

  // RULE 2 – Total passengers limit (usually 9)
  if (a + c + i > 9) {
    return res.status(400).json({
      message: "Total passengers cannot exceed 9 per booking"
    });
  }

  // RULE 3 – Infants cannot exceed adults
  if (i > a) {
    return res.status(400).json({
      message: "Number of infants cannot exceed number of adults"
    });
  }

  // Store sanitized values for later use
  req.body.adults = a;
  req.body.children = c;
  req.body.infants = i;

  next();
};
