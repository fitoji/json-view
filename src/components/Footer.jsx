import pkg from '../../package.json'

const Footer = () => {
  return (
    <footer className="flex flex-col justify-center py-4 gap-1 bg-muted text-muted-foreground">
      <p className="text-xs text-center">
        {new Date().getFullYear()} JsonTest v{pkg.version}. Una iniciativa de
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
        <span>Iconos por </span>
        <a
          className="hover:text-primary transition-colors"
          target="_blank"
          rel="noreferrer"
          href="https://lucide.dev"
        >
          lucide
        </a>
      </div>
    </footer>
  )
}

export default Footer
