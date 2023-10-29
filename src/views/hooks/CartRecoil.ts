import { atom, selector } from "recoil";
import { ProductModel } from "../model/ProductModel";

export const CartState = atom<Array<ProductModel.IProductModel>>({
	key: "cartState",
	default: []
})

export const CartTotalCountState = selector<number>({
	key: 'cartTotalCountState',
	get: ({ get }) => {
		const cart = get(CartState);
		return cart.length;
	},
});

export const CartTotalPriceState = selector<number>({
	key: 'cartTotalPriceState',
	get: ({ get }) => {
		const cart = get(CartState);
		const totalPrice = cart.reduce((acc, cur) => {
			return acc + cur.point;
		}, 0);
		return totalPrice;
	},
});