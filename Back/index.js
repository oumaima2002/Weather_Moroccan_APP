const express = require("express");
const axios = require("axios");
const path = require('path');
const bodyParser = require('body-parser'); // Add body-parser middleware
const port = 3000;
const app = express();

app.use(express.static(path.join(__dirname, '../Front')));
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

app.get("/", (req, res) => {
    const file = path.join(__dirname, '../Front/home.html');
    res.sendFile(file);
});

app.post("/", async (req, res) => {
    const value = req.body.name;

    // Define lat and long values based on the selected region
    var  lat, long;
    switch (value) {
        case "Tangier-Tetoun-AlHoceima":
            lat = "35.7796";
            long = "-5.8136";
            break;
        case "Oriental":
            lat = "34.6883";
            long = "-2.6319";
            break;
        case "Fez-Meknes":
            lat = "34.0333";
            long = "-5.0000";
            break;
        case "Rabat-Sale-Kenifra":
            lat = "34.0209";
            long = "-6.8410";
            break;
        case "Settat-Casablanca":
            lat = "33.5731";
            long = "-7.5898";
            break;
        case "Marrakeck-Safi":
            lat = "31.6295";
            long = "-7.9811";
            break;
        case "Daraa-Tafilalt":
            lat = "31.1554";
            long = "-4.2137";
            break;
        case "Souss-Massa":
            lat = "30.4278";
            long = "-9.5981";
            break;
        case "Guelmim-Oued":
            lat = "28.9864";
            long = "-10.0572";
            break;
        case "Laayoun-Sakia":
            lat = "27.1536";
            long = "-13.2033";
            break;
        case "Dakhla-Oued":
            lat = "23.6850";
            long = "-15.9577";
            break;
        default:
            lat = "";
            long = "";
            break;
             }
           
            
                try {
                    // Fetch weather data from the API using lat and long
                    const response = await axios.get(`http://www.7timer.info/bin/api.pl?lon=${long}&lat=${lat}&product=civil&output=json`);
                    const data = response.data.dataseries;
            
                    const current = data[0];
                    const weather = current.weather;
                    const temperature = current.temp2m;
            
                    const htmlResponse = `
                    <h4>Weather Information for ${value}</h4>
                    <div>
                        <p>Weather: ${weather}</p>
                        <p>Temperature: ${temperature}°C</p>
                    </div>
                `;
        
                // Send the HTML response back
                res.send(htmlResponse);
                } catch (err) {
                    console.error("API Fetch error:", err);
                    res.status(500).send("Error fetching weather data");
                }

          
        });

app.listen(port, () => {
    console.log(`Server is running on port:${port}`);
});
