const fs = require('fs')
require('dotenv').config()

const serviceAccount = {
  type: 'service_account',
  project_id: 'supertest-5b0be',
  private_key_id: '1d6775d0b47c3f0f3d5e7ae67c097f2354f3778b',
  private_key: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'), // Esto reemplaza los saltos de línea escapados
  client_email:
    'firebase-adminsdk-6hpvu@supertest-5b0be.iam.gserviceaccount.com',
  client_id: '108690258984098650906',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url:
    'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-6hpvu%40supertest-5b0be.iam.gserviceaccount.com',
  universe_domain: 'googleapis.com',
}

fs.writeFileSync(
  'serviceAccountKey.json',
  JSON.stringify(serviceAccount, null, 2)
)
console.log('Archivo JSON generado con la clave privada')

//Usa el archivo JSON generado donde lo necesites en tu aplicación. Una vez creado, lo puedes cargar como cualquier archivo JSON:
//const serviceAccount = require('./serviceAccountKey.json');
