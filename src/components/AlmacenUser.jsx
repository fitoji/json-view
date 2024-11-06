import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Button } from './ui/button'
import { Trash2 } from 'lucide-react'

const AlmacenUser = ({fileName,onSelect, onDelete, setTituloOff}) => {

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({
        id: fileName || 'default.id'
    })
    const style={
        transform: CSS.Transform.toString(transform),
        transition
    }
  return (
    <div
    style={style}
    ref={setNodeRef}
    {...attributes}
    {...listeners}
    className='bg-white rounded-md shadow-md my-2'>
        <h1>{fileName}</h1>
        <button onClick={() => onDelete(fileName)}>Eliminar</button> {/* Asegúrate de que esto esté presente */}
    </div>
  )
}

export default AlmacenUser

{/* <span className="pl-4">{fileName.replace('.json', '')}</span>
              
<div className="flex flex-row items-center mx-2">
  <Button onClick={() => { 
    onSelect(fileName); 
    setTituloOff(false)
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
    }} className="rounded-xl bg-emerald-300 mr-2 text-base text-white transition duration-200 hover:bg-emerald-200 active:bg-green-100" size="sm">
    <CircleArrowRight />
      <span className="hidden md:inline">
      Ver
      </span>
    </Button>
  <Button onClick={() => onDelete(fileName)} variant="destructive"size="sm">
    <Trash2 />
    <span className="hidden md:inline">
    Eliminar
      </span>
    
    </Button>
</div> */}