import snapshot1 from "./images/snapshot1.png";

export default function ImagePreview() {
  return (
    <div className="landing_img_parent">
      <div className="landing_img_container">
        <img src={snapshot1}></img>
      </div>
    </div>
  );
}
