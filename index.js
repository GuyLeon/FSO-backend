const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(express.json());

// Create a token used to log request body - assuming it's json)
morgan.token("data", function (req, res) {
  return JSON.stringify(req.body);
});
// Use this token to add the request body at the end of the log
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :data")
);

let data = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (request, response) => {
  return response.json(data);
});

let checkErrors = (newPerson) => {
  let errors = [];
  if (!newPerson.name) {
    errors.push(" Name is missing");
  }
  if (!newPerson.number) {
    errors.push("Number is missing");
  }
  if (data.map((x) => x.name).includes(newPerson.name)) {
    errors.push("The name already exists");
  }
  return errors;
};

app.post("/api/persons", (request, response) => {
  const newPerson = { ...request.body, id: Math.floor(Math.random() * 100000) };

  let errors = checkErrors(newPerson);
  if (errors.length !== 0)
    return response
      .status(400)
      .json({ error: errors.length === 1 ? errors[0] : errors });

  data.push(newPerson);
  return response.json({ newPerson });
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  data = data.filter((elem) => elem.id !== id);
  return response.status(204).end();
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  let requestedPerson = data.find((p) => p.id === Number(id));
  return requestedPerson
    ? response.json(requestedPerson)
    : response.status(404).end();
});

app.get("/info", (request, response) => {
  const strResponse = `Phonebook has info for ${data.length} people
  <br/>
  ${Date().toLocaleString()}`;
  return response.send(strResponse);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
