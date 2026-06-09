import React, { Suspense } from 'react'

const Test = React.lazy(() => import('./quiz/Test'))

export default function FileViewer({ content, initialMode }) {

    return (
    <Suspense fallback={<div className="flex items-center justify-center p-8 text-slate-500">Cargando cuestionario…</div>}>
      <Test data={content} initialMode={initialMode} />
    </Suspense>
  )
}
