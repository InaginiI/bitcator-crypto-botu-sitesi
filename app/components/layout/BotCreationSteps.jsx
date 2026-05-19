"use client";
import React, { useState } from "react";
import {
    Box,
    Flex,
    Grid,
    Heading,
    Text,
    Badge,
    Icon,
    VStack,
    HStack,
    Image,
    AspectRatio
} from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, TrendingUp, Target, Shield, Cog, ChevronDown, ChevronRight, Play, Pause } from 'lucide-react';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const steps = [
    {
        id: 1,
        title: "Botunuzu Tanımlayın",
        description: "Botunuza isim verin, borsa hesabınızı seçin ve işlem türünüzü belirleyin. Kaldıraç, marjin modu ve işlem yapılacak coinleri seçerek temel ayarlarınızı tamamlayın.",
        icon: <Settings />,
        gradient: "linear(to-r, blue.500, cyan.500)",
        mediaType: "video",
        mediaSrc: "/images/1.png"
    },
    {
        id: 2,
        title: "Alım Stratejinizi Kurun",
        description: "Maksimum işlem sayısını, alım tutarlarını ve fiyat düşüş yüzdelerini girin. DCA veya tek seferlik alım modunu seçin, dilerseniz ek özelliklerle stratejinizi güçlendirin.",
        icon: <TrendingUp />,
        gradient: "linear(to-r, green.500, teal.500)",
        mediaType: "video",
        mediaSrc: "/images/2.png"
    },
    {
        id: 3,
        title: "Satış Hedefinizi Belirleyin",
        description: "Kar oranınızı ayarlayın ve trailing özelliğiyle kazancınızı maksimize edin. Botunuz, hedefe ulaştığında işlemleri otomatik sonlandırır.",
        icon: <Target />,
        gradient: "linear(to-r, orange.500, yellow.500)",
        mediaType: "video",
        mediaSrc: "/images/3.png"
    },
    {
        id: 4,
        title: "Stop Loss ile Riskinizi Yönetin",
        description: "Zararı sınırlamak için stop loss'u etkinleştirin. Dilerseniz DCA sonrası veya herhangi bir işlemde botun durmasını sağlayın.",
        icon: <Shield />,
        gradient: "linear(to-r, red.500, pink.500)",
        mediaType: "video",
        mediaSrc: "/images/4.png"
    },
    {
        id: 5,
        title: "Gelişmiş Ayarlarla Kontrol Sizde",
        description: "Bekleme süreleri, hacim koruması ve delisting önlemleri gibi gelişmiş seçenekleri ayarlayın. Stratejinizi test edin ve botunuzu çalıştırın!",
        icon: <Cog />,
        gradient: "linear(to-r, purple.500, indigo.500)",
        mediaType: "video",
        mediaSrc: "/images/5.png"
    }
];

