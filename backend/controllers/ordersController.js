const Order = require('../models/Order');

// GET /orders
const getOrders = async (req, res) => {
  try {
    const userId = req.user._id;
    const {
      page = 1,
      limit = 10,
      status,
      startDate,
      endDate,
      search,
    } = req.query;

    const filter = { userId };

    if (status && status !== 'all') {
      filter.status = status;
    }
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        filter.createdAt.$lte = end;
      }
    }
    if (search) {
      filter.$or = [
        { clientName: { $regex: search, $options: 'i' } },
        { cakeType: { $regex: search, $options: 'i' } },
      ];
    }

    const total = await Order.countDocuments(filter);
    const orders = await Order.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json({
      orders,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors du chargement des commandes.', error: error.message });
  }
};

// GET /orders/:id
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, userId: req.user._id });
    if (!order) return res.status(404).json({ message: 'Commande introuvable.' });
    res.json({ order });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};

// POST /orders
const createOrder = async (req, res) => {
  try {
    const { clientName, clientPhone, cakeType, description, layers, price, deliveryDate, notes } = req.body;

    if (!clientName || !cakeType || price === undefined) {
      return res.status(400).json({ message: 'Nom client, type de gâteau et prix sont requis.' });
    }

    const order = await Order.create({
      userId: req.user._id,
      clientName,
      clientPhone,
      cakeType,
      description,
      layers,
      price,
      deliveryDate,
      notes,
    });

    res.status(201).json({ message: 'Commande créée avec succès.', order });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création.', error: error.message });
  }
};

// PATCH /orders/:id
const updateOrder = async (req, res) => {
  try {
    const allowedFields = ['clientName', 'clientPhone', 'cakeType', 'description', 'layers', 'price', 'status', 'deliveryDate', 'notes'];
    const updates = {};
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    });

    const order = await Order.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      updates,
      { new: true, runValidators: true }
    );

    if (!order) return res.status(404).json({ message: 'Commande introuvable.' });
    res.json({ message: 'Commande mise à jour.', order });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour.', error: error.message });
  }
};

// DELETE /orders/:id
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!order) return res.status(404).json({ message: 'Commande introuvable.' });
    res.json({ message: 'Commande supprimée.' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression.', error: error.message });
  }
};

module.exports = { getOrders, getOrderById, createOrder, updateOrder, deleteOrder };
