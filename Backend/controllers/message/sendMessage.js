const Conversation = require('../../models/Conversation');
const Message = require('../../models/Messages');
const { Op } = require('sequelize');

async function getOrCreateConversation(gigId, buyerId, sellerId) {
    let conversation = await Conversation.findOne({
        where: {
            gigId,
            [Op.or]: [
                { buyerId, sellerId },  
                { buyerId: sellerId, sellerId: buyerId }  
            ]
        }
    });

    if (!conversation) {
        conversation = await Conversation.create({ gigId, buyerId, sellerId });
    }

    return conversation;
}

async function sendMessage(req, res) {
    const { gigId, buyerId, sellerId, content, userID } = req.body;

    try {
        const conversation = await getOrCreateConversation(gigId, buyerId, sellerId);
        const message = await Message.create({
            conversationId: conversation.id,
            senderId: userID,  
            content,  
        });

        const io = req.app.get('socketio'); 
        if (!io) {
            return res.status(500).json({ error: 'Socket.io is not initialized' });
        }

        io.to(conversation.id).emit('receiveMessage', {
            conversationId: conversation.id,
            senderId: userID,
            content,
            createdAt: message.dataValues.createdAt,
            messageId: message.dataValues.id,
        });

        res.status(201).json({
            message: 'Message sent successfully',
            data: message 
        });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ error: 'Error sending message' });
    }
}


module.exports = sendMessage;
