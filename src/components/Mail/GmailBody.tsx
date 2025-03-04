import { Spinner } from "@heroui/spinner";
import DOMPurify from "dompurify";
import { useEffect, useRef, useState } from "react";

interface Email {
  payload: {
    headers: { name: string; value: string }[];
    parts: { mimeType: string; body: { data: string } }[];
  };
}

export const decodeBase64 = (str: string): string => {
  try {
    const decoded = atob(str.replace(/-/g, "+").replace(/_/g, "/"));
    return decodeURIComponent(escape(decoded)); // Ensures proper UTF-8 decoding
  } catch (error) {
    console.error("Error decoding Base64 string:", error);
    return "";
  }
};

export default function GmailBody({ email }: { email: Email }) {
  if (!email) return null;

  const [loading, setLoading] = useState(true);

  const htmlPart: string | undefined = email.payload.parts?.find(
    (p) => p.mimeType === "text/html"
  )?.body?.data;
  const plainPart: string | undefined = email.payload.parts?.find(
    (p) => p.mimeType === "text/plain"
  )?.body?.data;

  const decodedHtml: string | null = htmlPart
    ? decodeBase64(htmlPart)
    : email.payload.body?.data
    ? decodeBase64(email.payload.body.data)
    : null;

  const decodedText: string = plainPart
    ? decodeBase64(plainPart)
    : "No content available";

  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const adjustIframeHeight = () => {
    if (iframeRef.current) {
      try {
        const iframeDoc =
          iframeRef.current.contentDocument ||
          iframeRef.current.contentWindow?.document;
        if (iframeDoc) {
          const newHeight = iframeDoc.body.scrollHeight + 30;
          iframeRef.current.style.height = `${newHeight}px`;
        }
      } catch (error) {
        console.error("Error adjusting iframe height", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    // If there's no HTML content, set loading to false immediately.
    if (!decodedHtml) setLoading(false);
  }, [decodedHtml]);

  useEffect(() => {
    const iframeCurrent = iframeRef.current;
    if (iframeCurrent) {
      iframeCurrent.addEventListener("load", adjustIframeHeight);
      return () => {
        iframeCurrent.removeEventListener("load", adjustIframeHeight);
      };
    }
  }, [decodedHtml]);

  return (
    <div className="max-w-2xl shadow-md relative overflow-auto">
      {loading && (
        <div className="h-full w-full z-10 absolute inset-0 flex justify-center items-start p-10 backdrop-blur-3xl bg-black/90">
          <Spinner color="primary" className="z-[11]" size="lg" />
        </div>
      )}
      {decodedHtml ? (
        <iframe
          ref={iframeRef}
          title="email-content"
          srcDoc={DOMPurify.sanitize(decodedHtml, {
            ADD_ATTR: ["target"],
            ADD_TAGS: ["iframe"],
          })}
          style={{
            width: "100%",
            border: "none",
            overflow: "hidden",
          }}
          sandbox="allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-top-navigation"
        />
      ) : (
        <div className="p-6">
          <p className="text-gray-800 whitespace-pre-wrap">{decodedText}</p>
        </div>
      )}
    </div>
  );
}
