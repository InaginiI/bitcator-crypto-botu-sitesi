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

export default function ForgotPassword() {
    // ---- basit yerel i18n sözlüğü ----
    const lang = "tr";
    const dict = {
        tr: {
            header: "Şifreni Sıfırla",
            description:
                "E-posta adresini gir; kayıtlıysa sana şifre sıfırlama bağlantısı göndereceğiz.",
            email: "E-posta",
            sendtext:
                "Eğer bu e-posta kayıtlıysa, sıfırlama bağlantısı gönderildi. Gelen kutunu ve spam klasörünü kontrol et.",
            signintext: "Giriş sayfasına dön",
            yupemailrequired: "E-posta gerekli",
            yupemailtype: "Geçerli bir e-posta girin",
            setbutton1: "Gönderiliyor...",
            setbutton2: "E-posta gönder",
            setbutton3: "E-posta gönderildi",
            setbutton4: "Tekrar dene",
            home: "Ana Sayfa",
        },
    };
    const t = (k) => (dict[lang] && dict[lang][k]) || k;

    // ---- state ----
    const cftoken = useRef(null);
    const [buttonText, setButtonText] = useState(t("setbutton2"));
    const [email, setEmail] = useState("");
    const [token, setToken] = useState("");
    const [error, setError] = useState("");

    // ---- theme colors ----
    const textColor = useColorModeValue("gray.700", "gray.100");
    const textColorSecondary = "gray.400";
    const textColorBrand = useColorModeValue("brand.500", "white");

    // ---- helpers ----
    const isValidEmail = (val) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(val || "").toLowerCase());

    const handleSubmit = async () => {
        // temel doğrulama
        if (!email) {
            setError(t("yupemailrequired"));
            return;
        }
        if (!isValidEmail(email)) {
            setError(t("yupemailtype"));
            return;
        }
        if (!token) {
            setError("Doğrulama (Turnstile) gerekli");
            return;
        }

        try {
            setError("");
            setButtonText(t("setbutton1"));

            const request = await fetch("/api/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, token }),
            });

            if (request.ok) {
                setButtonText(t("setbutton3"));
                toaster.create({
                    title: "Başarılı",
                    description: t("sendtext"),
                    status: "success",
                    duration: 7000,
                });
            } else {
                const response = await request.json().catch(() => ({}));
                let msg = "Error";
                switch (response?.message) {
                    case "ValidationError":
                        msg = "Validation Error";
                        break;
                    case "InvalidToken":
                        msg = "Invalid Validation Token";
                        break;
                    case "Error":
                        msg = "Error";
                        break;
                    default:
                        msg = "Error";
                }
                setError(msg);
                setButtonText(t("setbutton4"));
                toaster.create({
                    title: "İşlem başarısız",
                    description: msg,
                    status: "error",
                    duration: 6000,
                });
                cftoken.current?.reset?.();
            }
        } catch (e) {
            setError("Sunucuya ulaşılamadı. Lütfen tekrar deneyin.");
            setButtonText(t("setbutton4"));
            toaster.create({
                title: "Hata",
                description: "Sunucuya ulaşılamadı.",
                status: "error",
                duration: 6000,
            });
            cftoken.current?.reset?.();
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

                        {/* İlk durumda e-posta girişi; gönderildiyse bilgi metni */}
                        {buttonText === t("setbutton2") ? (
                            <Field.Root required id="email">
                                <Field.Label fontSize="sm" color={textColor}>
                                    {t("email")}
                                </Field.Label>
                                <Input
                                    isRequired
                                    value={email}
                                    name="email"
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
                        ) : (
                            <Text>{t("sendtext")}</Text>
                        )}

                        {/* Turnstile */}
                        <Flex align="center" justify="center" my="10px">
                            <Turnstile
                                ref={cftoken}
                                siteKey="0x4AAAAAAAgKNPLV4pwnwqHI"
                                onSuccess={(val) => setToken(val)}
                            />
                        </Flex>

                        {/* Gönder butonu — ilk durumda aktif, sonra kilitli */}
                        <Button
                            fontSize="sm"
                            isDisabled={buttonText !== t("setbutton2")}
                            colorPalette="teal"
                            size="lg"
                            mt="10px"
                            onClick={handleSubmit}
                        >
                            {buttonText}
                        </Button>

                        {/* Giriş sayfası linki */}
                        <Link href="/signIn" style={{ alignSelf: "center" }}>
                            <Text color={textColorBrand} as="span">
                                {t("signintext")}
                            </Text>
                        </Link>
                    </Flex>
                </Card.Root>
            </Flex>
        </Box>
    );
}
