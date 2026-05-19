"use client";

import { Box, Grid, Text, Flex, Link, Icon } from "@chakra-ui/react";
import { Twitter, Linkedin, Github, Mail } from "lucide-react";
import { useColorModeValue } from "@/components/ui/color-mode";

export default function Footer() {
  const bg = useColorModeValue("gray.50", "gray.900");
  const border = useColorModeValue("gray.300", "gray.600");
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "gray.100");
  const subText = useColorModeValue("gray.600", "gray.300");

  const socialLinks = [
    { icon: Twitter, href: "#" },
    { icon: Linkedin, href: "#" },
    { icon: Github, href: "#" },
    { icon: Mail, href: "#" },
  ];

  const sections = [
    {
      title: "Platform",
      links: ["Özellikler", "AI Botlar", "Fiyatlandırma", "API"],
    },
    {
      title: "Destek",
      links: ["Yardım Merkezi", "Dokümantasyon", "İletişim", "Topluluk"],
    },
    {
      title: "Yasal",
      links: ["Gizlilik Politikası", "Kullanım Şartları", "KVKK", "Çerez Politikası"],
    },
  ];

  return (
    <Box as="footer" bg={bg} borderTop="1px solid" borderColor={border} py={16} px={6} transition="all 0.3s">
      <Box maxW="1200px" mx="auto">
        <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap={8} mb={12}>
          {/* Brand */}
          <Box>
            <Text fontSize="xl" fontWeight="bold" color={textColor} mb={6}>
              Bitcator
            </Text>
            <Text color={subText} mb={6} lineHeight="1.6">
              AI destekli kripto trading platformu. Güvenli, otomatik ve karlı trading deneyimi.
            </Text>
            <Flex gap={4}>
              {socialLinks.map((item, i) => (
                <Link
                  key={i}
                  href={item.href}
                  w={10}
                  h={10}
                  borderRadius="lg"
                  bg={cardBg}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  color={subText}
                  _hover={{ color: textColor, bg: "blue.500" }}
                  transition="all 0.2s"
                >
                  <item.icon size={20} stroke="currentColor" />
                </Link>
              ))}
            </Flex>
          </Box>

          {/* Link Grupları */}
          {sections.map((section, i) => (
            <Box key={i}>
              <Text fontWeight="semibold" color={textColor} mb={6}>
                {section.title}
              </Text>
              <Box>
                {section.links.map((link, idx) => (
                  <Link
                    key={idx}
                    display="block"
                    mb={3}
                    color={subText}
                    _hover={{ color: textColor }}
                    transition="color 0.2s"
                    href="#"
                  >
                    {link}
                  </Link>
                ))}
              </Box>
            </Box>
          ))}
        </Grid>

        {/* Alt Bilgi */}
        <Flex borderTop="1px solid" borderColor={border} pt={8} direction={{ base: "column", md: "row" }} justify="space-between" align="center">
          <Text color={subText} mb={{ base: 4, md: 0 }}>
            © 2024 Bitcator. Tüm hakları saklıdır.
          </Text>
          <Text color={subText} fontSize="sm">
            Türkiye'de tasarlandı ve geliştirildi 🇹🇷
          </Text>
        </Flex>
      </Box>
    </Box>
  );
}
