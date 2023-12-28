import { postModel } from "../../models/product.model.js";

class ProductDao {
  async findProduct() {
    return await postModel.find();
  }

  async createProduct(post) {
    return await postModel.create(post);
  }

  async updateProduct(_id, post) {
    return await postModel.findOneAndUpdate({ _id }, post);
  }

  async deleteProduct(_id) {
    return await postModel.findByIdAndDelete({ _id });
  }

  async getProductById(_id) {
    return await postModel.findById(_id);
  }
}

export default new ProductDao;