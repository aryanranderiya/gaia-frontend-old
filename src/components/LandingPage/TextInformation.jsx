import { Button } from "@nextui-org/button";
import WordPullUp from "../MagicUI/word-pull-up";
import { ColoredLine } from "../HorizontalRuler";
import { Link } from "react-router-dom";

export default function TextInformation({
  alignleft = true,
  title,
  description = [],
  btntext,
  btnicon,
  btnhref = "/",
  button = (
    <Button
      className="w-fit font-medium text-lg"
      radius=""
      color="primary"
      size="lg"
      endContent={btnicon}
      onClick={(e) => e.preventDefault()}
    >
      <Link to={btnhref}>{btntext}</Link>
    </Button>
  ),
}) {
  return (
    <>
      <div
        className={`md:h-[80vh] h-screen items-center w-full flex flex-col py-[10%] justify-around ${alignleft ? "text-left" : "text-right"}`}
      >
        <div
          className={`flex flex-col gap-5 pb-[10%] md:w-[50%] ${alignleft ? "items-start" : "items-end"}`}
        >
          <WordPullUp
            className={`relative z-1 md:text-6xl text-4xl font-medium ${alignleft ? "text-left" : "text-right"}`}
            words={title}
          />
          <div className="md:text-2xl text-md display flex flex-col gap-2 z-2 relative text-zinc-400">
            {description.map((entry, index) => (
              <span key={index}>{entry}</span>
            ))}
          </div>
          {button}
        </div>
        <ColoredLine color={"rgba(128, 128, 128, 0.2)"} width={"50%"} />
      </div>
    </>
  );
}
