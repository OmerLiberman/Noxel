const Payer = require("../../../models/clients/payer");

const getAll = async (request, response) => {
  let payers = null;
  try {
    payers = await Payer.find()
      .populate({ path: "classrooms", select: ["hebName", "code", "kids"] })
      .populate({
        path: "schools",
        select: ["hebName", "code"],
        populate: { path: "classrooms", select: ["hebName", "code", "kids"] },
      });
  } catch (err) {
    return response
      .status(500)
      .json({ message: "An error has been occurred." });
  }
  if (!payers) {
    return response.status(404).json({ message: "No payers are available." });
  }
  return response.status(200).json({ payers: payers });
};

const create = async (request, response) => {
  const values = request.body;
  const newPayer = new Payer({ ...values });

  try {
    await newPayer.save();
  } catch (err) {
    return response.status(500).json({ message: "Could not create payer." });
  }
  return response
    .status(201)
    .json({ payer: newPayer.toObject({ getters: true }) });
};

const update = async (request, response) => {
  const id = request.params.id;
  const values = request.body;

  let payer = null;
  try {
    payer = await Payer.findById(id);
  } catch (err) {
    return response
      .status(500)
      .json({ message: "An error has been occurred." });
  }
  if (!payer) {
    return response.status(404).json({ message: "Classroom was not found." });
  }

  for (const [key, value] of Object.entries(values)) {
    payer[key] = value;
  }

  try {
    await payer.save();
  } catch (err) {
    return console.log("Error was occurred.");
  }

  response.status(200).json({ payer: payer.toObject({ getters: true }) });
};

const remove = async (request, response) => {
  const id = request.params.id;

  let payer = null;
  try {
    payer = await Payer.findById(id);
  } catch (err) {
    return response
      .status(500)
      .json({ message: "An error has been occurred." });
  }
  if (!payer) {
    return response.status(404).json({ message: "Object was not found." });
  }

  try {
    await payer.delete();
  } catch (err) {
    return console.log("Error was occurred.");
  }

  response.status(200).json({ message: "Object was deleted successfully." });
};

exports.getAll = getAll;
exports.create = create;
exports.update = update;
exports.remove = remove;
