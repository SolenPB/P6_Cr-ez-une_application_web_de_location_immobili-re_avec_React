import { useParams, useNavigate} from "react-router-dom";
import { useEffect } from "react";
import Carousel from "../../components/Carousel/Carousel";
import Collapse from "../../components/Collapse/collapse";
import ActiveStar from "../../assets/active-star";
import InactiveStar from "../../assets/inactive-star";


export default function Slider() {

    const data = require('../../datas/destination.json');
    const filter = useParams();
    let dataFiltered ={
      id : "",
      pictures : [],
      host: {},
      rating: "",
      equipments: [],
      tags: [],
    };
    
    for( let i = 0; i < data.length; i++ ){
      if(filter.id === data[i].id) {
        dataFiltered = data[i];
      } else {
        RedirectionError();
      }
    }

    function RedirectionError(){
      const navigate = useNavigate();

      useEffect(() => {
        if(filter.id !== dataFiltered.id){
          navigate("/error", {replace: true});
        }
      }, [navigate])
    } 

    function Equipments(dataArray){
      return(<ul>
        {dataArray.map((data, index) => 
      {
        return(
          <li key={index} className="equipments">{data}</li>
        )
      }
      )}
      </ul>)
      
    }

    function RatingScale(props){
      let n = 0;
      let note = [];
  
      while(n < 5){
        n++;
      if(n <= props.rating){
        note.push(<ActiveStar />)
      }
      else
      {
        note.push(<InactiveStar />)
      }
      }
  
  
    return (

    <div className="summary__hostRating__rating">
      {note.map((data, index) =>
        { 
  ;        return(
          <span key={index} className="summary__hostRating__rating__rating-star">
            {data}
          </span>
        )}
      )}
    </div>
    )
  
  }
    return(
    <div className="slide">

      <Carousel pictures={dataFiltered.pictures}/>

      <div className="summary">
        <div className="summary__titleTags">
          
            <h2 className="summary__titleTags__location">{dataFiltered.title}</h2>
            <span className="summary__titleTags__city">{dataFiltered.location} </span>
          

          <div className="summary__titleTags__tags">
          {dataFiltered.tags.map((data, index) =>
            {
              return(
                <span key={index} className="summary__titleTags__tags__tagElement">
                  {data}
                </span>
              )
            }
          )
          }
          </div>
        </div>

        <div className="summary__hostRating">
        <div className="summary__hostRating__host">
            <span className="summary__hostRating__host__hostName">{dataFiltered.host.name}</span>
            <img src={dataFiltered.host.picture} alt="" className="summary__hostRating__host__hostPicture"/>
          </div>

          <div className="summary__hostRating__rating">
            <RatingScale rating={dataFiltered.rating}/>
          </div>
        </div>
      </div>
      <div className="details">
        <Collapse title="Description" description={dataFiltered.description} />
        <Collapse title="Equipements" description={Equipments(dataFiltered.equipments)} />
      </div>
    </div>
      
    )
}