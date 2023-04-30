/* This example requires Tailwind CSS v2.0+ */
import { Disclosure } from "@headlessui/react";
import Link from "next/link";
import { HomeFilled } from "@ant-design/icons";


export default function Navbar() {
  return (
    <Disclosure as="nav" className="navbg-color">
      {() => (
        <>
          <div className="relative flex justify-between h-16">
            <div className="flex items-center flex-shrink-0 text-white ml-8">
              <span className="text-xl tracking-tight">Avni Web Console</span>
            </div>
            <div className="flex-shrink-0 flex items-center ml-auto  mr-32">
              <Link href="/">
                <HomeFilled style={{ fontSize: 24, color: "#fff" }} />
              </Link>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
