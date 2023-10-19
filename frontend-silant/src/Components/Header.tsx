import * as React from "react";
import LogoSVG from '../Svg/Logotype-accent-RGB-1.module.svg';
import styles from '../Styles/Header.module.scss';
import stylesAuth from '../Styles/Authorization.module.scss';
import axios from "axios";
import {useNavigate} from "react-router-dom";


function Header({refresh, firstName, setFirstName, setUsername}) {

    const navigate = useNavigate();

    const openAuth = () => {
        const fon = document.querySelector(`.${stylesAuth.container}`)
        const form = document.querySelector(`.${stylesAuth.auth}`)
        fon.setAttribute('style', 'display: block')
        form.setAttribute('style', 'display: block')
    }

    const logout = () => {
        console.log(refresh)
        axios(
            `http://127.0.0.1:8000/api_user/api_token/black_list`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                data: { "refresh": localStorage.getItem('refreshToken') }
            })
            .then(response => {
                if (response) {
                    return response
                } else {
                    throw Error(`Something went wrong: code ${response.status}`)
                }
            })
            .then(() => {
                localStorage.setItem('refreshToken', '')
                localStorage.setItem('accessToken', '')
                setFirstName('')
                setUsername('')
            })
    }

    const goMain = () => {
        navigate(`/`)
    }

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <LogoSVG className={styles.logo} onClick={goMain}/>
                <span className={styles.center}>+7-8352-20-12-09, telegram</span>
                {firstName?
                    <div className={styles.authBlock}>
                        <button className={styles.login} onClick={logout}>выйти</button>
                    </div>
                    :
                    <button className={styles.login} onClick={openAuth}>Войти</button>
                }
            </nav>
            {firstName?
                <h3 className={styles.username}>{firstName}</h3>
                :
                <></>
            }
            <h4 className={styles.center}>
                Электронная сервисная книжка "Мой Силант"
            </h4>
        </header>
    )
}

export default Header;