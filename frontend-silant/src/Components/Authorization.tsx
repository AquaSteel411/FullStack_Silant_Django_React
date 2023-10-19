import * as React from "react";
import {useEffect, useState} from "react";
import axios from "axios";
import CloseSVG from '../Svg/Close.module.svg';
import styles from '../Styles/Authorization.module.scss';


export default function Authorization(
    {
        access, setAccess, refresh,
        setRefresh, setFirstName,
        setUsername, setGroupUser
    }) {
    const [refreshRequired, setRefreshRequired] = useState(false)
    const [loading, setLoading] = useState<boolean>()
    const [formUsername, setFormUsername] = useState('')
    const [formPassword, setFormPassword] = useState('')
    const [error, setError] = useState('')
    const fon = document.querySelector(`.${styles.container}`)
    const form = document.querySelector(`.${styles.auth}`)

    useEffect(() => {
        if (access) {
            axios(
                'http://127.0.0.1:8000/api_user/auth',
                {
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                        'Authorization': `Bearer ${access}`,
                    },
                })
                .then(response => {
                    if (response) {
                        return response
                    } else {
                        if (response.status === 401) {
                            throw Error('refresh')
                            }
                        throw Error(`Something went wrong: code ${response.status}`)
                    }
                })
                .then(({data}) => {
                    setFirstName(data.first_name)
                    setUsername(data.username)
                    setGroupUser(data.groups[0].name)
                    setError(null)
                })
                .catch(error => {
                    setRefreshRequired(true)
                    console.log(error)
                })
        }
    }, [access])

    useEffect(() => {
        if (refreshRequired) {
            axios(
                'http://127.0.0.1:8000/api_user/api_token/refresh',
                {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                    data: { "refresh": refresh }
                })
                .then(response => {
                    if (response) {
                        return response
                    } else {
                        throw Error(`Something went wrong: code ${response.status}`)
                    }
                })
                .then(({data: {access, refresh}}) => {
                    localStorage.setItem('accessToken', access)
                    setAccess(access)
                    localStorage.setItem('refreshToken', refresh)
                    setRefresh(refresh)
                    setError(null)
                    })
                .catch(error => {
                    console.log(error)
                })
            }
        }, [refreshRequired])

    const submitHandler = e => {
        e.preventDefault();
        setLoading(true);
        axios(
            'http://127.0.0.1:8000/api_user/api_token/obtain',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                data: {
                    username: formUsername,
                    password: formPassword,
                }
            })
            .then(response => {
            if (response) {
                return response
            } else {
                throw Error(`Something went wrong: code ${response.status}`)
            }
            })
            .then(({data: {access, refresh}}) => {
                localStorage.setItem('accessToken', access)
                setAccess(access)
                localStorage.setItem('refreshToken', refresh)
                setRefresh(refresh)
                setError(null)
                closeForm()
            })
            .catch(error => {
                setError(error)

            })
            .finally(() => setLoading(false))
    }

    const closeForm = () => {
        fon.setAttribute('style', 'display: none')
        form.setAttribute('style', 'display: none')
        setFormUsername('')
        setFormPassword('')
        setError('')
    }

    return (
        <div className={styles.container}>
            <form id='login' className={styles.auth} onSubmit={submitHandler}>
                <CloseSVG className={styles.closeSvg} onClick={closeForm}/>
                <label className={styles.text}>Логин:</label>
                {error?
                    <input id='username' type="text" name="username" className={`${styles.inputForm} ${styles.inputFormError}`} value={formUsername} onChange={e => setFormUsername(e.target.value)} placeholder="Username"/>
                    :
                    <input id='username' type="text" name="username" className={styles.inputForm} value={formUsername} onChange={e => setFormUsername(e.target.value)} placeholder="Username"/>
                }
                <label className={styles.text}>Пароль:</label>
                {error?
                    <>
                        <input id='password' type="password" name="password" className={`${styles.inputForm} ${styles.inputFormError}`} value={formPassword} onChange={e => setFormPassword(e.target.value)} placeholder="Password"/>
                        <p className={styles.textError}>Неправильно введен логин или пароль.</p>
                    </>
                    :
                    <input id='password' type="password" name="password" className={styles.inputForm} value={formPassword} onChange={e => setFormPassword(e.target.value)} placeholder="Password"/>
                }

                <button className={styles.enter} type='submit'>Войти</button>
            </form>
        </div>
    );
}
