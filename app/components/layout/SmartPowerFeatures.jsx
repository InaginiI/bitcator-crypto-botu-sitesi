"use client";
import React, { useEffect, useRef, useState } from "react";
import {
    Box,
    Flex,
    Grid,
    Heading,
    Text,
    Badge,
    Icon,
    VStack
} from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { motion } from "framer-motion";
import { TrendingUp, Eye, BarChart3 } from 'lucide-react';

const MotionBox = motion(Box);

const features = [
    {
        id: 1,
        title: "Trendleri Anında Yakalar",
        description: "Botlarımız, sosyal medyada patlayan #etiketleri, kullanıcı yorumlarını ve haber sitelerindeki kripto gündemini anında tarar. Henüz herkes haberi duymadan botunuz harekete geçer.",
        icon: <TrendingUp />,
    },
    {
        id: 2,
        title: "Balina Hamlelerini Önceden Görür",
        description: "Blockchain'deki büyük cüzdan hareketlerini gerçek zamanlı izler ve piyasanın yönünü değiştiren hamleleri önceden fark eder. Sizden önce piyasanın nabzını tutar.",
        icon: <Eye />,
    },
    {
        id: 3,
        title: "Verileri Birleştirir, Kusursuz İşlem Yapar",
        description: "Teknik analiz, sosyal duyarlılık ve haber akışını tek çatı altında toplar. Tüm verileri değerlendirerek her işlemde sizi bir adım öne taşır.",
        icon: <BarChart3 />,
    }
];

export default function SmartPowerFeatures() {
    const [visibleCards, setVisibleCards] = useState([]);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        features.forEach((_, index) => {
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

    const bg = useColorModeValue("#f4f6fa", "#1f2530");
    const textColor = useColorModeValue("gray.800", "whiteAlpha.900");
    const secondaryColor = useColorModeValue("gray.600", "gray.300");
    const bgLight = "linear-gradient(to bottom, #f4f6fa 0%, #c8e4e6 100%)";
    const bgDark = "linear-gradient(to bottom, #1f2530 0%, #163f42 100%)";
    const cardBg = useColorModeValue(bgLight, bgDark);

    return (
        <Box
            ref={sectionRef}
            bg={bg}
            py={0}
            px={6}
            overflow="hidden"
            position="relative"
        >
            <Box maxW="1200px" mx="auto" position="relative" zIndex="1">
                {/* Header */}
                <VStack spacing={6} textAlign="center" mb={16}>
                    <Heading
                        fontSize={{ base: "3xl", md: "5xl", lg: "6xl" }}
                        color={textColor}
                        textAlign="center"
                        lineHeight="1.1"
                        fontWeight="bold"
                        my={10}
                    >
                        BİTCATOR: PİYASAYI OKUYAN{" "}
                        <Text
                            as="span"
                            background="linear-gradient(to right, #318594, #7ad5e6)"
                            backgroundClip="text"
                            color="transparent"
                        >
                            AKILLI GÜÇ
                        </Text>
                    </Heading>
                </VStack>

                {/* Cards */}
                <Grid
                    templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
                    gap={8}
                    maxW="1400px"
                    mx="auto"
                    alignItems="end"
                >
                    {features.map((feature, index) => (
                        <MotionBox
                            key={feature.id}
                            initial={{ y: 50, opacity: 0 }}
                            animate={visibleCards.includes(index) ? { y: 0, opacity: 1 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                        >
                            <Box
                                bg={cardBg}
                                border="none"
                                boxShadow="none"
                                position="relative"
                                // borderRadius="2xl"
                                p={8}
                                textAlign="center"
                                minH="320px"
                                height="100%"
                                display="flex"
                                flexDirection="column"
                                justifyContent="space-between"
                            >
                                {/* Gradient Overlay */}
                                <Box
                                    position="absolute"
                                    top="0"
                                    left="0"
                                    right="0"
                                    bottom="0"
                                    bgGradient={feature.gradient}
                                    opacity="0.1"
                                    borderRadius="2xl"
                                />

                                <VStack spacing={6} position="relative" zIndex="1">
                                    {/* Icon */}
                                    <Box
                                        w="80px"
                                        h="80px"
                                        position="relative"
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        my={8}
                                    >
                                        <Box
                                            w="80px"
                                            h="80px"
                                            borderRadius="full"
                                            border="3px solid"
                                            borderColor={textColor}
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                            position="relative"
                                            _before={{
                                                content: '""',
                                                position: "absolute",
                                                top: "-3px",
                                                left: "-3px",
                                                right: "-3px",
                                                bottom: "-3px",
                                                borderRadius: "full",
                                                background: feature.gradient,
                                                zIndex: "-1"
                                            }}
                                        >
                                            <Icon size="36px" color={textColor}>
                                                {feature.icon}
                                            </Icon>
                                        </Box>
                                    </Box>

                                    {/* Title */}
                                    <Heading
                                        fontSize={{ base: "lg", md: "xl" }}
                                        color={textColor}
                                        fontWeight="bold"
                                        lineHeight="1.3"
                                        textAlign="center"
                                        mb={6}
                                    >
                                        {feature.title}
                                    </Heading>

                                    {/* Description */}
                                    <Text
                                        fontSize="lg"
                                        color={secondaryColor}
                                        lineHeight="1.6"
                                        textAlign="center"
                                        mb={8}
                                    >
                                        {feature.description}
                                    </Text>
                                </VStack>

                                {/* Bottom Accent */}
                                <Box
                                    position="absolute"
                                    bottom="0"
                                    left="0"
                                    right="0"
                                    h="2px"
                                    bgGradient={feature.gradient}
                                />
                            </Box>
                        </MotionBox>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}
