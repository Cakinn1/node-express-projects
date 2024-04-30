let { people } = require("../data");

const getPeople = (req, res) => {
  return res.status(200).json({ success: true, data: people });
};

const createPerson = (req, res) => {
  const { name } = req.body;
  console.log(name)

  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: "Please provide name value" });
  }
  return res.status(200).json({ success: true, person: name });
};

const createPersonPostman = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({ sucess: false, msg: "Please provide name value" });
  }
  return res
    .status(200)
    .json({ success: true, data: [...people, { name: name, id: 6 }] });
};

const updatePerson = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const person = people.find((person) => person.id === Number(id));
  console.log(person);

  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: `No people with id: ${id}` });
  }
  const newPeople = people.map((person) => {
    if (person.id === Number(id)) {
      person.name = name;
    }
    return person;
  });
  return res.status(200).json({ success: true, data: newPeople });
};

const deletePerson = (req, res) => {
  const { id } = req.params;

  const person = people.find((person) => person.id === parseInt(id));

  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: `That id does not exist ${id}` });
  }

  const newPeople = people.filter((person) => {
    return person.id !== parseInt(id);
  });

  return res.status(200).json({ success: true, data: newPeople });
};

module.exports = {
  getPeople,
  createPerson,
  createPersonPostman,
  deletePerson,
  updatePerson,
};
