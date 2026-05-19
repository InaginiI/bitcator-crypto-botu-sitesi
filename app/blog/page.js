"use client"
import { useState } from "react"
import {
    Box,
    Heading,
    Text,
    Badge,
    VStack,
    HStack,
    Container,
    Link,
    Button,
    Grid,
    Image,
    AspectRatio,
} from "@chakra-ui/react"
import { useColorModeValue } from "@/components/ui/color-mode"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar, User } from "lucide-react"
import NextLink from "next/link"
import Header from "@/components/layout/Header"

const MotionBox = motion(Box)

const articles = [
    {
        id: 1,
        title: "Kripto Para Piyasalarında AI Destekli Trading Botlarının Yükselişi",
        excerpt:
            "Yapay zeka teknolojilerinin kripto para ticaretindeki rolü ve gelecekteki potansiyeli hakkında detaylı analiz.",
        author: "Bitcator Ekibi",
        date: "15 Aralık 2024",
        category: "AI & Trading",
        readTime: "8 dk",
        image: "/ai-crypto-trading.png",
        featured: true,
    },
    {
        id: 2,
        title: "DCA Stratejisi: Volatil Piyasalarda Nasıl Kazanç Sağlanır?",
        excerpt: "Dollar Cost Averaging stratejisinin kripto para yatırımlarındaki avantajları ve uygulama yöntemleri.",
        author: "Ahmet Yılmaz",
        date: "12 Aralık 2024",
        category: "Strateji",
        readTime: "6 dk",
        image: "/dca-cryptocurrency-strategy.png",
        featured: false,
    },
    {
        id: 3,
        title: "2024 Kripto Para Piyasa Analizi ve 2025 Tahminleri",
        excerpt: "Bu yılın kripto para piyasalarındaki gelişmeleri ve gelecek yıl için beklentilerimizi değerlendiriyoruz.",
        author: "Mehmet Demir",
        date: "10 Aralık 2024",
        category: "Piyasa Analizi",
        readTime: "12 dk",
        image: "/crypto-market-analysis-2024.png",
        featured: true,
    },
    {
        id: 4,
        title: "Risk Yönetimi: Stop Loss ve Trailing Stop Kullanımı",
        excerpt: "Kripto para ticaretinde risk yönetiminin önemi ve etkili stop loss stratejileri.",
        author: "Ayşe Kaya",
        date: "8 Aralık 2024",
        category: "Risk Yönetimi",
        readTime: "7 dk",
        image: "/risk-management-stop-loss.png",
        featured: false,
    },
    {
        id: 5,
        title: "Binance ve OKX API Entegrasyonu: Adım Adım Rehber",
        excerpt: "Popüler kripto para borsalarıyla API entegrasyonu nasıl yapılır? Detaylı rehber.",
        author: "Bitcator Ekibi",
        date: "5 Aralık 2024",
        category: "Teknik",
        readTime: "10 dk",
        image: "/api-integration-binance-okx.png",
        featured: false,
    },
    {
        id: 6,
        title: "Pump & Dump Botları: Fırsatları Nasıl Değerlendirirsiniz?",
        excerpt: "Ani fiyat hareketlerini yakalayan botların çalışma prensipleri ve kullanım alanları.",
        author: "Can Özkan",
        date: "3 Aralık 2024",
        category: "Bot Stratejileri",
        readTime: "9 dk",
        image: "/pump-dump-trading-bots.png",
        featured: false,
    },
]

const categories = ["Tümü", "AI & Trading", "Strateji", "Piyasa Analizi", "Risk Yönetimi", "Teknik", "Bot Stratejileri"]

