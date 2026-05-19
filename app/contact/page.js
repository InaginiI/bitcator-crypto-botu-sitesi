"use client"

import { useState } from "react"
import {
    Box,
    Flex,
    Heading,
    Text,
    Badge,
    VStack,
    HStack,
    Container,
    Link,
    Button,
    Input,
    Textarea,
    Field,
    Grid,
    Alert,
    AlertIcon,
} from "@chakra-ui/react"
import { useColorModeValue } from "@/components/ui/color-mode"
import { motion } from "framer-motion"
import { ArrowLeft, Mail, Phone, MapPin, Clock, Send, MessageCircle } from "lucide-react"
import NextLink from "next/link"
import Header from "@/components/layout/Header"

const MotionBox = motion(Box)

const contactInfo = [
    {
        icon: <Mail />,
        title: "E-posta",
        value: "info@bitcator.com",
        description: "7/24 destek için bize yazın",
    },
    {
        icon: <Phone />,
        title: "Telefon",
        value: "+90 (212) 123 45 67",
        description: "Pazartesi - Cuma: 09:00 - 18:00",
    },
    {
        icon: <MapPin />,
        title: "Adres",
        value: "İstanbul, Türkiye",
        description: "Merkez ofisimiz",
    },
    {
        icon: <Clock />,
        title: "Çalışma Saatleri",
        value: "7/24 Online Destek",
        description: "Her zaman yanınızdayız",
    },
]

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    })
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [error, setError] = useState("")

    const bg = useColorModeValue("#f8f9fa", "#0f1419")
    const cardBg = useColorModeValue("white", "#1a202c")
    const textColor = useColorModeValue("gray.800", "gray.100")
    const subText = useColorModeValue("gray.600", "gray.400")
    const borderColor = useColorModeValue("gray.200", "gray.600")

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
        setError("")
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError("")

        // Validation
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            setError("Lütfen tüm alanları doldurun")
            setIsLoading(false)
            return
        }

        // Simulate API call
        setTimeout(() => {
            setIsSuccess(true)
            setFormData({ name: "", email: "", subject: "", message: "" })
            setIsLoading(false)
        }, 2000)
    }

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
                            📞 İletişim
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
                                BİZİMLE
                            </Text>{" "}
                            İLETİŞİME GEÇİN
                        </Heading>

                        <Text fontSize={{ base: "lg", md: "xl" }} color={subText} maxW="3xl" mx="auto">
                            Sorularınız, önerileriniz veya destek talepleriniz için bize ulaşın. Uzman ekibimiz size yardımcı olmak
                            için burada.
                        </Text>
                    </MotionBox>
                </Container>
            </Box>

            {/* Contact Info Cards */}
            <Box py={10} px={6}>
                <Container maxW="1200px">
                    <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} gap={6} mb={16}>
                        {contactInfo.map((info, index) => (
                            <MotionBox
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                <Box
                                    bg={cardBg}
                                    borderRadius="xl"
                                    p={6}
                                    border="1px"
                                    borderColor={borderColor}
                                    boxShadow="md"
                                    textAlign="center"
                                    _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
                                    transition="all 0.3s"
                                >
                                    <Flex
                                        w={12}
                                        h={12}
                                        bg="blue.500"
                                        borderRadius="full"
                                        align="center"
                                        justify="center"
                                        mx="auto"
                                        mb={4}
                                        color="white"
                                    >
                                        {info.icon}
                                    </Flex>

                                    <Heading fontSize="lg" mb={2} color={textColor}>
                                        {info.title}
                                    </Heading>

                                    <Text fontSize="md" fontWeight="semibold" color="blue.500" mb={1}>
                                        {info.value}
                                    </Text>

                                    <Text fontSize="sm" color={subText}>
                                        {info.description}
                                    </Text>
                                </Box>
                            </MotionBox>
                        ))}
                    </Grid>

                    {/* Contact Form */}
                    <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={12}>
                        {/* Form */}
                        <MotionBox
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <Box bg={cardBg} borderRadius="2xl" p={8} border="1px" borderColor={borderColor} boxShadow="lg">
                                <Heading fontSize="2xl" mb={6} color={textColor}>
                                    Mesaj Gönderin
                                </Heading>

                                {isSuccess && (
                                    <Alert status="success" borderRadius="lg" mb={6}>
                                        Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.
                                    </Alert>
                                )}

                                {error && (
                                    <Alert status="error" borderRadius="lg" mb={6}>
                                        {error}
                                    </Alert>
                                )}

                                <Box as="form" onSubmit={handleSubmit}>
                                    <VStack spacing={6}>
                                        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4} w="100%">
                                            <Field.Root>
                                                <Field.Label color={textColor} fontWeight="semibold">
                                                    Ad Soyad
                                                    <Field.RequiredIndicator />
                                                </Field.Label>
                                                <Input
                                                    name="name"
                                                    placeholder="Adınız ve soyadınız"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    bg={cardBg}
                                                    border="1px"
                                                    borderColor={borderColor}
                                                    borderRadius="lg"
                                                    _hover={{ borderColor: "blue.400" }}
                                                    _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px #3182ce" }}
                                                />
                                                <Field.ErrorText />
                                            </Field.Root>

                                            <Field.Root>
                                                <Field.Label color={textColor} fontWeight="semibold">
                                                    E-posta
                                                    <Field.RequiredIndicator />
                                                </Field.Label>
                                                <Input
                                                    name="email"
                                                    type="email"
                                                    placeholder="ornek@email.com"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    bg={cardBg}
                                                    border="1px"
                                                    borderColor={borderColor}
                                                    borderRadius="lg"
                                                    _hover={{ borderColor: "blue.400" }}
                                                    _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px #3182ce" }}
                                                />
                                                <Field.ErrorText />
                                            </Field.Root>
                                        </Grid>

                                        <Field.Root>
                                            <Field.Label color={textColor} fontWeight="semibold">
                                                Konu
                                                <Field.RequiredIndicator />
                                            </Field.Label>
                                            <Input
                                                name="subject"
                                                placeholder="Mesajınızın konusu"
                                                value={formData.subject}
                                                onChange={handleInputChange}
                                                bg={cardBg}
                                                border="1px"
                                                borderColor={borderColor}
                                                borderRadius="lg"
                                                _hover={{ borderColor: "blue.400" }}
                                                _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px #3182ce" }}
                                            />
                                            <Field.ErrorText />
                                        </Field.Root>

                                        <Field.Root>
                                            <Field.Label color={textColor} fontWeight="semibold">
                                                Mesaj
                                                <Field.RequiredIndicator />
                                            </Field.Label>
                                            <Textarea
                                                name="message"
                                                placeholder="Mesajınızı buraya yazın..."
                                                value={formData.message}
                                                onChange={handleInputChange}
                                                bg={cardBg}
                                                border="1px"
                                                borderColor={borderColor}
                                                borderRadius="lg"
                                                _hover={{ borderColor: "blue.400" }}
                                                _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px #3182ce" }}
                                                rows={6}
                                                resize="vertical"
                                            />
                                            <Field.HelperText color={subText}>
                                                Teknik destek için lütfen detaylı bilgi verin
                                            </Field.HelperText>
                                            <Field.ErrorText />
                                        </Field.Root>

                                        <Button
                                            type="submit"
                                            size="lg"
                                            w="100%"
                                            bgGradient="linear(to-r, #4facfe, #00f2fe)"
                                            color="white"
                                            borderRadius="xl"
                                            _hover={{
                                                bgGradient: "linear(to-r, #3182ce, #00d4ff)",
                                                transform: "translateY(-2px)",
                                                boxShadow: "lg",
                                            }}
                                            _active={{ transform: "translateY(0)" }}
                                            isLoading={isLoading}
                                            loadingText="Gönderiliyor..."
                                            leftIcon={<Send size={20} />}
                                            fontSize="md"
                                            fontWeight="bold"
                                        >
                                            Mesaj Gönder
                                        </Button>
                                    </VStack>
                                </Box>
                            </Box>
                        </MotionBox>

                        {/* Additional Info */}
                        <MotionBox
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            <VStack spacing={6} align="stretch">
                                <Box bg={cardBg} borderRadius="xl" p={6} border="1px" borderColor={borderColor} boxShadow="md">
                                    <HStack spacing={3} mb={4}>
                                        <Box
                                            w={10}
                                            h={10}
                                            bg="green.500"
                                            borderRadius="full"
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                            color="white"
                                        >
                                            <MessageCircle size={20} />
                                        </Box>
                                        <Heading fontSize="lg" color={textColor}>
                                            Hızlı Destek
                                        </Heading>
                                    </HStack>
                                    <Text color={subText} lineHeight="1.6">
                                        Acil durumlar için 7/24 canlı destek hattımızdan bize ulaşabilirsiniz. Uzman ekibimiz size anında
                                        yardımcı olacaktır.
                                    </Text>
                                </Box>

                                <Box bg={cardBg} borderRadius="xl" p={6} border="1px" borderColor={borderColor} boxShadow="md">
                                    <HStack spacing={3} mb={4}>
                                        <Box
                                            w={10}
                                            h={10}
                                            bg="purple.500"
                                            borderRadius="full"
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                            color="white"
                                        >
                                            <Clock size={20} />
                                        </Box>
                                        <Heading fontSize="lg" color={textColor}>
                                            Yanıt Süresi
                                        </Heading>
                                    </HStack>
                                    <Text color={subText} lineHeight="1.6">
                                        E-posta ile gönderdiğiniz mesajlara genellikle 2-4 saat içinde, en geç 24 saat içinde yanıt
                                        veriyoruz.
                                    </Text>
                                </Box>

                                <Box bg="blue.50" borderRadius="xl" p={6} border="1px" borderColor="blue.200">
                                    <Text fontSize="sm" color="blue.700" textAlign="center" fontWeight="medium">
                                        💡 İpucu: Teknik destek için lütfen kullandığınız bot ayarlarını ve hata mesajlarını detaylı olarak
                                        belirtin.
                                    </Text>
                                </Box>
                            </VStack>
                        </MotionBox>
                    </Grid>
                </Container>
            </Box>
        </Box>
    )
}
