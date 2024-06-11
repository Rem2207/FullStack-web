import Accessories from "../models/Accessories.js";

// Crear un accesorio
export const createAccesory = async (req, res) => {
  const { name, image } = req.body;

  try {
    const newAccesory = await Accessories.create({ name, image });
    res.status(201).send(newAccesory);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Obtener todos los accesorios
export const getAllAccessories = async (req, res) => {
  try {
    const accessories = await Accessories.find();
    res.status(200).send(accessories);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Obtener un accesorio por ID
export const getAccesoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const accesory = await Accessories.findById(id);
    if (!accesory) {
      return res.status(404).send();
    }
    res.status(200).send(accesory);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Actualizar un accesorio por ID
export const updateAccesory = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const accesory = await Accessories.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });
    if (!accesory) {
      return res.status(404).send();
    }
    res.status(200).send(accesory);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Eliminar un accesorio por ID
export const deleteAccesory = async (req, res) => {
  const { id } = req.params;

  try {
    const accesory = await Accessories.findByIdAndDelete(id);
    if (!accesory) {
      return res.status(404).send();
    }
    res.status(200).send(accesory);
  } catch (error) {
    res.status(500).send(error);
  }
};
