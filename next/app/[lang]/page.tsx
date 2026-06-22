"use client";

import Link from "next/link";
import { useI18n } from "@/components/i18n-provider";
import { Button } from "@/components/ui/button";
import { LangSelector } from "@/components/ui/lang-selector";
import Image from "next/image";
import img from "../../public/landing.png";
import { Pacifico } from "next/font/google";

const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pacifico",
});

export default function Page() {
  const { localization, language } = useI18n();

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex justify-end h-16 p-2">
        <LangSelector />
      </div>

      <div className="flex flex-1">
        <div className="flex flex-col justify-center items-center flex-1">
          <div>
            <h1
              className={
                "text-8xl gradiant-text uppercase italic pe-8 -translate-x-4 " +
                pacifico.className
              }
            >
              Rbeer
            </h1>
            <p className="mt-5">{localization.slogan}</p>
            <div className="flex space-x-2 mt-5">
              <Button className="px-4" asChild>
                <Link href={`/${language}/sign-in`}>{localization.signIn}</Link>
              </Button>
              <Button className="px-4" asChild>
                <Link href={`/${language}/sign-up`}>{localization.signUp}</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center flex-1">
          <Image src={img} alt="Landing image" className="rounded-lg" />
        </div>
      </div>
    </div>
  );
}
