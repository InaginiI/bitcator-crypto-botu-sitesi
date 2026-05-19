"use client";

import { Box, Grid, Heading, Text, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Shield, Lock, Eye, Database } from "lucide-react";
import { useColorModeValue } from "@/components/ui/color-mode";

const MotionBox = motion(Box);

const securityFeatures = [
  {
    title: "Gelişmiş Şifreleme",
    description: "Tüm verileriniz 256-bit SSL şifreleme ile korunur",
    icon: Lock,
  },
  {
    title: "İki Faktörlü Kimlik Doğrulama",
    description: "Hesabınız için ekstra güvenlik katmanı",
    icon: Shield,
  },
  {
    title: "İzole Sunucular",
    description: "Botlar tamamen izole ortamda çalışır",
    icon: Database,
  },
  {
    title: "Şeffaf İşlemler",
    description: "Tüm işlemlerinizi gerçek zamanlı takip edin",
    icon: Eye,
  },
];

export default function Security() {
  const bg = useColorModeValue("#f4f6fa", "#1f2530");
  const cardBg = useColorModeValue("white", "#1E1E28");
  const borderColor = useColorModeValue("gray.300", "gray.600");
  const textColor = useColorModeValue("gray.800", "gray.100");
  const subText = useColorModeValue("gray.600", "gray.300");
  const badgeBg = useColorModeValue("blue.500", "blue.400");

  return (
    <Box bg={bg} py={20} px={6} transition="all 0.3s">
      <Box maxW="1200px" mx="auto">
        <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={12} alignItems="center">
          {/* Sol Taraf */}
          <Box>
            <Heading fontSize={{ base: "3xl", md: "4xl" }} mb={6} color={textColor}>
              Kurumsal Düzeyde Güvenlik
            </Heading>
            <Text fontSize="xl" color={subText} mb={8}>
              Fonlarınız ve verileriniz en yüksek güvenlik standartları ile korunur
            </Text>

            <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>
              {securityFeatures.map((feature, index) => {
                const IconComp = feature.icon;
                return (
                  <Flex key={index} align="start" gap={4}>
                    <Flex
                      w={10}
                      h={10}
                      bgGradient="linear(to-r, #318594, #7ad5e6)"
                      borderRadius="lg"
                      align="center"
                      justify="center"
                      flexShrink={0}
                    >
                      <IconComp size={20} stroke={useColorModeValue("#000000", "#FFFFFF")} strokeWidth={2} />
                    </Flex>
                    <Box>
                      <Text fontWeight="bold" color={textColor} mb={1}>
                        {feature.title}
                      </Text>
                      <Text fontSize="sm" color={subText}>
                        {feature.description}
                      </Text>
                    </Box>
                  </Flex>
                );
              })}
            </Grid>
          </Box>

          {/* Sağ Taraf - Güvenlik Sertifikaları */}
          <Box bg={cardBg} border="1px solid" borderColor={borderColor} borderRadius="lg" p={8} boxShadow="md">
            <Box textAlign="center" mb={8}>
              <Shield size={64} stroke="white" strokeWidth={1.5} style={{ margin: "0 auto" }} />
              <Heading fontSize="2xl" color={textColor} mt={4} mb={2}>
                Güvenlik Garantileri
              </Heading>
              <Text color={subText}>Uluslararası güvenlik sertifikalarımız</Text>
            </Box>

            {/* Sertifikalar */}
            {["SOC 2 Type II", "ISO 27001", "PCI DSS", "GDPR Uyumlu"].map((cert, i) => (
              <Flex
                key={i}
                justify="space-between"
                align="center"
                p={4}
                mb={3}
                borderRadius="lg"
                bg={useColorModeValue("gray.100", "#1E1E28")}
              >
                <Flex align="center" gap={3}>
                  <Box w={2} h={2} borderRadius="full" bg="green.400" />
                  <Text fontWeight="medium" color={textColor}>
                    {cert}
                  </Text>
                </Flex>
                <Box w={2} h={2} borderRadius="full" bg="green.400" />
              </Flex>
            ))}

            {/* Alt Bilgi */}
            <Box
              mt={8}
              p={4}
              bg={useColorModeValue("blue.50", "#1a2332")}
              border="1px solid"
              borderColor={useColorModeValue("blue.200", "#318594")}
              borderRadius="lg"
            >
              <Flex align="center" gap={2} mb={2}>
                <Shield size={20} stroke={useColorModeValue("blue.500", "#7ad5e6")} />
                <Text color={useColorModeValue("blue.600", "#7ad5e6")} fontWeight="medium">
                  Fon Güvenliği
                </Text>
              </Flex>
              <Text fontSize="sm" color={subText}>
                Botlarımız sadece işlem yapma yetkisine sahiptir. Fonlarınıza hiçbir zaman dokunmaz, çekme yetkisi vermez.
              </Text>
            </Box>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
}
