const express = require('express')
const BlueLinky = require("bluelinky");

const app = express()
app.use(express.json())

// Setup port
const PORT = process.env.PORT || 3222

app.listen(PORT, () => {
    console.log("Server listening on PORT:", PORT)
})

// API request to lock car
app.get('/lock', async (request, response) => {
    try {
      var headers = request.headers;
      const client = new BlueLinky({
        username: headers['username'],
        password: headers['password'],
        region: headers['region'],
        pin: headers['pin'],
      });

      // Ensure the client is ready before using it
      await client.on('ready', async () => {
        const vehicle = client.getVehicle("KMHLM4AJ8NU031640");
        const lockResponse = await vehicle.lock();
        response.send(lockResponse);
      });
    } catch (error) {
      // Log and handle errors
      console.error('Error:', error);
      response.status(500).send(error);
    }
  });
  

// API request to unlock car
app.get('/unlock', async (request, response) => {
    try {
      var headers = request.headers;
      const client = new BlueLinky({
        username: headers['username'],
        password: headers['password'],
        region: headers['region'],
        pin: headers['pin'],
      });
  
      // Ensure the client is ready before using it
      await client.on('ready', async () => {
        const vehicle = client.getVehicle("KMHLM4AJ8NU031640");
        const lockResponse = await vehicle.unlock();
        response.send(lockResponse);
      });
    } catch (error) {
      // Log and handle errors
      console.error('Error:', error);
      response.status(500).send("Error occurred while unlocking the vehicle.");
    }
  });

// API request to see how much gas is in my car
app.get('/gas', async (request, response) => {
    try {
      var headers = request.headers;
      const client = new BlueLinky({
        username: headers['username'],
        password: headers['password'],
        region: headers['region'],
        pin: headers['pin'],
      });
  
      // Ensure the client is ready before using it
      await client.on('ready', async () => {
        const vehicle = client.getVehicle("KMHLM4AJ8NU031640");
        const status = await vehicle.status();
        const fuelResponse = 'You car\'s fuel tank is ' + status.fuelLevel + ' percent full.';
        response.send(fuelResponse);
      });
    } catch (error) {
      // Log and handle errors
      console.error('Error:', error);
      response.status(500).send("Error occurred while getting your vehicle's info.");
    }
  });

// Get my car's location
app.get('/location', async (request, response) => {
    try {
      var headers = request.headers;
      const client = new BlueLinky({
        username: headers['username'],
        password: headers['password'],
        region: headers['region'],
        pin: headers['pin'],
      });
  
      // Ensure the client is ready before using it
      await client.on('ready', async () => {
        const vehicle = client.getVehicle("KMHLM4AJ8NU031640");
        const status = await vehicle.status();
        var location = status.vehicleLocation.coord
        var ret = 'Your car\'s latitude is: ' + location.lat + ', longitude: ' + location.lon + ', and altitude: ' + location.alt + ' meters.'
        response.send(ret);
      });
    } catch (error) {
      // Log and handle errors
      console.error('Error:', error);
      response.status(500).send("Error occurred while getting your vehicle's info.");
    }
  });

  // API call to warm up the car
  app.get('/warmup', async (request, response) => {
    try {
      var headers = request.headers;
      const client = new BlueLinky({
        username: headers['username'],
        password: headers['password'],
        region: headers['region'],
        pin: headers['pin'],
      });
  
      // Ensure the client is ready before using it
      await client.on('ready', async () => {
        const vehicle = client.getVehicle("KMHLM4AJ8NU031640");
        const feedback = await vehicle.start({
            airCtrl: false,
            igniOnDuration: 10,
            airTempvalue: 72,
            defrost: true,
            heating1: true,
          });
        response.send(feedback);
      });
    } catch (error) {
      // Log and handle errors
      console.error('Error:', error);
      response.status(500).send("Error occurred while starting your vehicle.");
    }
  });

  // API call to cool down the car
  app.get('/coolDown', async (request, response) => {
    try {
      var headers = request.headers;
      const client = new BlueLinky({
        username: headers['username'],
        password: headers['password'],
        region: headers['region'],
        pin: headers['pin'],
      });
  
      // Ensure the client is ready before using it
      await client.on('ready', async () => {
        const vehicle = client.getVehicle("KMHLM4AJ8NU031640");
        const feedback = await vehicle.start({
            airCtrl: true,
            igniOnDuration: 10,
            airTempvalue: 60,
            defrost: false,
            heating1: false,
          });
        response.send(feedback);
      });
    } catch (error) {
      // Log and handle errors
      console.error('Error:', error);
      response.status(500).send("Error occurred while starting your vehicle.");
    }
  });


// API call to stop the car
app.get('/stop', async (request, response) => {
    try {
      var headers = request.headers;
      const client = new BlueLinky({
        username: headers['username'],
        password: headers['password'],
        region: headers['region'],
        pin: headers['pin'],
      });
  
      // Ensure the client is ready before using it
      await client.on('ready', async () => {
        const vehicle = client.getVehicle("KMHLM4AJ8NU031640");
        const feedback = await vehicle.stop();
        response.send(feedback);
      });
    } catch (error) {
      // Log and handle errors
      console.error('Error:', error);
      response.status(500).send("Error occurred while stopping your vehicle.");
    }
  });

// Debug API request
app.get('/status', (request, response)=>{


    response.send('complete')
})



module.exports = app