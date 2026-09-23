/* Hallmark · component: dropzone · genre: modern-minimal · theme: system-tokens
 * states: default · hover · focus-visible · active · dragging · disabled · loading · error · success
 * contrast: pass — destructive/success signals pair icon + border + text, never color alone
 */
import React, { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import { CheckCircle2, CircleAlert, FileJson, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "../lib/utils";

// MIME types browsers report for .json/.txt files, plus the extension fallback
// (drag & drop often delivers an empty or generic type for local files).
const ACCEPTED_MIME_TYPES = [
  "application/json",
  "text/json",
  "application/x-json",
  "text/plain",
];

const isSupportedFile = (file) =>
  Boolean(file) &&
  (ACCEPTED_MIME_TYPES.includes(file.type?.toLowerCase()) ||
    /\.(json|txt)$/i.test(file.name));

const toastError = (message) => toast.error(message, { duration: 5000 });

// Status machine for the dropzone surface. Loading only becomes visible after
// a short delay so a fast local parse never flashes a spinner.
const STATUS = { IDLE: "idle", LOADING: "loading", ERROR: "error", SUCCESS: "success" };
const LOADING_REVEAL_MS = 150;
const SUCCESS_CLEAR_MS = 2500;

export default function FileDropZone({ onFileDrop, disabled = false }) {
  const [isDragging, setIsDragging] = useState(false);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [fileName, setFileName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);

  const loadingTimer = useRef(null);
  const successTimer = useRef(null);

  const clearTimers = () => {
    window.clearTimeout(loadingTimer.current);
    window.clearTimeout(successTimer.current);
  };

  useEffect(() => clearTimers, []);

  // Shared upload path used by both the file input and drag & drop drops.
  const processFile = (file) => {
    if (!file || disabled) return;
    clearTimers();
    setStatus(STATUS.LOADING);
    setShowSpinner(false);
    // Delay the spinner so instant local reads don't flash it on/off.
    loadingTimer.current = window.setTimeout(
      () => setShowSpinner(true),
      LOADING_REVEAL_MS,
    );

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const jsonContent = JSON.parse(event.target.result);
        clearTimers();
        setShowSpinner(false);
        setFileName(file.name);
        setStatus(STATUS.SUCCESS);
        onFileDrop(file.name, jsonContent);
        // Success is silent once the file lands in the stored list below;
        // the surface just breathes back to idle.
        successTimer.current = window.setTimeout(
          () => setStatus(STATUS.IDLE),
          SUCCESS_CLEAR_MS,
        );
      } catch (error) {
        console.error("Error al parsear el JSON:", error);
        clearTimers();
        setShowSpinner(false);
        setErrorMessage("El archivo no es un JSON válido");
        setStatus(STATUS.ERROR);
        toastError("El archivo no es un JSON válido");
      }
    };
    reader.readAsText(file);
  };

  const failWith = (message) => {
    clearTimers();
    setShowSpinner(false);
    setErrorMessage(message);
    setStatus(STATUS.ERROR);
    toastError(message);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled) return;
    const file = e.dataTransfer?.files?.[0];
    if (!file) return;
    if (isSupportedFile(file)) {
      processFile(file);
    } else {
      failWith("Solo se admiten archivos .json o .txt");
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) processFile(file);
    e.target.value = "";
  };

  const idle = status === STATUS.IDLE;
  const loading = status === STATUS.LOADING;
  const error = status === STATUS.ERROR;
  const success = status === STATUS.SUCCESS;

  return (
    <label
      className={cn(
        "group relative flex w-full cursor-pointer select-none flex-col items-center justify-center gap-3 rounded-xl border border-dashed px-6 py-10 text-center outline-none",
        "border-input bg-card transition-[background-color,border-color,box-shadow] duration-200 ease-out",
        // Hover — one signal: surface tint + border, no lift.
        "hover:border-primary/60 hover:bg-accent/40",
        // Keyboard focus — instant ring, no animation.
        "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-background",
        // Press — 1px sink, felt not seen.
        "active:scale-[0.99] active:transition-transform active:duration-100",
        // Drag over — the dropzone's real "active" state.
        isDragging && "border-primary bg-primary/5 shadow-sm shadow-primary/10",
        loading && "border-primary/60",
        error && "border-destructive/70 bg-destructive/5",
        success && "border-success/70 bg-success/5",
        disabled && "cursor-not-allowed opacity-55",
      )}
      aria-disabled={disabled || undefined}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <Input
        id="fileInput"
        type="file"
        accept=".json, .txt"
        onChange={handleFileUpload}
        disabled={disabled}
        aria-describedby="file-drop-helper"
        aria-invalid={error || undefined}
        className="sr-only"
      />

      <div
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-lg bg-secondary text-secondary-foreground transition-transform duration-200 ease-out",
          isDragging && "scale-110",
          error && "bg-destructive/10 text-destructive",
          success && "bg-success/10 text-success",
        )}
      >
        {loading && showSpinner ? (
          <Loader2 className="h-6 w-6 animate-spin" aria-hidden="true" />
        ) : error ? (
          <CircleAlert className="h-6 w-6" aria-hidden="true" />
        ) : success ? (
          <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
        ) : (
          <FileJson className="h-6 w-6" aria-hidden="true" />
        )}
      </div>

      <div className="flex flex-col items-center gap-1">
        <span className="text-sm font-medium text-foreground">
          {isDragging
            ? "Soltá para cargar"
            : loading
              ? "Leyendo archivo…"
              : error
                ? "No se pudo cargar"
                : success
                  ? fileName
                  : "Arrastrá tu archivo .json acá"}
        </span>
        <span
          id="file-drop-helper"
          role="status"
          aria-live="polite"
          className={cn(
            "text-xs text-muted-foreground",
            error && "text-destructive",
          )}
        >
          {isDragging
            ? "Se cargará como nuevo cuestionario"
            : loading
              ? "Casi listo…"
              : error
                ? errorMessage
                : success
                  ? "Cuestionario cargado correctamente"
                  : "o hacé clic para elegirlo desde tu equipo"}
        </span>
      </div>

      <span
        className="font-mono text-[11px] tracking-tighter text-muted-foreground"
        aria-hidden="true"
      >
        .json · .txt
      </span>
    </label>
  );
}