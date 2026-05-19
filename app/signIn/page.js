"use client";

import { useState, useEffect, useRef } from "react";
import {
    Button,
    Flex,
    Card,
    Field,
    Heading,
    Icon,
    Input,
    InputGroup,
    Text,
    Box,
} from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { Toaster, toaster } from "@/components/ui/toaster";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Turnstile } from "@marsidev/react-turnstile";

// auth-client
import { signIn, useSession } from "@/lib/auth-client";

export default function SignInPage() {
    const router = useRouter();
    const cftoken = useRef(null);

    const { data: session, isPending } = useSession();

    const [buttonText, setButtonText] = useState("Giriş Yap");
    const [error, setError] = useState("");
    const [show, setShow] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState("");

    const textColor = useColorModeValue("gray.700", "gray.100");
    const textColorSecondary = "gray.400";
    const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");

    // Oturum varsa yönlendir
    useEffect(() => {
        if (session?.user) router.replace("/dashboard");
    }, [session, router]);

    const handleSubmit = async () => {
        setError("");
        setButtonText("Giriş yapılıyor...");

        try {
            const result = await signIn.email({
                email,
                password,
                token, // Turnstile kullanıyorsan backend’ine gönderilir
            });

            if (result?.error) {
                const msg =
                    result.error?.message ||
                    "Giriş başarısız. Lütfen bilgilerinizi kontrol edin.";
                setError(msg);
                toaster.create({
                    title: "Giriş başarısız",
                    description: msg,
                    status: "error",
                    duration: 6000,
                });
                cftoken.current?.reset?.();
                setButtonText("Giriş Yap");
                return;
            }

            toaster.create({
                title: "Hoş geldiniz",
                description: "Giriş başarılı!",
                status: "success",
                duration: 5000,
            });
            router.replace("/dashboard");
        } catch (err) {
            const msg =
                err?.message ||
                "Giriş sırasında bir hata oluştu. Lütfen tekrar deneyin.";
            setError(msg);
            toaster.create({
                title: "Hata",
                description: msg,
                status: "error",
                duration: 6000,
            });
            cftoken.current?.reset?.();
            setButtonText("Giriş Yap");
        }
    };

    return (
        <Box>
            <Toaster />

            {/* Sol üst "Ana Sayfa" linki */}
            <Box position="absolute" top="6" left="6" zIndex="10">
                <Link
                    href="/"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        color: "gray.700",
                        fontSize: "14px",
                        fontWeight: 500,
                        textDecoration: "none",
                    }}
                >
                    <ArrowLeft size={16} style={{ marginRight: 8 }} />
                    Ana Sayfa
                </Link>
            </Box>

            {/* Ortalanmış kart */}
            <Flex
                minH="100vh"
                align="center"
                justify="center"
                bg={useColorModeValue("gray.50", "#0f1419")}
                p={{ base: 4, md: 8 }}
            >
                <Card.Root
                    as={motion.div}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    p={{ base: "20px", lg: "30px" }}
                    borderRadius="20px"
                    maxW="560px"
                    w="full"
                >
                    <Flex gap="10px" flexDirection="column">
                        <Heading color={textColor} fontSize="36px" fontWeight="bold" my="10px">
                            Giriş Yap
                        </Heading>
                        <Text mb="10px" color={textColorSecondary} fontSize="md">
                            Hesabınıza erişebilmek için lütfen giriş yapınız.
                        </Text>

                        {(error || isPending) && (
                            <Text color={error ? "red" : "gray"} fontSize="sm" textAlign="center">
                                {error || "Oturum kontrol ediliyor..."}
                            </Text>
                        )}

                        {/* E-posta */}
                        <Field.Root required id="email">
                            <Field.Label fontSize="sm" color={textColor}>
                                E-posta
                            </Field.Label>
                            <Input
                                name="email"
                                value={email}
                                fontSize="sm"
                                type="email"
                                placeholder="mail@example.com"
                                size="lg"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Field.Root>

                        {/* Şifre */}
                        <Field.Root required id="password">
                            <Field.Label fontSize="sm" color={textColor} display="flex">
                                Şifre
                            </Field.Label>
                            <InputGroup
                                size="lg"
                                endElement={
                                    <Icon
                                        color={textColorSecondary}
                                        cursor="pointer"
                                        as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                                        onClick={() => setShow((s) => !s)}
                                    />
                                }
                            >
                                <Input
                                    name="password"
                                    value={password}
                                    fontSize="sm"
                                    placeholder="Minimum 8 karakter"
                                    type={show ? "text" : "password"}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </InputGroup>
                        </Field.Root>
                        <Text textAlign="right">
                            <Link href="/forgotPassword" style={{ color: "blue" }} >
                                Şifreni mi unuttun?
                            </Link>
                        </Text>

                        {/* Buton */}
                        <Button
                            fontSize="sm"
                            colorPalette="teal"
                            size="lg"
                            onClick={handleSubmit}
                            isDisabled={!email || !password}
                        >
                            {buttonText}
                        </Button>

                        {/* Turnstile */}
                        <Flex align="center" justify="center" my="10px">
                            <Turnstile
                                ref={cftoken}
                                siteKey="0x4AAAAAAAgKNPLV4pwnwqHI"
                                onSuccess={(data) => setToken(data)}
                            />
                        </Flex>

                        {/* Alt link */}
                        <Text color={textColorDetails} fontSize="14px">
                            Henüz kayıt olmadınız mı?{" "}
                            <Link href="/signUp" style={{ color: "blue" }}>
                                Hesap oluşturun
                            </Link>
                        </Text>
                    </Flex>
                </Card.Root>
            </Flex>
        </Box>
    );
}
