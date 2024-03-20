import { useEffect } from "react";
import { ModeToggle } from "@/components/ui/ModeToggle";
import { Outlet } from "react-router-dom";

function preLoadImages(images: any[]) {
  images.forEach((image) => {
    const img = new Image();
    img.src = image;
  });
}

function Layout() {
  useEffect(() => {
    preLoadImages([
      "/utils/pictures/background-dark.webp",
      "/utils/pictures/background-bright.webp",
    ]);
  }, []);

  return (
    <div
      className="min-h-screen bg-no-repeat bg-cover bg-center bg-fixed
            dark:bg-[url('/utils/pictures/background-dark.webp')]
            bg-[url('/utils/pictures/background-bright.webp')]"
    >
      <div className="p-3 flex flex-row-reverse">
        <ModeToggle />
      </div>
      <Outlet />
    </div>
  );
}

export default Layout;
