import React, { useEffect, useState } from "react";
import useImageRecomendation from "../hooks/useImageRecomendation";

function ImageSearch() {
  const [recomendation, setRecomendation] = useState("");
  const [fileUrl, setFileUrl] = useState(null);
  const [file, setFile] = useState(null);
  const [isSubmit, setSubmit] = useState(false);

  const handleChange = (e) => {
    console.log("file", e.target.files);
    setFileUrl(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  const fetchResult = async (file) => {
    try {
      const result = await useImageRecomendation(file);
      console.log("result", result);
      setRecomendation(result);
    } catch (error) {
      console.log("Error in fetchResult", error);
    }
  };

  const handleSubmit = () => {
    setSubmit(true);
    if (file) fetchResult(file);
  };

  useEffect(() => {
    setRecomendation("");
    setSubmit(false);
  }, [file]);

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
      <div className="w-[60rem] h-[25rem] border-2 border-white">
        <div className="w-[90%] m-auto mt-4 mb-4 h-[18rem]">
          <div className="w-[50%]">
            <h1>Upload your menu</h1>
            <div className="bg-blue-800 w-[18rem] h-[0.15rem]"></div>
          </div>

          <div className="flex justify-between">
            <div className="flex flex-col w-[50%]">
              <p className="mt-8 border-2 border-white pl-2 h-[4rem]">
                Upload the image of the menu and get food Recomendation based on
                your diet.
              </p>
              <input type="file" onChange={handleChange} className="mt-8" />
              <button
                type="submit"
                onClick={() => handleSubmit()}
                className="bg-violet-900 w-[10rem] h-[3rem] mt-[5.2rem]"
              >
                Submit
              </button>
            </div>
            <div className="flex items-center">
              <img src={fileUrl} alt="" width="200rem" height="200rem" />
            </div>
          </div>
        </div>
      </div>

      {isSubmit ? (
        <div className="w-[60rem] h-[30rem] bg-white border-8 hover:border-blue-800 mt-8 overflow-scroll transition text-black">
          {renderData(recomendation)}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default ImageSearch;
