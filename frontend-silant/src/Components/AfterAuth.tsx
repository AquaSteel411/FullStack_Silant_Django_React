import * as React from "react";
import {useEffect, useState} from "react";
import {getMachinesUser, getMaintenanceUser, getComplaintsUser} from "./AppService";
import styles from '../Styles/AfterAuth.module.scss';
import MainReactTable from "./MainReactTable";
import MaintenanceReactTable from "./MaintenanceReactTable";
import ComplaintReactTable from "./ComplaintReactTeble";

export default function AfterAuthAuth({groupUser, username}) {

    const [machines, setMachines] = useState([])
    const [maintenance, setMaintenance] = useState([])
    const [complaints, setComplaints] = useState([])


    const getMachines = () => {
        getMachinesUser(username).then(res => {
            console.log(res)
            setMachines(res.data)
            }
        )
    }

    const getMaintenance = () => {
        getMaintenanceUser(username).then(res => {
            console.log(res)
            setMaintenance(res.data)
        })
    }

    const getComplaints = () => {
        getComplaintsUser(username).then(res => {
            console.log(res)
            setComplaints(res.data)
        })
    }

    const formattedDate = (date) => {
        return `${date.slice(8, 10)}.${date.slice(5, 7)}.${date.slice(0, 4)}`
    }

    const selectMain = () => {
        document.querySelector('#b1').classList.add(styles.activeBtn)
        document.querySelector('#t1').classList.add(styles.active)
        document.querySelector('#b2').classList.remove(styles.activeBtn)
        document.querySelector('#t2').classList.remove(styles.active)
        document.querySelector('#b3').classList.remove(styles.activeBtn)
        document.querySelector('#t3').classList.remove(styles.active)
    }

    const selectMaintenance = () => {
        document.querySelector('#b2').classList.add(styles.activeBtn)
        document.querySelector('#t2').classList.add(styles.active)

        document.querySelector('#b1').classList.remove(styles.activeBtn)
        document.querySelector('#t1').classList.remove(styles.active)

        document.querySelector('#b3').classList.remove(styles.activeBtn)
        document.querySelector('#t3').classList.remove(styles.active)

    }

    const selectComplaint = () => {
        document.querySelector('#b3').classList.add(styles.activeBtn)
        document.querySelector('#t3').classList.add(styles.active)

        document.querySelector('#b2').classList.remove(styles.activeBtn)
        document.querySelector('#t2').classList.remove(styles.active)

        document.querySelector('#b1').classList.remove(styles.activeBtn)
        document.querySelector('#t1').classList.remove(styles.active)

    }

    useEffect(() => {
        if (username) {
            getMachines()
            getMaintenance()
            getComplaints()
        }
    }, [username])


    return (
        <main className={styles.main}>
            <h3 className={styles.h3}>Информация о комплектации и технических характеристиках Вашей техники</h3>
            <section className={styles.switchTable}>
                <button id='b1' className={`${styles.activeBtn}`} onClick={selectMain}>Общая таблица</button>
                <button id='b2' onClick={selectMaintenance}>ТО</button>
                <button id='b3' onClick={selectComplaint}>Рекламации</button>
            </section>
            <section>
                {machines.length?
                    <MainReactTable machines={machines} groupUser={groupUser}/>
                    :
                    <p>Загрузка...</p>
                }
                {maintenance.length?
                    <MaintenanceReactTable maintenance={maintenance} />
                    :
                    <></>

                }
                {complaints.length?
                    <ComplaintReactTable complaints={complaints} groupUser={groupUser} />
                    :
                    <></>
                }
            </section>


        </main>
    )
}