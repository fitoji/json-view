import Palette from 'lucide-react/dist/esm/icons/palette'
import RotateCcw from 'lucide-react/dist/esm/icons/rotate-ccw'
import Download from 'lucide-react/dist/esm/icons/download'
import Upload from 'lucide-react/dist/esm/icons/upload'
import { useState } from 'react'
import { toast } from 'sonner'

import { useThemeCustomization } from '../providers/ThemeProvider'
import { Button } from './button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './dialog'
import { Input } from './input'
import { Label } from './label'
import { hexToHsl, hslToHex, serializeThemeState, THEME_FONTS, THEME_SHADOWS, validateThemeImport } from '@/theme/themePresets'

const colorValue = (value, fallback) => {
  try {
    return hslToHex(value || fallback)
  } catch {
    return fallback
  }
}

export function ThemeCustomizer() {
  const { themeState, presets, selectPreset, updateOverrides, resetTheme } = useThemeCustomization()
  const [open, setOpen] = useState(false)
  const preset = presets.find((item) => item.id === themeState.presetId) || presets[0]
  const primary = colorValue(themeState.overrides.primary, preset.light.primary)
  const accent = colorValue(themeState.overrides.accent, preset.light.accent)
  const radius = themeState.overrides.radius || preset.radius
  const font = themeState.overrides.font || preset.font
  const shadow = themeState.overrides.shadow || preset.shadow

  const updateColor = (key, value) => {
    const hsl = hexToHsl(value)
    if (hsl) updateOverrides({ [key]: hsl })
  }

  const exportTheme = () => {
    const blob = new Blob([serializeThemeState(themeState)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'visortests-theme.json'
    link.click()
    URL.revokeObjectURL(url)
  }

  const importTheme = async (event) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file || file.size > 32 * 1024) {
      toast.error('El archivo es demasiado grande o no es válido.')
      return
    }
    let result
    try {
      result = validateThemeImport(await file.text())
    } catch {
      toast.error('No se pudo leer el archivo.')
      return
    }
    if (!result.state) {
      toast.error(result.error)
      return
    }
    selectPreset(result.state.presetId)
    updateOverrides(result.state.overrides)
    toast.success('Tema importado correctamente.')
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Abrir estudio de temas">
          <Palette data-icon="inline-start" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Estudio de temas</DialogTitle>
          <DialogDescription>Elegí una base y ajustá los acentos en vivo.</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-5">
          <fieldset className="flex flex-col gap-2">
            <legend className="text-sm font-medium">Presets</legend>
            <div className="grid grid-cols-3 gap-2">
              {presets.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={item.id === themeState.presetId}
                  onClick={() => selectPreset(item.id)}
                  className="flex min-h-16 flex-col items-start gap-1 rounded-lg border border-border bg-card p-2 text-left text-xs transition-colors hover:bg-accent hover:text-accent-foreground aria-pressed:border-primary aria-pressed:ring-2 aria-pressed:ring-ring"
                >
                  <span className="flex gap-1">
                    <span className="size-3 rounded-full" style={{ backgroundColor: `hsl(${item.light.primary})` }} />
                    <span className="size-3 rounded-full" style={{ backgroundColor: `hsl(${item.light.accent})` }} />
                  </span>
                  <span className="font-semibold">{item.name}</span>
                </button>
              ))}
            </div>
          </fieldset>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-2">
              <Label htmlFor="theme-primary">Primary</Label>
              <Input id="theme-primary" type="color" value={primary} onChange={(event) => updateColor('primary', event.target.value)} className="h-10 p-1" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="theme-accent">Accent</Label>
              <Input id="theme-accent" type="color" value={accent} onChange={(event) => updateColor('accent', event.target.value)} className="h-10 p-1" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="theme-radius">Corner radius: {radius}</Label>
            <Input id="theme-radius" type="range" min="0" max="1.25" step="0.05" value={Number.parseFloat(radius)} onChange={(event) => updateOverrides({ radius: `${event.target.value}rem` })} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-2">
              <Label htmlFor="theme-font">Tipografía</Label>
              <select id="theme-font" value={font} onChange={(event) => updateOverrides({ font: event.target.value })} className="h-10 rounded-md border border-input bg-background px-3 text-sm">
                {Object.keys(THEME_FONTS).map((key) => <option key={key} value={key}>{key === 'system' ? 'Sistema' : key === 'editorial' ? 'Editorial' : 'Monoespaciada'}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="theme-shadow">Sombra</Label>
              <select id="theme-shadow" value={shadow} onChange={(event) => updateOverrides({ shadow: event.target.value })} className="h-10 rounded-md border border-input bg-background px-3 text-sm">
                {Object.keys(THEME_SHADOWS).map((key) => <option key={key} value={key}>{key === 'none' ? 'Sin sombra' : key === 'soft' ? 'Suave' : 'Nítida'}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" onClick={exportTheme}><Download data-icon="inline-start" />Exportar JSON</Button>
            <Button variant="outline" asChild><label htmlFor="theme-import"><Upload data-icon="inline-start" />Importar JSON</label></Button>
            <Input id="theme-import" type="file" accept="application/json,.json" onChange={importTheme} className="sr-only" />
          </div>

          <Button variant="outline" onClick={resetTheme}>
            <RotateCcw data-icon="inline-start" />
            Restablecer preset
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
