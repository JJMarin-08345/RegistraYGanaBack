import { Router } from 'express';
import { getUsers, login, newUser } from '../controllers/userController.js';
const routerUsuarios = Router();

routerUsuarios.get('/getUsuarios', getUsers);
routerUsuarios.post('/login', login);
routerUsuarios.post('/registro', newUser);

export default routerUsuarios;