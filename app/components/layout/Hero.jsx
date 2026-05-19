"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Stack,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Badge,
  Image,
  SimpleGrid,
  Link,
} from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { TrendingUp, BarChart3, Activity, Sparkles } from "lucide-react";
import NextLink from "next/link";

export default function Hero() {
  const [currentPrice, setCurrentPrice] = useState("43,327");
  const [isVisible, setIsVisible] = useState(false);

  const bgLight = "linear-gradient(to bottom, #c8e4e6 0%, #f4f6fa 100%)";
  const bgDark = "linear-gradient(to bottom, #163f42 0%, #1a1a2e 100%)";
  const bg = useColorModeValue(bgLight, bgDark);
  const textColor = useColorModeValue("gray.800", "whiteAlpha.900");
  const secondaryColor = useColorModeValue("gray.600", "gray.300");
  const cardBg = useColorModeValue("white", "#1E1E28");
  const cardBorder = useColorModeValue("gray.300", "gray.600");

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      const prices = ["43,327", "43,315", "43,298", "43,322", "43,301", "43,289", "43,334"];
      setCurrentPrice(prices[Math.floor(Math.random() * prices.length)]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box as="section" bg={bg} py={{ base: 12, sm: 20 }} px={{ base: 4, sm: 6 }} overflow="hidden">
      <Flex maxW="1200px" mx="auto" direction={{ base: "column", lg: "row" }} gap={{ base: 10, lg: 16 }} align="center">
        {/* Sol Taraf */}
        <VStack
          align="start"
          gap={8}
          opacity={isVisible ? 1 : 0}
          transform={isVisible ? "translateX(0)" : "translateX(-20px)"}
          transition="all 1s"
        >
          <Badge
            colorScheme="blue"
            variant="subtle"
            px={3}
            py={1}
            borderRadius="md"
            display="flex"
            alignItems="center"
            gap={2}
          >
            <Sparkles size={16} /> AI Destekli Trading Platformu
          </Badge>

          <Heading
            fontSize={{ base: "3xl", md: "5xl", lg: "6xl" }}
            fontWeight="bold"
            color={textColor}
            lineHeight="1.2"   // satır yüksekliğini artırır
          >
            Kripto Trading'de
            <Text
              as="span"
              display="block"     // yeni satır gibi davranır
              mt={2}              // yukarıdan 2 birim boşluk (8px)
              background="linear-gradient(to right, #318594, #7ad5e6)"
              backgroundClip="text"
              color="transparent"
              fontWeight="bold"
            >
              Yapay Zeka Devrimi
            </Text>
          </Heading>


          <Text fontSize={{ base: "md", md: "xl" }} color={secondaryColor} maxW="600px">
            AI destekli botlarımız sayesinde piyasa 7/24 izlenir, fırsatlar sizin adınıza değerlendirilir.
            İşlemler uyurken bile otomatik olarak gerçekleştirilir ve kazanç elde edersiniz.
          </Text>

          {/* Butonlar */}
          <HStack gap={4} flexWrap="wrap">
            <Link as={NextLink} href="/signIn">
              <Button
                size="lg"
                bg={useColorModeValue("#318594", "#a8f0ff")}
                _hover={{ bg: useColorModeValue("#2a6f7a", "#5fc9d9"), transform: "scale(1.05)" }}
                color={useColorModeValue("white", "#01142c")}
                shadow="lg"
              >
                Ücretsiz Başla <Sparkles size={18} style={{ marginLeft: 8 }} />
              </Button>
            </Link>

            <Button
              size="lg"
              variant="outline"
              borderColor="gray.400"
              color={textColor}
              _hover={{ bg: "gray.100", borderColor: "blue.500" }}
            >
              Demo İzle
            </Button>
          </HStack>

          {/* İstatistikler */}
          <SimpleGrid columns={{ base: 1, sm: 3 }} gap={8} w="full" textAlign="center">
            <Box transition="all 0.3s" _hover={{ transform: "scale(1.05)", color: "#318594" }}>
              <Text fontSize="4xl" fontWeight="extrabold" color={textColor}>5,000+</Text>
              <Text color={secondaryColor}>Aktif Kullanıcı</Text>
            </Box>
            <Box transition="all 0.3s" _hover={{ transform: "scale(1.05)", color: "#7ad5e6" }}>
              <Text fontSize="4xl" fontWeight="extrabold" color="#7ad5e6">$50M+</Text>
              <Text color={secondaryColor}>İşlem Hacmi</Text>
            </Box>
            <Box transition="all 0.3s" _hover={{ transform: "scale(1.05)", color: "#318594" }}>
              <Text fontSize="4xl" fontWeight="extrabold" color="#318594">99.9%</Text>
              <Text color={secondaryColor}>Uptime</Text>
            </Box>
          </SimpleGrid>
        </VStack>

        {/* Sağ Taraf */}
        <Box
          border="1px solid"
          borderColor={cardBorder}
          borderRadius="lg"
          bg={cardBg}
          p={6}
          shadow="xl"
          w={{ base: "100%", lg: "60%" }}   // büyük ekranlarda %60 genişlik
          maxW="600px"
          transition="all 0.3s"
          _hover={{ transform: "scale(1.05)", shadow: "0 0 20px #85deed" }}
          opacity={isVisible ? 1 : 0}
          transform={isVisible ? "translateX(0)" : "translateX(20px)"}
        >
          <Flex justify="space-between" mb={4}>
            <Badge colorScheme="blue" px={2} py={1}>AI Analiz</Badge>
            <HStack>
              <Box w={2} h={2} bg="green.400" borderRadius="full" animation="pulse 2s infinite"></Box>
              <Text color="green.400" fontSize="sm">Canlı</Text>
            </HStack>
          </Flex>

          <Box mb={6}>
            <Flex justify="space-between" mb={2}>
              <Text fontWeight="semibold" color={textColor}>BTC/USDT</Text>
              <Text color="green.400" fontSize="sm">+1.24%</Text>
            </Flex>
            <Text fontSize="3xl" fontWeight="bold" color="green.400">${currentPrice}</Text>
          </Box>

          <Box h="260px" bg={useColorModeValue("gray.100", "gray.800")} borderRadius="lg" overflow="hidden" mb={4}>
            <Image
              src="https://247wallst.com/wp-content/uploads/2024/04/shutterstock-2159962175-huge-licensed-scaled.jpg"
              alt="Trading Chart"
              w="full"
              h="full"
              objectFit="cover"
            />
          </Box>

          {/* Kartlar */}
          <SimpleGrid columns={3} gap={4}>
            <Box p={3} borderRadius="lg" bg={useColorModeValue("gray.100", "gray.900")} textAlign="center" _hover={{ transform: "scale(1.05)", boxShadow: "0 0 15px #85deed" }} transition="all 0.3s">
              <TrendingUp size={20} style={{ margin: "auto" }} color="green" />
              <Text color="green.400" fontWeight="semibold">$43.5k</Text>
              <Text fontSize="xs" color={secondaryColor}>24h Yüksek</Text>
            </Box>
            <Box p={3} borderRadius="lg" bg={useColorModeValue("gray.100", "gray.900")} textAlign="center" _hover={{ transform: "scale(1.05)", boxShadow: "0 0 15px #85deed" }} transition="all 0.3s">
              <Activity size={20} style={{ margin: "auto" }} color="red" />
              <Text color="red.400" fontWeight="semibold">$42.7k</Text>
              <Text fontSize="xs" color={secondaryColor}>24h Düşük</Text>
            </Box>
            <Box p={3} borderRadius="lg" bg={useColorModeValue("gray.100", "gray.900")} textAlign="center" _hover={{ transform: "scale(1.05)", boxShadow: "0 0 15px #85deed" }} transition="all 0.3s">
              <BarChart3 size={20} style={{ margin: "auto" }} color="blue" />
              <Text color="blue.400" fontWeight="semibold">2.1B</Text>
              <Text fontSize="xs" color={secondaryColor}>24h Hacim</Text>
            </Box>
          </SimpleGrid>
        </Box>
      </Flex>
    </Box>
  );
}
