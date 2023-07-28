// index.js
const express = require('express');
const app = express();
const port = 3000;



// Middleware to parse incoming JSON data
app.use(express.json());

const clientsRoutes = require('./routes/clientsRoutes');
const usersRoutes = require('./routes/usersRoutes');
const fournisseurRoutes = require('./routes/fournisseurRoutes');
const articleRoutes = require('./routes/articleRoutes');
const devisRoutes = require('./routes/devisRoutes');
const ligneRoutes = require('./routes/ligneRoutes');
const loginRoutes = require('./routes/loginRoutes');
// Use the route handlers as middleware
app.use('/clients', clientsRoutes);
app.use('/users', usersRoutes);
app.use('/fournisseur', fournisseurRoutes);
app.use('/articles', articleRoutes); 
app.use('/devis', devisRoutes); 
app.use('/ligne', ligneRoutes);
app.use('/login', loginRoutes);

// ...

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
