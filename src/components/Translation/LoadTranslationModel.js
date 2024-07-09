export default async function LoadTranslationModel() {
  try {
    await fetch(
      "https://api-inference.huggingface.co/models/facebook/m2m100_1.2B",
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_HUGGING_FACE}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ inputs: "hi" }),
      }
    );
  } catch (error) {
    console.error(error);
  }
}
