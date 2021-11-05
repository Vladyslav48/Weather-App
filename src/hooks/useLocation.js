import axios from "axios";
import { useState, useEffect} from 'react';


const CROSS_DOMAIN = "https://the-ultimate-api-challenge.herokuapp.com"




const useLocation =() => {


    const [photoRef, setPhotoRef] = useState(null);
    const [imageLookup, setImageLookup] = useState(null);


    const getPhotoRef =  async (city) =>{
        const PHOTO_DATA_URL = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${city}&key=AIzaSyCUiMIeoiMDwk-XT9dYzlNYKqVurEYKVQc&inputtype=textquery&fields=name,photos`
        const REQUEST_URL = `${CROSS_DOMAIN}/${PHOTO_DATA_URL}`;
        const photoInfo = await axios(`${REQUEST_URL}`)
        setPhotoRef(photoInfo.data.candidates[0].photos[0].photo_reference)
        console.log(photoRef)

        // if (!photoRef || photoRef.length === 0) {
        //     console.log("Хуета не выдает ссылку")
        //     return;
        // }
        return photoRef
    }

    const getPhoto = (photoRef)=>{
        if (photoRef) {
            const imageLookupURL = `https://maps.googleapis.com/maps/api/place/photo?photoreference=${photoRef}&key=AIzaSyCUiMIeoiMDwk-XT9dYzlNYKqVurEYKVQc&maxwidth=700&maxheight=700`
            setImageLookup(imageLookupURL)
            console.log(imageLookup)
            // return imageLookup
        }
        // return imageLookup
    }


    const getPhotoGeneral = async(city)=> {
        const response = await(getPhotoRef(city));
        getPhoto(response);
  
    };

    // useEffect((city) => {
    //     // Оновлюємо заголовок документа, використовуючи API браузера
    //     getPhotoGeneral(city);
    //   });

    //call it in Page.jsx with value
    // getPhotoGeneral()

    return {
            // imageLookup,
            // getPhotoGeneral
            imageLookup,
            getPhotoGeneral
            

        }
}

export default useLocation