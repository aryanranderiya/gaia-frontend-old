import { Button } from "@nextui-org/button";
import { ArrowLeft01Icon, ArrowRight01Icon, SentIcon } from "../icons";
import { Pagination } from "@nextui-org/pagination";
import { toast } from "sonner";
import { isValidPhoneNumber } from "react-phone-number-input";

export default function NextPrevButtons({ formData, setFormData }) {
  const nextPage = () => {
    if (formData.currentPage < 7) {
      setFormData({ ...formData, currentPage: formData.currentPage + 1 });
    }
  };

  const prevPage = () => {
    if (formData.currentPage > 1) {
      setFormData({ ...formData, currentPage: formData.currentPage - 1 });
    }
  };

  const setCurrentPage = (value) => {
    setFormData({ ...formData, currentPage: value });
  };

  const validateForm = () => {
    for (const key in formData)
      if (formData[key] === "" || formData[key].length === 0) return false;

    return true;
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
      ></Button>

      <Pagination
        total={7}
        color="primary"
        radius="full"
        page={formData.currentPage}
        showShadow
        onChange={setCurrentPage}
        size="md"
        siblings={2}
        className="max-w-[155px] md:max-w-full justify-start overflow-x-scroll"
      />

      {formData.currentPage === 7 ? (
        <Button
          className="h-full py-2 cursor-pointer z-2"
          radius="full"
          color="primary"
          endContent={<SentIcon color="foreground" width="20" />}
          onPress={handleSubmit}
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
          isDisabled={formData.currentPage === 7}
          isIconOnly
        ></Button>
      )}
    </div>
  );
}
