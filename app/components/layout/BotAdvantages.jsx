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
    VStack,
    HStack,
    Image,
    AspectRatio
} from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const advantages = [
    {
        id: 1,
        title: "Yapay Zekâ Destekli Akıllı Stratejiler",
        description: "Bitcator'un AI destekli botları, piyasa verilerini anlık analiz eder ve doğru zamanda doğru işlemleri gerçekleştirir. Böylece manuel tahmin hatalarını ortadan kaldırır, profesyonel trader seviyesinde stratejiler sunar.",
        gradient: "linear(to-r, purple.500, indigo.500)",
        imageSrc: "/images/yapay-zeka-destegi.jpg",
        imageAlt: "AI destekli piyasa analizi görseli"
    },
    {
        id: 2,
        title: "7/24 Otomatik İşlem – Sürekli Takibe Son",
        description: "Botunuz, siz uyurken bile fırsatları kaçırmaz. Piyasayı her an izleyen algoritma, duygulardan bağımsız şekilde alım-satım yaparak size zaman kazandırır ve stresi azaltır.",
        gradient: "linear(to-r, blue.500, cyan.500)",
        imageSrc: "/images/otomatik-islem.jpg",
        imageAlt: "7/24 otomatik işlem görseli"
    },
    {
        id: 3,
        title: "Risk Yönetimi ve Maksimum Kazanç",
        description: "Stop-loss, trailing ve DCA gibi gelişmiş özellikler sayesinde zararlarınız minimize edilir, kazanç potansiyeliniz artırılır. Siz sadece hedeflerinizi belirlersiniz, gerisini botunuz güvenle halleder.",
        gradient: "linear(to-r, green.500, teal.500)",
        imageSrc: "/images/maksimum-kazanc.jpg",
        imageAlt: "Risk yönetimi ve kazanç optimizasyonu görseli"
    }
];

