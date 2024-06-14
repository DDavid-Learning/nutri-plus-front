// SideBar.tsx
import React, { useContext } from 'react';
import { BiHomeAlt, BiBarChartAlt2, BiBell, BiLogOut } from 'react-icons/bi';
import './side.css';
import { useAuth } from '../../../core/context/AuthProvider/useAuth';

const SideBar = () => {
    const { openLogoutDialog } = useAuth();

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
                                <BiHomeAlt className="icon" />
                                <span className="text nav-text">Dashboard</span>
                            </a>
                        </li>
                        <li className="nav-link">
                            <a href="/pacientes">
                                <BiBarChartAlt2 className="icon" />
                                <span className="text nav-text">Pacientes</span>
                            </a>
                        </li>
                        <li className="nav-link">
                            <a href="/consultas">
                                <BiBell className="icon" />
                                <span className="text nav-text">Consultas</span>
                            </a>
                        </li>
                    </div>
                    <div className="bottom-content">
                        <li>
                            <a href="#" onClick={openLogoutDialog}>
                                <BiLogOut className="icon" />
                                <span className="text nav-text">Logout</span>
                            </a>
                        </li>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default SideBar;
