import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import useDietandExerciseRecomendation from "../hooks/useDietandExerciseRecomendation";
import loader from "../assets/loader.gif"
import {login} from "../store/authSlice.js"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Search() {
  const { register, handleSubmit } = useForm();
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [hasHypertension, setifHypertension] = useState(false);
  const [hasDiabetes, setifDiabetes] = useState(false);
  const [bmi, setBmi] = useState(0);
  const [recomendation, setRecomendation] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isSubmit, setSubmit] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const recommendationRef = useRef(null); // Reference for recommendation div

  // Handle form submission
  const manageData = async (data) => {
    setWeight(parseFloat(data.Weight));
    setHeight(parseFloat(data.Height));
    setifDiabetes(data.Sugar);
    setifHypertension(data.BloodPressure);
  };

  // Load recommendations
  const getRecomendations = async () => {
    const data = await useDietandExerciseRecomendation({
      weight,
      height,
      bmi,
      hasHypertension,
      hasDiabetes,
    });
    setRecomendation(data);
    dispatch(login(data));
    setLoading(false);

    // Scroll with an offset
    if (recommendationRef.current) {
      // Use requestAnimationFrame to ensure it's scrolling after the render
      window.requestAnimationFrame(() => {
        const topPosition = recommendationRef.current.getBoundingClientRect().top + window.scrollY;
        const offset = 110; // Add an extra offset (scrolling a bit more)
        window.scrollTo({ top: topPosition - offset, behavior: "smooth" });
      });
    }
  };

  useEffect(() => {
    let tempbmi = weight / (height * height);
    setBmi(tempbmi);

    if (bmi !== 0 && !isNaN(bmi)) getRecomendations();
  }, [height, weight, bmi]);

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
    });
  };

  return (
    <div>
    <div className={`${isLoading && isSubmit?"blur-sm relative":"relative"}`}>
      <div className="w-[100%] flex justify-center items-center flex-col border-2 border-blue-800 mt-10 mb-10">
        <p className="text-[2rem] mt-8">Enter your Health Details</p>
        <div className="w-[100%] mt-20">
          <form
            onSubmit={handleSubmit(manageData)}
            className="h-auto w-[80%] grid grid-cols-2 gap-x-10 items-center place-items-center gap-y-10 m-auto"
          >
            <div className="relative z-0 w-full mb-5 group">
              <input
                id="weight"
                type="text"
                placeholder=" "
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                {...register("Weight", { required: true })}
              />
              <label
                htmlFor="weight"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Weight
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                id="height"
                type="text"
                placeholder=""
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                {...register("Height", { required: true })}
              />
              <label
                htmlFor="height"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Height
              </label>
            </div>
            <div className="flex justify-between w-full">
              <label
                htmlFor="Sugar"
                className="block ms-2  text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Have Sugar
              </label>
              <input
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                type="checkbox"
                id="Sugar"
                {...register("Sugar", { required: false })}
              />
            </div>
            <div className="w-[100%] flex justify-between">
              <label
                htmlFor="BloodPressure"
                className="block ms-2  text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Have BloodPressure
              </label>
              <input
                type="checkbox"
                className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                {...register("BloodPressure", { required: false })}
              />
            </div>

            <button
              type="submit"
              className="col-span-2 w-[20rem] bg-violet-800 mb-8 rounded-sm"
              onClick={() => {
                setLoading(true);
                setSubmit(true);
                navigate("/recomendations");
              }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      
    </div>
    <div ref={recommendationRef}>
        {isLoading && isSubmit ? (
          <div className="absolute top-[80%] left-1/2"><img src={loader} alt="" /></div>
        ) : isLoading === false && isSubmit === true ? (
          <div>Advice: {renderData(recomendation)}</div>
        ) : null}
      </div>
    </div>
  );
}

export default Search;
