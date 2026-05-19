"use client";
import React, { useState, useEffect, useRef } from "react";
import {
    Box,
    Flex,
    Heading,
    Text,
    Badge,
    Icon,
    VStack,
    Collapse,
    Divider
} from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight, HelpCircle } from 'lucide-react';

const MotionBox = motion(Box);

const faqData = [
    {
        id: 1,
        question: "Bitcator tam olarak ne yapar?",
        answer: "Bitcator, yapay zekâ destekli trading botlarıyla kripto para piyasalarını 7/24 takip eder, analiz eder ve otomatik olarak işlem yapar."
    },
    {
        id: 2,
        question: "Bitcator'u kullanmak için tecrübeli bir yatırımcı olmam gerekir mi?",
        answer: "Hayır. Bitcator, hem yeni başlayanlar hem de profesyonel yatırımcılar için uygundur. Kullanıcı dostu arayüzüyle teknik bilgi gerektirmez."
    },
    {
        id: 3,
        question: "Botlarım benim adıma otomatik al-sat mı yapıyor?",
        answer: "Evet. Botlarınız tanımladığınız stratejilere göre otomatik işlemler yapar. Siz uyurken bile fırsatları kaçırmaz."
    },
    {
        id: 4,
        question: "Kazanç garantisi var mı?",
        answer: "Hayır. Kripto piyasaları yüksek risk içerir. Bitcator riskleri minimize etmeye çalışsa da kesin kazanç garantisi vermez."
    },
    {
        id: 5,
        question: "Güvenli mi? Param ve bilgilerim güvende mi?",
        answer: "Evet. Bitcator, API anahtarlarıyla çalışır ve paranız hiçbir zaman doğrudan sistemde tutulmaz. Gelişmiş güvenlik protokolleri ile korunur."
    },
    {
        id: 6,
        question: "Bitcator hangi borsalarla uyumlu?",
        answer: "Başlıca kripto para borsalarıyla uyumludur (örneğin: Binance, KuCoin, OKX gibi). Liste sürekli güncellenmektedir."
    },
    {
        id: 7,
        question: "Botlarımı nasıl özelleştirebilirim?",
        answer: "Dilediğiniz stratejiyi seçebilir, risk seviyelerini ayarlayabilir, işlem çiftlerini belirleyebilirsiniz. Otomatik ve manuel modlar mevcuttur."
    },
    {
        id: 8,
        question: "Destek alabilir miyim?",
        answer: "Evet. 7/24 destek ekibimiz sorularınızı yanıtlamak için hazır."
    }
];

