import { Slider } from "@nextui-org/slider";

export default function ScaleSlider({ title, value, onChange }) {
  return (
    <div className="w-full flex flex-col gap-1">
      <div className="flex justify-between text-sm text-left">
        <span>{title}</span>
        <span className="text-right text-xs min-w-20">
          1 being <b>least</b>,<br /> 10 being <b>most</b>
        </span>
      </div>
      <Slider
        color="primary"
        isRequired
        size="md"
        showSteps
        step={1}
        maxValue={10}
        minValue={1}
        defaultValue={1}
        className="w-full"
        marks={[
          { value: 1, label: "1", "aria-label": "Slider value 1" },
          { value: 2, label: "2", "aria-label": "Slider value 2" },
          { value: 3, label: "3", "aria-label": "Slider value 3" },
          { value: 4, label: "4", "aria-label": "Slider value 4" },
          { value: 5, label: "5", "aria-label": "Slider value 5" },
          { value: 6, label: "6", "aria-label": "Slider value 6" },
          { value: 7, label: "7", "aria-label": "Slider value 7" },
          { value: 8, label: "8", "aria-label": "Slider value 8" },
          { value: 9, label: "9", "aria-label": "Slider value 9" },
          { value: 10, label: "10", "aria-label": "Slider value 10" },
        ]}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
