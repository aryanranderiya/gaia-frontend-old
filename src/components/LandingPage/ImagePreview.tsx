import image_png from "./images/homepage_image.png";
import image_webp from "./images/homepage_image.webp";
import LazyLoad from "react-lazyload";

export default function ImagePreview() {
  return (
    <div className="landing_img_parent">
      <div className="landing_img_container">
        <LazyLoad height={200} offset={100}>
          <img
            src={image_png}
            srcSet={image_webp}
            alt="Homepage Image with screenshots of GAIA"
          />
        </LazyLoad>
      </div>
    </div>
  );
}
