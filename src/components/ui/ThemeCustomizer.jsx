import Palette from 'lucide-react/dist/esm/icons/palette'
import RotateCcw from 'lucide-react/dist/esm/icons/rotate-ccw'
import { useState } from 'react'

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
import { hexToHsl, hslToHex } from '@/theme/themePresets'

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

  const updateColor = (key, value) => {
    const hsl = hexToHsl(value)
    if (hsl) updateOverrides({ [key]: hsl })
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

          <Button variant="outline" onClick={resetTheme}>
            <RotateCcw data-icon="inline-start" />
            Restablecer preset
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
