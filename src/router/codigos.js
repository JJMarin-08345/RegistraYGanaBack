import { Router } from 'express';
import { getCodes, getCodesByUsuario, userRegisterCode } from '../controllers/codigoController.js';

const routerCodigos = Router();

routerCodigos.get('/obtenerCodigos', getCodes);
routerCodigos.get('/obtenerCodigos/:userId', getCodesByUsuario);
routerCodigos.put('/registrarCodigo/:userId', userRegisterCode);

export default routerCodigos;