import { toast } from "sonner";
import * as React from "react";
import api from "../../apiaxios";

export default function ImageUpload({
  imageInputRef,
  setConversationHistory,
  conversationHistory,
}) {
  const [botResponse, setBotResponse] = React.useState(null);
  
  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;
    if (selectedFile.size >= 5 * 1024 * 1024) {
      toast.error("Your file is too large. (Limit is 5Mb)", {
        classNames: {
          toast: "flex items-center p-3 rounded-xl gap-3 w-[350px] toast_error",
          title: " text-sm",
          description: "text-sm",
        },
        duration: 3000,
      });
      return;
    }

    setBotResponse(null);
    setConversationHistory((prevHistory) => [
      ...prevHistory,
      {
        type: "user",
        response: selectedFile.name,
        subtype: "image",
        file: URL.createObjectURL(selectedFile),
      },
      {
        type: "bot",
        response: "",
        loading: true,
        disclaimer: "Image descriptions may not always be accurate.",
      },
    ]);
    submitImage(selectedFile);
  };

  function updateWithResponse() {
    if (conversationHistory.length > 0 && !!botResponse) {
      const updatedHistory = [...conversationHistory];
      const lastItemIndex = updatedHistory.length - 1;
      const lastItem = updatedHistory[lastItemIndex];

      if (lastItem.type === "bot") {
        lastItem.response = botResponse;
        lastItem.loading = false;
        setConversationHistory(updatedHistory);
      }
    }
  }

  React.useEffect(() => {
    updateWithResponse();
  }, [botResponse]);

  const submitImage = async (selectedFile) => {
    const formData = new FormData();
    formData.append("image", selectedFile);
    try {
      const response = await api.post("/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response);
      setBotResponse(response.data.response);
    } catch (error) {
      setBotResponse("Error processing your image. Please try again later.");

      toast.error("Uh oh! Something went wrong.", {
        classNames: {
          toast: "flex items-center p-3 rounded-xl gap-3 w-[350px] toast_error",
          title: " text-sm",
          description: "text-sm",
        },
        duration: 3000,
        description:
          "There was a problem with uploading images. Please try again later.\n",
      });
    }
  };

  return (
    <input
      type="file"
      id="fileInput"
      accept="image/png,image/jpeg"
      style={{ display: "none" }}
      ref={imageInputRef}
      onChange={handleFileSelect}
    />
  );
}
