"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.getUser = exports.db = void 0;
const firebase_1 = __importDefault(require("firebase"));
const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DB_URL,
    projectId: "corona-hospital-help",
    storageBucket: "corona-hospital-help.appspot.com",
    messagingSenderId: "423434005418",
    appId: process.env.FIREBASE_APP_ID
};
firebase_1.default.initializeApp(config);
exports.db = firebase_1.default.firestore();
exports.getUser = ({ id }) => __awaiter(void 0, void 0, void 0, function* () {
    const userRef = yield exports.db.doc(`users/${id}`).get();
    return Object.assign(Object.assign({}, userRef.data()), { id: userRef.id });
});
exports.getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return (yield exports.db.collection("users").get()).docs
        .map(value => (Object.assign(Object.assign({}, value.data()), { id: value.id })));
});
exports.default = firebase_1.default;
