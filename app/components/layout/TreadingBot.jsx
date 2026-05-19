"use client";

import { Box, Grid, Heading, Text, Flex, Button } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useColorModeValue } from "@/components/ui/color-mode";
import { Bot, TrendingUp, TrendingDown, BarChart3 } from "lucide-react";

const MotionBox = motion(Box);

const bots = [
  {
    name: "Listing Bot",
    description:
      "Yeni coin kullanıma Binance'a listelenmek coinlerin anında tespit eder. Listeleme duyurusu yapılır yapılmaz belirlediğiniz borsadan otomatik alım yapar.",
    icon: Bot,
    gradient: "linear(to-r, teal.500, cyan.500)",
    performance: "+245%",
    status: "Aktif",
  },
  {
    name: "Delisting Bot",
    description:
      "Borsadan çıkarılacak coinleri erken tespit eder. Haber yayınlanır yayınlanmaz seçtiğiniz borsada otomatik olarak short pozisyon açar.",
    icon: TrendingDown,
    gradient: "linear(to-r, red.500, pink.500)",
    performance: "+187%",
    status: "Aktif",
  },
  {
    name: "Pump Bot",
    description:
      "Belirtilmiş coin pairlerinde hızla yükselen fiyatları tespit eder. Belirlenen orana ulaştığında otomatik alım yapar.",
    icon: TrendingUp,
    gradient: "linear(to-r, orange.500, yellow.500)",
    performance: "+312%",
    status: "Aktif",
  },
  {
    name: "Dump Bot",
    description:
      "Aniden büyük düşüş gösteren coinlerin anında yakalanır. Seçeneğinize göre otomatik işlem başlatır.",
    icon: TrendingDown,
    gradient: "linear(to-r, purple.500, indigo.500)",
    performance: "+156%",
    status: "Aktif",
  },
  {
    name: "Standard Bot",
    description:
      "Kendi kurallarınızı belirleyip al-sat bot. Manuel veya otomatik stratejilerle istediğiniz gibi konfigüre edebilirsiniz.",
    icon: BarChart3,
    gradient: "linear(to-r, blue.500, teal.500)",
    performance: "+198%",
    status: "Aktif",
  },
];

export default function TradingBots() {
  const bg = useColorModeValue("#f4f6fa", "#1f2530");
  const bgLight = "linear-gradient(to bottom, #c8e4e6 0%, #f4f6fa 100%)";
  const bgDark = "linear-gradient(to bottom, #163f42 0%, #1a1a2e 100%)";
  const cardBg = useColorModeValue(bgLight, bgDark);
  const borderColor = useColorModeValue("gray.300", "gray.600");
  const textColor = useColorModeValue("gray.800", "gray.100");
  const subText = useColorModeValue("gray.600", "gray.300");

  return (
    <Box bg={bg} py={20} px={6}>
      <Box textAlign="center" mb={16}>
        <Box
          as="span"
          px={4}
          py={2}
          borderRadius="md"
          color={useColorModeValue("#318594", "#7ad5e6")}
          border="1px solid"
          borderColor={useColorModeValue("#318594", "#7ad5e6")}
          bg={useColorModeValue("#f0fafe", "#1a2332")}
          display="inline-block"
          mb={16}
          fontSize="sm"
          fontWeight="medium"
        >
          🤖 AI Trading Botları
        </Box>

        <Heading fontSize={{ base: "3xl", md: "5xl", lg: "6xl" }} mb={6} color={textColor}>
          Akıllı <Text as="span" background="linear-gradient(to right, #318594, #7ad5e6)" backgroundClip="text" color="transparent">Botlar</Text> ile Otomatik Kazanç
        </Heading>
        <Text fontSize="xl" color={subText} maxW="3xl" mx="auto">
          Farklı piyasa koşulları için özel olarak tasarlanmış AI destekli trading botları
        </Text>
      </Box>

      {/* Bot Kartları */}
      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)", xl: "repeat(5, 1fr)" }} gap={6} mb={12}>
        {bots.map((bot, index) => {
          const IconComp = bot.icon;
          return (
            <MotionBox
              key={index}
              bg={cardBg}
              border="1px solid"
              borderColor={borderColor}
              borderRadius="lg"
              p={8}
              boxShadow="md"
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px #85deed" }}
              transition="all 0.3s"
            >
              <Flex
                w={14}
                h={14}
                bgGradient={bot.gradient}
                borderRadius="lg"
                align="center"
                justify="center"
                mb={5}
              >
                <IconComp size={28} stroke={useColorModeValue("#000000", "#FFFFFF")} strokeWidth={2} />
              </Flex>

              <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
                {bot.name}
              </Text>
              <Text fontSize="md" color={subText} mb={8} lineHeight="1.6">
                {bot.description}
              </Text>

              <Box>
                <Flex justify="space-between" mb={3}>
                  <Text fontSize="md" color={subText}>Ortalama Getiri</Text>
                  <Text color="green.400" fontWeight="bold" fontSize="lg">{bot.performance}</Text>
                </Flex>
                <Flex justify="space-between" align="center">
                  <Text fontSize="md" color={subText}>Durum</Text>
                  <Flex align="center" color="green.400" fontWeight="bold" fontSize="md">
                    <Box w={3} h={3} borderRadius="full" bg="green.400" mr={2} />
                    {bot.status}
                  </Flex>
                </Flex>
              </Box>
            </MotionBox>
          );
        })}
      </Grid>

      {/* CTA */}
      <Box textAlign="center">
        <Button
          bg={useColorModeValue("#318594", "#c2f6ff")}
          _hover={{ bg: useColorModeValue("#2a6f7a", "#a8f0ff") }}
          px={8}
          py={3}
          color={useColorModeValue("white", "#01142c")}
          fontWeight="bold"
        >
          Tüm Botları Keşfet
        </Button>
        <Text fontSize="sm" color={subText} mt={4}>
          Tüm botlar 7/24 çalışır ve piyasa koşullarına anında adapte olur
        </Text>
      </Box>
    </Box>
  );
}
