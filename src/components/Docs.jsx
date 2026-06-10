"use client"

import { useState } from "react"
import {
  BookOpen,
  Rocket,
  Code2,
  LayoutDashboard,
  Sparkles,
  Keyboard,
  HelpCircle,
  Wrench,
  Star,
  Heart,
  Menu,
  X,
} from "lucide-react"

const SECTIONS = [
  { id: "intro", label: "Introducción", icon: BookOpen, category: "guia" },
  { id: "primeros-pasos", label: "Primeros Pasos", icon: Rocket, category: "guia" },
  { id: "caracteristicas", label: "Características", icon: Star, category: "guia" },
  { id: "formato-json", label: "Formato JSON", icon: Code2, category: "referencia" },
  { id: "modos", label: "Modos de Test", icon: LayoutDashboard, category: "referencia" },
  { id: "ia", label: "Tests con IA", icon: Sparkles, category: "referencia" },
  { id: "atajos", label: "Atajos", icon: Keyboard, category: "referencia" },
  { id: "faq", label: "FAQ", icon: HelpCircle, category: "ayuda" },
  { id: "problemas", label: "Problemas", icon: Wrench, category: "ayuda" },
  { id: "soporte", label: "Soporte", icon: Heart, category: "ayuda" },
]

const CATEGORIES = [
  { id: "guia", label: "Guía" },
  { id: "referencia", label: "Referencia" },
  { id: "ayuda", label: "Ayuda" },
]

