"use client"
import { useEffect, useRef, useState } from "react"
import { Box, Flex, Heading, Text, Badge, VStack, HStack, Container, Link } from "@chakra-ui/react"
import { useColorModeValue } from "@/components/ui/color-mode"
import { motion } from "framer-motion"
import { ArrowLeft, Users, TrendingUp, Bot, Zap, Calendar, CheckCircle } from "lucide-react"
import NextLink from "next/link"
import Header from "@/components/layout/Header"

const MotionBox = motion(Box)

const timeline = [
    {
        date: "Kasım 2020",
        title: "İlk Topluluk Kuruluşu",
        description: "Aylardır kurmak istediğimiz topluluğun sosyal medyada temellerini attık ve web sitemizi kurduk.",
        icon: <Users />,
        color: "blue.500",
    },
    {
        date: "Ocak 2021",
        title: "Yeteneklere Erişim",
        description:
            "Topluluğumuzun bir araya getirdiği kişilere ücretsiz teknik analiz, blockchain ve network eğitimleri vererek birlikte çalışmaya başladık.",
        icon: <TrendingUp />,
        color: "green.500",
    },
    {
        date: "Kasım 2021",
        title: "İlk Özel Botlar",
        description:
            "Topluluktan gelen istekler doğrultusunda özel alım-satım robotları oluşturmaya ve veri merkezimizi inşa etmeye başladık.",
        icon: <Bot />,
        color: "purple.500",
    },
    {
        date: "Şubat 2022",
        title: "Algoritmaların Genişletilmesi",
        description:
            "Finansal piyasalarda yükseliş dönemlerinin ve düşüş dönemlerinin ayrı ayrı kazanç yöntemleri bulunmakta. Bu dönemlerin her birine şahit olarak her dönem için kazançlı botlar inşa ettik.",
        icon: <TrendingUp />,
        color: "orange.500",
    },
    {
        date: "Temmuz 2022",
        title: "Yapay Zeka Teknolojileri",
        description:
            "Algoritmalarımızı yöneten al-sat yazılımımızın performansını endüstri standartlarının zirvesine getirdik. Yapay zeka teknolojilerini yazılıma entegre ederek tüm işlemlerin doğruluğunu onaylayan mekanizmalar kurduk.",
        icon: <Zap />,
        color: "yellow.500",
    },
    {
        date: "Mayıs 2023",
        title: "Tamamen Özelleştirilebilir Panel",
        description:
            "Tüm botların piyasada benzeri olmayan konfigürasyon seçenekleriyle birlikte kurulabileceği ve yönetilebileceği bir panel inşa etmek için çalışmalara başladık.",
        icon: <CheckCircle />,
        color: "teal.500",
    },
    {
        date: "Haziran 2023",
        title: "Bitcator",
        description:
            "Bitcator kullanıma sunuldu. Finansın en hareketli ekosistemine tamamen entegre edilmiş alt yapımızla birlikte botlarımızı ücretsiz ve süre kısıtlamasız kullanım imkanıyla kullanıcılarımıza sunduk.",
        icon: <Calendar />,
        color: "pink.500",
    },
]

