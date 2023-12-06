import "firebase/compat/storage";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from 'firebase/auth';
import firebaseConfig from "../../env";

const app = initializeApp(firebaseConfig);
const auth = getAuth();

export const environment = {
	production: false,
	firebase: firebaseConfig,
}
const storage = getStorage(app);
export { app, auth, storage };
