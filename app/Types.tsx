export interface Product {
  
  id:number;
  title: string;
  image: string;
  price: number;
  price_sale: number;
  point:number;
  is_type:number;  // discout gói hội viên
  total_sale:number; // số lượng bnans
  level1:number;
  level2:number;
  level3:number;
  type_discount:number;
  rate:number;// này là star
  quantity:number;
  cate_title:string;// này là cate của nó
}

export interface Category{
  id:number;
  slug:string;
  image:string;
  descriptionshort:string;
  descriptionlong:string;
  level:number;
  parent_id:number;
  is_type:number;

}
export interface Category_home {
  category_id: number;
  category_title: string;
  parent_id: number | null;
  level: number;
  products: Product[];
}

export interface catehint{
  title:string;
  slug:string;
}
