import { Menu } from "lucide-react"
import { Link } from "react-router-dom"


const NavBar3 = () => {
  return (
    <nav className='flex px-4 navbar-fondo'>
      <div className="md:hidden hover:bg-emerald-100 p-2 rounded-lg">
        <Menu />
      </div>
      <div className="flex">
        <Link to='/' className='font-bold text-2xl p-2 rounded-full justify-start hover:bg-emerald-200 transition-colors duration-200 ease-in-out'>
          <div className="flex flex-row px-4">
            <img className="h-20" src="/mascot.webp" alt="SuperTest Mascota" />
            Super Test
          </div>
        </Link>
      </div>


      <ul className='flex flex-row justify-end '>
        {/* <li><Link to='/' className='menu-link'>Inicio</Link></li> */}
        {/*  <li><Link to='/materia/1' className='text-xl p-2 rounded-lg hover:bg-emerald-200 transition-colors duration-200 ease-in-out hover:font-bold'>FAD</Link></li>
        <li><Link to='/materia/2' className='text-xl p-2 rounded-lg hover:bg-emerald-200 transition-colors duration-200 ease-in-out hover:font-bold'>COA</Link></li>
        <li><Link to='/materia/3' className='text-xl p-2 rounded-lg hover:bg-emerald-200 transition-colors duration-200 ease-in-out hover:font-bold'>MHA</Link></li> */}
      </ul>
    </nav>
  )
}

export default NavBar