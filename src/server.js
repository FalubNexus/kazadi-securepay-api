
require('dotenv').config();
const express = require('express');
const app = express();
const { PORT = 3000 } = process.env;

// Parser JSON
app.use(express.json());

// Routes
app.use('/api', require('./routes/userRoutes'));
app.use('/api', require('./routes/keyRoutes'));
app.use('/api', require('./routes/transactionRoutes'));
app.use('/api', require('./routes/bindingRoutes'));

app.listen(PORT, () => console.log(`API démarrée sur http://localhost:${PORT}`));