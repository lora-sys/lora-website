import Image from "next/image";
import { life } from "@/config/content";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { Marquee } from "@/components/ui/marquee";
import { TweetCard } from "@/components/ui/tweet-card";
import { DotPattern } from "@/components/ui/dot-pattern";
import { MagicCard } from "@/components/ui/magic-card";

export function LifeSection() {
  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden py-20">
      <div className="absolute inset-0 -z-10">
        <DotPattern className="[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]" width={20} height={20} cx={1} cy={1} cr={1} glow={true} sparse={true} />
      </div>

      <div className="container px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Life & Interests</h2>
          <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground">
            A glimpse into what inspires me, from gaming and tech to cinema and wisdom.
          </p>
        </div>

        <BentoGrid className="mb-16">
          {life.hobbies.map((hobby) => {
            const { Icon, ...rest } = hobby;
            return (
              <BentoCard
                key={rest.name}
                {...rest}
                name="" // Hide default name
                description="" // Hide default description
                Icon={
                  <>
                    <Icon className="h-12 w-12 origin-left transform-gpu text-white transition-all duration-300 ease-in-out group-hover:scale-75" />
                    <div className="absolute inset-0 -m-4 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 lg:group-hover:translate-y-10 pointer-events-none">
                      <h3 className="text-xl font-bold text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300 mb-1">
                        {rest.name}
                      </h3>
                      <p className="text-neutral-200 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                        {rest.description}
                      </p>
                    </div>
                  </>
                }
                background={
                  <div className="absolute inset-0">
                    <Image
                      src={rest.background}
                      alt={rest.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105 opacity-100"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                  </div>
                }
              />
            );
          })}
        </BentoGrid>

        <div className="space-y-12">
          <div className="flex flex-col space-y-4">
            <h3 className="text-2xl font-bold ml-4">Favorite Tweets</h3>
            <Marquee pauseOnHover className="[--duration:15s] py-4">
              {life.tweets.map((tweet) => (
                <TweetCard
                  key={tweet.id}
                  id={tweet.id}
                  staticData={tweet}
                  className="mx-4 w-full max-w-[300px] md:max-w-[400px]"
                />
              ))}
            </Marquee>
          </div>

          <div className="flex flex-col space-y-4">
            <h3 className="text-2xl font-bold ml-4">Anime Wisdom</h3>
            <Marquee reverse pauseOnHover className="[--duration:15s] py-4">
              {life.quotes.map((quote, idx) => (
                <MagicCard
                  key={idx}
                  className="mx-4 flex h-full w-[300px] md:w-[400px] flex-col justify-center rounded-xl border p-6"
                  gradientColor="#262626"
                >
                  <blockquote className="mb-4 text-lg italic leading-relaxed text-neutral-600 dark:text-neutral-300">
                    &quot;{quote.text}&quot;
                  </blockquote>
                  <div className="flex flex-col">
                    <cite className="font-semibold not-italic text-neutral-800 dark:text-neutral-100">
                      {quote.author}
                    </cite>
                    <span className="text-sm text-muted-foreground">
                      {quote.from}
                    </span>
                  </div>
                </MagicCard>
              ))}
            </Marquee>
          </div>
        </div>
      </div>
    </section>
  );
}
