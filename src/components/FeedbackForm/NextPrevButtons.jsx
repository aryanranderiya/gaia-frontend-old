import { Button } from "@nextui-org/button";
import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  SentIcon,
  Home01Icon,
} from "../icons";
import { Pagination } from "@nextui-org/pagination";
import { toast } from "sonner";
import { isValidPhoneNumber } from "react-phone-number-input";
import api from "../../apiaxios";
import * as React from "react";
import { initialFormData } from "../../pages/FeedbackForm";
import { useNavigate } from "react-router-dom";
export default function NextPrevButtons({ formData, setFormData }) {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  const nextPage = () => {
    if (formData.currentPage < 8)
      setFormData({ ...formData, currentPage: formData.currentPage + 1 });
  };

  const prevPage = () => {
    if (formData.currentPage > 1)
      setFormData({ ...formData, currentPage: formData.currentPage - 1 });
  };

  const setCurrentPage = (value) => {
    setFormData({ ...formData, currentPage: value });
  };

  const validateForm = () => {
    for (const key in formData)
      if (formData[key] === "" || formData[key].length === 0) {
        console.log(key, formData[key]);
        return false;
      }

    return true;
  };

  const submitFeedbackForm = async () => {
    setLoading(true);
    try {
      await api.post("/submitFeedbackForm", formData);
      setLoading(false);
      setFormData(initialFormData);
      toast("", {
        classNames: {
          toast:
            "flex items-center p-3 rounded-xl gap-3 max-w-[330px] toast text-zinc-900",
          description: "text-sm w-full text-zinc-900 font-bold",
        },
        description: (
          <div className="flex items-center justify-between w-full flex-row gap-3">
            Thank you for your feedback!.
            <Button
              size="sm"
              color="default"
              variant="flat"
              startContent={<Home01Icon width="15" color="foreground" />}
              onClick={() => navigate("/")}
            >
              Home
            </Button>
          </div>
        ),
        duration: 3000,
      });
    } catch (error) {
      console.error(error);
      toast.error("Error. Could not submit form.", {
        classNames: {
          toast: "flex items-center p-3 rounded-xl gap-3 w-[350px] toast_error",
          title: " text-sm",
          description: "text-sm",
        },
        duration: 3000,
        description: "Please fill out all the form fields",
      });
    }
  };

  const handleSubmit = () => {
    const isValid = validateForm();

    if (!isValidPhoneNumber(formData["phone"]) || !formData["phone"])
      toast.error("Invalid Phone Number.", {
        classNames: {
          toast: "flex items-center p-3 rounded-xl gap-3 w-[350px] toast_error",
          title: " text-sm",
          description: "text-sm",
        },
        duration: 3000,
      });
    else if (isValid) {
      console.log("Form is valid:", formData);
      submitFeedbackForm();
    } else {
      toast.error("Error. Could not submit form.", {
        classNames: {
          toast: "flex items-center p-3 rounded-xl gap-3 w-[350px] toast_error",
          title: " text-sm",
          description: "text-sm",
        },
        duration: 3000,
        description: "Please fill out all the form fields",
      });
    }
  };

  return (
    <div className="next_prev_buttons">
      <Button
        startContent={<ArrowLeft01Icon color="foreground" />}
        variant="flat"
        radius="full"
        color="primary"
        onPress={prevPage}
        isDisabled={formData.currentPage === 1}
        isIconOnly
      />

      <Pagination
        total={8}
        color="primary"
        radius="full"
        page={formData.currentPage}
        showShadow
        onChange={setCurrentPage}
        size="md"
        className="max-w-[158px] md:max-w-full justify-start overflow-x-scroll"
      />

      {formData.currentPage === 8 ? (
        <Button
          className="h-full py-2 cursor-pointer z-2"
          radius="full"
          color="primary"
          endContent={<SentIcon color="foreground" width="20" />}
          onPress={handleSubmit}
          isLoading={loading}
        >
          Submit
        </Button>
      ) : (
        <Button
          endContent={<ArrowRight01Icon color="foreground" />}
          color="primary"
          variant="flat"
          radius="full"
          onPress={nextPage}
          isDisabled={formData.currentPage === 8}
          isIconOnly
        />
      )}
    </div>
  );
}
