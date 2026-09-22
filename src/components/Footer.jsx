import { Link } from 'react-router-dom'
import packageJson from '../../package.json'

const Footer = () => {
  return (
    <footer className="flex flex-col justify-center py-4 gap-1 bg-muted text-muted-foreground">
      <p className="text-xs text-center">
        {new Date().getFullYear()} JsonTest v{packageJson.version}. Una iniciativa de
        <a
          className="text-md text-foreground font-bold"
          target="_blank"
          href="https://fitoji.dev.ar/"
        >
          {' '}
          Aneka{' '}
        </a>
      </p>

      <div className="flex flex-row justify-center text-xs">
        <Link
          className="text-xs hover:text-primary transition-colors"
          to="#"
        >
          Términos de servicio
        </Link>
        <Link
          className="text-xs hover:text-primary transition-colors mx-2"
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
