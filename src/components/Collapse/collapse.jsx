import Up from "../../assets/chevron-up-down";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Collapse(props){
    const[isOpenDrop, setIsOpenDrop] = useState(false);
//Fonctions pour les ouvertures 
    function OpenDrop(){
        setIsOpenDrop(true);
    }
//Fonctions pour les fermetures 
    function ClosedDrop(){
        setIsOpenDrop(false);
    }

    useEffect(() => {
        OpenDrop();
        ClosedDrop();
    }, [])

    const pages = useParams();
    const style = pages.id ? (
        {divParent : "slide__info__details",
        divEnfant : "slide__info__details__dropdown",
        divEnfant2 : "slide__info__details__dropdown__text"}
    ) : (
        {divParent : "menu",
        divEnfant : "menu__menu-description",
        divEnfant2 : "menu__menu-description__text"}
    )
    return(
        <div>
        {isOpenDrop ? (
            <div className={style.divParent}>
                <div className={style.divEnfant}>
                    <h2>{props.title}</h2>
                    <button className="list-button__action-button__active" onClick={() => ClosedDrop()}><Up /></button>
                </div>
            <div className={style.divEnfant2}>
                <p>{props.description}</p>
            </div>
            </div>

        ) : (
            <div className={style.divParent}>
                <div className={style.divEnfant}>
                    <h2>{props.title}</h2>
                    <button className="list-button__action-button__inactive" onClick={() => OpenDrop()}><Up /></button>
                </div>
            </div>
        )}
        </div>
 )       
}


export default Collapse