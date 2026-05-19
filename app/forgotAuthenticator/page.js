"use client";

import { useState, useRef } from "react";
import {
    Button,
    Flex,
    Card,
    Field,
    Heading,
    Input,
    Text,
    Box,
} from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { Toaster, toaster } from "@/components/ui/toaster";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Turnstile } from "@marsidev/react-turnstile";

export default function ForgotAuthenticator() {
    // --- basit yerel i18n ---
    const lang = "tr";
    const dict = {
        tr: {
            header: "Authenticator'ı Sıfırla",
            description:
                "Hesabın için kayıtlı e-posta ve 2FA kurtarma anahtarını gir. Doğrulanırsa talimatları e-posta ile göndereceğiz.",
            email: "E-posta",
            recoveryKey: "2FA Kurtarma Anahtarı",
            yupemailrequired: "E-posta gerekli",
            yupemailtype: "Geçerli bir e-posta girin",
            yuprecoverykeyrequired: "Kurtarma anahtarı gerekli",
            send: "Talep Gönder",
            sending: "Gönderiliyor...",
            toastSuccess:
                "Eğer bilgiler doğruysa, kurtarma talimatlarını e-posta ile gönderdik.",
            home: "Ana Sayfa",
            err_validation: "Validation Error",
            err_invalid_token: "Invalid Validation Token",
            err_generic: "Bir hata oluştu. Lütfen tekrar deneyin.",
            err_turnstile: "Doğrulama (Turnstile) gerekli",
        },
    };
    const t = (k) => (dict[lang] && dict[lang][k]) || k;

    // --- state ---
    const cftokenRef = useRef(null);
    const [email, setEmail] = useState("");
    const [recoveryKey, setRecoveryKey] = useState("");
    const [token, setToken] = useState(""); // Turnstile token
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // --- theme ---
    const textColor = useColorModeValue("gray.700", "gray.100");
    const textColorSecondary = "gray.400";
    const textColorBrand = useColorModeValue("brand.500", "white");

    // --- helpers ---
    const isValidEmail = (val) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(val || "").toLowerCase());

    const validate = () => {
        if (!email) return t("yupemailrequired");
        if (!isValidEmail(email)) return t("yupemailtype");
        if (!recoveryKey) return t("yuprecoverykeyrequired");
        if (!token) return t("err_turnstile");
        return "";
    };

    const handleSubmit = async () => {
        const v = validate();
        if (v) {
            setError(v);
            return;
        }
        setError("");
        setIsLoading(true);

        try {
            const request = await fetch("/api/forgot-authenticator", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, recoveryKey, token }),
            });

            if (request.ok) {
                toaster.create({
                    title: "Başarılı",
                    description: t("toastSuccess"),
                    status: "success",
                    duration: 8000,
                });
                // alanları temizlemek istersen:
                // setEmail(""); setRecoveryKey(""); setToken(""); cftokenRef.current?.reset?.();
            } else {
                const response = await request.json().catch(() => ({}));
                let msg = t("err_generic");
                switch (response?.message) {
                    case "ValidationError":
                        msg = t("err_validation");
                        break;
                    case "InvalidToken":
                        msg = t("err_invalid_token");
                        break;
                    case "Error":
                        msg = t("err_generic");
                        break;
                    default:
                        msg = t("err_generic");
                }
                setError(msg);
                toaster.create({
                    title: "Hata",
                    description: msg,
                    status: "error",
                    duration: 6000,
                });
                cftokenRef.current?.reset?.();
            }
        } catch {
            setError(t("err_generic"));
            toaster.create({
                title: "Hata",
                description: t("err_generic"),
                status: "error",
                duration: 6000,
            });
            cftokenRef.current?.reset?.();
        } finally {
            setIsLoading(false);
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
                    {t("home")}
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
                    maxW="500px"
                    w="full"
                >
                    <Flex gap="10px" flexDirection="column">
                        <Heading color={textColor} fontSize="36px">
                            {t("header")}
                        </Heading>
                        <Text mb="10px" color={textColorSecondary} fontSize="md">
                            {t("description")}
                        </Text>

                        {error && (
                            <Text color="red" fontSize="sm" textAlign="center">
                                {error}
                            </Text>
                        )}

                        {/* Email */}
                        <Field.Root required id="email">
                            <Field.Label fontSize="sm" color={textColor}>
                                {t("email")}
                            </Field.Label>
                            <Input
                                name="email"
                                value={email}
                                fontSize="sm"
                                type="email"
                                placeholder="mail@example.com"
                                size="lg"
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setError("");
                                }}
                            />
                        </Field.Root>

                        {/* Recovery Key */}
                        <Field.Root required id="recoveryKey">
                            <Field.Label fontSize="sm" color={textColor}>
                                {t("recoveryKey")}
                            </Field.Label>
                            <Input
                                name="recoveryKey"
                                value={recoveryKey}
                                fontSize="sm"
                                type="text"
                                placeholder="2FA Recovery Key"
                                size="lg"
                                onChange={(e) => {
                                    setRecoveryKey(e.target.value);
                                    setError("");
                                }}
                            />
                        </Field.Root>

                        {/* Turnstile */}
                        <Flex align="center" justify="center" my="10px">
                            <Turnstile
                                ref={cftokenRef}
                                siteKey="0x4AAAAAAAgKNPLV4pwnwqHI"
                                onSuccess={(val) => setToken(val)}
                            />
                        </Flex>

                        {/* Gönder */}
                        <Button
                            fontSize="sm"
                            colorPalette="teal"
                            size="lg"
                            onClick={handleSubmit}
                            isLoading={isLoading}
                            loadingText={t("sending")}
                        >
                            {t("send")}
                        </Button>

                        {/* Giriş linki */}
                        <Link href="/signIn" style={{ alignSelf: "center" }}>
                            <Text color={textColorBrand}>{/* aynı görünüm için brand rengi */}
                                Giriş sayfasına dön
                            </Text>
                        </Link>
                    </Flex>
                </Card.Root>
            </Flex>
        </Box>
    );
}
