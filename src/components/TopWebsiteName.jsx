import { GlobalIcon } from "./icons";

export default function WebsiteName() {
  return (
    <div>
      <div className="flex gap-2 items-center pb-3 flex-col">
        <div className="flex gap-2">
          <GlobalIcon color="white" width="15" />
          <span>g.a.i.a</span>
        </div>
        <span className="text-gray-500 flex gap-1 min-w-fit flex-nowrap text-nowrap">
          Your
          <div>
            <span className="text-gray-400">G</span>
            eneral-purpose
          </div>
          <span className="text-gray-400">AI</span>
          <div>
            <span className="text-gray-400">A</span>
            ssistant
          </div>
        </span>
      </div>
    </div>
  );
}
