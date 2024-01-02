const express = require("express");
const app = express();

const data = [
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
  return response.send(data);
});

app.get("/info", (request, response) => {
  console.log(request)
  console.log(request.data)
  const strResponse = `Phonebook has info for ${data.length} people
  <br/>
  ${Date().toLocaleString()}`
  return response.send(strResponse)
})

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
