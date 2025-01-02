import React from "react";
import { useForm } from "react-hook-form";
import {login} from "../store/authSlice.js"
import { useDispatch,  } from "react-redux";
import { useNavigate } from "react-router-dom";

function Search() {
  const { register, handleSubmit } = useForm();
  

  const navigate = useNavigate();

  const dispatch = useDispatch();
  

  // Handle form submission
  const manageData = async (data) => {
    

    dispatch(login(data));
  };

  


  return (
    
    
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
                navigate("/recomendations");
              }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      
    
    
  );
}

export default Search;
