import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRightToLine, BadgeCheck, GripVertical } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cargador from "./Cargador";

const MateriaList = ({ materias }) => {
  const [draggedCard, setDraggedCard] = useState(null); // Inicializa el estado de draggedCard
  const [cards, setCards] = useState(materias); // Inicializa el estado de cards con materias

  useEffect(() => {
    // Log para verificar que las materias se están pasando correctamente
    //console.log("materias:", materias);
    setCards(materias);
  }, [materias]);


  const handleDragStart = (e, card) => {
    setDraggedCard(card);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", card.id);
    e.target.style.opacity = "0.5";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, targetCard) => {
    e.preventDefault();
    const draggedCardId = parseInt(e.dataTransfer.getData("text/plain"), 10);
    const newCards = [...cards];
    const draggedIndex = newCards.findIndex((card) => card.id === draggedCardId);
    const targetIndex = newCards.findIndex((card) => card.id === targetCard.id);

    // Asegúrate de que las posiciones sean válidas antes de hacer el cambio
    if (draggedIndex !== -1 && targetIndex !== -1) {
      const [removed] = newCards.splice(draggedIndex, 1);
      newCards.splice(targetIndex, 0, removed);

      setCards(newCards);
    }

    setDraggedCard(null);
    e.target.style.opacity = "1";
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = "1";
  };

  if (cards.length === 0) {
    return <div className="flex justify-center items-center">
      No hay módulos disponibles.
      <div >
        <Cargador />
      </div>
      </div>;
  }

  return (
    <div className="m-4 bg-white bg-opacity-60 backdrop-blur-sm rounded-lg shadow-lg">

      <h1 className="text-xl pt-6 pl-4 font-bold tracking-tighter sm:text-4xl md:text-2xl lg:text-4xl/none text-emerald-700">
        CUESTIONARIOS PARA LOS MÓDULOS DEL TÉCNICO SUPERIOR EN DIETÉTICA
      </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 ml-8 mr-8 pb-8 ">
    
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 ml-8 mr-8 pb-8 pt-8">
        {cards.map((card) => (
          <Card
            key={card.id}
            draggable
            onDragStart={(e) => handleDragStart(e, card)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, card)}
            onDragEnd={handleDragEnd}
            className="cursor-move p-4 rounded-lg shadow-lg
   bg-[#89eae0] bg-gradient-to-br from-[#89eae0] to-[#f1e8fb]
    hover:bg-gradient-to-br hover:from-emerald-300 hover:to-emerald-100 transition-colors duration-200 ease-in-out"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
              <CardTitle className="flex flex-row text-sm font-bold">
                <BadgeCheck className='pr-1' />
                {card.descripcion}
              </CardTitle>
              <GripVertical className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <Link className='Tests' to={`/materia/${card.id}`}>
              <img className="h-14 w-14" src={card.image} alt="icono materia" />
                <div className='flex flex-row justify-end rounded-lg '>
                  Ir a Tests <ArrowRightToLine />
                </div>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

          </div>
  );
};

export default MateriaList;
