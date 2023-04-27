/* This example requires Tailwind CSS v2.0+ */
import { Disclosure } from "@headlessui/react";
import Link from "next/link";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  return (
    <Disclosure as="nav" className= "navbg-color"
>
      {({ open }) => (
        <>
          <div className="relative flex justify-between h-16">
            <div className="flex items-center flex-shrink-0 text-white ml-8">
              <span className="text-xl tracking-tight">
               Avni Media Viewer
              </span>
            </div>
            <div className="flex-shrink-0 flex items-center ml-auto  mr-8">
              <IconButton
                onClick={() =>
                  {
                    const currentUrl = window.location.href;
                    const newUrl = currentUrl.replace("avni-media", "/#/home");
                    window.location.href = newUrl;
                  }
                }
                aria-label="Home"
                color="inherit">
                <HomeIcon style={{ color: "white" }} />
              </IconButton>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
