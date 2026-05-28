import { useEffect, useRef, useState } from "react";
import { FaDownload } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

function InstallPWA() {
  const deferredPromptRef = useRef(null);
  const [showInstall, setShowInstall] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
      return;
    }

    const handler = (e) => {
      e.preventDefault();
      deferredPromptRef.current = e;

      setTimeout(() => {
        setShowInstall(true);
      }, 3000);
    };

    window.addEventListener("beforeinstallprompt", handler);

    // Listen for successful install
    window.addEventListener("appinstalled", () => {
      setIsInstalled(true);
      setShowInstall(false);
    });

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const installApp = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!deferredPromptRef.current) {
      alert("Install prompt not available");
      return;
    }


    deferredPromptRef.current.prompt();

    deferredPromptRef.current.userChoice.then((choiceResult) => {
      setShowInstall(false);
      deferredPromptRef.current = null;
    });
  };

  const closeBox = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowInstall(false);
  };

  if (isInstalled || !showInstall) return null;

  return (
    <div
      className="fixed bottom-4 left-4 z-[999999] m-4 w-[90%] sm:w-[320px] rounded-2xl border border-gray-700 bg-black p-4 text-white shadow-2xl"
      style={{ zIndex: 999999 }}
    >
      {/* Close Button */}
      <button
        onClick={closeBox}
        className="absolute right-3 top-3 text-gray-400 hover:text-white cursor-pointer"
        aria-label="Close"
        type="button"
      >
        <IoClose size={24} />
      </button>

      <div className="flex gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10">
          <FaDownload size={18} />
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold">Install App</h3>
          <p className="mt-1 text-sm text-gray-300">
            Install UP 50 Tattoo Studio App for faster access.
          </p>

          <button
            onClick={installApp}
            type="button"
            className="mt-4 flex cursor-pointer items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-black hover:bg-gray-200"
          >
            <FaDownload />
            Install Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default InstallPWA;
