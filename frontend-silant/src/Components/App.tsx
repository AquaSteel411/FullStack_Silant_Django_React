import * as React from "react";
import Header from "./Header";
import Footer from "./Footer";
import {Route, Routes} from "react-router-dom";
import BeforeAuth from "./BeforeAuth";
import Authorization from "./Authorization";
import {useState} from "react";
import AfterAuthAuth from "./AfterAuth";
import MachineDetail from "./MachineDetail";
import NewComplaint from "./NewComplaint";
import NewMaintenance from "./NewMaintenance";
import NewMachine from "./NewMachine";


export default function App() {

    const [access, setAccess] = useState(localStorage.getItem('accessToken'))
    const [refresh, setRefresh] = useState(localStorage.getItem('refreshToken'))
    const [firstName, setFirstName] = useState('')
    const [username, setUsername] = useState('')
    const [groupUser, setGroupUser] =useState('')

    return (
        <>
            <Header refresh={refresh} setUsername={setUsername} firstName={firstName} setFirstName={setFirstName}/>
            <Authorization access={access} setAccess={setAccess}
                           refresh={refresh} setRefresh={setRefresh}
                           setFirstName={setFirstName}
                           setUsername={setUsername}
                           setGroupUser={setGroupUser}
            />
            <Routes>
                {!firstName?
                    <Route path={'/'} element={ <BeforeAuth /> } />
                    :
                    <Route path={'/'} element={ <AfterAuthAuth groupUser={groupUser} username={username} /> } />
                }
                <Route path='machine/:serialNumber' element={ <MachineDetail /> } />
                <Route path='new_complaint/' element={ <NewComplaint username={username} groupUser={groupUser} /> } />
                <Route path='new_maintenance/' element={ <NewMaintenance username={username} /> } />
                <Route path='new_machine' element={ <NewMachine username={username} groupUser={groupUser} /> } />
            </Routes>
            <Footer />
        </>
    )
}