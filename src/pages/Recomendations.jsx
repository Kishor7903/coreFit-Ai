import React, { useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import loader from '../assets/loader_elephant.gif'

function Recomendations() {
    const userData =   useSelector((state)=>state.auth.userData)
    const [isLoading, setLoading] = useState(true);
    
    console.log("recomemdation: ", userData);
    console.log(typeof userData);

    const [recomendationData, setRecomendationData] = useState(null);
    
   
    const renderData = (text) => {
        const textArr = text.split("\n");
        return textArr.map((e, index) => {
          const formatedText = e.replace(
            /(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|BMI Classification|BMI Interpretation|Tailored Exercise and Diet Plan|Exercise Plan|Additional Tips|Benefits of Exercise|)/g,
            "<strong>$1</strong>"
          );
    
          return (
            <p
              key={index}
              dangerouslySetInnerHTML={{ __html: formatedText }}
              className="mt-8"
            />
          );
        })
      };

      useEffect(() =>{
        if(userData){

            const recomendations = userData||"No Recomendation";
            const content = renderData(recomendations);
            setRecomendationData(content);
            setLoading(false);
        }
        else{
            setLoading(true);
        }
        
      }, [userData])
    
  return (
    
    <div className='w-full h-screen relative'>
        <div className='flex justify-center items-center w-[100%] flex-col'>
            {(isLoading)?(<img src={loader} alt='loading...' className='flex justify-center items-center absolute top-[26%]' 
            width="250rem" />):<div className='w-[80%] m-auto flex justify-center flex-col items-center'>{recomendationData}</div>}
        </div>
    </div>
  )
}

export default Recomendations