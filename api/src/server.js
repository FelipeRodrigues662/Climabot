const express = require('express');
const cors = require('cors');
const chatRoutes = require('./routes/chat.js');
const metricsRoute = require('./routes/metrics');
const { requestLogger, monitorRequests } = require('./middleware/observability');

const app = express();  

app.use(cors());
app.use(express.json());

app.use(requestLogger);
app.use(monitorRequests);

app.use('/chat', chatRoutes);
app.use('/metrics', metricsRoute);

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running: ${PORT}`));