export default function ArticlesPage() {
    const [selectedCategory, setSelectedCategory] = useState("Tümü")

    const bg = useColorModeValue("#f8f9fa", "#0f1419")
    const cardBg = useColorModeValue("white", "#1a202c")
    const textColor = useColorModeValue("gray.800", "gray.100")
    const subText = useColorModeValue("gray.600", "gray.400")
    const borderColor = useColorModeValue("gray.200", "gray.600")

    const filteredArticles = articles.filter((article) => {
        const matchesCategory = selectedCategory === "Tümü" || article.category === selectedCategory
        return matchesCategory
    })

    const featuredArticles = filteredArticles.filter((article) => article.featured)
    const regularArticles = filteredArticles.filter((article) => !article.featured)

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
                            📰 Makaleler & Haberler
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
                                KRİPTO DÜNYASI
                            </Text>{" "}
                            HABERLERİ
                        </Heading>

                        <Text fontSize={{ base: "lg", md: "xl" }} color={subText} maxW="3xl" mx="auto" mb={8}>
                            Kripto para piyasaları, trading stratejileri ve AI destekli botlar hakkında en güncel haberler ve
                            derinlemesine analizler.
                        </Text>

                        {/* Filter */}
                        <VStack spacing={6} maxW="2xl" mx="auto">
                            <HStack spacing={2} flexWrap="wrap" justify="center">
                                {categories.map((category) => (
                                    <Button
                                        key={category}
                                        size="sm"
                                        variant={selectedCategory === category ? "solid" : "outline"}
                                        colorScheme="blue"
                                        borderRadius="full"
                                        onClick={() => setSelectedCategory(category)}
                                        fontSize="xs"
                                    >
                                        {category}
                                    </Button>
                                ))}
                            </HStack>
                        </VStack>
                    </MotionBox>
                </Container>
            </Box>

            {/* Featured Articles */}
            {featuredArticles.length > 0 && (
                <Box py={10} px={6}>
                    <Container maxW="1200px">
                        <Heading fontSize="2xl" mb={8} color={textColor}>
                            Öne Çıkan Makaleler
                        </Heading>

                        <Grid templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }} gap={8}>
                            {featuredArticles.map((article, index) => (
                                <MotionBox
                                    key={article.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                >
                                    <Box
                                        bg={cardBg}
                                        borderRadius="2xl"
                                        overflow="hidden"
                                        border="1px"
                                        borderColor={borderColor}
                                        boxShadow="lg"
                                        _hover={{ transform: "translateY(-4px)", boxShadow: "xl" }}
                                        transition="all 0.3s"
                                        cursor="pointer"
                                    >
                                        <AspectRatio ratio={16 / 9}>
                                            <Image src={article.image || "/placeholder.svg"} alt={article.title} objectFit="cover" />
                                        </AspectRatio>

                                        <Box p={6}>
                                            <HStack spacing={2} mb={3}>
                                                <Badge colorScheme="blue" borderRadius="md">
                                                    {article.category}
                                                </Badge>
                                                <Badge variant="outline" borderRadius="md">
                                                    ⭐ Öne Çıkan
                                                </Badge>
                                            </HStack>

                                            <Heading fontSize="xl" mb={3} color={textColor} lineHeight="1.3">
                                                {article.title}
                                            </Heading>

                                            <Text color={subText} mb={4} lineHeight="1.6">
                                                {article.excerpt}
                                            </Text>

                                            <HStack justify="space-between" align="center">
                                                <HStack spacing={4} fontSize="sm" color={subText}>
                                                    <HStack spacing={1}>
                                                        <User size={14} />
                                                        <Text>{article.author}</Text>
                                                    </HStack>
                                                    <HStack spacing={1}>
                                                        <Calendar size={14} />
                                                        <Text>{article.date}</Text>
                                                    </HStack>
                                                </HStack>
                                                <Badge variant="outline" fontSize="xs">
                                                    {article.readTime}
                                                </Badge>
                                            </HStack>
                                        </Box>
                                    </Box>
                                </MotionBox>
                            ))}
                        </Grid>
                    </Container>
                </Box>
            )}

            {/* Regular Articles */}
            <Box py={10} px={6}>
                <Container maxW="1200px">
                    <Heading fontSize="2xl" mb={8} color={textColor}>
                        Tüm Makaleler
                    </Heading>

                    <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={8}>
                        {regularArticles.map((article, index) => (
                            <MotionBox
                                key={article.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                <Box
                                    bg={cardBg}
                                    borderRadius="xl"
                                    overflow="hidden"
                                    border="1px"
                                    borderColor={borderColor}
                                    boxShadow="md"
                                    _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
                                    transition="all 0.3s"
                                    cursor="pointer"
                                    h="full"
                                >
                                    <AspectRatio ratio={16 / 9}>
                                        <Image src={article.image || "/placeholder.svg"} alt={article.title} objectFit="cover" />
                                    </AspectRatio>

                                    <Box p={5}>
                                        <Badge colorScheme="blue" borderRadius="md" mb={3}>
                                            {article.category}
                                        </Badge>

                                        <Heading fontSize="lg" mb={2} color={textColor} lineHeight="1.3">
                                            {article.title}
                                        </Heading>

                                        <Text color={subText} mb={4} fontSize="sm" lineHeight="1.5">
                                            {article.excerpt}
                                        </Text>

                                        <VStack spacing={2} align="stretch">
                                            <HStack spacing={3} fontSize="xs" color={subText}>
                                                <HStack spacing={1}>
                                                    <User size={12} />
                                                    <Text>{article.author}</Text>
                                                </HStack>
                                                <HStack spacing={1}>
                                                    <Calendar size={12} />
                                                    <Text>{article.date}</Text>
                                                </HStack>
                                            </HStack>
                                            <HStack justify="space-between" align="center">
                                                <Badge variant="outline" fontSize="xs">
                                                    {article.readTime}
                                                </Badge>
                                                <Text fontSize="xs" color="blue.500" fontWeight="semibold">
                                                    Devamını Oku →
                                                </Text>
                                            </HStack>
                                        </VStack>
                                    </Box>
                                </Box>
                            </MotionBox>
                        ))}
                    </Grid>

                    {filteredArticles.length === 0 && (
                        <Box textAlign="center" py={16}>
                            <Text fontSize="lg" color={subText}>
                                Aradığınız kriterlere uygun makale bulunamadı.
                            </Text>
                        </Box>
                    )}
                </Container>
            </Box>
        </Box>
    )
}
