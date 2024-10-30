const admin = require('firebase-admin');
const serviceAccount = require("./key_service_account.json");
const data = require("./FAD_valencia2022.json");
const collectionKey = "tests"; //Name of the collection

// REVISTA LASDOCKEY ANTES DE SUBIR DOCS
const lastDocKey = 21
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const firestore = admin.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);
if (data && (typeof data === "object")) {
   let docKey = lastDocKey; // Inicia desde 20
   Object.keys(data).forEach(dataKey => {
       firestore.collection(collectionKey).doc(docKey.toString()).set(data[dataKey]).then((res) => {
           console.log("Document " + docKey + " subido a firebase Perfecto!");
           docKey++; // Incrementa el número de documento
       }).catch((error) => {
           console.error("Error al escribir el documentos ", error);
       });
   });
}