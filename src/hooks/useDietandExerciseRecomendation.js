import { GoogleGenerativeAI } from "@google/generative-ai";

async function useDietandExerciseRecomendation(
  {
    weight = 0,
    height = 0,
    bmi = 0,
    hasHypertension = false,
    hasDiabetes = false,
  },
  Action = ""
) {
  //if(bmi == 0) return console.log("provide a valid data");

  try {
    let tempbmi = weight / (height * height);
    console.log("Api key: ", import.meta.env.VITE_API_KEY);
    console.log(bmi);
    console.log(hasHypertension);
    console.log(hasDiabetes);

    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    let Prompt = "";
    if (Action === "Diet") {
       prompt = `
   Sure, here's the revised prompt incorporating BMI assessment and risk information:

Prompt:

"Generate a personalized fitness plan based on the following user data:

Height: ${height}
Weight: ${weight}
BMI: ${tempbmi}
Hypertension: ${hasHypertension ? "Yes" : "No"}
Diabetes: ${hasDiabetes ? "Yes" : "No"}
Output Format/Example:

BMI Assessment:

State whether the user's BMI is in a healthy range (18.5-24.9), underweight (<18.5), overweight (25-29.9), or obese (30 or higher).
Briefly describe the potential health risks associated with the user's current BMI category.
Diet Section:

Provide a 7-day weekly diet chart with specific meal recommendations for each day.
Consider dietary restrictions (e.g., low-sodium, low-sugar, high-fiber) based on the user's health conditions (hypertension, diabetes).
Include portion sizes or calorie ranges for each meal.



Precautions:

List any necessary precautions or considerations for the user to follow during their fitness journey.
This may include:
Hydration guidelines
Monitoring blood sugar levels (for diabetics)
Listening to their body and resting when needed
Consulting a healthcare professional before starting or modifying any exercise or diet plan.
Example:

BMI Assessment:

Your BMI is 26, which falls in the overweight category.
Being overweight increases the risk of heart disease, type 2 diabetes, and certain types of cancer.
Diet Section:

Monday:
Breakfast: Oatmeal with berries and nuts
Lunch: Grilled chicken salad with mixed greens and a light vinaigrette
Dinner: Baked salmon with roasted vegetables
Tuesday:
[Continue with similar meal plans for the rest of the week]



Precautions:

Drink plenty of water throughout the day.
Monitor blood sugar levels before and after exercise if you have diabetes.
Stop exercising if you experience any chest pain or dizziness.
This plan is a general guideline. Consult a doctor or registered dietitian for personalized advice `;
    }else{
      prompt = "Exercise"
    }

    const result = await model.generateContent(prompt);
    console.log(result);
    return result.response.text();
  } catch (error) {
    console.log(error);
  }
}

export default useDietandExerciseRecomendation;
