import express from "express";
import ProductRouter from "./routes/products.routes.js";
import CartRouter from "./routes/carts.routes.js";
import ViewsRouter from "./routes/views.routes.js";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import { ProductManager,Product } from "./manager/ProductManager.js";
import mongoose from "mongoose";
import messageDao from "./daos/dbManager/message.dao.js";


const Host = express();
const PORT= 8080;

const httpServer = Host.listen(PORT,()=>{
    console.log(`Initiating server at port: ${PORT}...`);
})

mongoose.connect('mongodb+srv://Admin:1q2w3e@cluster0.n5ooq40.mongodb.net/?retryWrites=true&w=majority')
.then(() => {
    console.log('Connection established');
})
.catch(error => {
    console.error('Connection failed', error);
});
const io = new Server(httpServer);

Host.use(express.json());
Host.use(express.urlencoded({extended: true}));

Host.engine("hbs", handlebars.engine({
    extname: ".hbs",
    defaultLayout: "main"
}));

Host.set("view engine", "hbs");
Host.set("views", `${__dirname}/routes/views`);

Host.use(express.static(`${__dirname}/public`))

const ProManager = new ProductManager("./src/manager/Products.json")

io.on('connection', (socket) => {
    console.log('new client connected');
  
    socket.on('chat message', async (msg) => {
      try {
        await messageDao.createMessage({ user: msg.user, message: msg.content });
      } catch (error) {
        console.log(error);
      }
      io.emit('chat message', msg);
    });
  });

Host.use(express.json())
Host.use(express.urlencoded({extended:true}));

Host.use("/api/products", ProductRouter);
Host.use("/api/carts", CartRouter);
Host.use("/", ViewsRouter);

