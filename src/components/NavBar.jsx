import ExpandableButton from './menu-exp'
import { ThemeToggle } from './ui/ThemeToggle'

const NavBar = () => {
  return (
    <nav
      className=" text-slate-600 dark:text-slate-100 dark:bg-emerald-800 backdrop-blur-xl py-4"
      aria-label="Navegación principal"
    >
      <div className="flex flex-row items-center justify-between mx-auto px-4 sm:px-6 lg:px-8 pb-2">
        <div className="flex items-center">
          <img
            className="h-12"
            src="https://utfs.io/f/OrgeCo8Gum6ew8Je4bkx3j7VtxfKkAlXC98D0ovYap6nHgwh"
            alt="SuperTest Mascota"
          />
          <span className="font-bold text-xl">Visor JsonTest </span>
        </div>

        <div className="flex items-end gap-2 h-12">
          <ExpandableButton />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}

export default NavBar
