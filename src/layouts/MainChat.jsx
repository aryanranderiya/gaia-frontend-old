import MainSearchbar from "../components/Chat/MainSearchbar";
import StarterText from "../components/Chat/StarterText";
import StarterEmoji from "../components/Chat/StarterEmoji";

export default function MainChat() {
  return (
    <div className="main_chat">
      <MainSearchbar />
      <div className="starter_container">
        <StarterEmoji />
        <StarterText />
      </div>
    </div>
  );
}
