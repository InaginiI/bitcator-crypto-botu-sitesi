"use client"
import { useState } from "react"
import { Box, Heading, Text, Badge, VStack, HStack, Container, Link, Button, Grid } from "@chakra-ui/react"
import { useColorModeValue } from "@/components/ui/color-mode"
import { motion } from "framer-motion"
import { ArrowLeft, Check } from "lucide-react"
import NextLink from "next/link"
import Header from "@/components/layout/Header"

const MotionBox = motion(Box)

const pricingPlans = [
    {
        name: "Free",
        price: 0,
        popular: false,
        features: [
            "1 Adet Bot Kullanım Hakkı",
            "Yalnızca bir işlem çifti",
            "Yalnızca %'lik yapılandırma kullanımı",
            "Gelişmiş ayarlar kullanılamaz",
        ],
    },
    {
        name: "Starter",
        price: 9,
        popular: false,
        discount: true,
        features: [
            "3 Adet Farklı Bot Kullanım Hakkı",
            "10 adet işlem çifti seçimi",
            "%'lik ve İndikatör bot yapılandırması",
            "Gelişmiş ayarlar kullanılabilir",
        ],
    },
    {
        name: "Advanced",
        price: 18,
        popular: true,
        discount: true,
        features: [
            "10 Adet Farklı Bot Kullanım Hakkı",
            "30 adet işlem çifti seçimi",
            "%'lik ve İndikatör bot yapılandırması",
            "Ürünün volatilitesine göre otomatik ayarlanan trailing seçeneği",
            "Gelişmiş ayarlar kullanılabilir",
            "1 adet Pump/Dump Botu Kullanım Hakkı",
        ],
    },
    {
        name: "Premium",
        price: 35,
        popular: false,
        discount: true,
        features: [
            "Sınırsız Bot Kullanım Hakkı",
            "Sınırsız işlem çifti seçimi",
            "Kısıtlamasız bot yapılandırması",
            "Ürünün volatilitesine göre otomatik ayarlanan trailing seçeneği",
            "İndikatör parametrelerini özelleştirebilme seçeneği",
            "Gelişmiş ayarlar kullanılabilir",
            "Teknik gösterge talebinde bulunabilir",
            "Sınırsız Pump/Dump Botu Kullanım Hakkı",
            "Listing/Delisting Botu Kullanım Hakkı",
        ],
    },
]

