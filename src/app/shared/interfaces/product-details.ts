export interface ProductDetails {
  id: string,
  title: string,
  imageCover: string,
  images: string[],
  price: string,
  ratingsAverage: number,
  description: string,
  category: Category
}
interface Category {
  _id: string,
  name: string
}