export default function AboutPage() {
    const [visibleItems, setVisibleItems] = useState([])
    const sectionRef = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        timeline.forEach((_, index) => {
                            setTimeout(() => {
                                setVisibleItems((prev) => [...prev, index])
                            }, index * 200)
                        })
                    }
                })
            },
            { threshold: 0.2 },
        )

        if (sectionRef.current) observer.observe(sectionRef.current)
        return () => observer.disconnect()
    }, [])

    const bg = useColorModeValue("#f8f9fa", "#0f1419")
    const cardBg = useColorModeValue("white", "#1a202c")
    const textColor = useColorModeValue("gray.800", "gray.100")
    const subText = useColorModeValue("gray.600", "gray.400")
    const borderColor = useColorModeValue("gray.200", "gray.600")

    return (
        <Box minH="100vh" bg={bg}>
            {/* Header */}
            <Header />

            {/* Hero Section */}
            <Box py={20} px={6} position="relative" overflow="hidden">
                <Box
                    position="absolute"
                    top="0"
                    left="0"
                    right="0"
                    bottom="0"
                    bgGradient="linear(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)"
                    opacity="0.1"
                />

                <Container maxW="1200px" position="relative" zIndex="1">
                    <MotionBox
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        textAlign="center"
                        mb={16}
                    >
                        <Badge
                            mb={6}
                            px={4}
                            py={2}
                            bg="blue.500"
                            color="white"
                            borderRadius="full"
                            fontSize="sm"
                            fontWeight="semibold"
                        >
                            🚀 Hakkımızda
                        </Badge>

                        <Heading
                            fontSize={{ base: "3xl", md: "5xl", lg: "6xl" }}
                            mb={6}
                            color={textColor}
                            fontWeight="bold"
                            lineHeight="1.1"
                        >
                            <Text
                                as="span"
                                background="linear-gradient(to right, #318594, #7ad5e6)"
                                backgroundClip="text"
                                color="transparent"
                            >
                                BİTCATOR
                            </Text>{" "}
                            HİKAYESİ
                        </Heading>

                        <Text fontSize={{ base: "lg", md: "xl" }} color={subText} maxW="4xl" mx="auto" lineHeight="1.8">
                            Bitcator'ı kurmadan önce, finansal piyasalardaki gelişmeleri yakından takip etmek, teknik analiz
                            eğitimleri vermek ve bir topluluk olarak finans endüstrisindeki çalışmalarımızı genişletmek ve geliştirmek
                            için çalışmalar yapıyorduk.
                        </Text>
                    </MotionBox>
                </Container>
            </Box>

            {/* Story Section */}
            <Box py={20} px={6}>
                <Container maxW="1200px">
                    <MotionBox
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        bg={cardBg}
                        borderRadius="2xl"
                        p={10}
                        border="1px"
                        borderColor={borderColor}
                        boxShadow="lg"
                        mb={20}
                    >
                        <Text fontSize={{ base: "md", md: "lg" }} color={textColor} lineHeight="1.8" textAlign="justify">
                            Buna 2020 yılında topluluk olarak başladık. Geniş kitlelere ücretsiz teknik analiz eğitimleri ve
                            bilgilerimizi paylaşmak için seminerler verdik. İlerleyen süreçte piyasalardaki hareketliliğe her an
                            yetişebilmek için otomatik ticaret algoritmaları geliştirmeye başladık. En kazançlı stratejileri tespit
                            edip bunları otomatikleştirdik. Bu sayede fazla efor sarfetmeden 7/24 kazanç sağlamanın avantajını elde
                            ettik.
                            <br />
                            <br />
                            Öncelikle yakın çevremizden bir çok talep ile karşılaştık. Tüm bunlara yetişmeye çalışırken performanstan
                            ödün vermeyen ve eşi benzeri olmayan güçlü bir yazılım geliştirmeye karar verdik. Piyasada bunu çok dar
                            konfigürasyon seçenekleriyle yapan firmalar olduğunu fark ettik ve hayal edilebilen tüm stratejilerin
                            özelleştirilebileceği bir platform kurmayı hedefledik.
                            <br />
                            <br />
                            Ve sonunda Bitcator'ı piyasadaki en hızlı ve en geniş konfigürasyon seçeneklerine sahip bot olarak
                            sizlerin kullanımına sunduk.
                        </Text>
                    </MotionBox>

                    {/* Timeline Section */}
                    <Box ref={sectionRef}>
                        <MotionBox
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            textAlign="center"
                            mb={16}
                        >
                            <Heading fontSize={{ base: "2xl", md: "4xl" }} mb={4} color={textColor}>
                                Gelişim Sürecimiz
                            </Heading>
                            <Text fontSize="lg" color={subText}>
                                2020'den bugüne kadar olan yolculuğumuz
                            </Text>
                        </MotionBox>

                        <VStack spacing={8} align="stretch">
                            {timeline.map((item, index) => {
                                const isVisible = visibleItems.includes(index)
                                const isEven = index % 2 === 0

                                return (
                                    <MotionBox
                                        key={index}
                                        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                                        animate={isVisible ? { opacity: 1, x: 0 } : {}}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                    >
                                        <Flex direction={{ base: "column", md: isEven ? "row" : "row-reverse" }} align="center" gap={8}>
                                            <Box flex="1">
                                                <Box
                                                    bg={cardBg}
                                                    borderRadius="xl"
                                                    p={6}
                                                    border="1px"
                                                    borderColor={borderColor}
                                                    boxShadow="md"
                                                    _hover={{ transform: "translateY(-4px)", boxShadow: "lg" }}
                                                    transition="all 0.3s"
                                                >
                                                    <HStack spacing={4} mb={4}>
                                                        <Box
                                                            w={12}
                                                            h={12}
                                                            bg={item.color}
                                                            borderRadius="full"
                                                            display="flex"
                                                            alignItems="center"
                                                            justifyContent="center"
                                                            color="white"
                                                        >
                                                            {item.icon}
                                                        </Box>
                                                        <Badge
                                                            colorScheme={item.color.split(".")[0]}
                                                            px={3}
                                                            py={1}
                                                            borderRadius="full"
                                                            fontSize="sm"
                                                        >
                                                            {item.date}
                                                        </Badge>
                                                    </HStack>

                                                    <Heading fontSize="xl" mb={3} color={textColor}>
                                                        {item.title}
                                                    </Heading>

                                                    <Text color={subText} lineHeight="1.6">
                                                        {item.description}
                                                    </Text>
                                                </Box>
                                            </Box>

                                            <Box
                                                w={4}
                                                h={4}
                                                bg={item.color}
                                                borderRadius="full"
                                                flexShrink={0}
                                                display={{ base: "none", md: "block" }}
                                            />
                                        </Flex>
                                    </MotionBox>
                                )
                            })}
                        </VStack>
                    </Box>
                </Container>
            </Box>
        </Box>
    )
}
