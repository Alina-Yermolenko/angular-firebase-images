import "firebase/compat/storage";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: "AIzaSyAVG5kKSVIYn6BPQQz9eQWe7zee2ijl5PI",
	authDomain: "test-images-2f0d2.firebaseapp.com",
	projectId: "test-images-2f0d2",
	storageBucket: "test-images-2f0d2.appspot.com",
	messagingSenderId: "860072545242",
	appId: "1:860072545242:web:19712f7407b4de1bd04ee3",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

export const environment = {
	production: false,
	firebase: firebaseConfig,
}
const storage = getStorage(app);
export { app, auth, storage };