export default function FAQSection() {
    const [openItems, setOpenItems] = useState([]);
    const [visibleItems, setVisibleItems] = useState([]);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        faqData.forEach((_, index) => {
                            setTimeout(() => {
                                setVisibleItems((prev) => [...prev, index]);
                            }, index * 100);
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
    const textColor = useColorModeValue("gray.800", "gray.100");
    const subText = useColorModeValue("gray.600", "gray.300");
    const hoverBg = useColorModeValue("gray.50", "gray.700");

    const toggleItem = (itemId) => {
        setOpenItems(prev =>
            prev.includes(itemId)
                ? prev.filter(id => id !== itemId)
                : [...prev, itemId]
        );
    };

    return (
        <Box ref={sectionRef} bg={bg} py={20} px={6}>
            <Box maxW="900px" mx="auto">
                {/* Header */}
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
                        ❓ Sıkça Sorulan Sorular
                    </Badge>

                    <Heading
                        fontSize={{ base: "4xl", md: "6xl" }}
                        mb={6}
                        color={textColor}
                        fontWeight="bold"
                    >
                        <Text
                            as="span"
                            background="linear-gradient(to right, #318594, #7ad5e6)"
                            backgroundClip="text"
                            color="transparent"
                        >
                            SSS
                        </Text>
                    </Heading>

                    <Text fontSize="xl" color={subText} maxW="2xl" mx="auto">
                        Bitcator hakkında merak ettiğiniz her şeyi burada bulabilirsiniz
                    </Text>
                </Box>

                {/* FAQ Items */}
                <VStack spacing={4} align="stretch">
                    {faqData.map((item, index) => {
                        const isOpen = openItems.includes(item.id);
                        const isVisible = visibleItems.includes(index);

                        return (
                            <MotionBox
                                key={item.id}
                                initial={{ y: 30, opacity: 0 }}
                                animate={isVisible ? { y: 0, opacity: 1 } : {}}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Box
                                    bg={cardBg}
                                    border="1px"
                                    borderColor={borderColor}
                                    borderRadius="xl"
                                    overflow="hidden"
                                    boxShadow="sm"
                                    _hover={{
                                        boxShadow: "md",
                                        borderColor: "blue.400"
                                    }}
                                    transition="all 0.3s"
                                >
                                    {/* Question */}
                                    <Flex
                                        p={6}
                                        align="center"
                                        cursor="pointer"
                                        onClick={() => toggleItem(item.id)}
                                        _hover={{ bg: hoverBg }}
                                        transition="background-color 0.2s"
                                    >
                                        <Flex
                                            w={10}
                                            h={10}
                                            bg="blue.500"
                                            borderRadius="full"
                                            align="center"
                                            justify="center"
                                            mr={4}
                                            flexShrink={0}
                                        >
                                            <Icon size="20px" color="white">
                                                <HelpCircle />
                                            </Icon>
                                        </Flex>

                                        <Box flex="1" mr={4}>
                                            <Text
                                                fontSize={{ base: "md", md: "lg" }}
                                                fontWeight="semibold"
                                                color={textColor}
                                                lineHeight="1.4"
                                            >
                                                {item.question}
                                            </Text>
                                        </Box>

                                        <Icon
                                            size="24px"
                                            color={subText}
                                            transform={isOpen ? "rotate(90deg)" : "rotate(0deg)"}
                                            transition="transform 0.2s"
                                        >
                                            {isOpen ? <ChevronDown /> : <ChevronRight />}
                                        </Icon>
                                    </Flex>

                                    {/* Answer */}
                                    {isOpen && (
                                        <Box mt={4}>
                                            {/* Özel divider */}
                                            <Box height="1px" bg="gray.300" my={4} w="100%" />

                                            <Box p={6} pt={4}>
                                                <Flex align="start">
                                                    <Box w={10} mr={4} flexShrink={0} />
                                                    <Text
                                                        fontSize={{ base: "sm", md: "md" }}
                                                        color={subText}
                                                        lineHeight="1.7"
                                                    >
                                                        {item.answer}
                                                    </Text>
                                                </Flex>
                                            </Box>
                                        </Box>
                                    )}
                                </Box>
                            </MotionBox>
                        );
                    })}
                </VStack>

                {/* Bottom Section */}
                <Box textAlign="center" mt={16}>
                    <MotionBox
                        bg={cardBg}
                        border="1px"
                        borderColor={borderColor}
                        borderRadius="2xl"
                        p={8}
                        initial={{ y: 30, opacity: 0 }}
                        animate={visibleItems.length > 0 ? { y: 0, opacity: 1 } : {}}
                        transition={{ duration: 0.6, delay: 1 }}
                    >
                        <Flex
                            w={16}
                            h={16}
                            bg="blue.500"
                            borderRadius="full"
                            align="center"
                            justify="center"
                            mx="auto"
                            mb={4}
                        >
                            <Icon size="32px" color="white">
                                <HelpCircle />
                            </Icon>
                        </Flex>

                        <Heading fontSize="xl" color={textColor} mb={3}>
                            Başka sorularınız mı var?
                        </Heading>

                        <Text color={subText} mb={4}>
                            7/24 destek ekibimiz size yardımcı olmaya hazır
                        </Text>

                        <Flex
                            display="inline-flex"
                            align="center"
                            bg="blue.500"
                            color="white"
                            px={6}
                            py={3}
                            borderRadius="full"
                            cursor="pointer"
                            _hover={{ bg: "blue.600", transform: "scale(1.05)" }}
                            transition="all 0.3s"
                        >
                            <Text fontWeight="semibold">Destek Ekibiyle İletişime Geç</Text>
                        </Flex>
                    </MotionBox>
                </Box>
            </Box>
        </Box>
    );
}
