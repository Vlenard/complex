"use client";

import { useActionState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { Button } from "@/components/ui/button";
import { LangSelector } from "@/components/ui/lang-selector";
import Link from "next/link";
import LoginAction from "@/actions/LoginAction";

export default function SignIn() {
  const { localization, language } = useI18n();
  const [state, action, pending] = useActionState(LoginAction, {});

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex justify-end h-16 p-4">
        <LangSelector />
      </div>

      <div className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-md space-y-6 border border-border p-8 rounded-lg shadow-sm bg-card">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">{localization.signIn}</h1>
            <p className="text-sm text-muted-foreground">
              {localization.signInDescription}
            </p>
          </div>
          <form action={action} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Email
              </label>
              <input
                name="email"
                type="email"
                required
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {localization.password}
              </label>
              <input
                name="password"
                type="password"
                required
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            {state.error && (
              <p className="text-sm text-destructive">{state.error}</p>
            )}
            <Button type="submit" className="w-full" disabled={pending}>
              {localization.signInButtonText}
            </Button>
          </form>
          <div className="text-center text-sm">
            <Link
              href={`/${language}/sign-up`}
              className="underline underline-offset-4 hover:text-primary"
            >
              {localization.signUp}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
