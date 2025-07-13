import { Navbar } from "@/components/shared/Navbar";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function orderErrorPage() {
  return (
    <div>
      <Navbar />
      <div className="p-6 mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <h1 className="text-2xl">!OPS! Ha ocurrido un error. Vuelva a intentarlo mas tarde</h1>
          <Link href="/">
            <Button>Volver a ver los productos</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
