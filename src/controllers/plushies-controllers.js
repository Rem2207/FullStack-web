import Plushies from "../models/Plushies.js";

// Crear un peluche
export const createPlushie = async (req, res) => {
  const { type, image, description, colors } = req.body;

  try {

    const plushie = new Plushies({ type, image, description, colors });
    await plushie.save();
    res.status(201).send(plushie);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Obtener todos los peluches
export const getAllPlushies = async (req, res) => {
  try {
    const plushies = await Plushies.find();
    res.status(200).send(plushies);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Obtener un peluche por ID
export const getPlushieById = async (req, res) => {
  const { id } = req.params;
  try {
    const plushie = await Plushies.findById(id);
    if (!plushie) {
      return res.status(404).send();
    }
    res.status(200).send(plushie);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Actualizar un peluche por ID
export const updatePlushie = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const plushie = await Plushies.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });
    if (!plushie) {
      return res.status(404).send();
    }
    res.status(200).send(plushie);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Eliminar un peluche por ID
export const deletePlushie = async (req, res) => {
  const { id } = req.params;

  try {
    const plushie = await Plushies.findByIdAndDelete(id);
    if (!plushie) {
      return res.status(404).send();
    }
    res.status(200).send(plushie);
  } catch (error) {
    res.status(500).send(error);
  }
};
