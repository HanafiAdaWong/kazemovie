"use client";

import Link from "next/link";
import Image from "next/image";
import { Saira } from "@/utils/fonts";
import { cn } from "@/utils/helpers";

export interface BrandLogoProps {
  animate?: boolean;
  className?: string;
}

const BrandLogo: React.FC<BrandLogoProps> = ({ animate = false, className }) => {
  return (
    <Link href="/" className="group flex items-center gap-2">
      <Image
        src="/logo.png"
        alt="Kazemovie Logo"
        width={36}
        height={36}
        className="rounded-full transition-transform group-hover:scale-110"
        priority
      />
      <span
        className={cn(
          "flex items-center text-2xl font-semibold text-foreground/60 md:text-3xl",
          "tracking-widest transition-[letter-spacing] group-hover:tracking-[0.2em]",
          {
            "animate-shine bg-linear-to-r from-transparent from-80% via-white to-transparent bg-size-[200%_100%] bg-clip-text bg-position-[40%]": animate,
            "text-foreground": !animate,
          },
          Saira.className,
          className,
        )}
      >
        KAZE
        <span className="text-primary">MOVIE</span>
      </span>
    </Link>
  );
};

export default BrandLogo;
