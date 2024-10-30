//import data from "../data/tests.json"
import { collection,getDocs } from "firebase/firestore";
import { db } from "@/firebase/config.mjs";

export const pedirTestPorSubItem = (id, subItem) => {
  console.log('Buscando test para id:', id, 'y subItem:', subItem); // Log para depuración
  const testsRef= collection(db, "tests")
  getDocs(testsRef)
    .then((resp)=>{
      console.log("la respuesta de getdocs es:", resp)
    })

  return new Promise((resolve, reject) => {
    const item = data.find((el) => el.id === id && el.subItem === subItem); // Buscar por id y subItem
    if (item) {
      console.log('Test encontrado:', item);
      resolve(item);
    } else {
      console.log('Test no encontrado para id:', id, 'y subItem:', subItem);
      reject({
        error: "No se encontró el test"
      });
    }
  });
}
export const pedirTestFirebase = (id, subItem) => {

  console.log('Buscando test para id:', id, 'y subItem:', subItem); // Log para depuración
  return new Promise((resolve, reject) => {
    const item = data.find((el) => el.id === id && el.subItem === subItem); // Buscar por id y subItem
    if (item) {
      console.log('Test encontrado:', item);
      resolve(item);
    } else {
      console.log('Test no encontrado para id:', id, 'y subItem:', subItem);
      reject({
        error: "No se encontró el test"
      });
    }
  });
}