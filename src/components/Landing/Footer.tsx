import { Link } from "react-router-dom";

import MadeBy from "@/components/Landing/MadeBy";

export default function Footer() {
  return (
    <div className="!m-0">
      <div className="w-screen flex h-fit justify-center items-center sm:p-20 p-5">
        <div className="w-full max-w-screen-lg grid grid-cols-1 sm:grid-cols-4 gap-8 ">
          <div className="flex flex-col w-fit h-full text-foreground-500">
            <div className="text-3xl font-medium text-white">G.A.I.A</div>
            <div>© 2024 GAIA</div>
            <div className="text-foreground-400">heygaia.io</div>
          </div>

          <div className="flex flex-col w-fit h-full text-foreground-500">
            <div className="text-xl font-medium text-white">Resources</div>
            <div>
              <Link className="hover:underline hover:text-white" to="/blog">
                Blog
              </Link>
            </div>
            <div>
              <Link className="hover:underline hover:text-white" to="/contact">
                Contact
              </Link>
            </div>
            <div>
              <Link className="hover:underline hover:text-white" to="/faq">
                FAQ
              </Link>
            </div>
          </div>

          <div className="flex flex-col w-fit h-full text-foreground-500">
            <div className="text-xl font-medium text-white">Legal</div>
            <div>
              <Link className="hover:underline hover:text-white" to="/terms">
                Terms
              </Link>
            </div>
            <div>
              <Link className="hover:underline hover:text-white" to="/privacy">
                Privacy
              </Link>
            </div>
          </div>

          <div className="flex flex-col w-fit h-full text-foreground-500">
            <div className="text-xl font-medium text-white">Pages</div>
            <div>
              <Link className="hover:underline hover:text-white" to="/page1">
                Page 1
              </Link>
            </div>
            <div>
              <Link className="hover:underline hover:text-white" to="/page2">
                Page 2
              </Link>
            </div>
            <div>
              <Link className="hover:underline hover:text-white" to="/page3">
                Page 3
              </Link>
            </div>
          </div>
        </div>
      </div>
      <MadeBy />
    </div>
  );
}
