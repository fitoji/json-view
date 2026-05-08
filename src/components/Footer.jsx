import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="flex flex-col justify-center py-4 space-y-1 bg-sky-50 dark:bg-emerald-800">
      <p className="text-xs text-slate-500 dark:text-slate-100 text-center">
        {new Date().getFullYear()} JsonTest v.Alpha. Una iniciativa de
        <a
          className="text-md text-slate-800 dark:text-slate-400 font-bold"
          target="_blank"
          href="https://fitoji.dev.ar/"
        >
          {' '}
          Aneka{' '}
        </a>
      </p>

      <div className="flex flex-row justify-center text-xs text-slate-500 dark:text-slate-100">
        <Link
          className="text-xs hover:text-emerald-600 transition-colors"
          to="#"
        >
          Términos de servicio
        </Link>
        <Link
          className="text-xs hover:text-emerald-600 transition-colors mx-2"
          to="#"
        >
          Privacidad
        </Link>
        <a target="_blank" href="https://icons8.com/icon/5RKOijedhIGw/discord">
          {' '}
          || Iconos{' '}
        </a>
        <span className="mx-1"> by </span>
        <a target="_blank" href="https://icons8.com">
          Icons8 y FreePik
        </a>
      </div>
    </footer>
  )
}

export default Footer
