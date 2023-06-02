import React from "react"
import s from './Burger.module.scss'

type BurgerMenuType = {
    toggleMobileMenu: () => void
    isShown: boolean
}
export const BurgerMenu = ({ toggleMobileMenu, isShown }: BurgerMenuType) => {

    return (
        <>
            <label className={s.menuBtn} onClick={toggleMobileMenu}>
                <span></span>
            </label>
            <div className={` ${s.menuBox} ${isShown ? s.menuBoxOpen : ''}`}>

                <div className={s.myPhoto}/>
                <h3 className={s.email}>
                    chobanyuk.pavell@gmail.com
                </h3>

                <ul className={s.links}>
                    <li style={{ listStyleType: 'none' }}><a className={s.menuItem} href='/about'
                                                           onClick={toggleMobileMenu}>About
                        me</a></li>
                    <li style={{ listStyleType: 'none' }}><a className={s.menuItem} href='/' onClick={toggleMobileMenu}>Home
                        page</a></li>
                </ul>
            </div>

        </>
    )
}