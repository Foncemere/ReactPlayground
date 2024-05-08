import Image from "next/image";
import { HelloWorldComponent } from "@/src/1_HelloWorldComponent";
import { TicTacToeGameComponent } from "@/src/TicTacToeGameComponent";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <HelloWorldComponent />
        <TicTacToeGameComponent />
        {/*link test*/}
        <Link
          style={{ backgroundColor: "#e9faa8", display: "flex" }}
          href={"/dashboard"}
        >
          Dashboard
        </Link>
      </div>
    </main>
  );
}
