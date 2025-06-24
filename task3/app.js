const express = require('express');
const methodOverride = require('method-override');
const app = express();
const vehicles = require('./data');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

// Home - Show all vehicles
app.get('/', (req, res) => {
  res.render('index', { vehicles });
});

// Create - Add a vehicle
app.post('/vehicles', (req, res) => {
  const { vehicleName, price, image, desc, brand } = req.body;
  const id = vehicles.length ? vehicles[vehicles.length - 1].id + 1 : 1;
  vehicles.push({ id, vehicleName, price, image, desc, brand });
  res.redirect('/');
});

// Read - Get one vehicle as JSON
app.get('/vehicles/:id', (req, res) => {
  const vehicle = vehicles.find(v => v.id === parseInt(req.params.id));
  if (!vehicle) return res.status(404).send('Vehicle not found');
  res.json(vehicle);
});

// Update - Edit a vehicle (Optional, JSON response)
app.put('/vehicles/:id', (req, res) => {
  const vehicle = vehicles.find(v => v.id === parseInt(req.params.id));
  if (!vehicle) return res.status(404).send('Vehicle not found');
  Object.assign(vehicle, req.body);
  res.json(vehicle);
});

// Delete - Remove a vehicle
app.delete('/vehicles/:id', (req, res) => {
  const index = vehicles.findIndex(v => v.id === parseInt(req.params.id));
  if (index !== -1) vehicles.splice(index, 1);
  res.redirect('/');
});

app.listen(3000, () => console.log('Server running on port 3000'));
