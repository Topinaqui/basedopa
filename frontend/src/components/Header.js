import { Link } from 'react-router-dom';
import './Header.css'
import {ReactComponent as Vaivolta} from '../assets/logo.svg';

export default function Header() {
    return (
        <header className='header'>
            <nav className='nav container'>
              <Link className='logo' to="/" aria-label="Vai e volta - Produtos">
                  <Vaivolta />
              </Link>
                <Link className='login' to='/login'>
                  Login/Criar
                </Link>
            </nav>
        </header>
      );
}
