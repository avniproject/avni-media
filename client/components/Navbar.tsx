/* This example requires Tailwind CSS v2.0+ */
import { Disclosure } from "@headlessui/react";
import Link from "next/link";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  return (
    <Disclosure as="nav" className="bg-blue-500">
      {({ open }) => (
        <>
          <div className="relative flex justify-between h-16">
            <div className="flex items-center flex-shrink-0 text-white ml-8">
              <span className="font-semibold text-xl tracking-tight">
               Avni Web Console
              </span>
            </div>
            <div className="flex-shrink-0 flex items-center ml-auto  mr-32">
              <Link href="/">
                <img
                  className="hidden lg:block h-8 w-auto"
                  src="home.png"
                  alt="home button"
                />
              </Link>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
