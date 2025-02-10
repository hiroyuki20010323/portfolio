import axios from "axios";
import { API_URL } from "../config";
// import { auth } from "../config/firebaseConfig";





// const token = await auth.currentUser?.getIdToken()
export const api = axios.create({
  baseURL: API_URL,
}) 

