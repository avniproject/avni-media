import { Disclosure } from "@headlessui/react";
import Box from "@mui/material/Box";
import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";
import Link from "next/link";

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
      {() => (
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
                    sx={{ fontSize: 30 }}
                    onClick={() => {
                      const currentUrl = window.location.href;
                      const newUrl = currentUrl.replace(
                        /\/avni-media.*$/,
                        "#/home"
                      );
                      window.location.href = newUrl;
                    }}
                  />
                </Box>
              </Link>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}