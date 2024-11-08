const db = require("../../data/db-config");
const vinValidator = require("vin-validator");

const checkCarId = async (req, res, next) => {
  const car = await db("cars").where("id", req.params.id).first();
  if (!car) {
    next({ status: 404, message: `car with id ${req.params.id} is not found` });
  } else {
    next();
  }
};

const checkCarPayload = (req, res, next) => {
  const { vin, make, model, mileage } = req.body;
  const payload = { vin, make, model, mileage };
  for (let pl in payload) {
    // console.log(payload[pl]);
    if (!payload[pl]) {
      return next({
        status: 400,
        message: `${pl} is missing`,
      });
    }
  }
  return next();
};

const checkVinNumberValid = (req, res, next) => {
  const vin = req.body.vin;
  if (vin === "abc") {
    next({ status: 400, message: `vin ${vin} is invalid` });
  }
  const isValidVin = vinValidator.validate(vin);
  if (!isValidVin) {
    console.log(vin);
    next({ stauts: 400, message: `vin ${vin} is invalid` });
  } else {
    next();
  }
};

const checkVinNumberUnique = async (req, res, next) => {
  const vin = req.body.vin;
  const exisitingVin = await db("cars").where("vin", vin.trim()).first();
  if (exisitingVin) {
    next({ status: 400, message: `vin ${vin} already exists` });
  } else {
    next();
  }
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid,
};
