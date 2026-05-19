"use client";

import { Box, Grid, Heading, Text, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useColorModeValue } from "@/components/ui/color-mode";

const MotionBox = motion(Box);

const partners = [
  { src: "/images/binance-logo.png", alt: "Binance" },
  { src: "/images/bybit-logo.png", alt: "Bybit" },
  { src: "/images/gateio-logo.png", alt: "Gate.io" },
  { src: "/images/huobi-logo.png", alt: "Huobi" },
  { src: "/images/kucoin-logo.png", alt: "KuCoin" },
  { src: "/images/okx-logo.png", alt: "OKX" },
  { src: "/images/mexc-logo.png", alt: "MEXC Global" },
  { src: "/images/bitget-logo.png", alt: "Bitget" },
  { src: "/images/tradingview-logo.png", alt: "TradingView" },
];

export default function Partners() {
  const bg = useColorModeValue("#f4f6fa", "#1f2530");
  const cardBg = useColorModeValue("white", "#1E1E28");
  const borderColor = useColorModeValue("gray.300", "gray.600");
  const textColor = useColorModeValue("gray.800", "gray.100");
  const subText = useColorModeValue("gray.600", "gray.300");

  return (
    <Box bg={bg} py={20} px={6} transition="all 0.3s">
      <Box maxW="1200px" mx="auto">
        {/* Başlık */}
        <Box textAlign="center" mb={16}>
          <Heading fontSize={{ base: "3xl", md: "5xl" }} mb={6} color={textColor}>
            Partnerlerimiz
          </Heading>
          <Text fontSize="xl" color={subText} maxW="2xl" mx="auto">
            Dünyanın önde gelen kripto para borsaları ve platformları ile entegre çalışıyoruz
          </Text>
        </Box>

        {/* Logo Kartı */}
        <Box bg={cardBg} border="1px solid" borderColor={borderColor} borderRadius="lg" p={{ base: 6, md: 12 }} backdropFilter="blur(10px)">
          <Grid templateColumns={{ base: "repeat(2, 1fr)", sm: "repeat(3, 1fr)", md: "repeat(4, 1fr)" }} gap={{ base: 6, sm: 8, md: 10 }} justifyItems="center" alignItems="center">
            {partners.map((partner, idx) => (
              <MotionBox
                key={idx}
                w="full"
                maxW="150px"
                aspectRatio={1.5} // Chakra 2.8+ destekler
                display="flex"
                alignItems="center"
                justifyContent="center"
                cursor="pointer"
                whileHover={{ scale: 1.1 }}
                transition="all 0.3s ease"
              >
                <Image src={partner.src} alt={partner.alt} maxH="80px" objectFit="contain" />
              </MotionBox>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
