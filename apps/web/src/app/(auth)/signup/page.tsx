import { SignupForm } from "./signup-form";
import { typeClassMobile } from "@/lib/typography";

export const metadata = {
  title: "Sign up · Wicky",
  description: "Create an account to start your almanac of learning.",
};

export default function SignupPage() {
  return (
    <div className="flex-1 flex flex-col justify-center px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto w-full max-w-sm">
        <div className="mb-6 sm:mb-8 text-center">
          <h1 className={typeClassMobile("h1")}>Wicky</h1>
          <p className="mt-2 font-display text-[16px] italic text-muted-foreground sm:text-[18px]">
            An almanac of learning.
          </p>
        </div>
        <SignupForm />
      </div>
    </div>
  );
}
