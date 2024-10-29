import Codigo from "../models/Codigos.js";

export const generateCodes = async (req, res) => {
    try {
        const { codes } = req.body;
        await Codigo.deleteMany();
        const codigos = await Codigo.insertMany(codes);
        console.log("Codigos generados", codigos);
        res.status(201).json(codigos);

    } catch (error) {
        console.log("Error generateCodes()", error);
        res.status(500).json({ message: "Error en el servidor" });
    }
}

/* ******************************************************************************************** */
/* ******************************************************************************************** */

// FUNCIONES GET
export const getCodes = async (req, res) => {
    console.log("\n\ngetCodes()");
    try {
        const codigos = await Codigo.find()
            .select('code used isWinner');
            
        console.log("Codigos", codigos);
        res.status(200).json(codigos);
    } catch (error) {
        console.log("Error getCodes()", error);
        res.status(500).json({ message: "Error en el servidor" });
    }
}

export const getCodesByUsuario = async (req, res) => {
    console.log("\n\ngetCodesByUsuario()");
    try {
        const userId = req.params.userId;
        const codigosUser = await Codigo.find({user: userId})
            .select('code date isWinner');
        if(!codigosUser) {
            console.log("Usuario no encontrado");
            return res.status(404).json({message: "Usuario no encontrado"});
        }
        if(codigosUser.length === 0) {
            console.log("Usuario no tiene codigos");
            return res.status(200).json([]);
        }
        console.log("Codigos del usuario", codigosUser);
        res.status(200).json(codigosUser);
    } catch (error) {
        console.log("Error en getCodesByUsuario()", error);
        res.status(500).json({message: "Error en el servidor"});
    }
}

/* ******************************************************************************************** */
/* ******************************************************************************************** */

// FUNCIONES PUT
export const userRegisterCode = async (req, res) => {
    console.log("\n\nuserRegisterCode()");
    try {
        const { code } = req.body;
        const { userId } = req.params;
        const codigo = await Codigo.findOne({ code: code });
        if (!codigo) {
            return res.status(404).json({ message: "Código Inválido" });
        }
        if (codigo.used) {
            console.log("Codigo ya usado");
            return res.status(400).json({ message: "El código ya ha sido registrado" });
        }
        codigo.user = userId;
        codigo.used = true;
        codigo.date = new Date();
        await codigo.save();
        console.log("Codigo actualizado", codigo);
        return res.status(201).json(codigo);
    } catch (error) {
        console.log("Error userRegisterCode()", error);
        res.status(500).json({ message: "Error en el servidor" });
    }
}
