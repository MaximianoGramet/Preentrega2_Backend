import { CartModel } from "../../models/cart.model.js";

class CartDao {
  async findCart() {
    return await CartModel.find();
  }

  async findById(_id) {
    return await CartModel.findById(_id);
  }

  async createCart(cart) {
    return await CartModel.create(cart);
  }

  async updateCart(_id, user) {
    return await CartModel.findByIdAndUpdate({ _id }, cart);
  }

  async deleteCart(_id) {
    await CartModel.deleteMany({ author: _id });

    return await CartModel.findByIdAndDelete({ _id });
  }
}

export default new CartDao();