import { GoogleGenerativeAI } from "@google/generative-ai";

async function useRecepieInfo(file) {
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  //file to base64
  const fileToBase64 = () => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      try {
        reader.onload = () => {
          const base64 = reader.result.split(",")[1];
          resolve(base64);
        };
      } catch (error) {
        console.log("error in base64", error);
        reject("Error in base64");
      }
      reader.onerror = () => {
        reject("Error in reading file");
      };
      reader.readAsDataURL(file);
    });
  };

  const baseTo64Image = await fileToBase64(file);

  //gemini ai

  try {
    const baseTo64Image = await fileToBase64(file);
    console.log("base", baseTo64Image);

    const prompt = `Based on the image of the dish, generate a recipe with the following structure:

**Title:** [Dish Name] 

**Yields:** [Number] servings

**Ingredients:**
* [Ingredient 1]
* [Ingredient 2]
* ...

**Instructions:**
1. [Step 1]
2. [Step 2]
* ...

**Optional:**
* [Tips or variations]

**Example:**

**Image:** [Image of a chocolate chip cookie]

**Output:**

**Title:** Chocolate Chip Cookies

**Yields:** 24 cookies

**Ingredients:**
* 1 cup (2 sticks) unsalted butter, softened
* 1 cup granulated sugar
* 1/2 cup packed brown sugar
* 2 large eggs
* 1 teaspoon vanilla extract
* 2 1/4 cups all-purpose flour
* 1 teaspoon baking soda
* 1 teaspoon salt
* 2 cups chocolate chips

**Instructions:**
1. Preheat oven to 375°F (190°C). Line baking sheets with parchment paper.
2. In a large bowl, cream together the butter and sugars until light and fluffy. Beat in the eggs one at a time, then stir in the vanilla.
3. In a separate bowl, whisk together the flour, baking soda, and salt. Gradually add the dry ingredients to the wet ingredients, mixing until just combined. Stir in the chocolate chips.
4. Drop by rounded tablespoons onto the prepared baking sheets.
5. Bake for 10-12 minutes, or until golden brown. Let cool on the baking sheets for a few minutes before transferring to a wire rack to cool completely.

**Optional:**
* For chewy cookies, underbake slightly.
* Add other mix-ins, such as chopped nuts or dried fruit.

**Key points:**

* **Clear structure:** The prompt explicitly defines the desired output structure, ensuring consistency.
* **Example:** The example provides a concrete model of the expected recipe format.
* **Image input:** The prompt emphasizes the importance of the image as the primary input for recipe generation. 
          `;
    const image = {
      inlineData: {
        data: baseTo64Image,
        mimeType: "image/jpeg",
      },
    };

    const result = await model.generateContent([prompt, image]);

    console.log("result", result.response.text());
    return result.response.text();
  } catch (error) {
    console.log("Error in processing image", error);
    return null;
  }
}

export default useRecepieInfo;
