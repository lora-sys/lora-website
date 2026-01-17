"use client";
import { ComponentPropsWithoutRef, ReactNode, ElementType } from "react";
import { ArrowRightIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LinkPreview } from "@/components/ui/link-preview";
interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  className?: string;
}

interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
  name: string;
  className: string;
  background: ReactNode;
  Icon: ReactNode;
  description: string;
  href?: string;
  cta?: string;
  dark?: boolean;
}

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-3 gap-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  dark = false,
  ...props
}: BentoCardProps) => (
  <div
    key={name}
    className={cn(
      "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl",
      // light styles
      "bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
      // dark styles
      "dark:bg-background transform-gpu dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:[border:1px_solid_rgba(255,255,255,.1)]",
      className
    )}
    {...props}
  >
    <div className="absolute inset-0 size-full">{background}</div>
    <div className="p-4 relative z-10 flex h-full flex-col justify-between">
      <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 transition-all duration-300 lg:group-hover:-translate-y-10">
        {Icon}
        <h3
          className={cn("text-xl font-semibold", dark ? "text-white" : "text-neutral-700 dark:text-neutral-300")}>
          {name}
        </h3>
        <p className={cn("max-w-lg", dark ? "text-neutral-300" : "text-neutral-400")}>{description}</p>
      </div>

      <div
        className={cn(
          "pointer-events-none flex w-full translate-y-0 transform-gpu flex-row items-center transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 lg:hidden",
          (!href || !cta) && "hidden"
        )}
      >
        {href && cta && (
          <Button
            variant="link"
            asChild
            size="sm"
            className="pointer-events-auto p-0"
          >
            <span
              className="cursor-pointer"
              onClick={() => window.open(href!, "_blank")}
            >
              {cta}
              <ArrowRightIcon className="ms-2 h-4 w-4" />
            </span>
          </Button>
        )}
      </div>
    </div>

    {href && cta && (
      <div
        className={cn(
          "pointer-events-none absolute bottom-0 hidden w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 lg:flex"
        )}
      >
        <LinkPreview url={href!}>
           <div className="pointer-events-auto flex items-center gap-2">
             {cta}
             <ArrowRightIcon className="h-4 w-4" />
           </div>
         </LinkPreview>
      </div>
    )}

    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
  </div>
);

export { BentoCard, BentoGrid };
