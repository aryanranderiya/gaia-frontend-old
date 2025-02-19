import { PricingCard } from "@/pages/Pricing";

export default function FreePricing() {
  return (
    <div className="w-screen min-h-fit flex items-center justify-center relative flex-col gap-2">
      <div className="mb-6">
        <div className="font-medium text-5xl text-center">GAIA is FREE!</div>
        <div className="font-normal text-lg text-center text-foreground-700 px-5">
          Unlock limitless AI-powered possibilities without spending anything.
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center h-full w-full">
        <img
          src="landing/sphere.png"
          alt="Sphere background"
          className="h-full sm:max-w-[50vw] object-contain sm:top-[40vh] top-[10vh] relative filter z-[-1]"
        />
      </div>
      <div className="max-w-screen-lg w-full relative flex justify-center">
        <div className="w-[300px]">
          <PricingCard
            durationIsMonth={true}
            title="Free"
            description=""
            price={0}
            type="secondary"
            features={["Feature 1", "Feature 2", "Feature 3", "Feature 4"]}
            className="rounded-2xl !bg-zinc-900 !bg-opacity-[100%] !backdrop-blur-none"
            featurestitle={
              <div className="flex flex-col mb-1 !border-none">
                <span>What's Included?</span>
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
}
