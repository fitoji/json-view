import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import MateriaDetail from "./MateriaDetail"

import {doc,getDoc} from "firebase/firestore"
import {db} from "../firebase/config.mjs"
import Cargador from "./Cargador"


const MateriaDetailContainer = () => {

  const [item, setItem] = useState(null)
  const  id  = useParams().id

  useEffect(() => {
    
    const matRef= doc(db,"materias",id)
    getDoc(matRef)
      .then((resp)=>{
        setItem(
        {...resp.data(), id: resp.id}
      )
    })
   
  }, [id])

  return (
    <div>
      {
        item &&
        <MateriaDetail item={item} />
      }
    </div>
  )
}

export default MateriaDetailContainer