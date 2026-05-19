"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Flex,
  Grid,
  Heading,
  Text,
  Badge,
  Icon
} from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { motion } from "framer-motion";
import { Brain, Target, Zap, ShieldCheck } from "lucide-react";

const MotionBox = motion(Box);

const steps = [
  {
    number: "1",
    title: "AI Analiz",
    description: "Yapay zeka piyasayı sürekli analiz eder ve fırsatları tespit eder",
    icon: <Brain />,
    gradient: "linear(to-r, purple.500, indigo.500)",
  },
  {
    number: "2",
    title: "Strateji Belirleme",
    description: "Kendi kurallarınızı tanımlayın veya hazır başarılı botları kullanın",
    icon: <Target />,
    gradient: "linear(to-r, blue.500, cyan.500)",
  },
  {
    number: "3",
    title: "Otomatik İşlem",
    description: "Botlar 7/24 çalışarak işlemlerinizi otomatik olarak gerçekleştirir",
    icon: <Zap />,
    gradient: "linear(to-r, orange.500, yellow.500)",
  },
  {
    number: "4",
    title: "Güvenli Kazanç",
    description: "Gelişmiş güvenlik altyapısı sayesinde, fonlarınız her zaman güvende tutulur",
    icon: <ShieldCheck />,
    gradient: "linear(to-r, green.500, teal.500)",
  },
];


export default function HowItWorks() {
  const [visibleCards, setVisibleCards] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            steps.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards((prev) => [...prev, index]);
              }, index * 200);
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const bgLight = "linear-gradient(to bottom, #f4f6fa 0%, #c8e4e6 100%)";
  const bgDark = "linear-gradient(to bottom, #1a1a2e 0%, #163f42 100%)";
  const bg = useColorModeValue(bgLight, bgDark);
  // const cardBgLight = "linear-gradient(to bottom, #c8e4e6 0%, #f4f6fa 100%)";
  // const cardBgDark = "linear-gradient(to bottom, #163f42 0%, #1a1a2e 100%)";
  const cardBg = useColorModeValue('#ffffff', '#1a1a2e');
  const borderColor = useColorModeValue("gray.300", "gray.600");
  const textColor = useColorModeValue("gray.800", "gray.100");
  const subText = useColorModeValue("gray.600", "gray.300");
  const iconColor = useColorModeValue("#318594", "#7ad5e6");

  return (
    <Box ref={sectionRef} bg={bg} py={20} px={6} overflow="hidden">
      <Box textAlign="center" mb={24}>
        <Heading fontSize={{ base: "3xl", md: "5xl" }} mb={6} color={textColor}>
          <Text
            as="span"
            background="linear-gradient(to right, #318594, #7ad5e6)"
            backgroundClip="text"
            color="transparent"
            fontWeight="bold"
          >
            Bitcator
          </Text>{" "}
          Nasıl Çalışır?
        </Heading>
      </Box>

      <Box maxW="1500px" mx="auto" px={{ base: 6, md: 12 }}>
        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={10} mb={12}>
          {steps.map((step, index) => (
            <MotionBox
              key={index}
              borderLeft="4px solid"
              borderImage={`linear-gradient(to bottom, ${step.gradient.split(',')[0].split('(')[1]}, ${step.gradient.split(',')[1]}) 1`}
              p={6}
              bg="transparent"
              textAlign="left"
              initial={{ y: 30, opacity: 0 }}
              animate={visibleCards.includes(index) ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
            >
              <Flex align="center" mb={4}>
                <Box
                  w={10}
                  h={10}
                  borderRadius="full"
                  bgGradient={step.gradient}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  mr={4}
                >
                  <Icon boxSize={5} color={iconColor}>
                    {step.icon}
                  </Icon>
                </Box>
                <Heading fontSize="2xl" color={textColor}>
                  {step.title}
                </Heading>
              </Flex>
              <Text fontSize="lg" color={subText}>
                {step.description}
              </Text>
            </MotionBox>
          ))}
        </Grid>

        {/* <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} gap={8} mb={12}>
          {steps.map((step, index) => (
            <MotionBox
              key={index}
              bg={cardBg}
              border="1px"
              borderColor={borderColor}
              borderRadius="xl"
              p={8}
              textAlign="center"
              boxShadow="md"
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px #85deed" }}
              initial={{ y: 30, opacity: 0 }}
              animate={visibleCards.includes(index) ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
            >
              <Flex
                w={16}
                h={16}
                bgGradient={step.gradient}
                borderRadius="lg"
                align="center"
                justify="center"
                mx="auto"
                mb={6}
              >
                <Icon size="50px">{step.icon}</Icon>
              </Flex>

              <Heading fontSize="xl" mb={4} color={textColor}>
                {step.title}
              </Heading>
              <Text color={subText}>{step.description}</Text>
            </MotionBox>
          ))}
        </Grid> */}
      </Box>

      <Box textAlign="center">
        <Flex
          display="inline-flex"
          align="center"
          bg={cardBg}
          border="1px"
          borderColor={borderColor}
          borderRadius="full"
          px={6}
          py={3}
          transition="all 0.3s"
          _hover={{ borderColor: "blue.500", transform: "scale(1.05)" }}
        >
          <Flex mr={2}>
            <Box w={3} h={3} bg="green.400" borderRadius="full" mr={1} animation="pulse 1.5s infinite" />
            <Box w={3} h={3} bg="blue.400" borderRadius="full" mr={1} animation="pulse 1.8s infinite" />
            <Box w={3} h={3} bg="purple.400" borderRadius="full" animation="pulse 2s infinite" />
          </Flex>
          <Text color={subText}>Hemen başlayın ve AI'ın gücünü keşfedin</Text>
        </Flex>
      </Box>
    </Box>
  );
}

