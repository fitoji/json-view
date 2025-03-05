import { useRef, useState, useEffect } from "react";

import { preguntasAleatorias } from "../../helpers/funcionesTest.mjs";
import { motion, AnimatePresence } from "framer-motion";
import "./Test.css";
import { ArrowBigRightDash, Settings, TriangleAlert } from "lucide-react";
import Modal from "../Modal";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { Progress } from "../ui/progress";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Separator } from "../ui/separator";
import { toast } from "sonner";
import Temporizador from "../Temporizador";

import BoltChat from "@/components/chat/BoltChat.jsx";
import { BotMessageSquare, CircleHelp } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import BotonJavGpt from "../boton-jav";

const Test = ({ data }) => {
  useEffect(() => {
    // {{ edit_1 }}
    reset();
    setNPreguntas(data.length); // Actualiza el número de preguntas cuando cambia data
    const newQuestions = preguntasAleatorias(
      data.length,
      data,
      preguntaAleatoria
    );
    setQuestions(newQuestions); // Actualiza las preguntas aleatorias
    setQuestion(newQuestions[0]); // Establece la primera pregunta
  }, [data]);
  //menu modal
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const [isRunning, setIsRunning] = useState(true); // Agregar estado para el temporizador

  //preguntas aleatorias
  const [preguntaAleatoria, setPreguntaAleatoria] = useState(data.length);

  const handlePreguntasChange = () => {
    setPreguntaAleatoria((prevAleatoria) => {
      const newAleatoria = !prevAleatoria;
      // Actualizar las preguntas cuando cambia el estado
      setQuestions(preguntasAleatorias(npreguntas, data, newAleatoria));
      return newAleatoria;
    });
  };

  //para opciones aleatorias
  const [numero, setNumero] = useState(0);
  const generarNumeroAleatorio = () => {
    const randomNum = Math.floor(Math.random() * 4); // Genera un número entre 0 y 3
    setNumero(randomNum);
  };

  //resto app

  let [index, setIndex] = useState(0);

  const [npreguntas, setNPreguntas] = useState(data.length);

  const [questions, setQuestions] = useState(
    preguntasAleatorias(npreguntas, data, preguntaAleatoria)
  ); // Inicializamos con preguntas aleatorias
  let [question, setQuestion] = useState(questions[0]);

  //array de respuestas equivocadas
  let [equiv, setEquiv] = useState([]);
  let [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [mal, setMal] = useState(0);
  let [result, setResult] = useState(false);

  let Option1 = useRef(null);
  let Option2 = useRef(null);
  let Option3 = useRef(null);
  let Option4 = useRef(null);

  let option_array = [Option1, Option2, Option3, Option4];

  //efecto parpadeo
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    if (score > 0) {
      setIsVisible(false);
      const timer = setTimeout(() => setIsVisible(true), 200);
      return () => clearTimeout(timer);
    }
  }, [score]);
  const [isVisibleMal, setIsVisibleMal] = useState(true);
  useEffect(() => {
    if (mal > 0) {
      setIsVisibleMal(false);
      const timer = setTimeout(() => setIsVisibleMal(true), 200);
      return () => clearTimeout(timer);
    }
  }, [mal]);

  const checkAns = (e, ans) => {
    if (!lock) {
      if (question.ans === ans) {
        e.target.classList.add("right");
        toast.success("¡Respuesta Correcta!", {
          style: {
            duration: 1000,
            backgroundColor: "#00cc66",
            color: "#fff",
          },
        });
        setScore((prev) => prev + 1);
      } else {
        if (question.ans === 0) {
          setOpenAlert(true);
        } else {
          e.target.classList.add("wrong");
          toast.error("Respuesta equivocada!", {
            duration: 1000,
            style: {
              backgroundColor: "#ff0066",
              color: "#fff",
            },
          });
          option_array[question.ans - 1].current.classList.add("right");
          setMal((prev) => prev + 1);
          setEquiv((prevEquiv) => [...prevEquiv, question]);
        }
      }
      setLock(true);
    }
  };
  const next = () => {
    if (lock) {
      if (index >= npreguntas - 1) {
        setIsRunning(false); // Detener el temporizador
        toast.success("¡Cuestionario Completo!", {
          duration: 1000,
          style: {
            backgroundColor: "#3399ff",
            color: "#fff",
          },
        });
        setResult(true);
        return;
      }

      generarNumeroAleatorio();
      setIndex((prevIndex) => prevIndex + 1);
      setQuestion(questions[index + 1]);
      setLock(false);
      option_array.forEach((option) => {
        option.current.classList.remove("wrong");
        option.current.classList.remove("right");
      });
    }
  };
  const temporizadorRef = useRef();
  const reset = () => {
    setIndex(0);
    setNPreguntas(data.length); // Restablece npreguntas al valor original
    const newQuestions = preguntasAleatorias(
      npreguntas,
      data,
      preguntaAleatoria
    );
    setQuestions(newQuestions);
    setQuestion(newQuestions[0]);
    setScore(0);
    setMal(0);
    setLock(false);
    setResult(false);
    generarNumeroAleatorio();
    setEquiv([]);
    if (temporizadorRef.current) {
      temporizadorRef.current.handleResetTemp();
    }
  };

  const resetErrores = () => {
    setIndex(0);
    setScore(0);
    setMal(0);
    setIsRunning(true);
    /* generarNumeroAleatorio() */
    setQuestions(equiv);
    setQuestion(equiv[0]);
    setNPreguntas(equiv.length);

    setLock(false);
    setResult(false);
    setEquiv([]);
  };

  const handleInputChange = (event) => {
    /* setNPreguntas(Number(event.target.value))
    setOriginalNPreguntas(Number(event.target.value)) */
    const numPreguntas = Number(event.target.value);
    setNPreguntas(numPreguntas);
    //setOriginalNPreguntas(numPreguntas)
    setQuestions(preguntasAleatorias(numPreguntas, data, preguntaAleatoria));
    setQuestion(questions[0]);
    setIndex(0);
  };
  const handleSubmit = () => {
    //modal menu
    setOpen(false);
    reset();
  };

  return (
    <div className="flex flex-col-reverse md:flex-row">
      <div className="bg-emerald-300 w-full md:w-1/6  bg-opacity-30 px-4 py-4 md:h-svh  ">
        <div>
          <h1 className="hidden md:block text-xl font-bold pb-4 pt-20 text-center">
            Módulo: {question.asignatura}
          </h1>
          <p className="text-pretty hidden md:block pt-2">{`Bienvenidos al cuestionario ${question.tema}. Son ${npreguntas} preguntas. ¡Mucha suerte!`}</p>
        </div>
        <div className="md:hidden flex flex-row justify-around">
          <h1 className="text-xl font-bold pb-4">
            Módulo: {question.asignatura}
          </h1>
          <h2 className="text-xl font-normal">Tema: {question.tema}</h2>
        </div>
      </div>
      <div className="w-full md:w-2/3">
        <div>
          <Progress value={((index + 1) * 100) / npreguntas} />
        </div>

        <Card className="bg-white container min-h-screen h-1/5 gap-1  rounded-lg bg-opacity-60 backdrop-blur-sm  shadow-lg ">
          <CardContent className="p-1 md:p-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.2 }}
              >
                {result ? null : (
                  <>
                    <h2 className="text-base md:text-xl font-bold pb-2">
                      {index + 1}. {question.question}
                    </h2>

                    {numero === 0 && (
                      <ul>
                        <li ref={Option1} onClick={(e) => checkAns(e, 1)}>
                          a. {question.option1}
                        </li>
                        <li ref={Option2} onClick={(e) => checkAns(e, 2)}>
                          b. {question.option2}
                        </li>
                        <li ref={Option3} onClick={(e) => checkAns(e, 3)}>
                          c. {question.option3}
                        </li>
                        <li ref={Option4} onClick={(e) => checkAns(e, 4)}>
                          d. {question.option4}
                        </li>
                      </ul>
                    )}
                    {numero === 1 && (
                      <ul>
                        <li ref={Option2} onClick={(e) => checkAns(e, 2)}>
                          b. {question.option2}
                        </li>
                        <li ref={Option4} onClick={(e) => checkAns(e, 4)}>
                          d. {question.option4}
                        </li>
                        <li ref={Option1} onClick={(e) => checkAns(e, 1)}>
                          a. {question.option1}
                        </li>
                        <li ref={Option3} onClick={(e) => checkAns(e, 3)}>
                          c. {question.option3}
                        </li>
                      </ul>
                    )}
                    {numero === 2 && (
                      <ul>
                        <li ref={Option4} onClick={(e) => checkAns(e, 4)}>
                          d. {question.option4}
                        </li>
                        <li ref={Option3} onClick={(e) => checkAns(e, 3)}>
                          c. {question.option3}
                        </li>
                        <li ref={Option2} onClick={(e) => checkAns(e, 2)}>
                          b. {question.option2}
                        </li>
                        <li ref={Option1} onClick={(e) => checkAns(e, 1)}>
                          a. {question.option1}
                        </li>
                      </ul>
                    )}
                    {numero === 3 && (
                      <ul>
                        <li ref={Option3} onClick={(e) => checkAns(e, 3)}>
                          c. {question.option3}
                        </li>
                        <li ref={Option4} onClick={(e) => checkAns(e, 4)}>
                          d. {question.option4}
                        </li>
                        <li ref={Option1} onClick={(e) => checkAns(e, 1)}>
                          a. {question.option1}
                        </li>
                        <li ref={Option2} onClick={(e) => checkAns(e, 2)}>
                          b. {question.option2}
                        </li>
                      </ul>
                    )}
                    <div></div>
                  </>
                )}

                {result && (
                  <>
                    <div className="flex flex-col">
                      <h2 className="text-xl">
                        ¡Has hecho {score} de {npreguntas} respuestas correctas!
                      </h2>
                      <h2 className="text-xl pb-4">
                        Tiempo Transcurrido:{" "}
                        {temporizadorRef.current?.getTime()}
                      </h2>

                      <Button
                        className="flex flex-row justify-center items-center rounded-lg bg-sky-400 px-5 py-3 text-base mb-3 font-bold transition duration-200 hover:bg-sky-300 active:bg-sky-500"
                        onClick={reset}
                      >
                        Empezar de nuevo
                        <ArrowBigRightDash />
                      </Button>
                      {mal !== 0 && (
                        <Button
                          className="flex flex-row justify-center items-center rounded-lg bg-indigo-400 px-5 py-3 text-base mb-3 font-bold transition duration-200 hover:bg-rose-300 active:bg-rose-500"
                          onClick={resetErrores}
                        >
                          Repasar equivocaciones
                          <TriangleAlert className="text-white" />
                        </Button>
                      )}

                      {/* <Link className="flex flex-row  px-5 py-2 bg-emerald-400 rounded-lg text-base font-bold hover:bg-emerald-300 justify-center text-slate-100 " to="/lista">
                        Volver al Inicio
                        <Undo2 />
                      </Link > */}
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </CardContent>
          {!result && (
            <CardFooter className="flex flex-col">
              <Separator className="my-7 md:my-4" />
              <Button
                className="w-full md:w-70 rounded-xl bg-sky-500 px-5 py-3 text-base mb-3 font-bold text-white transition duration-200 hover:bg-sky-400 active:bg-green-100"
                onClick={next}
              >
                <ArrowBigRightDash />
                Siguiente
              </Button>

              <div className="flex h-5 items-center space-x-4 text-sm md:text-base pt-4">
                <div>
                  {index + 1} de {npreguntas} preguntas
                </div>
                <Separator className="h-8" orientation="vertical" />
                <div>Pregunta Nº {question.id}</div>
              </div>
              <Separator className="my-4 md:my-4" />
            </CardFooter>
          )}
        </Card>
      </div>
      <div className="bg-emerald-300 w-full bg-opacity-30 pl-8 pr-4 md:w-1/6">
        <div className="flex justify-between md:flex-col md:pt-20">
          <div className="flex flex-row justify-center items-center gap-4  md:flex-col md:gap-2 md:w-full p-1  ">
            <div className="scale-80 md:scale-100">
              <Temporizador
                isRunning={isRunning}
                setIsRunning={setIsRunning}
                ref={temporizadorRef}
              />
            </div>
            <div className="scale-80 hidden md:inline  md:scale-100">
              <BotonJavGpt question={question} />
            </div>

            <div className="flex flex-row drop-shadow-xl ">
              <img
                src="https://utfs.io/f/OrgeCo8Gum6eKylVNYfht4PRXU8nqNh6MurYiIsJ71CDbHvf"
                alt="icono bien"
                className={`transition-opacity duration-200 max-w-full h-auto ${
                  isVisible ? "opacity-100" : "opacity-0"
                }`}
              />
              <div className="text-xl ml-2 mt-4 text-emerald-700">{score}</div>
            </div>
            <div className="flex flex-row drop-shadow-xl">
              <img
                src="https://7psafmss5c.ufs.sh/f/OrgeCo8Gum6ey3WEMjroCV7r9FdRGPWb0fMTEh81mkn3egKq"
                alt="icono mal"
                className={`transition-opacity duration-200 max-w-full h-auto ${
                  isVisibleMal ? "opacity-100" : "opacity-0"
                }`}
              />
              <div className="text-xl mt-4 ml-2 text-rose-600">{mal}</div>
            </div>
          </div>
          <div className=" md:justify-end mb-2 align-top pt-1 md:pt-4">
            <Button
              className=" rounded-lg bg-sky-500 px-2 py-2 text-white ml-2  hover:bg-sky-400 active:bg-sky-500 drop-shadow-xl"
              onClick={() => setOpen(true)}
            >
              <Settings className="" />
              <span className="hidden md:inline">Menu</span>
            </Button>
          </div>
          <Modal open={open} onClose={() => setOpen(false)}>
            <div className="w-80 flex flex-col items-center">
              <Settings size={56} className="text-sky-500" />
              <div className="mx-auto my-4 w-48 text-center">
                <h3 className="text-lg text-gray-800 font-bold">Menu</h3>
              </div>
              <div className="">
                <div>
                  <Separator />
                  <div className="mt-2 flex flex-row items-center w-full justify-between text-sm font-medium text-gray-900 ">
                    <div className="flex items-center  space-x-2">
                      <Label htmlFor="preguntas-random">
                        Preguntas Aleatorias
                      </Label>
                      <Switch
                        id="preguntas-random"
                        checked={preguntaAleatoria}
                        onCheckedChange={handlePreguntasChange}
                      />
                    </div>
                    <div className="flex items-center  space-x-2"></div>
                  </div>
                </div>
                <hr className="mt-10" />
                <div className="flex flex-row gap-4 mt-4 justify-center">
                  <Button
                    className="flex flex-row w-1/2 rounded-lg bg-sky-400 font-bold transition duration-200 hover:bg-sky-300 active:bg-sky-500 justify-center p-2"
                    onClick={handleSubmit}
                  >
                    <ArrowBigRightDash />
                    Aceptar
                  </Button>
                </div>
              </div>
            </div>
          </Modal>
        </div>
        {/* //Menu Modales */}

        <Modal open={openAlert} onClose={() => setOpenAlert(false)}>
          <div className="text-center w-56">
            <TriangleAlert size={56} className="mx-auto text-yellow-500" />
            <div className="mx-auto my-4 w-48">
              <h3 className="text-lg font-black text-gray-800">Atención</h3>
              <p className="text-sm text-gray-500">
                ¡Pregunta con respuesta cuestionable, consultar en
              </p>
              <div className="flex justify-center">
                <img
                  width={50}
                  src="https://utfs.io/f/OrgeCo8Gum6eNjjQMwHlvzbqGhUyaK7nS4IVNZBLcg6TtjMP"
                  alt="discord-icono"
                ></img>
              </div>
              <p className="text-sm text-gray-500">
                para ver posibles respuestas!
              </p>
              <p className="mt-5">¡Clickea en Siguiente para continuar!</p>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Test;
