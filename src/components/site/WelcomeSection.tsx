type WelcomeSectionProps = {
  body: string;
};

export function WelcomeSection({ body }: WelcomeSectionProps) {
  return (
    <section id="about" className="space-y-4">
      <p className="max-w-4xl whitespace-pre-line text-base leading-relaxed text-zinc-700 sm:text-lg md:text-xl">{body}</p>
    </section>
  );
}
