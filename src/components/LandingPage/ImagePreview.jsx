import image_png from "./images/homepage_image.png";
import image_webp from "./images/homepage_image.webp";

export default function ImagePreview() {
  return (
    <div className="landing_img_parent">
      <div className="landing_img_container">
        <img
          src={image_png}
          srcSet={image_webp}
          type="image/webp"
          alt="Homepage Image with screenshots of GAIA"
        />
      </div>
    </div>
  );
}
