import { BadgePlus, Undo2 } from "lucide-react"
import { Link } from "react-router-dom"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"



const MateriaDetail = ({ item }) => {
  return (
    <div className='m-8 '>
      <div className="rounded-lg p-2 md:p-8">
          <div className="flex flex-row justify-center">
            <img className="h-14 w-14" src={item.image} alt="icono materia" />
            <h3 className="text-xl font-bold m-2">{item.descripcion}</h3>
          </div>
          
          <div className="mt-2 flex flex-col md:flex-row md:justify-center p-2 gap-4 rounded-lg bg-emerald-50">
            <div>
            <Accordion type="single" collapsible className="flex flex-col gap-4 rounded-lg  font-bold drop-shadow-xl shadow-lg
   bg-[#89eae0] bg-gradient-to-br from-[#89eae0] to-[#f1e8fb]
    hover:bg-gradient-to-br hover:from-emerald-300 hover:to-emerald-100 transition-colors duration-200 ease-in-out">
              <AccordionItem value="item-1">
                <AccordionTrigger className="font-bold px-4">
                  Temas del Libro
                </AccordionTrigger>
                <AccordionContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {item.temas && item.temas.map((subItem, index) => (
                    <div key={index} className="m-2 p-2 bg-white rounded-lg hover:bg-emerald-300">
                      <Link to={`/materia/${item.id}/${subItem}`}>
                      {subItem}
                      </Link>
                  </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" defaultOpen>
                <AccordionTrigger className="font-bold px-4">
                Convocatorias años anteriores
                </AccordionTrigger>
                <AccordionContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {item.convocat && item.convocat.map((subItem, index) => (
              <div key={index} className="m-2 p-2 bg-white rounded-lg hover:bg-emerald-300">
                <Link to={`/materia/${item.id}/${subItem}`}>
                    {subItem}
                </Link>
             </div>
            ))}
               
                </AccordionContent>
              </AccordionItem>
              
              
            </Accordion>
            </div>
            <div>
            
            </div>

            

          
          </div>

          <div className="flex justify-center md:justify-end p-8">
            <div className="bg-emerald-300 hover:bg-emerald-200 rounded-lg p-2 m-2 font-bold drop-shadow-xl
             flex  w-1/9 justify-center 
            ">
              <Link className="flex flex-row  px-5 py-2" to="/lista">
                Volver
                <Undo2 />
              </Link >
            </div>
          </div>
      </div>
    </div>
    
  )
}

export default MateriaDetail