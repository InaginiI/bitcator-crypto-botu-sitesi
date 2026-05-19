"use client";

import { IconButton } from "@chakra-ui/react";
import { useColorMode } from "../ui/color-mode";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <IconButton
        aria-label="Tema Değiştir"
        variant="ghost"
      >
        <Sun size={18} />
      </IconButton>
    );
  }

  return (
    <IconButton
      aria-label="Tema Değiştir"
      onClick={toggleColorMode}
      variant="ghost"
    >
      {colorMode === "light" ? <Moon size={18} /> : <Sun size={18} />}
    </IconButton>
  );
}
