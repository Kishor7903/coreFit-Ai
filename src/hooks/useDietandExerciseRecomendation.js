import { GoogleGenerativeAI } from "@google/generative-ai";

async function useDietandExerciseRecomendation({
    weight = 0,
    height = 0,
    bmi = 0,
    hasHypertension = false,
    hasDiabetes = false
}) {
    //if(bmi == 0) return console.log("provide a valid data");
    
    try{
        let tempbmi = weight/(height*height);
        console.log("Api key: ",  import.meta.env.VITE_API_KEY);
        console.log(bmi);
        console.log(hasHypertension);
        console.log(hasDiabetes);
       
       
                
    const genAI =  new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
    const model =  genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `
    Based on the following information, provide a tailored exercise and diet plan, including necessary precautions.

    Height: ${height}
    Weight: ${weight}
    BMI: ${tempbmi}
    Hypertension: ${hasHypertension ? 'Yes' : 'No'}
    Diabetes: ${hasDiabetes ? 'Yes' : 'No'}

    Based on my bmi and other mentioned parameters tell me if i am overweight or underweight and create
    three sections:
    1. Diet Section : which will give weekly diet chart day by day.
    2. Exercise Section: which will give weekly exercise plan.
    3. Precautions: Some extra precautions  
  `;
    
    const result = await model.generateContent(prompt);
    console.log(result);
    return result.response.text()
    }
    catch(error){
        console.log(error);
    }
    
}   

export default useDietandExerciseRecomendation