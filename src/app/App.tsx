import React, { useState } from 'react';
import { BurgerMenu } from "../components/burgerMeny/BurgerMeny";
import { AppRouter } from '../router/AppRouter';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './custom.scss'
import s from './app.module.scss'

function App() {

    const [isShown, setIsShown] = useState(false)

    const toggleMobileMenu = () => {
        setIsShown(prev => !prev)
    }

    return (
        <div className='App'>
            <BurgerMenu toggleMobileMenu={toggleMobileMenu} isShown={isShown}/>
            <div className={s.img}>
                <img src='https://img.hhcdn.ru/employer-logo/4157981.png'/>
            </div>

            <div className={s.container} onClick={() => setIsShown(false)}>
                <AppRouter/>
            </div>
        </div>
    );
}

export default App;
