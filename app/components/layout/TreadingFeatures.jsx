"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Grid,
  Heading,
  Text,
  Flex,
  Badge,
} from "@chakra-ui/react";
import { motion, useAnimation, useMotionValue } from "framer-motion";
import { useColorModeValue } from "@/components/ui/color-mode";
import { Bot, Target, Users, BarChart3, Zap, Shield } from "lucide-react";

const MotionBox = motion(Box);

const features = [
  {
    title: "100% Otomatik AI-Sat",
    description:
      "AI destekli botlar sayesinde piyasa 7/24 izlenir, fırsatlar sizin adınıza değerlendirilir. İşlemler uyurken bile otomatik olarak gerçekleştirilir.",
    icon: Bot,
    gradient: "linear(to-r, orange.500, yellow.500)",
  },
  {
    title: "Kendi Stratejinizi Oluşturun",
    description:
      "Sıfırdan kendi kurallarınızı tanımlayın veya hazır başarılı botlardan birini birkaç tıkla devreye alın, teknik bilgi gerekmez.",
    icon: Target,
    gradient: "linear(to-r, blue.500, cyan.500)",
  },
  {
    title: "Komisyon ve Gizli Ücret Yok",
    description:
      "Kullanıcı dostu fiyatlandırma ile sürpriz maliyetlerle karşılaşmazsınız. Net, şeffaf ve sabit sistem sunuyoruz.",
    icon: Shield,
    gradient: "linear(to-r, teal.500, green.500)",
  },
  {
    title: "Sosyal Trading",
    description:
      "Başarılı trader'ların stratejilerini kopyalayın ve onların deneyimlerinden faydalanın. Topluluktan öğrenin ve kazanın.",
    icon: Users,
    gradient: "linear(to-r, purple.500, indigo.500)",
  },
  {
    title: "Gelişmiş Analitik",
    description:
      "Detaylı raporlar, performans metrikleri ve risk analizi ile portföyünüzü optimize edin. Veriye dayalı kararlar alın.",
    icon: BarChart3,
    gradient: "linear(to-r, pink.500, red.500)",
  },
  {
    title: "Hızlı Destek",
    description:
      "7/24 canlı destek ekibimiz her zaman yanınızda. Teknik sorunlardan stratejik tavsiyelere kadar her konuda yardım alın.",
    icon: Zap,
    gradient: "linear(to-r, indigo.500, purple.500)",
  },
];


export default function TradingFeatures() {
  const [visibleCards, setVisibleCards] = useState([]);
  const [hasMounted, setHasMounted] = useState(false);
  const sectionRef = useRef(null);

  const controls = useAnimation();
  const x = useMotionValue(0);
  const [isPaused, setIsPaused] = useState(false);
  const raf = useRef();


  useEffect(() => {
    let lastTime = performance.now();

    const tick = (now) => {
      const delta = now - lastTime;
      lastTime = now;

      if (!isPaused) {
        // px/ms hız (örn. 0.05 → 50px/saniye)
        const speed = 0.05;
        x.set(x.get() - delta * speed);

        // Kartın genişliği + gap = 316px (300px + 16px)
        // features.length * 316 kadar kaydırınca başa dön
        const cardWidth = 316;
        const totalWidth = features.length * cardWidth;

        if (x.get() <= -totalWidth) {
          x.set(0);
        }
      }
      raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [isPaused, x]);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            features.forEach((_, i) =>
              setTimeout(() => setVisibleCards((prev) => {
                if (!prev.includes(i)) return [...prev, i];
                return prev;
              }), i * 150)
            );
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasMounted]);

  const bg = useColorModeValue("#f4f6fa", "#163f42");
  const cardBg = useColorModeValue("white", "#1E1E28");
  const borderColor = useColorModeValue("gray.300", "gray.600");
  const textColor = useColorModeValue("gray.800", "gray.100");
  const subText = useColorModeValue("gray.600", "gray.300");

  return (
    <Box ref={sectionRef} bg={bg} py={20} px={6} overflow="hidden">
      <Box textAlign="center" mb={16}>
        <Badge mb={6} px={3} py={1} colorScheme="blue">
          ⭐ Özellikler
        </Badge>

        <Heading fontSize={{ base: "3xl", md: "5xl" }} mb={6} color={textColor}>
          Güçlü Trading{" "}
          <Text as="span" background="linear-gradient(to right, #318594, #7ad5e6)" backgroundClip="text" color="transparent">
            Özellikleri
          </Text>
        </Heading>

        <Text fontSize="xl" color={subText} maxW="2xl" mx="auto">
          Professional trader'ların kullandığı araçları herkes için erişilebilir hale getirdik
        </Text>
      </Box>
      <Box maxW="100%" overflow="visible" px={{ base: 6, md: 12 }} py={4}>
        <MotionBox
          display="flex"
          gap="16px"
          style={{ width: "max-content", x }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {features.concat(features).map((feature, index) => {
            const IconComp = feature.icon;
            return (
              <Box
                key={index}
                w="300px"
                flex="0 0 auto"
                bg={cardBg}
                border="1px solid"
                borderColor={borderColor}
                borderRadius="lg"
                p={8}
                boxShadow="md"
                cursor="pointer"
                transition="all 0.3s ease"
                _hover={{
                  bg: useColorModeValue("#e8fcfc", "#2a4a52"),
                  transform: "scale(1.02)",
                  boxShadow: "0 0 20px #85deed"
                }}
              >
                <Flex
                  w={16}
                  h={16}
                  bgGradient={feature.gradient}
                  borderRadius="lg"
                  align="center"
                  justify="center"
                  mb={6}
                >
                  <IconComp size={32} stroke={useColorModeValue("#000000", "#FFFFFF")} strokeWidth={2} />
                </Flex>
                <Heading fontSize="xl" mb={4} color={textColor}>
                  {feature.title}
                </Heading>
                <Text color={subText}>{feature.description}</Text>
              </Box>
            );
          })}
        </MotionBox>
      </Box>



      <Box textAlign="center" mt={16}>
        <Flex
          display="inline-flex"
          align="center"
          bg={cardBg}
          border="1px solid"
          borderColor={borderColor}
          borderRadius="full"
          px={6}
          py={3}
          transition="all 0.3s"
          _hover={{ borderColor: "blue.500", transform: "scale(1.05)" }}
        >
          <Flex mr={2}>
            <Box w={3} h={3} borderRadius="full" bg="green.400" mr={1} animation="pulse 1.5s infinite" />
            <Box w={3} h={3} borderRadius="full" bg="blue.400" mr={1} animation="pulse 1.8s infinite" />
            <Box w={3} h={3} borderRadius="full" bg="purple.400" animation="pulse 2s infinite" />
          </Flex>
          <Text color={subText}>Piyasayı takip etmeye değil, ona hükmetmeye hazır olun.</Text>
        </Flex>
      </Box>
    </Box>
  );
}
