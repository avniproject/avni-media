import { Disclosure } from "@headlessui/react";
import Box from "@mui/material/Box";
import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";
import Link from "next/link";
import {getAppHomeUrl} from "@/utils/ConfigUtil";

function HomeIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

export default function Navbar() {
  return (
    <Disclosure as="nav" className="navbg-color">
      {() => {
          return (
              <>
                  <div className="relative flex justify-between h-16">
                      <div className="flex items-center flex-shrink-0 text-white ml-8">
                          <span className="text-xl tracking-tight">Avni Web Console</span>
                      </div>

                      <div className="flex-shrink-0 flex items-center ml-auto  mr-8">
                          <Link href={""}>
                              <Box
                                  sx={{
                                      "& > :not(style)": {
                                          m: 2,
                                          color: "white",
                                      },
                                  }}
                              >
                                  <HomeIcon
                                      sx={{fontSize: 30}}
                                      onClick={() => {
                                          window.location.href = getAppHomeUrl();
                                      }}
                                  />
                              </Box>
                          </Link>
                      </div>
                  </div>
              </>
          );
      }}
    </Disclosure>
  );
}
