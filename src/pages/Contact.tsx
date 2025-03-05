import { Button } from "@heroui/button";

const ContactPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen w-screen p-6">
      <div className="max-w-lg w-full bg-zinc-900 rounded-2xl shadow-lg p-8 text-center">
        <h1>Need Help?</h1>
        <p className="mt-2 text-foreground-500">
          For any assistance or inquiries, feel free to reach out to us.
        </p>
        <a href="mailto:support@heygaia.io">
          <Button
            className="mt-4 text-primary"
            color="primary"
            radius="full"
            variant="flat"
          >
            Email us at:
            <b>support@heygaia.io</b>
          </Button>
        </a>
      </div>
    </div>
  );
};

export default ContactPage;
