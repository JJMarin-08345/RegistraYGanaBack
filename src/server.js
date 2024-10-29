import express, { json } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { config } from 'dotenv';
import routerUsuarios from './router/users.js';
import routerCodigos from './router/codigos.js';

config(); //Para variables de entorno

const port = 3004;
const app = express();

app.use(json());
app.use(cors());

app.use('/usuarios', routerUsuarios);
app.use('/codigos', routerCodigos);

//Conexion a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI_CONECTION, { dbName: process.env.MONGO_DB_NAME })
    .then(() => {
        console.log('Conectado a MongoDB');
    }).catch((error) => {
        console.log('Error al conectar a MongoDB', error);
    });

//Punto de entrada del servidor
app.get('/', (req, res) => {
    res.send('Servidor deTodito');
});

app.use('*', (req, res) => {
    console.log('Ruta no encontrada');
    res.status(404).json({message: 'Ruta no encontrada'});
});

// const codigos = "WJVS4J6GTBLUQN5HSU6JZ9TGA5PYB3W4ZCJMM66KBWKX342AUYA3ED739PHRRVNYZ2Y4FKTVLE8ZRNY333VXDKM9N7LUNPEGP7P2Z7547X9ML2ASYMAT5YGLD3XKGCGVZN3XYZTFNG423A4MJE2EF64AF7AU2XDPTBMBFVUSNDT5DUSDXJXLLJ3A6ZCJJDHC6CA738XBHEC2YU8HC38XUCYKSVKU3N2ZGFT56QEEJUJ3RFTYSHFDNMZTAQKB8GBXRB79A2Y7XB8R8CW69WEXXA3NTWMAWAE8AJ2KM96NBH3BFVEHM326J7YA38EHFUP9KNCUK2B4LK9U5YLECWPCPSKF9SKFM6RFG6457LYYKE9Q6MXJYW6ZS5EFZ4B63N2RG9FTNDB4TNS9M7BPL8YH4UTS6TEZNSG8B3EET69L75MUS7ML6JV643PTSLRJ9YJSAPAH44E4QAYZUDSH5U5ABPUS5NXSYMLFVQFKS6KCB3296Y869YGW9TEUZ3Z224BX8FU39TNNWHKQS6NDJ5BFC6XZNE25AZQ77L6Y74HJA6PF4YGB963LXD4LL6TFBUTCB95WHYRL3DLYVLBPDAVWUQSNGE3YEEVTHZVKK6T4Y8G8SZ2EH8V3459MHWLSF84KRZY37E3GL8B7TU2SSZEE6RAZDZ6D299ER7NH96Y98TEF9C6AGDNNDPPE824TC7MZWPFQJSAC9F6PGJEXRFX2RKPTSSN4WDJTSUQ5GKV8MGTVZX5ZAFALX9KPLQTPKRK2TQU2HGLFQVAFRKFCAGXZHWM3DLFY8A4Z";
// const codigosArray = codigos.match(/.{1,8}/g);
// let gene = [];
// codigosArray.forEach((codigo) => {
//     console.log(codigo);
//     const isWinner = Math.random() < 0.1;
//     gene.push({code: codigo, isWinner: isWinner });
// });
// gene = JSON.stringify(gene);
// console.log(gene)

app.listen(port, ("0.0.0.0"), () => {
    console.log(`Servidor deTodito corriendo en el puerto ${port}`);
})