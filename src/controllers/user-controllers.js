import User from "../models/User.js";
import Plushies from "../models/Plushies.js";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
//import UserInterface from "../types/User.js";

export const getAllUsers = async (req, res, next) => {
  //aqui tenemos todos los usuarios
  try {
    const users = await User.find();

    //response
    return res.status(200).json({ message: "OK", users });
  } catch (error) {
    console.log(error);

    //response
    return res.status(400).json({ message: "Error", cause: error.message });
  }
};

export const userSignUp = async (req, res, next) => {
  try {
    const { name, email, image = null, password } = req.body;
    //verify if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(401).json({ error: "El usuario ya está registrado" });
    }

    const hashedPassword = await hash(password, 10);
    const user = new User({ name, email, image, password: hashedPassword });
    await user.save();

    //create cookie
    //createCookie(res, user, req);

    //reponse
    return res.status(200).json({
      message: "OK",
      name: user.name,
      email: user.email,
      image: user.image,
    });
  } catch (error) {
    console.log(error);
    //response
    return res.status(400).json({ message: "Error", cause: error.message });
  }
};

export const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).send("User not found");

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) return res.status(403).send("Incorrect password");

    //create cookie
    const accessToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.SECRET_KEY
    );
    res.json({ accessToken: accessToken, user });

    /*return res
            .status(200)
            .json({ message: "Welcome", name: user.name, email: user.email, image: user.image });*/
  } catch (error) {
    console.log(error);

    //response
    return res.status(400).json({ message: "Error", cause: error.message });
  }
};

export const verifyUser = async (req, res, next) => {
  try {
    //check if token is valid
    const user = await User.findById(res.locals.jwtData.id);
    if (!user)
      return res.status(401).send("User not found or Token malfuntioned");
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permission denied");
    }
    return res.status(200).json({
      message: "Welcome",
      name: user.name,
      email: user.email,
      image: user.image,
    });
  } catch (error) {
    console.log(error);

    //response
    return res.status(400).json({ message: "Error", cause: error.message });
  }
};

export const addCustomizedPlushies = async (req, res, next) => {
  const { id } = req.params;
  const { customized_plushies } = req.body;

  try {
    let user = await User.findById(id);
    if (!user) {
      return res.status(404).send();
    }
    if (customized_plushies) {
      await Plushies.findByIdAndUpdate(
        customized_plushies.plushies._id,
        { $inc: { count: 1 } },
        {
          new: true,
        }
      );

      user.customized_plushies.push(customized_plushies);
      await user.save();
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const deleteCustomizedPlushies = async (req, res, next) => {
  const { id } = req.params;
  const { customized_plushie_id } = req.body;

  try {
    let user = await User.findById(id);
    if (!user) {
      return res.status(404).send();
    }
    if (customized_plushie_id) {
      user.customized_plushies.pull(customized_plushie_id);
      await user.save();
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send("El usuario no existe");
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

