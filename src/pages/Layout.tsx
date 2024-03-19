// import CustomCursor from "@/components/CustomCursor/CustomCursor";
import { ModeToggle } from "@/components/ui/ModeToggle";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div
      className="min-h-screen bg-no-repeat bg-cover bg-center bg-fixed
            dark:bg-[url('/utils/pictures/background-dark.webp')]
            bg-[url('/utils/pictures/background-bright.webp')]"
      // style={{ cursor: "none" }}
    >
      <div className="p-3 flex flex-row-reverse">
        {/* <CustomCursor /> */}
        <ModeToggle />
      </div>
      <Outlet />
    </div>
  );
}

export default Layout;
