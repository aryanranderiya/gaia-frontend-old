import { Link } from "react-router-dom";
import MadeBy from "@/components/LandingPage/MadeBy";

export default function Footer() {
  return (
    <>
      <div className="w-screen flex justify-center items-center p-20">
        <div className="w-full max-w-screen-md flex justify-between items-start">
          <div className="flex flex-col w-fit h-full text-foreground-500">
            <div className="text-3xl font-medium text-white">G.A.I.A</div>
            <div>© 2024 GAIA</div>
            <div className="text-foreground-400">heygaia.io</div>
          </div>

          <div className="flex flex-col w-fit h-full text-foreground-500">
            <div className="text-xl font-medium text-white">Resources</div>
            <div>
              <Link to="/blog" className="hover:underline hover:text-white">
                Blog
              </Link>
            </div>
            <div>
              <Link to="/contact" className="hover:underline hover:text-white">
                Contact
              </Link>
            </div>
            <div>
              <Link to="/faq" className="hover:underline hover:text-white">
                FAQ
              </Link>
            </div>
          </div>

          <div className="flex flex-col w-fit h-full text-foreground-500">
            <div className="text-xl font-medium text-white">Legal</div>
            <div>
              <Link to="/terms" className="hover:underline hover:text-white">
                Terms
              </Link>
            </div>
            <div>
              <Link to="/privacy" className="hover:underline hover:text-white">
                Privacy
              </Link>
            </div>
          </div>

          <div className="flex flex-col w-fit h-full text-foreground-500">
            <div className="text-xl font-medium text-white">Pages</div>
            <div>
              <Link to="/page1" className="hover:underline hover:text-white">
                Page 1
              </Link>
            </div>
            <div>
              <Link to="/page2" className="hover:underline hover:text-white">
                Page 2
              </Link>
            </div>
            <div>
              <Link to="/page3" className="hover:underline hover:text-white">
                Page 3
              </Link>
            </div>
          </div>
        </div>
      </div>
      <MadeBy />
    </>
  );
}
