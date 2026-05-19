"use client";
import React, { use, useEffect } from "react";
import {
    Box,
    Flex,
    Heading,
    Text,
    Button,
    VStack,
    HStack,
    Card,
} from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { LogOut, TrendingUp, DollarSign, Bot } from "lucide-react";

export default function Dashboard() {
    // Better Auth client hook: { data, isPending }
    const { data: session, isPending } = useSession();
    const router = useRouter();

    const bg = useColorModeValue("gray.50", "#0f1419");
    const cardBg = useColorModeValue("white", "#1a202c");
    const textColor = useColorModeValue("gray.800", "gray.100");
    const subText = useColorModeValue("gray.600", "gray.300");

    const handleSignOut = async () => {
        await signOut();
        router.replace("/"); // replace daha temiz
    };

    // NOT AUTH: render sırasında değil, effect içinde yönlendir
    useEffect(() => {
        if (!isPending && !session) {
            router.replace("/signIn");
        }
    }, [isPending, session, router]);

    // Loading state
    if (isPending) {
        return (
            <Box minH="100vh" bg={bg} display="flex" alignItems="center" justifyContent="center">
                <Text color={textColor}>Yükleniyor...</Text>
            </Box>
        );
    }

    // Effect yönlendirecek; burada UI render etmeyelim
    if (!session) return null;

    return (
        <Box minH="100vh" bg={bg} p={6}>
            <VStack spacing={6} maxW="6xl" mx="auto">
                {/* Header */}
                <Flex w="100%" justifyContent="space-between" alignItems="center">
                    <HStack spacing={4}>
                        <VStack align="start" spacing={1}>
                            <Heading size="lg" color={textColor}>
                                Hoş Geldiniz, {session.user?.name}!
                            </Heading>
                            <Text color={subText}>{session.user?.email}</Text>
                        </VStack>
                    </HStack>

                    <Button
                        onClick={handleSignOut}
                        variant="outline"
                        leftIcon={<LogOut size={16} />}
                        colorScheme="red"
                    >
                        Çıkış Yap
                    </Button>
                </Flex>

                {/* Welcome Card */}
                <Card.Root w="100%" bg={cardBg}>
                    <Card.Body>
                        <VStack spacing={4} textAlign="center">
                            <Heading size="md" color={textColor}>
                                Bitcator Dashboard'a Hoş Geldiniz!
                            </Heading>
                            <Text color={subText}>
                                AI destekli trading botlarınızı yönetmek için dashboard'unuz hazır.
                                Aşağıdaki özelliklerle trading deneyiminizi geliştirin.
                            </Text>
                        </VStack>
                    </Card.Body>
                </Card.Root>

                {/* Features Grid */}
                <Flex w="100%" gap={6} flexWrap="wrap">
                    <Card.Root flex="1" minW="300px" bg={cardBg}>
                        <Card.Body>
                            <VStack spacing={3}>
                                <Box color="blue.500">
                                    <Bot size={40} />
                                </Box>
                                <Heading size="md" color={textColor}>
                                    Trading Botları
                                </Heading>
                                <Text color={subText} textAlign="center">
                                    AI destekli trading botlarınızı oluşturun ve yönetin
                                </Text>
                            </VStack>
                        </Card.Body>
                        <Card.Footer>
                            <Button colorScheme="blue" size="sm" w="100%">
                                Yakında Gelecek
                            </Button>
                        </Card.Footer>
                    </Card.Root>

                    <Card.Root flex="1" minW="300px" bg={cardBg}>
                        <Card.Body>
                            <VStack spacing={3}>
                                <Box color="green.500">
                                    <TrendingUp size={40} />
                                </Box>
                                <Heading size="md" color={textColor}>
                                    Analiz
                                </Heading>
                                <Text color={subText} textAlign="center">
                                    Portföy performansınızı ve kazançlarınızı takip edin
                                </Text>
                            </VStack>
                        </Card.Body>
                        <Card.Footer>
                            <Button colorScheme="green" size="sm" w="100%">
                                Yakında Gelecek
                            </Button>
                        </Card.Footer>
                    </Card.Root>

                    <Card.Root flex="1" minW="300px" bg={cardBg}>
                        <Card.Body>
                            <VStack spacing={3}>
                                <Box color="purple.500">
                                    <DollarSign size={40} />
                                </Box>
                                <Heading size="md" color={textColor}>
                                    Cüzdan
                                </Heading>
                                <Text color={subText} textAlign="center">
                                    Kripto varlıklarınızı güvenle saklayın ve yönetin
                                </Text>
                            </VStack>
                        </Card.Body>
                        <Card.Footer>
                            <Button colorScheme="purple" size="sm" w="100%">
                                Yakında Gelecek
                            </Button>
                        </Card.Footer>
                    </Card.Root>
                </Flex>
            </VStack>
        </Box>
    );
}