export default function BotAdvantages() {
    const [visibleItems, setVisibleItems] = useState([]);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        advantages.forEach((_, index) => {
                            setTimeout(() => {
                                setVisibleItems((prev) => [...prev, index]);
                            }, index * 300);
                        });
                    }
                });
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const bg = useColorModeValue("#f4f6fa", "#1f2530");
    const cardBg = useColorModeValue("white", "#1E1E28");
    const borderColor = useColorModeValue("gray.300", "gray.600");
    const textColor = useColorModeValue("gray.800", "whiteAlpha.900");
    const subText = useColorModeValue("gray.600", "gray.300");

    return (
        <Box ref={sectionRef} bg={bg} py={20} px={6} overflow="hidden">
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
                    ⚡ Avantajlar
                </Badge>
                <Heading fontSize={{ base: "3xl", md: "5xl" }} mb={6} color={textColor}>
                    <Text
                        as="span"
                        background="linear-gradient(to right, #318594, #7ad5e6)"
                        backgroundClip="text"
                        color="transparent"
                        fontWeight="bold"
                    >
                        BITCATOR BOTLARININ
                    </Text>{" "}
                    AVANTAJLARI
                </Heading>
                <Text fontSize="xl" color={subText} maxW="2xl" mx="auto">
                    AI destekli trading botlarımızla profesyonel seviyede işlem yapın ve kazancınızı maksimize edin
                </Text>
            </Box>

            <Box maxW="1400px" mx="auto">
                <VStack spacing={20}>
                    {advantages.map((advantage, index) => {
                        const isEven = index % 2 === 0;
                        const isVisible = visibleItems.includes(index);

                        return (
                            <MotionBox
                                key={advantage.id}
                                w="100%"
                                initial={{ y: 50, opacity: 0 }}
                                animate={isVisible ? { y: 0, opacity: 1 } : {}}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                mb={{ base: 20, md: 24 }}
                            >
                                <Grid
                                    templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
                                    gap={12}
                                    alignItems="center"
                                >
                                    {/* Sol Taraf - Yazı (tek sayılarda) veya Görsel (çift sayılarda) */}
                                    {isEven ? (
                                        // Yazı Sol Tarafta
                                        <MotionBox
                                            initial={{ x: -50, opacity: 0 }}
                                            animate={isVisible ? { x: 0, opacity: 1 } : {}}
                                            transition={{ duration: 0.6, delay: 0.4 }}
                                            order={{ base: 2, lg: isEven ? 1 : 2 }}
                                        >
                                            <VStack align="start" spacing={6}>
                                                <HStack spacing={4}>
                                                    <Flex
                                                        w={16}
                                                        h={16}
                                                        bgGradient={advantage.gradient}
                                                        borderRadius="xl"
                                                        align="center"
                                                        justify="center"
                                                    >
                                                    </Flex>
                                                </HStack>

                                                <Heading
                                                    fontSize={{ base: "3xl", md: "4xl" }}
                                                    color={textColor}
                                                    lineHeight="1.2"
                                                >
                                                    {advantage.title}
                                                </Heading>

                                                <Text
                                                    fontSize={{ base: "lg", md: "xl" }}
                                                    color={subText}
                                                    lineHeight="1.8"
                                                    textAlign="justify"
                                                >
                                                    {advantage.description}
                                                </Text>

                                                <HStack spacing={3}>
                                                    <Box w={2} h={2} bg="blue.500" borderRadius="full" />
                                                    <Text fontSize="md" color="blue.500" fontWeight="semibold">
                                                        Profesyonel Seviye Performans
                                                    </Text>
                                                </HStack>
                                            </VStack>
                                        </MotionBox>
                                    ) : (
                                        // Görsel Sol Tarafta
                                        <MotionBox
                                            initial={{ x: -50, opacity: 0 }}
                                            animate={isVisible ? { x: 0, opacity: 1 } : {}}
                                            transition={{ duration: 0.6, delay: 0.4 }}
                                        >
                                            <Box
                                                bg={cardBg}
                                                border="1px"
                                                borderColor={borderColor}
                                                borderRadius="2xl"
                                                overflow="hidden"
                                                boxShadow="xl"
                                                position="relative"
                                                _hover={{ transform: "scale(1.02)" }}
                                                transition="transform 0.3s"
                                            >
                                                <AspectRatio ratio={5 / 3}>
                                                    <Image
                                                        src={advantage.imageSrc || "/placeholder.svg"}
                                                        alt={advantage.imageAlt}
                                                        w="100%"
                                                        h="100%"
                                                        objectFit="cover"
                                                    />
                                                </AspectRatio>
                                                <Box
                                                    position="absolute"
                                                    top={4}
                                                    right={4}
                                                    w={12}
                                                    h={12}
                                                    bgGradient={advantage.gradient}
                                                    borderRadius="full"
                                                    display="flex"
                                                    alignItems="center"
                                                    justifyContent="center"
                                                >
                                                </Box>
                                            </Box>
                                        </MotionBox>
                                    )}

                                    {/* Sağ Taraf - Görsel (tek sayılarda) veya Yazı (çift sayılarda) */}
                                    {isEven ? (
                                        // Görsel Sağ Tarafta
                                        <MotionBox
                                            initial={{ x: 50, opacity: 0 }}
                                            animate={isVisible ? { x: 0, opacity: 1 } : {}}
                                            transition={{ duration: 0.6, delay: 0.6 }}
                                            order={{ base: 1, lg: isEven ? 2 : 1 }}
                                        >
                                            <Box
                                                bg={cardBg}
                                                border="1px"
                                                borderColor={borderColor}
                                                borderRadius="2xl"
                                                overflow="hidden"
                                                boxShadow="xl"
                                                position="relative"
                                                _hover={{ transform: "scale(1.02)" }}
                                                transition="transform 0.3s"
                                            >
                                                <AspectRatio ratio={5 / 3}>
                                                    <Image
                                                        src={advantage.imageSrc || "/placeholder.svg"}
                                                        alt={advantage.imageAlt}
                                                        w="100%"
                                                        h="100%"
                                                        objectFit="cover"
                                                    />
                                                </AspectRatio>
                                                <Box
                                                    position="absolute"
                                                    top={4}
                                                    right={4}
                                                    w={12}
                                                    h={12}
                                                    bgGradient={advantage.gradient}
                                                    borderRadius="full"
                                                    display="flex"
                                                    alignItems="center"
                                                    justifyContent="center"
                                                >
                                                </Box>
                                            </Box>
                                        </MotionBox>
                                    ) : (
                                        // Yazı Sağ Tarafta
                                        <MotionBox
                                            initial={{ x: 50, opacity: 0 }}
                                            animate={isVisible ? { x: 0, opacity: 1 } : {}}
                                            transition={{ duration: 0.6, delay: 0.6 }}
                                        >
                                            <VStack align="start" spacing={6}>
                                                <HStack spacing={4}>
                                                    <Flex
                                                        w={16}
                                                        h={16}
                                                        bgGradient={advantage.gradient}
                                                        borderRadius="xl"
                                                        align="center"
                                                        justify="center"
                                                    >
                                                    </Flex>
                                                </HStack>

                                                <Heading
                                                    fontSize={{ base: "3xl", md: "4xl" }}
                                                    color={textColor}
                                                    lineHeight="1.2"
                                                >
                                                    {advantage.title}
                                                </Heading>

                                                <Text
                                                    fontSize={{ base: "lg", md: "xl" }}
                                                    color={subText}
                                                    lineHeight="1.8"
                                                    textAlign="justify"
                                                >
                                                    {advantage.description}
                                                </Text>

                                                <HStack spacing={3}>
                                                    <Box w={2} h={2} bg="blue.500" borderRadius="full" />
                                                    <Text fontSize="md" color="blue.500" fontWeight="semibold">
                                                        Profesyonel Seviye Performans
                                                    </Text>
                                                </HStack>
                                            </VStack>
                                        </MotionBox>
                                    )}
                                </Grid>
                            </MotionBox>
                        );
                    })}
                </VStack>
            </Box>

            {/* Alt Kısım - Özet */}
            <Box textAlign="center" mt={20}>
                <Box
                    border="1px"
                    borderColor={borderColor}
                    borderRadius="2xl"
                    p={4}
                    maxW="1300px"
                    mx="auto"
                >
                    <Text fontSize="5xl" color={textColor} fontWeight="semibold" mb={2}>
                        Siz uyurken bile piyasayı izleyen,{" "}
                        <Text as="span" color={"#7ad5e6"}>
                            trendleri analiz eden
                        </Text>{" "}
                        ve doğru hamleyi yapan bir asistana hakim olun.
                    </Text>
                </Box>
            </Box>
        </Box >
    );
}
