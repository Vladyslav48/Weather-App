import React, { Fragment } from 'react';
import { useState, useEffect } from 'react';

import Header from '../Header';
import Form from '../Form';
import Error from '../Error';
import Loader from '../Loader';
import Forecast from '../Forecast';

import useForecast from '../../hooks/useForecast';
import useLocation from '../../hooks/useLocation';

import styles from './Page.module.css';
// import CityLookup from '../CityLookup/CityLookup';



const Page = () => {

    
    // const [someValue, setSomeValue] = useState(null);
    // const [photoRef, setPhotoRef] = useState(null);



    const { isError, isLoading, forecast, submitRequest, refreshSearch } = useForecast();

    const {getPhotoGeneral, imageLookup} = useLocation();




    const submitSearch = (value) => {
        // setSomeValue(value)
        // console.log(value)
        // setPhotoRef(getPhotoGeneral(value));
        
        submitRequest(value);
        getPhotoGeneral(value);
    };

    // const imageSearch = (value) =>{
    //     const result = getPhotoGeneral(value)
    //     console.log(result)
    // }
    // useEffect(() => {
    //     setPhotoRef();
    //   });


    return (
        <Fragment>

            <Header />


            {!forecast && (
                <div className={`${styles.box} position-relative`}>
                    {/* Form */}
                    {!isLoading && <Form submitSearch={submitSearch}/>}
                    {/* Error */}
                    {isError && <Error message={isError} />}
                    {/* Loader */}
                    {isLoading && <Loader />}
                    
                </div>
                
            )}
            {/* Forecast */}
            { forecast && 
            <div className={ styles.forecastContanier}>
                <Forecast forecast={forecast} refreshSearch ={refreshSearch}/>

                {/* <CityLookup imageLookup={imageLookup}/> */}
                <div className={styles.imageContanier}
                    style={{ backgroundImage: `url(${imageLookup})` }}
                    >
                    <img src={imageLookup} />
                </div>

                <button onClick ={() => refreshSearch()} className ={styles.backButton}>Back</button>
            
                

                
            </div>
            }
        </Fragment>
    );
};

export default Page;
