import { useCallback, useEffect, useMemo } from "react";
import { useState } from "react";
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux";
import {setUserTodo} from "../store/authSlice.js"
import useDietandExerciseRecomendation from "../hooks/useDietandExerciseRecomendation";

function ExerciseSearch() {
    const [weight, setWeight] = useState(0);
    const [height, setHeight] = useState(0);
    const [exerciseChart, setExerciseChart] = useState("loading...");
    const [hasHypertension, setifHypertension] = useState(false);
    const [hasDiabetes, setifDiabetes] = useState(false);
    const [bmi, setBmi] = useState(0);
    const [isSubmit, setSubmit] = useState(false);

    const dispatch = useDispatch();
    // const [todoExercises, setTodoExercises] = useState([]);

    const { userData } = useSelector(state => state.auth)

    useEffect(() => {
        setWeight(parseFloat(userData.Weight));
        setHeight(parseFloat(userData.Height));
        setifDiabetes(userData.Sugar);
        setifHypertension(userData.BloodPressure);

    }, [userData])

    useEffect(() => {
        //SetData();
        let tempbmi = weight / (height * height);
        setBmi(tempbmi);
        if (isSubmit) getRecomendations();
    }, [height, weight]);

    const getRecomendations = async () => {
        setSubmit(true);
        const data = await useDietandExerciseRecomendation({
            weight,
            height,
            bmi,
            hasHypertension,
            hasDiabetes,
        }, "Exercise");
        let tempData = "";
        for (let i = 0; i < data.length; i++) {
            if (data[i] !== "*" && data[i] !== "#") {
                tempData += data[i];
            }
        }
        setExerciseChart(tempData);
        console.log(data);
        // console.log(typeof data);

    }

    //we are using useMemo to memoize the return value of this function, to skip infinite re-rendering
    const extractExercises = useMemo((data = exerciseChart)=>{
         
            //console.log("data", data);
    
            if(data === "loading..."){
                console.log("Invalid data");
                return <p>null</p>;
            }
            //seperating exercise section from whole data
            const ExerciseSection = data.split("%")[1];
            console.log("ExerciseSection", ExerciseSection);
            
            //seperating each day
            const dayWiseExercises = ExerciseSection.split("|");
    
            //dispatching values to global state
            dispatch(setUserTodo(dayWiseExercises));
            console.log("daywiseExercise ", dayWiseExercises);
            
            
            //let day;
            //todoExercises;
            return dayWiseExercises.map((data, index) => {
                const [day, todoExercises]  = data.split(":");
                
                const Exercises = todoExercises.split(",")
                console.log("Exercises ",Exercises);
                
                 return (<div key={index}>
                    <h1>
                        {day}
                    </h1>
                    <div>{
                        Exercises.map((data, exerciseIndex) => {
                              
                             return (<div  key={exerciseIndex}><p>
                            {data}
                        </p></div>)
                        })
                    }</div>
                </div>)
            })
    
        }
    , [exerciseChart])


    const renderData = (text) => {
        console.log("renderData runninng");
        
        let temp = text.split("");
        let data = "";
        for (let i = 0; i < temp.length; i++) {
            if (temp[i] !== "*" && temp[i] !== "#" && temp[i] !== "|" ) {
                data += temp[i];
            }
        }

        if (!data || typeof data !== "string") {
            console.log("Invalid Data");
            return "Invalid";
        }

        const textArr = data.split("\n");
        return textArr.map((e, index) => {
            const formatedText = e.replace(
                /(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|BMI Classification|BMI Interpretation|Tailored Exercise and Diet Plan|Exercise Plan|Additional Tips|Benefits of Exercise|Exercise Section|)/g,
                "<strong>$1</strong>"
            );

            return (
                <p
                    key={index}
                    dangerouslySetInnerHTML={{ __html: formatedText }}
                    className="mt-8"
                />
            );
        });
    }


    return (
        <div>
            <div className="w-[60rem] h-[25rem] border-2 border-white">
                <div className="w-[90%] m-auto mt-4 mb-4 h-[18rem]">
                    <div className="w-[50%]">
                        <h1>Get your Exercise</h1>
                        <div className="bg-blue-800 w-[25.5rem] h-[0.15rem]"></div>

                    </div>
                    <div className="flex justify-between">
                        <div className="flex flex-col w-[50%]">
                            <p className="mt-8 border-2 border-white pl-2 h-[4rem]">
                                Get your Personalized Exercise !!!
                            </p>
    
                            <button
                                type="submit"
                                onClick={() => (getRecomendations())}
                                className="bg-violet-900 w-[10rem] h-[3rem] mt-[5.2rem]"
                            >
                                Submit
                            </button>
                        </div>
                        <div className='flex items-center'>
                            {/* <img src={fileUrl} alt="" width="200rem" height="200rem" /> */}
                            <p>Animation or gif</p>
                        </div>
                    </div>
                </div>
            </div>

            {isSubmit ? (
                <div>
                    <div className="w-[60rem] h-[30rem] px-10 bg-white border-8 hover:border-blue-800 mt-8 overflow-scroll transition text-black">
                        {renderData(exerciseChart)}
                    </div>
                    {/* <div>
{extractExercises}

                    </div> */}
                </div>
            ) : (
                ""
            )}
        </div>
    )
}

export default ExerciseSearch
