const Property = require('../models/Property');

exports.createProperty = async (req, res) => {
  try {
    const { title, description, location, price, bedrooms, bathrooms, features, images } = req.body;
    const newProperty = new Property({
      title,
      description,
      location,
      price,
      bedrooms,
      bathrooms,
      features,
      images,
      owner: req.user.id
    });

    const property = await newProperty.save();
    res.json(property);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getProperties = async (req, res) => {
  try {
    const properties = await Property.find().populate('owner', 'name email');
    res.json(properties);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate('owner', 'name email');
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.json(property);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.updateProperty = async (req, res) => {
  try {
    const { title, description, location, price, bedrooms, bathrooms, features, images } = req.body;
    let property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    if (property.owner.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    property = await Property.findByIdAndUpdate(req.params.id, 
      { title, description, location, price, bedrooms, bathrooms, features, images },
      { new: true }
    );

    res.json(property);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    if (property.owner.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await property.remove();
    res.json({ message: 'Property removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};