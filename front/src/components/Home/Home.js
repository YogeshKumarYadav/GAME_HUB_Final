import React, {useState, useEffect} from 'react';
import './Home.css';
import Games from '../GameIcons/games.js'

const Home = () => {  
    const [state, setstate] = useState([false]);

    const hom = async () => {
        try {
            const res = await fetch('/user/profile', {
                method: 'GET',
                headers: {
                    Accept: "appllication/json",
                    "Content-Type": "application/json" 
                },
                credentials: "include"
            });

            const data = await res.json();
            
            // setprofile(data.profile);
            // setscore(data.score);
            setstate(true);
            
            
            if(!res.status === 200) {
                throw new Error(res.error);
            }

        } catch (err) {
            console.log(err);
            setstate(false);
        }
    }

    useEffect(() => {
        hom();
    });

    const HomeState = () => {
        if(state) {
           return(
                <>
                    <div>
                        <ul class="main-nav">
                        <li class="item1">
                            <a href='https://api.razzlepuzzles.com/2048'>
                                <img className='gameIcons' src={Games[0]} alt='pic'/>
                            </a>
                        </li>
                        <li class="item2">
                            <a href='https://api.razzlepuzzles.com/colorcrush'>
                                <img className='gameIcons' src={Games[1]} alt='pic'/>
                            </a>
                        </li>
                        <li class="item3">
                            <a href='https://api.razzlepuzzles.com/wordsearch'>
                                <img className='gameIcons' src={Games[2]} alt='pic'/>
                            </a>
                        </li>
                        <li class="item4">
                            <a href='https://api.razzlepuzzles.com/swipeout'>
                                <img className='gameIcons' src={Games[3]} alt='pic'/>
                            </a>
                        </li>
                        <li class="item5">
                            <a href='https://api.razzlepuzzles.com/dot_connect'>
                                <img className='gameIcons' src={Games[4]} alt='pic'/>
                            </a>
                        </li>
                        </ul>
                    </div>
                </>
           ) 
        }
        else {
            return(
                <>
                    <div className='NoUserDiv'/>
                    <div className='NoUserContent'>
                        <h1 className='Welcome'><strong>Welcome To</strong></h1>
                        <div className="Homelogo">Game<strong>Hub</strong></div>
                        <p className='Tagline'><strong>The Online Fun & Gaming Site.</strong></p>                               
                    </div>
                </>
           ) 
        }
    }

    // useEffect(() => {
    //     window.localStorage.setItem({state, dispatch});
    // })
    return (
        <>
            <HomeState/>
        </>
    )
}

export default Home
