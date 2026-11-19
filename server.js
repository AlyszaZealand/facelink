const PORT = process.env.PORT || 3000;
const app = require('./src/app');

// Postman får 'Test'
app.get('/', (req, res) => {
    res.send('Test');
});

// listen(port, callback) er et funktionskald
// () betyder funktion uden parametre
app.listen(PORT, () => {
    console.log(`Serveren kører på http://localhost:${PORT}`)
});




