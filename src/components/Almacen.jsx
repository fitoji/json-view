import React, {useState} from 'react'
import { DndContext, closestCenter } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'
import AlmacenUser from './AlmacenUser'

const Almacen = ({files, onSelect, onDelete, setTituloOff}) => {
  
  const [fileEntries, setFileEntries] = useState(Object.entries(files))
 // console.log(fileEntries)

  const[people, setPeople] = useState([
    {name:"jon", id:1},
    {name:"pepe", id:2},
    {name:"tito", id:3},
  ])
  const handleDragEnd= (event)=>{
    const {active, over}= event

    const oldIndex = fileEntries.findIndex(([fileName]) => fileName === active.id)
    const newIndex = fileEntries.findIndex(([fileName]) => fileName ===over.id)

    //console.log("oldIndex",oldIndex)
    //console.log("newIndex",newIndex)
    const newOrder =arrayMove(fileEntries,oldIndex,newIndex)
   // console.log(newOrder)
     setFileEntries(newOrder) 
     /* localStorage.setItem('fileEntries', JSON.stringify(newOrder)) */
  }

  return (
    <DndContext
    collisionDetection={closestCenter}
    onDragEnd={handleDragEnd}
    >
      <h1>User list</h1>
      {/* <SortableContext
      items={people}
      strategy={verticalListSortingStrategy}
      >
        {people.map((user)=>(
          <AlmacenUser user={user} key={user.id}/>
        ))}
      </SortableContext> */}
      <SortableContext
      items={fileEntries}
      strategy={verticalListSortingStrategy}
      >
        {fileEntries.map(([fileName])=>(
          <AlmacenUser fileName={fileName} key={fileName}/> 
          
        ))}
      </SortableContext>
    </DndContext>
  )
}

export default Almacen
{/* <span className="flex flex-col">{fileName}</span>  */}
  