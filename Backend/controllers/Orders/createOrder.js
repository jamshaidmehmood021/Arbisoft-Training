const Order = require('../../models/Order');
const Gig = require('../../models/Gig');
const User = require('../../models/User');
const { Op } = require('sequelize');

const createOrder = async (req, res) => {
    try {
        const io = req.app.get('socketio');

        if (!io) {
            return res.status(500).json({ error: 'Socket.io is not initialized' });
        }

        const { gigId, buyerId, sellerId, deadline, amount } = req.body;

        const [buyer, seller] = await Promise.all([
            await User.findByPk(buyerId),
            await User.findByPk(sellerId)
        ]);

        if (!buyer) {
            return res.status(404).json({ message: 'Buyer not found.' });
        }

        if (!seller) {
            return res.status(404).json({ message: 'Seller not found.' });
        }

        const existingOrder = await Order.findOne({
            where: {
                gigId,
                buyerId,
                orderStatus: {
                    [Op.ne]: 'Completed', 
                }
            }
        });

        
        if (existingOrder) {
            return res.status(400).json({ message: 'You already have an active order on this gig.' });
        }

        const newOrder = await Order.create({
            gigId,
            buyerId,
            sellerId,
            deadline,
            amount,
            orderStatus: 'Pending',
        });

        if(newOrder) {
            io.to(sellerId).emit('newOrder', {
                newOrder
            });
        }

        return res.status(201).json(newOrder);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = createOrder;
