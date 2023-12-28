import { Router } from "express";
import ProductDao from "../daos/dbManager/product.dao.js";

const ROUTER = Router();



ROUTER.get("/",async (req,res)=>{

    try{
        const products = await ProductDao.findProduct();
        res.json({
          data: products,
          message: "Products List"
        });
      }catch(error){
        console.log(error);
        res.json({
          error,
          message: "Error",
        });
      }
})

ROUTER.get("/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      const product = await ProductDao.getProductById(id);
  
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      res.json({
        product,
        message: "Product found",
      });
    } catch (error) {
      console.log(error);
      res.json({
        error,
        message: "Error",
      });
    }
  });


ROUTER.delete("/:id",(req,res)=>{
    const {id} = req.params
    try{
        ProManager.deleteProduct(Number(id))
        return res.status(200).json({ message: 'Product deleted successfully' })

    }catch(error){
        return res.status(404).json({error:error.message})
    }
})

ROUTER.post("/", async (req,res)=>{
    try { 
        const product = await ProductDao.createProducts(req.body);
        res.json({
            product,
            message: "Product created"
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            error,
            message: "error"
        });
    }
})

ROUTER.put("/:pid",async (req,res)=>{
    try {
        const { id } = req.params;
        const product = await ProductDao.updateProducts(id, req.body);

        res.json({
            product,
            message: "Product updated"
        });
    }
    catch (error){
        console.log(error);
        res.json({
            error,
            message: "error"
        });
    }
})

ROUTER.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const product = await ProductDao.deleteProducts(id);

        res.json({
            product,
            message: "Product deleted"
        });
    }
    catch (error){
        console.log(error);
        res.json({
            error,
            message: "error"
        });
    }
});

export default ROUTER