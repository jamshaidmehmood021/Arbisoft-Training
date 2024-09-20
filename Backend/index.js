const express = require('express');
const authRoutes = require('./routes/auth/auth');
const http = require('http');
const { Server } = require('socket.io');
require('./configs/passport');
const { sequelize } = require('./lib/sequelize');
const cors = require('cors')


const app = express();

const server = http.createServer(app); 
const io = new Server(server, {
    cors: {
        origin: '*', 
        methods: ["GET", "POST"]
    }
});

app.set('socketio', io);
app.use(cors())
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' })); 
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use('/', authRoutes);

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('joinRoom', (conversationId) => {
        socket.join(conversationId);
        console.log(`User joined room: ${conversationId}`);
    });
    
    socket.on('sendMessage', ({ conversationId, ...messageData }) => {
        io.to(conversationId).emit('receiveMessage', messageData);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});


server.listen(PORT, async () => {
    console.log(`Server started on http://localhost:${PORT}`);
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
        await sequelize.sync({ alter: true });
        console.log('Models have been synchronized!');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});
