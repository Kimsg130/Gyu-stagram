import React, {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';
import Athentication from "./views/Athentication";


function App() {
    // const [hello, setHello] = useState('')

    // useEffect(() => { //특정한 state가 바뀌면 실행됨, deps를 비워두면 맨처음 한번만 실행됨
    //     axios.get('/api/hello')
    //         .then(response => setHello(response.data))
    //         .catch(error => console.log(error))
    // }, []);


    return (
        <Athentication />
    );
}

export default App;
