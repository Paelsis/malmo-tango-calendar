import React, {useState} from 'react';
import Image from '../images/tangosweden.jpg';
import { useNavigate } from 'react-router-dom';

const styles = {
    container:{
        backgroundColor:'black',
        style:'absolute',
        top:0,
        width:'100%',
        height:'100vh',
    },
    img:{
        display:'block',
        marginLeft:'auto', marginRight:'auto',
        maxWidth:'100%',
        maxHeight:'calc(100vh - 70px)',
    },
}

const Home = () => {
    const navigate = useNavigate()
    const handleNavigate = () => {
        navigate('/calendar')
    }

    return(
        <div style={styles.container} onClick={handleNavigate}>
            <img style={styles.img} src={Image}/>
        </div>
    )
}

export default Home


//<div style = {{...styles.img, backgroundImage: `url(${Image})`}} />