export default function BotCreationSteps() {
    const [activeStep, setActiveStep] = useState(1);
    const [expandedStep, setExpandedStep] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const bg = useColorModeValue("#f4f6fa", "#1f2530");
    const cardBg = useColorModeValue("white", "#1E1E28");
    const borderColor = useColorModeValue("gray.300", "gray.600");
    const textColor = useColorModeValue("gray.800", "gray.100");
    const subText = useColorModeValue("gray.600", "gray.300");
    const activeBg = useColorModeValue("blue.50", "#163f42");

    const handleStepClick = (stepId) => {
        setActiveStep(stepId);
        setExpandedStep(expandedStep === stepId ? null : stepId);
    };

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    return (
        <Box bg={bg} py={20} px={6}>
            <Box textAlign="center" mb={16}>
                <Badge
                    mb={6}
                    px={3}
                    py={1}
                    bg="blue.500"
                    color="white"
                    borderRadius="full"
                    animation="pulse 2s infinite"
                >
                    🤖 Bot Oluşturma
                </Badge>
                <Heading fontSize={{ base: "3xl", md: "5xl" }} mb={6} color={textColor}>
                    <Text
                        as="span"
                        background="linear-gradient(to right, #318594, #7ad5e6)"
                        backgroundClip="text"
                        color="transparent"
                        fontWeight="bold"
                    >
                        AI Trading Bot
                    </Text>{" "}
                    Oluşturma Adımları
                </Heading>
                <Text fontSize="xl" color={subText} maxW="2xl" mx="auto">
                    5 basit adımda kendi AI trading botunuzu oluşturun ve otomatik kazanç elde etmeye başlayın
                </Text>
            </Box>

            <Box maxW="1400px" mx="auto">
                <Grid templateColumns={{ base: "1fr", lg: "1fr 1.2fr" }} gap={8}>
                    {/* Sol Taraf - Adımlar */}
                    <VStack spacing={4} align="stretch">
                        {steps.map((step, index) => (
                            <MotionBox
                                key={step.id}
                                bg={activeStep === step.id ? activeBg : cardBg}
                                border="2px"
                                borderColor={activeStep === step.id ? "blue.500" : borderColor}
                                borderRadius="xl"
                                overflow="hidden"
                                cursor="pointer"
                                onClick={() => handleStepClick(step.id)}
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Flex p={6} align="center">
                                    <Flex
                                        w={12}
                                        h={12}
                                        bgGradient={step.gradient}
                                        borderRadius="full"
                                        align="center"
                                        justify="center"
                                        mr={4}
                                        color="white"
                                        fontWeight="bold"
                                    >
                                        {step.id}
                                    </Flex>

                                    <Flex
                                        w={12}
                                        h={12}
                                        bgGradient={step.gradient}
                                        borderRadius="lg"
                                        align="center"
                                        justify="center"
                                        mr={4}
                                    >
                                        <Icon size="24px" color="white">{step.icon}</Icon>
                                    </Flex>

                                    <Box flex="1">
                                        <Heading fontSize="lg" mb={2} color={textColor}>
                                            {step.title}
                                        </Heading>
                                    </Box>

                                    <Icon
                                        size="20px"
                                        color={subText}
                                        transform={expandedStep === step.id ? "rotate(90deg)" : "rotate(0deg)"}
                                        transition="transform 0.2s"
                                    >
                                        {expandedStep === step.id ? <ChevronDown /> : <ChevronRight />}
                                    </Icon>
                                </Flex>

                                {expandedStep === step.id && (
                                    <Box px={6} pb={6}>
                                        <Text fontSize="sm" color={subText}>
                                            {step.description}
                                        </Text>
                                    </Box>
                                )}


                            </MotionBox>
                        ))}
                    </VStack>

                    {/* Sağ Taraf - Media */}
                    <MotionBox
                        bg={cardBg}
                        border="1px"
                        borderColor={borderColor}
                        borderRadius="xl"
                        overflow="hidden"
                        position="sticky"
                        top="20px"
                        height="fit-content"
                    >
                        <Box p={6}>
                            <Flex justify="space-between" align="center" mb={4}>
                                <Heading fontSize="xl" color={textColor}>
                                    Adım {activeStep}: {steps.find(s => s.id === activeStep)?.title}
                                </Heading>
                                <Flex
                                    w={10}
                                    h={10}
                                    bg="blue.500"
                                    borderRadius="full"
                                    align="center"
                                    justify="center"
                                    cursor="pointer"
                                    onClick={togglePlay}
                                    _hover={{ bg: "blue.600" }}
                                >
                                    <Icon size="20px" color="white">
                                        {isPlaying ? <Pause /> : <Play />}
                                    </Icon>
                                </Flex>
                            </Flex>

                            <AspectRatio ratio={16 / 9}>
                                <Box
                                    bg="gray.100"
                                    borderRadius="lg"
                                    position="relative"
                                    overflow="hidden"
                                >
                                    <Image
                                        src={steps.find(s => s.id === activeStep)?.mediaSrc || "/placeholder.svg"}
                                        alt={`Adım ${activeStep} görseli`}
                                        w="100%"
                                        h="100%"
                                        objectFit="cover"
                                    />

                                    <AnimatePresence>
                                        {isPlaying && (
                                            <MotionBox
                                                position="absolute"
                                                top="50%"
                                                left="50%"
                                                transform="translate(-50%, -50%)"
                                                initial={{ scale: 0, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                exit={{ scale: 0, opacity: 0 }}
                                            >
                                                <Flex
                                                    w={16}
                                                    h={16}
                                                    bg="blackAlpha.700"
                                                    borderRadius="full"
                                                    align="center"
                                                    justify="center"
                                                >
                                                    <Icon size="32px" color="white">
                                                        <Play />
                                                    </Icon>
                                                </Flex>
                                            </MotionBox>
                                        )}
                                    </AnimatePresence>
                                </Box>
                            </AspectRatio>
                        </Box>
                    </MotionBox>
                </Grid>
            </Box>

            {/* Alt Kısım - İlerleme */}
            <Box textAlign="center" mt={16}>
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
                    _hover={{ borderColor: "#7ad5e6", transform: "scale(1.05)" }}
                >
                    <HStack spacing={2} mr={4}>
                        {steps.map((step) => (
                            <Box
                                key={step.id}
                                w={3}
                                h={3}
                                bg={activeStep >= step.id ? "#7ad5e6" : "gray.300"}
                                borderRadius="full"
                                transition="all 0.3s"
                            />
                        ))}
                    </HStack>
                    <Text color={subText}>
                        Adım {activeStep} / {steps.length} - Bot oluşturma sürecinde
                    </Text>
                </Flex>
            </Box>
        </Box>
    );
}
