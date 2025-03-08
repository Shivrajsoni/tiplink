import Image from "next/image";
import { PrimaryButton } from "./component/button";
import { Hero } from "./component/header";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Hero />
    </main>
  );
}