export default function PricingPage() {
    const [isYearly, setIsYearly] = useState(false)

    const bg = useColorModeValue("#f5f7fa", "#0f1419")
    const cardBg = useColorModeValue("white", "#1a202c")
    const textColor = useColorModeValue("gray.800", "gray.100")
    const subText = useColorModeValue("gray.600", "gray.400")
    const borderColor = useColorModeValue("gray.200", "gray.600")

    const getPrice = (price) => {
        if (price === 0) return 0
        return isYearly ? Math.round(price * 0.75) : price
    }

    return (
        <Box minH="100vh" bg={bg}>
            {/* Header */}
            <Header />

            {/* Hero Section */}
            <Box py={16} px={6}>
                <Container maxW="1200px">
                    <MotionBox
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        textAlign="center"
                        mb={12}
                    >
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
                                ABONELİK FİYATLARI
                            </Text>{" "}
                            VE FİYATLANDIRMA
                        </Heading>

                        <Text fontSize={{ base: "lg", md: "xl" }} color={subText} maxW="2xl" mx="auto" mb={8}>
                            Yıllık abonelik ile her ay için %25 tasarruf edebilirsiniz.
                        </Text>

                        {/* Billing Toggle */}
                        <HStack spacing={4} justify="center" mb={8}>
                            <Text
                                color={!isYearly ? "blue.500" : subText}
                                fontWeight={!isYearly ? "bold" : "medium"}
                                cursor="pointer"
                                onClick={() => setIsYearly(false)}
                            >
                                Aylık
                            </Text>
                            <Box
                                w="50px"
                                h="6"
                                bg="gray.200"
                                borderRadius="full"
                                position="relative"
                                cursor="pointer"
                                onClick={() => setIsYearly(!isYearly)}
                            >
                                <Box
                                    w="5"
                                    h="5"
                                    bg="blue.500"
                                    borderRadius="full"
                                    position="absolute"
                                    top="1px"
                                    left={isYearly ? "26px" : "2px"}
                                    transition="all 0.3s"
                                />
                            </Box>
                            <Text
                                color={isYearly ? "blue.500" : subText}
                                fontWeight={isYearly ? "bold" : "medium"}
                                cursor="pointer"
                                onClick={() => setIsYearly(true)}
                            >
                                Yıllık
                            </Text>
                            {isYearly && (
                                <Badge colorScheme="green" px={2} py={1} borderRadius="md" fontSize="xs">
                                    %25 İndirim
                                </Badge>
                            )}
                        </HStack>
                    </MotionBox>
                </Container>
            </Box>

            {/* Pricing Cards */}
            <Box pb={20} px={6}>
                <Container maxW="1000px">
                    <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
                        {pricingPlans.map((plan, index) => (
                            <MotionBox
                                key={plan.name}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                position="relative"
                            >
                                {plan.discount && (
                                    <Box position="absolute" top="-8px" right="20px" zIndex="2">
                                        <Box
                                            bg="red.500"
                                            color="white"
                                            borderRadius="full"
                                            w="50px"
                                            h="50px"
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                            fontSize="xs"
                                            fontWeight="bold"
                                            position="relative"
                                            _before={{
                                                content: '""',
                                                position: "absolute",
                                                bottom: "-8px",
                                                left: "50%",
                                                transform: "translateX(-50%)",
                                                width: "0",
                                                height: "0",
                                                borderLeft: "8px solid transparent",
                                                borderRight: "8px solid transparent",
                                                borderTop: "8px solid #E53E3E",
                                            }}
                                        >
                                            50%
                                        </Box>
                                    </Box>
                                )}

                                <Box
                                    bg={cardBg}
                                    borderRadius="lg"
                                    border="1px"
                                    borderColor={borderColor}
                                    p={8}
                                    boxShadow="sm"
                                    _hover={{ boxShadow: "md" }}
                                    transition="all 0.3s"
                                    h="full"
                                >
                                    {/* Header */}
                                    <VStack spacing={4} align="start" mb={6}>
                                        <Text fontSize="xl" fontWeight="semibold" color={textColor}>
                                            {plan.name}
                                        </Text>

                                        <HStack align="baseline">
                                            <Text fontSize="4xl" fontWeight="bold" color={textColor}>
                                                ${getPrice(plan.price)}
                                            </Text>
                                            <Text fontSize="lg" color={subText}>
                                                /{isYearly ? "yıl" : "ay"}
                                            </Text>
                                        </HStack>

                                        <Button
                                            w="100%"
                                            size="lg"
                                            bg="teal.500"
                                            color="white"
                                            borderRadius="md"
                                            _hover={{ bg: "teal.600" }}
                                            fontSize="md"
                                            fontWeight="semibold"
                                        >
                                            {plan.price === 0 ? "Free" : "Satın Al"}
                                        </Button>
                                    </VStack>

                                    {/* Features */}
                                    <VStack spacing={3} align="stretch">
                                        {plan.features.map((feature, idx) => (
                                            <HStack key={idx} spacing={3} align="start">
                                                <Box
                                                    w={4}
                                                    h={4}
                                                    bg="blue.500"
                                                    borderRadius="sm"
                                                    display="flex"
                                                    alignItems="center"
                                                    justifyContent="center"
                                                    flexShrink={0}
                                                    mt={0.5}
                                                >
                                                    <Check size={10} color="white" />
                                                </Box>
                                                <Text fontSize="sm" color={textColor} lineHeight="1.4">
                                                    {feature}
                                                </Text>
                                            </HStack>
                                        ))}
                                    </VStack>
                                </Box>
                            </MotionBox>
                        ))}
                    </Grid>
                </Container>
            </Box>
        </Box>
    )
}
