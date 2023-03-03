export type IFood = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  price: number;
  foodImage: string;
  menuId: number;
};

export type IOrderItems = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  quantity: number;
  unitPrice: number;
  food: IFood;
};

export type IOrder = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  orderItems: IOrderItems[];
};
