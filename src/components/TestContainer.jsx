import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
//import { pedirTestFirebase } from '../helpers/pedirTest';
import Test from './Test';
import { TriangleAlert, Undo2 } from 'lucide-react';
import {collection, getDocs, query, where, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/config.mjs';
import Cargador from './Cargador';

const TestContainer = () => {
  const { subItem, id } = useParams();
  const [test, setTest] = useState([]);

  useEffect(() => {
    //console.log('Buscando test dentro de useEffect para id:', id, 'y subItem:', subItem); // Log para depuración
    const testRef= collection(db, "tests")
    
    // Realiza la consulta directamente con subItem e id
    const newQuery = query(testRef, where("subItem", "==", subItem), where("id", "==", id));
    getDocs(newQuery)
      .then((newResp) => {
        if (newResp.empty) {
           // console.log("No se encontraron resultados.");
            setTest([]); // Actualiza el estado si no hay resultados
        } else {
            const results = newResp.docs.map(doc => doc.data().test);
          //  console.log("Resultados de la nueva consulta:", results[0]);
            setTest(results[0]); // Actualiza el estado con los resultados
        }
    });
   
  }, [subItem, id]);

  return (
    <div>
      {test.length > 0 ? (
        <div>
          <Test data={test} />
        </div>
      ) : (
        <div className="min-h-full p-5" >
          <div className="flex flex-col items-center justify-center gap-10">
            <TriangleAlert />
            <p className='ml-2 font-bold'>No se encontraron datos para este test.</p>
            <Cargador/>
          </div>
          
          <div className="bg-emerald-300  justify-center md:justify-end hover:bg-emerald-200 rounded-lg p-2 m-2 font-bold drop-shadow-xl
             flex">
              <Link className="flex flex-row px-5 py-2" to={`/materia/${id}`}>
                Volver
                <Undo2 />
              </Link >
            </div>
      </div>
      )}
    </div>
  )
}


export default TestContainer
