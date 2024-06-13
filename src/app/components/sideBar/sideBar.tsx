import { useEffect } from 'react';
import './side.css';
import { BiHomeAlt, BiBarChartAlt2, BiBell, BiLogOut, BiChevronRight } from 'react-icons/bi';


const SideBar = () => {
 

    return (
        <div>
            <nav className="sidebar">
                <header>
                    <div className="image-text">
                        <span className="image">
                            <img src="https://i.imgur.com/VqIDGAT.png" alt="" />
                        </span>
                        <div className="text logo-text">
                            <span className="name">Nutri Plus</span>
                            <span className="profession">Saúde e nutrição</span>
                        </div>
                    </div>
                </header>
                <div className="menu-bar">
                    <div className="menu">
                            <li className="nav-link">
                                <a href="/dashboard">
                                    <BiHomeAlt className='icon' />
                                    <span className="text nav-text">Dashboard</span>
                                </a>
                            </li>
                            <li className="nav-link">
                                <a href="/clientes">
                                    <BiBarChartAlt2 className='icon' />
                                    <span className="text nav-text">Clientes</span>
                                </a>
                            </li>
                            <li className="nav-link">
                                <a href="/consultas">
                                    <BiBell className='icon' />
                                    <span className="text nav-text">Consultas</span>
                                </a>
                            </li>
                    </div>
                    <div className="bottom-content">
                        <li className="">
                            <a href="#">
                                <BiLogOut className='icon' />
                                <span className="text nav-text">Logout</span>
                            </a>
                        </li>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default SideBar;
