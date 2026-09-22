const orderModel = require('../models/order.model');
const Product = require('../models/product.model');
const User = require('../models/user.model');

const getAdminStats = async (req, res) => {
  try {
    const totalOrders = await orderModel.countDocuments({});
    const totalProducts = await Product.countDocuments({});
    const totalUsers = await User.countDocuments({ role: 'user' });

    const orders = await orderModel.find({});
    const totalRevenue = orders.reduce((acc, item) => acc + item.totalAmount, 0);

    res.json({ totalOrders, totalProducts, totalUsers, totalRevenue });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAdminStats };