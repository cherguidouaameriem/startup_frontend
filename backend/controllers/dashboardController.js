const Order = require('../models/Order');

// GET /dashboard/stats
const getStats = async (req, res) => {
  try {
    const userId = req.user._id;
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    // Total orders this month
    const totalOrdersThisMonth = await Order.countDocuments({
      userId,
      createdAt: { $gte: startOfMonth },
    });

    // Confirmed orders this month
    const confirmedOrdersThisMonth = await Order.countDocuments({
      userId,
      status: { $in: ['Ready', 'Delivered'] },
      createdAt: { $gte: startOfMonth },
    });

    // Pending orders
    const pendingOrders = await Order.countDocuments({
      userId,
      status: { $in: ['Received', 'In Preparation'] },
    });

    // Revenue from delivered orders this month
    const revenueResult = await Order.aggregate([
      {
        $match: {
          userId,
          status: 'Delivered',
          createdAt: { $gte: startOfMonth },
        },
      },
      { $group: { _id: null, total: { $sum: '$price' } } },
    ]);
    const revenue = revenueResult.length > 0 ? revenueResult[0].total : 0;

    // Orders today
    const ordersToday = await Order.countDocuments({
      userId,
      createdAt: { $gte: startOfToday },
    });

    res.json({
      totalOrdersThisMonth,
      confirmedOrdersThisMonth,
      pendingOrders,
      revenue,
      ordersToday,
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors du chargement des statistiques.', error: error.message });
  }
};

// GET /dashboard/chart?period=week|month
const getChartData = async (req, res) => {
  try {
    const userId = req.user._id;
    const { period = 'week' } = req.query;

    const now = new Date();
    let startDate;
    let groupFormat;

    if (period === 'month') {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      groupFormat = { $dayOfMonth: '$createdAt' };
    } else {
      // Last 7 days
      startDate = new Date(now);
      startDate.setDate(now.getDate() - 6);
      startDate.setHours(0, 0, 0, 0);
      groupFormat = { $dayOfWeek: '$createdAt' };
    }

    const data = await Order.aggregate([
      {
        $match: {
          userId,
          createdAt: { $gte: startDate },
        },
      },
      {
        $group: {
          _id: groupFormat,
          count: { $sum: 1 },
          revenue: { $sum: '$price' },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json({ data, period });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors du chargement des données.', error: error.message });
  }
};

module.exports = { getStats, getChartData };