function NavSidebar({ active, onSelect, onClose }) {
  return (
    <nav className="space-y-6">
      {CATEGORIES.map((cat) => {
        const items = SECTIONS.filter((s) => s.category === cat.id)
        return (
          <div key={cat.id}>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 px-3">
              {cat.label}
            </h4>
            <div className="space-y-0.5">
              {items.map((section) => {
                const Icon = section.icon
                const isActive = active === section.id
                return (
                  <button
                    key={section.id}
                    onClick={() => {
                      onSelect(section.id)
                      onClose?.()
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all text-left
                      ${
                        isActive
                          ? "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400 shadow-xs"
                          : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200"
                      }`}
                  >
                    <Icon className="size-4 shrink-0" />
                    {section.label}
                  </button>
                )
              })}
            </div>
          </div>
        )
      })}
    </nav>
  )
}

export default function Docs() {
  const [activeSection, setActiveSection] = useState("intro")
  const [mobileOpen, setMobileOpen] = useState(false)

  const activeData = SECTIONS.find((s) => s.id === activeSection)
  const ActiveIcon = activeData?.icon

  return (
    <div className="min-h-screen bg-linear-to-br from-sky-50 to-emerald-50 dark:from-slate-950 dark:to-slate-900">
      {/* ── MOBILE HEADER ── */}
      <header className="sticky top-0 z-40 flex items-center gap-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 px-4 py-3 md:hidden">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {mobileOpen ? <X className="size-5 text-slate-700 dark:text-slate-300" /> : <Menu className="size-5 text-slate-700 dark:text-slate-300" />}
        </button>
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
          {ActiveIcon && <ActiveIcon className="size-4" />}
          {activeData?.label}
        </div>
      </header>

      {/* ── MOBILE SIDEBAR OVERLAY ── */}
      {mobileOpen && (
        <>
          <div className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm md:hidden" onClick={() => setMobileOpen(false)} />
          <aside className="fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-4 pt-16 overflow-y-auto md:hidden shadow-xl">
            <NavSidebar active={activeSection} onSelect={setActiveSection} onClose={() => setMobileOpen(false)} />
          </aside>
        </>
      )}

      <div className="max-w-6xl mx-auto flex">
        {/* ── DESKTOP SIDEBAR ── */}
        <aside className="hidden md:block w-56 shrink-0 sticky top-0 self-start h-screen overflow-y-auto p-4 pt-8">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-6 px-3">
            Documentación
          </h2>
          <NavSidebar active={activeSection} onSelect={setActiveSection} />
        </aside>

        {/* ── CONTENT ── */}
        <main className="flex-1 min-h-screen p-4 md:p-8 pt-4 md:pt-8">
          <div className="max-w-3xl">
            {/* Título */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-emerald-700 dark:text-emerald-400">
                Visor JsonTests - Documentación
              </h1>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {activeData?.label}
              </p>
            </div>

            {/* Card con contenido */}
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl shadow-lg border border-slate-200/50 dark:border-slate-700/50 rounded-2xl p-6 md:p-8 transition-all duration-300">
              <div className="animate-[fadeIn_0.2s_ease-out]" key={activeSection}>
                {renderContent(activeSection)}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Fade-in animation */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

function renderContent(section) {
  switch (section) {
    case "intro":
      return (
        <div>
          <div className="flex justify-center">
            <img
              src="https://utfs.io/f/OrgeCo8Gum6eOI3SlR8Gum6eAMoI4TlVFJpSUXKsni259L18"
              alt="visor json"
              className="rounded-lg mb-4 md:w-2/4 lg:w-3/4"
            />
          </div>
          <p className="mb-4">
            Visor JsonTests es una aplicación web diseñada para que estudiantes
            puedan practicar con tests interactivos de manera rápida y eficiente.
            Cargá tus cuestionarios en formato JSON y convertilos en tests
            interactivos al instante.
          </p>
          <p className="mb-4">
            Dos modos de uso: <strong>Pregunta Respuesta</strong> (feedback
            inmediato ideal para aprender) y <strong>Examen</strong> (simulación
            real sin feedback, revisión al final).
          </p>
          <h3 className="text-lg font-semibold text-emerald-600 dark:text-emerald-400 mb-2">
            Quick start
          </h3>
          <ol className="list-decimal pl-5 space-y-1">
            <li>
              <strong>Cargá un archivo JSON</strong> arrastrándolo o haciendo
              click
            </li>
            <li>
              <strong>Elegí el modo</strong> — Practicar o Examen
            </li>
            <li>
              <strong>Empezá a responder</strong>
            </li>
          </ol>
        </div>
      )

    case "primeros-pasos":
      return (
        <div>
          <h3 className="text-lg font-semibold text-emerald-600 dark:text-emerald-400 mb-2">
            Cargar un cuestionario
          </h3>
          <ol className="list-decimal pl-5 space-y-1 mb-4">
            <li>
              Arrastrá un archivo <code>.json</code> o <code>.txt</code> al área
              de drop, o hacé click para seleccionar
            </li>
            <li>
              El archivo aparece en <strong>JSON almacenados</strong> abajo
            </li>
            <li>
              Click en <strong>Practicar</strong>, <strong>Examen</strong> o{" "}
              <strong>Ver</strong> para empezar
            </li>
          </ol>
          <h3 className="text-lg font-semibold text-emerald-600 dark:text-emerald-400 mb-2">
            Elegir el modo
          </h3>
          <p className="mb-2">
            Al abrir un test, aparece el <strong>Selector de modo</strong>:
          </p>
          <ul className="list-disc pl-5 space-y-1 mb-4">
            <li>
              <strong>Practicar</strong> — Feedback inmediato después de cada
              respuesta. Ideal para aprender.
            </li>
            <li>
              <strong>Examen</strong> — Sin feedback, navegación libre, revisión
              final con todas las respuestas y tiempo transcurrido.
            </li>
          </ul>
          <h3 className="text-lg font-semibold text-emerald-600 dark:text-emerald-400 mb-2">
            En modo Pregunta Respuesta
          </h3>
          <ol className="list-decimal pl-5 space-y-1 mb-4">
            <li>Respondé la pregunta</li>
            <li>
              Obtenés feedback inmediato (verde = correcto, rojo = incorrecto)
            </li>
            <li>
              Click en <strong>Siguiente pregunta</strong> o usá <code>Space</code> /{" "}
              <code>Enter</code>
            </li>
            <li>
              Al final: repetir todo o repasar solo los errores
            </li>
          </ol>
          <h3 className="text-lg font-semibold text-emerald-600 dark:text-emerald-400 mb-2">
            En modo Examen
          </h3>
          <ol className="list-decimal pl-5 space-y-1">
            <li>
              Navegá entre preguntas con <code>←</code> <code>→</code> o el grid
              de navegación
            </li>
            <li>
              Seleccioná opciones con click o teclas <code>1-5</code>
            </li>
            <li>El timer cuenta el tiempo transcurrido (no hay límite)</li>
            <li>
              <strong>Entregar examen</strong> muestra revisión con todas las
              respuestas
            </li>
          </ol>
        </div>
      )

    case "formato-json":
      return (
        <div>
          <p className="mb-3">
            Cada pregunta se estructura así:
          </p>
          <pre className="bg-emerald-100 dark:bg-emerald-900/50 p-4 rounded-md mb-4 overflow-x-auto text-sm">
{`{
  "id": 1,
  "question": "¿Cuál es la capital de Francia?",
  "option1": "Madrid",
  "option2": "París",
  "option3": "Berlín",
  "option4": "Roma",
  "option5": "",
  "ans": 2,
  "asignatura": "GEO",
  "tema": "Europa"
}`}
          </pre>
          <h3 className="text-lg font-semibold text-emerald-600 dark:text-emerald-400 mb-2">
            Campos
          </h3>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-emerald-100 dark:bg-emerald-900/50">
                  <th className="border border-emerald-200 dark:border-emerald-800 p-2 text-left">Campo</th>
                  <th className="border border-emerald-200 dark:border-emerald-800 p-2 text-left">Tipo</th>
                  <th className="border border-emerald-200 dark:border-emerald-800 p-2 text-left">Descripción</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-emerald-200 dark:border-emerald-800 p-2 font-mono">id</td>
                  <td className="border border-emerald-200 dark:border-emerald-800 p-2">number</td>
                  <td className="border border-emerald-200 dark:border-emerald-800 p-2">Identificador único de la pregunta</td>
                </tr>
                <tr>
                  <td className="border border-emerald-200 dark:border-emerald-800 p-2 font-mono">question</td>
                  <td className="border border-emerald-200 dark:border-emerald-800 p-2">string</td>
                  <td className="border border-emerald-200 dark:border-emerald-800 p-2">Texto de la pregunta</td>
                </tr>
                <tr>
                  <td className="border border-emerald-200 dark:border-emerald-800 p-2 font-mono">option1 - option5</td>
                  <td className="border border-emerald-200 dark:border-emerald-800 p-2">string</td>
                  <td className="border border-emerald-200 dark:border-emerald-800 p-2">Opciones de respuesta</td>
                </tr>
                <tr>
                  <td className="border border-emerald-200 dark:border-emerald-800 p-2 font-mono">ans</td>
                  <td className="border border-emerald-200 dark:border-emerald-800 p-2">number</td>
                  <td className="border border-emerald-200 dark:border-emerald-800 p-2">Índice de la respuesta correcta (1-4). 0 = ambigua</td>
                </tr>
                <tr>
                  <td className="border border-emerald-200 dark:border-emerald-800 p-2 font-mono">asignatura</td>
                  <td className="border border-emerald-200 dark:border-emerald-800 p-2">string</td>
                  <td className="border border-emerald-200 dark:border-emerald-800 p-2">Código de la asignatura (ej: "COA")</td>
                </tr>
                <tr>
                  <td className="border border-emerald-200 dark:border-emerald-800 p-2 font-mono">tema</td>
                  <td className="border border-emerald-200 dark:border-emerald-800 p-2">string</td>
                  <td className="border border-emerald-200 dark:border-emerald-800 p-2">Tema o capítulo</td>
                </tr>
              </tbody>
            </table>
          </div>
          <h3 className="text-lg font-semibold text-emerald-600 dark:text-emerald-400 mb-2">Notas</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Se aceptan <code>.json</code> o <code>.txt</code> (contenido JSON válido)</li>
            <li><code>option5</code> vacío = 4 opciones. Con contenido = 5 opciones</li>
            <li><code>ans: 0</code> = respuesta ambigua — no incrementa el contador de errores</li>
          </ul>
        </div>
      )

    case "modos":
      return (
        <div>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-emerald-100 dark:bg-emerald-900/50">
                  <th className="border border-emerald-200 dark:border-emerald-800 p-2 text-left">Modo</th>
                  <th className="border border-emerald-200 dark:border-emerald-800 p-2 text-left">Feedback</th>
                  <th className="border border-emerald-200 dark:border-emerald-800 p-2 text-left">Orden</th>
                  <th className="border border-emerald-200 dark:border-emerald-800 p-2 text-left">Timer</th>
                  <th className="border border-emerald-200 dark:border-emerald-800 p-2 text-left">Navegación</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-emerald-200 dark:border-emerald-800 p-2 font-semibold">Pregunta Respuesta</td>
                  <td className="border border-emerald-200 dark:border-emerald-800 p-2">✅ Inmediato</td>
                  <td className="border border-emerald-200 dark:border-emerald-800 p-2">Aleatorio*</td>
                  <td className="border border-emerald-200 dark:border-emerald-800 p-2">No</td>
                  <td className="border border-emerald-200 dark:border-emerald-800 p-2">Lineal</td>
                </tr>
                <tr>
                  <td className="border border-emerald-200 dark:border-emerald-800 p-2 font-semibold">Examen</td>
                  <td className="border border-emerald-200 dark:border-emerald-800 p-2">❌ No</td>
                  <td className="border border-emerald-200 dark:border-emerald-800 p-2">Correlativo (1→N)</td>
                  <td className="border border-emerald-200 dark:border-emerald-800 p-2">Count-up</td>
                  <td className="border border-emerald-200 dark:border-emerald-800 p-2">Libre</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
            *El orden aleatorio puede desactivarse desde el menú.
          </p>
          <h3 className="text-lg font-semibold text-emerald-600 dark:text-emerald-400 mb-2">
            Pregunta Respuesta (práctica)
          </h3>
          <p className="mb-2">Modo de aprendizaje con feedback inmediato.</p>
          <ul className="list-disc pl-5 space-y-1 mb-4">
            <li>Orden aleatorio de preguntas (configurable en menú)</li>
            <li>Feedback instantáneo: verde si acertaste, rojo si fallaste</li>
            <li>Puntuación en tiempo real</li>
            <li>Al final: opción de Repetir o Revisar errores</li>
          </ul>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            <strong>Flujo:</strong> Seleccionar modo → Responder → Feedback →
            Siguiente → ... → Resultado
          </p>
          <h3 className="text-lg font-semibold text-emerald-600 dark:text-emerald-400 mb-2">Examen</h3>
          <p className="mb-2">Simulación de examen real.</p>
          <ul className="list-disc pl-5 space-y-1 mb-4">
            <li>Orden correlativo (1→N), sin aleatoriedad</li>
            <li>Sin feedback durante el examen</li>
            <li>Timer count-up (elapsed)</li>
            <li>Navegación libre entre preguntas</li>
            <li>Persistencia automática</li>
            <li>Revisión final al entregar</li>
          </ul>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <strong>Timer:</strong> Count-up, se muestra como MM:SS. Sin límite.
          </p>
        </div>
      )

    case "ia":
      return (
        <div>
          <p className="mb-3">
            Cualquier IA (ChatGPT, Claude, Gemini) puede generar cuestionarios en
            el formato correcto.
          </p>
          <h3 className="text-lg font-semibold text-emerald-600 dark:text-emerald-400 mb-2">
            Prompt básico
          </h3>
          <pre className="bg-emerald-100 dark:bg-emerald-900/50 p-4 rounded-md mb-4 overflow-x-auto text-sm whitespace-pre-wrap">
{`Considerando la siguiente documentación:
https://visortests-gpt.vercel.app/docs

Crea un cuestionario de [N] preguntas sobre el tema [TEMA] en formato JSON.
Usa este formato para cada pregunta:

{
  "id": 1,
  "question": "texto",
  "option1": "a",
  "option2": "b",
  "option3": "c",
  "option4": "d",
  "option5": "",
  "ans": 1,
  "asignatura": "[CÓDIGO]",
  "tema": "[TEMA]"
}

Guarda el resultado como un archivo .json.`}
          </pre>
          <h3 className="text-lg font-semibold text-emerald-600 dark:text-emerald-400 mb-2">Tips</h3>
          <ol className="list-decimal pl-5 space-y-1 mb-4">
            <li><strong>Sé específico</strong> con el tema</li>
            <li><strong>Indicá cantidad</strong> de preguntas</li>
            <li><strong>Pedí que valide</strong> el campo ans</li>
            <li><strong>Pedí que evite</strong> respuestas ambiguas</li>
            <li><strong>Si tiene errores</strong> pedí que lo corrija</li>
          </ol>
          <h3 className="text-lg font-semibold text-emerald-600 dark:text-emerald-400 mb-2">Errores comunes</h3>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-emerald-100 dark:bg-emerald-900/50">
                  <th className="border border-emerald-200 dark:border-emerald-800 p-2 text-left">Problema</th>
                  <th className="border border-emerald-200 dark:border-emerald-800 p-2 text-left">Solución</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-emerald-200 dark:border-emerald-800 p-2">No guarda como archivo</td>
                  <td className="border border-emerald-200 dark:border-emerald-800 p-2">Copiá el JSON, creá el archivo manualmente</td>
                </tr>
                <tr>
                  <td className="border border-emerald-200 dark:border-emerald-800 p-2">Errores de sintaxis</td>
                  <td className="border border-emerald-200 dark:border-emerald-800 p-2">Pedí que lo corrija o usá un validator online</td>
                </tr>
                <tr>
                  <td className="border border-emerald-200 dark:border-emerald-800 p-2">Opciones con números (1. opción)</td>
                  <td className="border border-emerald-200 dark:border-emerald-800 p-2">Pedí que quite los números</td>
                </tr>
                <tr>
                  <td className="border border-emerald-200 dark:border-emerald-800 p-2">Texto extra en la respuesta</td>
                  <td className="border border-emerald-200 dark:border-emerald-800 p-2">Pedí solo JSON puro</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )

    case "atajos":
      return (
        <div>
          <h3 className="text-lg font-semibold text-emerald-600 dark:text-emerald-400 mb-2">
            Pregunta Respuesta
          </h3>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-emerald-100 dark:bg-emerald-900/50">
                  <th className="border border-emerald-200 dark:border-emerald-800 p-2 text-left">Tecla</th>
                  <th className="border border-emerald-200 dark:border-emerald-800 p-2 text-left">Acción</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-emerald-200 dark:border-emerald-800 p-2 font-mono">1-5</td>
                  <td className="border border-emerald-200 dark:border-emerald-800 p-2">Seleccionar opción</td>
                </tr>
                <tr>
                  <td className="border border-emerald-200 dark:border-emerald-800 p-2 font-mono">Space / Enter</td>
                  <td className="border border-emerald-200 dark:border-emerald-800 p-2">Siguiente pregunta</td>
                </tr>
              </tbody>
            </table>
          </div>
          <h3 className="text-lg font-semibold text-emerald-600 dark:text-emerald-400 mb-2">Examen</h3>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-emerald-100 dark:bg-emerald-900/50">
                  <th className="border border-emerald-200 dark:border-emerald-800 p-2 text-left">Tecla</th>
                  <th className="border border-emerald-200 dark:border-emerald-800 p-2 text-left">Acción</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-emerald-200 dark:border-emerald-800 p-2 font-mono">1-5</td>
                  <td className="border border-emerald-200 dark:border-emerald-800 p-2">Seleccionar opción</td>
                </tr>
                <tr>
                  <td className="border border-emerald-200 dark:border-emerald-800 p-2 font-mono">← / →</td>
                  <td className="border border-emerald-200 dark:border-emerald-800 p-2">Anterior/Siguiente</td>
                </tr>
                <tr>
                  <td className="border border-emerald-200 dark:border-emerald-800 p-2 font-mono">Space / Enter</td>
                  <td className="border border-emerald-200 dark:border-emerald-800 p-2">Ir a siguiente</td>
                </tr>
                <tr>
                  <td className="border border-emerald-200 dark:border-emerald-800 p-2 font-mono">Ctrl+Enter</td>
                  <td className="border border-emerald-200 dark:border-emerald-800 p-2">Confirmar entrega</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Los atajos se ignoran si el cursor está en un campo de texto.
          </p>
        </div>
      )

    case "faq":
      return (
        <div className="space-y-4">
          <FaqItem
            q="¿El examen tiene límite de tiempo?"
            a="No. El timer es count-up (cuenta desde 0). Solo registra cuánto tardaste."
          />
          <FaqItem
            q="¿Puedo cambiar una respuesta antes de entregar?"
            a="Sí. Navegá libremente y cambiá las veces que quieras antes de entregar."
          />
          <FaqItem
            q="Si cierro la página, ¿pierdo el progreso?"
            a="No. Se guarda automáticamente en localStorage. Al volver te pregunta si querés continuar."
          />
          <FaqItem
            q="¿Puedo usarla sin internet?"
            a="Sí. Una vez cargada, todo funciona offline."
          />
          <FaqItem
            q="¿Mis datos se suben a algún servidor?"
            a="No. Todo está en tu navegador (localStorage). No se envía nada."
          />
          <FaqItem
            q="¿Cuántos cuestionarios puedo guardar?"
            a="Depende del localStorage (~5MB). Podés ver el uso en la parte inferior de la pantalla."
          />
          <FaqItem
            q="¿Cómo ordeno los cuestionarios?"
            a="Arrastrá las tarjetas. El orden se guarda automáticamente."
          />
          <FaqItem
            q="¿Qué significa el campo ans?"
            a="Índice de la respuesta correcta: a=1, b=2, c=3, d=4."
          />
          <FaqItem
            q="¿No sé programación, cómo uso la app?"
            a="Usá Tests con IA: pedile a ChatGPT que cree el JSON. Solo copiar y pegar."
          />
          <FaqItem
            q="El JSON tiene errores"
            a={"Subí un .txt o revisá el JSON manualmente."}
          />
        </div>
      )

    case "problemas":
      return (
        <div className="space-y-4">
          <ProblemItem
            title="El archivo no carga"
            body="Causa: JSON inválido. Solución: Verificá que sea JSON válido, probá con .txt."
          />
          <ProblemItem
            title="El test no muestra las opciones"
            body="Causa: option# vacío. Solución: Verificá que todas tengan texto y ans sea válido."
          />
          <ProblemItem
            title="Deploy en Vercel falla"
            body="Causa: msgpackr-extract build scripts. Solución: Usá pnpm install --ignore-scripts --ignore-optional"
          />
          <ProblemItem
            title="Timer del examen no funciona"
            body="Refrescá la página. Si persiste, verificá el reloj del sistema."
          />
          <ProblemItem
            title="No puedo cambiar respuesta en examen"
            body="En modo examen, click en otra opción — se reemplaza automáticamente."
          />
          <ProblemItem
            title="El tour aparece cada vez"
            body="Desactivá el tour desde el botón de ayuda al lado del menú."
          />
          <ProblemItem
            title="Examen guardado no aparece al volver"
            body="Causa: localStorage limpiado o cambio de dominio. Solución: Empezá un nuevo examen."
          />
          <div>
            <p className="font-semibold">Otros problemas</p>
            <p className="pl-5">
              Contactá a <strong>fitoji@protonmail.com</strong> con descripción,
              pasos y captura.
            </p>
          </div>
        </div>
      )

    case "caracteristicas":
      return (
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Orden Aleatorio:</strong> Preguntas y opciones aleatorias
            (configurable)
          </li>
          <li>
            <strong>Feedback Inmediato:</strong> Sabé al instante si acertaste
          </li>
          <li>
            <strong>Repaso de Errores:</strong> Repasá las que fallaste al final
          </li>
          <li>
            <strong>Almacenamiento Local:</strong> Todo en tu navegador, solo vos
            tenés acceso
          </li>
          <li>
            <strong>Modo Examen:</strong> Simulación real con timer, navegación
            libre y revisión final
          </li>
          <li>
            <strong>Soporte .txt:</strong> Subí archivos .txt con contenido JSON
          </li>
          <li>
            <strong>Persistencia:</strong> Examen guardado automáticamente si
            cerrás sin querer
          </li>
        </ul>
      )

    case "soporte":
      return (
        <div className="flex flex-col md:flex-row items-center gap-4">
          <img
            src="https://utfs.io/f/OrgeCo8Gum6ew8Je4bkx3j7VtxfKkAlXC98D0ovYap6nHgwh"
            alt="mascota"
            height={90}
            width={90}
            className="shrink-0"
          />
          <div>
            <p>
              Si tenés preguntas, sugerencias o problemas, contactanos en{" "}
              <strong>fitoji@protonmail.com</strong>.
            </p>
            <p className="mt-2">
              ¡Esperamos que disfrutes usando Visor JsonTests para mejorar tu
              aprendizaje!
            </p>
          </div>
        </div>
      )

    default:
      return null
  }
}

function FaqItem({ q, a }) {
  return (
    <div>
      <p className="font-semibold">{q}</p>
      <p className="pl-5">{a}</p>
    </div>
  )
}

function ProblemItem({ title, body }) {
  return (
    <div>
      <p className="font-semibold">{title}</p>
      <p className="pl-5">{body}</p>
    </div>
  )
}
