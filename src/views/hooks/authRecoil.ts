import { atom } from "recoil";
import { UserModel } from "../model/UserModel";

export const authRecoil = atom<UserModel.IUserModel | null>({
	key: 'userState',
	default: null,
});