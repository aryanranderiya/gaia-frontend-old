import { Accordion, AccordionItem } from "@heroui/accordion";
import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import { Tab, Tabs } from "@heroui/tabs";

import {
  ArrowLeft01Icon,
  StarsIcon,
  Tick02Icon,
} from "@/components/Misc/icons";

function FAQAccordion() {
  const faqItems = [
    {
      question: "What is Gaia and how does it work?",
      content:
        "Gaia is a general-purpose AI assistant designed to help with time management, event scheduling, email integration, and more.",
    },
    {
      question: "How do I create an account?",
      content:
        "To create an account, click on the 'Sign Up' button and fill out the registration form.",
    },
    {
      question: "What features does Gaia offer?",
      content:
        "Gaia offers features such as task management, event scheduling, email integration, and goal tracking.",
    },
    {
      question: "How can I schedule events with Gaia?",
      content:
        "Use the scheduling feature in Gaia's interface to set up and manage your events easily.",
    },
    {
      question: "Is my data secure with Gaia?",
      content:
        "Yes, we prioritize user data security with advanced encryption and privacy measures.",
    },
    {
      question: "How do I integrate Gaia with my email?",
      content:
        "Connect your email through the settings page to enable email management features.",
    },
    {
      question: "Can I customize Gaia's settings?",
      content:
        "Yes, you can adjust Gaia's settings from the preferences section in your account.",
    },
    {
      question: "How do I reset my password?",
      content:
        "Go to the login page and click 'Forgot Password' to initiate the reset process.",
    },
    {
      question: "What platforms is Gaia compatible with?",
      content: "Gaia is compatible with web, iOS, and Android platforms.",
    },
    {
      question: "How do I contact support if I have an issue?",
      content:
        "Reach out to our support team via the 'Contact Us' page or email us directly.",
    },
  ];

  return (
    <div className="sm:py-[1em] px-[5%] w-full py-[1em] flex justify-center items-center">
      <div className="mb-[10vh] faq_container mt-[20px] bg-foreground-50 p-10 rounded-3xl">
        <div className="flex flex-col justify-center w-full items-center gap-3 mb-5">
          {/* <div className="flex gap-2 -mr-[15px]"> */}
          <span className="font-medium text-4xl">
            Frequently asked questions
          </span>
          {/* <BubbleChatQuestionIcon color="foreground" height="40" width="40" className="-mt-2" /> */}
          {/* </div> */}
          {/* <span className="text-foreground-500"></span> */}
        </div>

        <Accordion variant="light">
          {faqItems.map((item, index) => (
            <AccordionItem
              key={index}
              aria-label={item.question}
              indicator={<ArrowLeft01Icon color="white" width="18" />}
              title={item.question}
            >
              <span className="select-text">{item.content}</span>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}

interface PricingCardProps {
  title: string;
  description: string;
  type: "main" | "secondary";
  price: number;
  featurestitle: React.ReactNode;
  features?: string[];
  durationIsMonth: boolean;
  className?: string;
}

export function PricingCard({
  title,
  description,
  type,
  price,
  featurestitle,
  features,
  durationIsMonth,
  className,
}: PricingCardProps) {
  return (
    <>
      <div
        className={`bg-white w-full relative ${className} ${
          type === "main"
            ? "bg-opacity-[15%]"
            : "bg-opacity-[7%] backdrop-blur-xl"
        } `}
      >
        {type === "main" && (
          <div className="absolute -top-7 w-full flex justify-center bg-primary !rounded-tr-3xl !rounded-tl-3xl !rounded-bl-none !rounded-br-none text-black text-sm py-1 items-center gap-1 mostpopular_banner">
            Most popular <StarsIcon color="black" fill="black" width="16" />
          </div>
        )}

        <div className="p-[7%] h-full flex-col flex gap-4">
          <div className="flex flex-col !border-none">
            <span className="text-2xl flex justify-between">
              {title}
              {type === "main" && (
                <Chip
                  className="mostpopular_banner2"
                  color="primary"
                  variant="shadow"
                >
                  <div className="flex items-center gap-1 font-medium">
                    Most popular{" "}
                    <StarsIcon color="black" fill="black" width="16" />
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
                  {!durationIsMonth && price * 12 - (price * 12 - (40 / 100) * (price * 12))}
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
              features.map((feature: string, index: number) => (
                <div
                  key={index}
                  className="text-sm font-normal flex items-center gap-3 !border-none"
                >
                  <Tick02Icon height="20" width="20" />
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
        description="lorem ipsum"
        durationIsMonth={durationIsMonth}
        features={["Feature 1", "Feature 2", "Feature 3", "Feature 4"]}
        featurestitle={
          <div className="flex flex-col mb-1 !border-none">
            <span>What's Included?</span>
          </div>
        }
        price={0}
        title="Basic"
        type="secondary"
      />
      <PricingCard
        description="lorem ipsum"
        durationIsMonth={durationIsMonth}
        features={["Feature 1", "Feature 2", "Feature 3", "Feature 4"]}
        featurestitle={
          <div className="flex flex-col mb-1 !border-none">
            <span>What's Included?</span>
            <span className="text-sm">Everything in Free, and:</span>
          </div>
        }
        price={10}
        title="Pro"
        type="main"
      />

      <PricingCard
        description="lorem ipsum"
        durationIsMonth={durationIsMonth}
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
        price={20}
        title="Premium"
        type="secondary"
      />
    </div>
  );
}

export default function Pricing() {
  return (
    <div className="flex justify-center h-full w-screen mt-[110px] flex-col">
      <div className="flex-col flex gap-2 items-center">
        <div className="flex items-center flex-col gap-3 mb-2 w-full">
          <Chip color="primary" size="lg" variant="light">
            Pricing
          </Chip>

          <span className="font-medium text-5xl text-center px-6 w-full">
            Your Personalised AI Assistant awaits.
          </span>
          <span className="text-md text-center text-foreground-500">
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
                  <Chip color="primary" size="sm" variant="shadow">
                    <div className="font-medium text-sm">Save 40%</div>
                  </Chip>
                </div>
              }
            >
              <PricingCards />
            </Tab>
          </Tabs>
        </div>

        <FAQAccordion />
      </div>
    </div>
  );
}
