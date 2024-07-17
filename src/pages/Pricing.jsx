import { Tabs, Tab } from "@nextui-org/tabs";
import { Card, CardBody } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { Button } from "@nextui-org/button";
import { Tick02Icon, StarsIcon, MoneyBag02Icon } from "@/components/icons";

function PricingCard({
  title,
  description,
  type,
  price,
  featurestitle,
  features,
  durationIsMonth,
}) {
  return (
    <>
      <div
        className={`bg-white  w-full relative ${type === "main" ? "bg-opacity-[15%]" : "bg-opacity-[7%]"} `}
      >
        {type === "main" && (
          <div className="absolute -top-7 w-full flex justify-center bg-primary !rounded-tr-3xl !rounded-tl-3xl !rounded-bl-none !rounded-br-none text-black text-sm py-1 items-center gap-1 mostpopular_banner">
            Most popular <StarsIcon width="16" color="black" fill="black" />
          </div>
        )}

        <div className="p-[7%] h-full flex-col flex gap-4">
          <div className="flex flex-col !border-none">
            <span className="text-2xl flex justify-between">
              {title}
              {type === "main" && (
                <Chip
                  variant="shadow"
                  color="primary"
                  className="mostpopular_banner2"
                >
                  <div className="flex items-center gap-1 font-medium">
                    Most popular{" "}
                    <StarsIcon width="16" color="black" fill="black" />
                  </div>
                </Chip>
              )}
            </span>
            <span className="font-normal text-white text-opacity-70">
              {description}
            </span>
          </div>

          <div className="!border-none flex flex-col gap-0 !m-0">
            <div className="!border-none flex gap-2 items-baseline">
              <span className="text-5xl">
                $
                {durationIsMonth
                  ? price
                  : price * 12 - (40 / 100) * (price * 12)}
              </span>
              <span className="text-2xl">USD</span>
            </div>

            <span className="font-normal text-sm text-white text-opacity-70">
              {durationIsMonth ? "/ per month" : "/ per year"}
            </span>
            {/* 
            {!durationIsMonth && price > 0 && (
              <div className="flex text-sm items-center gap-[2px] !border-none">
                <span>Save</span>
                <span>
                  $
                  {!durationIsMonth &&
                    price * 12 - (price * 12 - (40 / 100) * (price * 12))}
                </span>
              </div>
            )} */}
          </div>

          <Button
            className="w-full font-medium"
            color="primary"
            variant={type === "main" ? "shadow" : "flat"}
          >
            Get started
          </Button>

          <div className="flex flex-col gap-1 mt-1">
            {featurestitle}

            {!!features &&
              features.map((feature) => (
                <div className="text-sm font-normal flex items-center gap-3 !border-none">
                  <Tick02Icon width="20" height="20" />
                  {feature}
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
export function PricingCards({ durationIsMonth = false }) {
  return (
    <div className="pricingcards_layout">
      <PricingCard
        durationIsMonth={durationIsMonth}
        title="Basic"
        description="lorem ipsum"
        price={0}
        features={["Feature 1", "Feature 2", "Feature 3", "Feature 4"]}
        featurestitle={
          <div className="flex flex-col mb-1 !border-none">
            <span>What's Included?</span>
          </div>
        }
      />
      <PricingCard
        title="Pro"
        description="lorem ipsum"
        price={10}
        features={["Feature 1", "Feature 2", "Feature 3", "Feature 4"]}
        durationIsMonth={durationIsMonth}
        type="main"
        featurestitle={
          <div className="flex flex-col mb-1 !border-none">
            <span>What's Included?</span>
            <span className="text-sm">Everything in Free, and:</span>
          </div>
        }
      />

      <PricingCard
        durationIsMonth={durationIsMonth}
        title="Premium"
        description="lorem ipsum"
        price={20}
        features={[
          "Feature 1",
          "Feature 2",
          "Feature 3",
          "Feature 4",
          "Feature 5",
        ]}
        featurestitle={
          <div className="flex flex-col mb-1 !border-none">
            <span>What's Included?</span>
            <span className="text-sm">Everything in Pro, and:</span>
          </div>
        }
      />
    </div>
  );
}

export default function Pricing() {
  return (
    <div className="flex justify-center h-full w-screen mt-[110px]">
      <div className="flex-col flex gap-2 items-center">
        <div className="flex items-center flex-col gap-3 mb-2 w-full">
          <Chip variant="light" color="primary" size="md">
            G.A.I.A Pricing
          </Chip>

          <span className="font-medium text-5xl text-center px-6 w-full">
            Your Personalised AI Assistant awaits.
          </span>
          <span className="text-md text-center text-foreground-400">
            Compare plans & features
          </span>
        </div>

        <div className="flex w-full flex-col items-center font-medium mt-5">
          <Tabs aria-label="Options" radius="full">
            <Tab key="monthly" title="Monthly">
              <PricingCards durationIsMonth={true} />
            </Tab>
            <Tab
              key="music"
              title={
                <div className="flex gap-2 items-center justify-center w-full">
                  Yearly
                  <Chip size="sm" variant="shadow" color="primary">
                    <div className="font-medium text-sm">Save 40%</div>
                  </Chip>
                </div>
              }
            >
              <PricingCards />
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
