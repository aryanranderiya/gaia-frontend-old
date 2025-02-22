const ContactPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen w-screen p-6 bg-custom-gradient">
      <div className="max-w-lg w-full bg-zinc-900 rounded-2xl shadow-lg p-8 text-center">
        <h1 className="text-2xl font-semibold">Need Help?</h1>
        <p className="text-foreground-600 mt-2">
          For any assistance or inquiries, feel free to reach out to us.
        </p>
        <a
          href="mailto:support@heygaia.io"
          className="inline-block mt-4 bg-primary text-white font-medium py-2 px-6 rounded-lg hover:bg-[#00bbff80] transition"
        >
          Email us @ heygaia.io
        </a>
      </div>
    </div>
  );
};

export default ContactPage;
