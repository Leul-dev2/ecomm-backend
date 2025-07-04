import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  image: { type: String, required: true },
  brandName: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  priceAfterDiscount: Number,
  discountPercent: Number,
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product;
