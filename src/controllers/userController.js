import mongoose from "mongoose";
import DataUser from "../models/DataUser.js";
import User from "../models/User.js";
import CryptoJS from "crypto-js";
import { config } from "dotenv";
import { generateToken } from "../configs/authToken.js";
config();

export const newUser = async (req, res) => {
    console.log("\n\nnewUser()");
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { username, password, role } = req.body;
        const { fullName, document, phone } = req.body;
        const passCrypt = CryptoJS.AES.encrypt(password, process.env.PASS_CRYPT).toString();
        console.log(passCrypt)

        const newUser = new User({
            username: username,
            password: passCrypt,
            role: role ? role : "client",
        });

        await newUser.save({ session });
        console.log("Usuario creado", newUser);

        const newDataUser = new DataUser({
            user: newUser._id,
            fullName: fullName,
            document: document,
            phone: phone
        });

        await newDataUser.save({ session });
        console.log("Datos de usuario creados", newDataUser);

        await session.commitTransaction();
        session.endSession();

        return res.status(201).json(newDataUser);
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.log("Error en newUser()", error);

        if (error.code === 11000) {
            const message = error.keyValue.username ? "Correo ya registrado" : "Documento ya registrado";
            return res.status(400).json({ message: message });
        }

        return res.status(500).json({ message: "Error en el servidor" });
    }
};

export const login = async (req, res) => {
    console.log("\n\nlogin()");
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username: username });

        //Si el usuario no existe retornar un no encontrado
        if (!user) {
            console.log("Usuario no encontrado");
            return res.status(200).json({ message: "Usuario no encontrado" });
        }
        //Realizar la comparacion de contraseñas
        const isPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_CRYPT).toString(CryptoJS.enc.Utf8);
        //Si la contraseña no coincide retornar un no encontrado
        if (isPassword !== password) {
            return res.status(200).json({ message: "Usuario no encontrado" });
        }

        console.log("Usuario logueado", user);
        const dataUser = await DataUser.findOne({ user: user._id })
            .populate('user', 'username role');
        console.log("Datos de usuario", dataUser);
        const dataToken = {
            _id: dataUser._id,
            fullName: dataUser.fullName,
            role: dataUser.user.role,
        }
        const token = generateToken(dataToken);
        return res.status(201).json({ token: token });

    } catch (error) {
        console.log("Error en login()", error);
        return res.status(500).json({ message: "Error en el servidor" });
    }
}

/* METODOS GET */
export const getUsers = async (req, res) => {
    console.log("\n\ngetUser()");
    try{
        const users = await DataUser.find();
        console.log("Usuarios", users);
        return res.status(200).json(users);
    }catch(error){
        console.log("Error en login()", error);
        return res.status(500).json({ message: "Error en el servidor" });       
    }
}