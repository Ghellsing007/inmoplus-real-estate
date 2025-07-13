"use client";

import { Navbar } from "@/components/shared/Navbar";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function orderConfirmationPage() {
  return (
    <div>
      <Navbar />
      <div className="p-6 mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <h1 className="text-2xl">!Muchas gracias por confiar en nosotros!</h1>
          <p>
          En breves momentos recibirás toda la informacion a traves de tu correo
          electronico.
          </p>
         
          <p>Puedes visualizar todas tus reservas dentro de tu Área</p>
          <Link href="/cars">
            <Button>Volver a ver los productos</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
