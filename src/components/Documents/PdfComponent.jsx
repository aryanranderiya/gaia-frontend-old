import { Document, Page, pdfjs } from "react-pdf";
import { Spinner } from "@nextui-org/spinner";
import { Pdf02Icon } from "../icons";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

export function PdfContainer({ file, chat_bubble = false }) {
  return (
    <div
      className={`flex w-full rounded-2xl flex-col justify-center p-2 my-1 items-center text-white bg-black bg-opacity-70`}
    >
      {!!file && (
        <div className="pdf_container">
          <PdfComponent file={file} />
        </div>
      )}

      <div className="h-[50px] flex w-full items-center gap-2 px-2">
        <Pdf02Icon color="zinc-600" width="25" height="25" />
        <div className="flex flex-col">
          <span className="font-[500] text-small w-[270px] text-ellipsis whitespace-nowrap overflow-hidden">
            {file?.name}
          </span>
          <span className="text-xs">{file?.type}</span>
        </div>
      </div>
    </div>
  );
}

export function PdfComponent({ file, pageNumber = 1, width = 300 }) {
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
  ).toString();

  return (
    <Document file={file}>
      <Page
        pageNumber={pageNumber}
        width={width}
        loading={<Spinner color="primary" />}
      />
    </Document>
  );
}
