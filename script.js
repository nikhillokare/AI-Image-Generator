const api_key = "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";
const submitIcon = document.querySelector("#submit-icon");
const inputElement = document.querySelector("input");
const imageSection = document.querySelector(".image-section");

const clearImages = () => {
  // Remove all existing image containers
  while (imageSection.firstChild) {
    imageSection.firstChild.remove();
  }
};

const getImages = async () => {
  clearImages();
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${api_key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: inputElement.value,
      n: 4,
      size: "1024x1024",
    }),
  };
  try {
    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      options
    );
    const data = await response.json();
    data?.data.forEach((imgObject) => {
      const ImgContainer = document.createElement("div");
      ImgContainer.classList.add("image-container");
      const ImgElement = document.createElement("img");
      ImgElement.setAttribute("src", imgObject.url);
      ImgContainer.append(ImgElement);
      imageSection.append(ImgContainer);
    });
  } catch (error) {
    console.log(error);
  }
};

submitIcon.addEventListener("click", getImages);
