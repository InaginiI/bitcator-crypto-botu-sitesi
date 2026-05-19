"use client";

import {
  Box,
  Flex,
  HStack,
  VStack,
  Link,
  Image,
  Text,
  IconButton,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import NextLink from "next/link";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const onToggle = () => {
    setIsOpen(!isOpen);
    console.log("Menü durumu:", !isOpen);
  };

  const bg = useColorModeValue("#ffffff", "#111117");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.800", "whiteAlpha.900");
  const secondaryColor = useColorModeValue("gray.600", "gray.200");
  const buttonBg = useColorModeValue("#318594", "#c2f6ff");
  const buttonHoverBg = useColorModeValue("#2a6f7a", "#a8f0ff");
  const buttonTextColor = useColorModeValue("#ffffff", "#01142c");

  return (
    <Box as="header" bg={bg} borderBottom="1px" borderColor={borderColor} py={4} px={10} transition="all 0.3s">
      <Flex maxW="1200px" mx="auto" align="center" justify="space-between">
        {/* Logo */}
        <HStack spacing={2}>
          <Image src="/images/logo.png" alt="Bitcator Logo" w="40px" h="40px" borderRadius="lg" objectFit="contain" />
          <Text fontSize="xl" fontWeight="bold" color={textColor}>
            Bitcator
          </Text>
        </HStack>

        {/* Mobil Menü Icon */}
        <IconButton
          aria-label="Menü"
          display={{ base: "flex", md: "none" }}
          onClick={onToggle}
          variant="ghost"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </IconButton>

        {/* Desktop Menü */}
        <HStack as="nav" gap={12} display={{ base: "none", md: "flex" }} color={secondaryColor}>
          <Link href="/" _hover={{ color: textColor }}>Ana Sayfa</Link>
          <Link href="/blog" _hover={{ color: textColor }}>Makaleler/Haberler</Link>
          <Link href="/about" _hover={{ color: textColor }}>Hakkımızda</Link>
          <Link href="/pricing" _hover={{ color: textColor }}>Ücretlendirme</Link>
          <Link href="/contact" _hover={{ color: textColor }}>İletişim</Link>
        </HStack>

        {/* Desktop Butonlar */}
        <HStack spacing={4} display={{ base: "none", md: "flex" }}>
          <ThemeToggle />
          <Link as={NextLink} href="/signIn">
            <Button variant="ghost" color={textColor}>Giriş Yap</Button>
          </Link>
          <Link as={NextLink} href="/signUp">
            <Button
              bg={buttonBg}
              _hover={{ bg: buttonHoverBg }}
              color={buttonTextColor}
            >
              Ücretsiz Başla
            </Button>
          </Link>
        </HStack>
      </Flex>

      {/* Mobil Menü */}
      {isOpen && (
        <VStack mt={4} gap={4} px={2} display={{ md: "none" }}>
          <VStack as="nav" gap={2} color={secondaryColor} align="stretch" w="full">
            <Link href="/" _hover={{ color: textColor }}>Ana Sayfa</Link>
            <Link href="/blog" _hover={{ color: textColor }}>Makaleler/Haberler</Link>
            <Link href="/about" _hover={{ color: textColor }}>Hakkımızda</Link>
            <Link href="/pricing" _hover={{ color: textColor }}>Ücretlendirme</Link>
            <Link href="/contact" _hover={{ color: textColor }}>İletişim</Link>
          </VStack>
          <ThemeToggle />
          <Link as={NextLink} href="/signIn" w="full">
            <Button variant="ghost" color={textColor} w="full">Giriş Yap</Button>
          </Link>
          <Link as={NextLink} href="/signUp" w="full">
            <Button
              w="full"
              bg={buttonBg}
              _hover={{ bg: buttonHoverBg }}
              color={buttonTextColor}
            >
              Ücretsiz Başla
            </Button>
          </Link>
        </VStack>
      )}
    </Box>
  );
}


