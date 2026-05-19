"use client";

import { useState, useRef, useEffect } from "react";
import {
    Button,
    Flex,
    Card,
    Field,
    Heading,
    Input,
    Text,
    Box,
    Icon,
    InputGroup,
} from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { Toaster, toaster } from "@/components/ui/toaster";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { motion } from "framer-motion";
import { Turnstile } from "@marsidev/react-turnstile";

export default function Resetpw(props) {
    // ---- basit yerel i18n sözlüğü ----
    const lang = "tr";
    const dict = {
        tr: {
            header: "Şifreni Sıfırla",
            description:
                "Yeni şifreni belirle. Güvenli olması için en az 8 karakter kullan.",
            passwd: "Yeni Şifre",
            repasswd: "Yeni Şifre (Tekrar)",
            passwdplaceholder: "Minimum 8 karakter",
            yupmin: "Şifre en az 8 karakter olmalı",
            yupmax: "Şifre en fazla 100 karakter olabilir",
            yuppassreq: "Şifre gerekli",
            matcherr: "Şifreler eşleşmiyor",
            tokenrequired: "Doğrulama token'ı eksik",
            setbutton1: "Güncelleniyor...",
            setbutton2: "Şifreyi Güncelle",
            setbutton3: "Şifre güncellendi",
            setbutton4: "Girişe dön",
            home: "Ana Sayfa",
            sentok: "Şifren başarıyla güncellendi. Giriş yapabilirsin.",
            err_default: "Beklenmeyen bir hata oluştu",
            err_invalid_token: "Doğrulama token'ı geçersiz",
            err_user_not_found: "Kullanıcı bulunamadı",
            err_incorrect_token: "Geçersiz doğrulama kodu",
        },
    };
    const t = (k) => (dict[lang] && dict[lang][k]) || k;

    // ---- route param (reset token) ----
    const resetToken =
        props?.params?.resettoken || props?.searchParams?.token || "";

    // ---- state ----
    const cftokenRef = useRef(null);
    const [buttonText, setButtonText] = useState(t("setbutton2"));
    const [error, setError] = useState("");
    const [show, setShow] = useState(false);

    const [password, setPassword] = useState("");
    const [repassword, setRepassword] = useState("");
    const [cftoken, setCftoken] = useState("");
    const [token, setToken] = useState(resetToken); // backend’in beklediği reset token

    // ---- theme ----
    const textColor = useColorModeValue("gray.700", "gray.100");
    const textColorSecondary = "gray.400";

    useEffect(() => {
        // route değişirse state'i güncelle
        setToken(resetToken || "");
    }, [resetToken]);

    // ---- doğrulama ----
    const validate = () => {
        if (!password) return t("yuppassreq");
        if (password.length < 8) return t("yupmin");
        if (password.length > 100) return t("yupmax");
        if (!repassword) return t("yuppassreq");
        if (password !== repassword) return t("matcherr");
        if (!token) return t("tokenrequired");
        if (!cftoken) return "Doğrulama (Turnstile) gerekli";
        return "";
    };

    const handleSubmit = async () => {
        const v = validate();
        if (v) {
            setError(v);
            return;
        }
        setError("");
        setButtonText(t("setbutton1"));

        try {
            const res = await fetch("/api/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    password,
                    repassword,
                    token, // reset token (URL’den)
                    cftoken, // Turnstile token
                }),
            });

            if (res.ok) {
                setButtonText(t("setbutton3"));
                toaster.create({
                    title: "Başarılı",
                    description: t("sentok"),
                    status: "success",
                    duration: 7000,
                });
            } else {
                const data = await res.json().catch(() => ({}));
                let msg = t("err_default");
                switch (data?.message) {
                    case "ValidationError":
                        msg = "Validation Error";
                        break;
                    case "Error":
                        msg = t("err_incorrect_token");
                        break;
                    case "InvalidToken":
                        msg = t("err_invalid_token");
                        break;
                    case "UserNotFound":
                        msg = t("err_user_not_found");
                        break;
                    default:
                        msg = t("err_default");
                }
                setError(msg);
                setButtonText(t("setbutton2"));
                toaster.create({
                    title: "Hata",
                    description: msg,
                    status: "error",
                    duration: 6000,
                });
                cftokenRef.current?.reset?.();
            }
        } catch {
            setError("Sunucuya ulaşılamadı. Lütfen tekrar deneyin.");
            setButtonText(t("setbutton2"));
            toaster.create({
                title: "Hata",
                description: "Sunucuya ulaşılamadı.",
                status: "error",
                duration: 6000,
            });
            cftokenRef.current?.reset?.();
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
                        <Heading color={textColor} fontSize="36px" fontWeight="bold" my="10px">
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

                        {/* Yeni Şifre */}
                        <Field.Root required id="password">
                            <Field.Label fontSize="sm" color={textColor}>
                                {t("passwd")}
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
                                    type={show ? "text" : "password"}
                                    placeholder={t("passwdplaceholder")}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setError("");
                                    }}
                                />
                            </InputGroup>
                        </Field.Root>

                        {/* Yeni Şifre (Tekrar) */}
                        <Field.Root required id="repassword">
                            <Field.Label fontSize="sm" color={textColor}>
                                {t("repasswd")}
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
                                    name="repassword"
                                    value={repassword}
                                    fontSize="sm"
                                    type={show ? "text" : "password"}
                                    placeholder={t("passwdplaceholder")}
                                    onChange={(e) => {
                                        setRepassword(e.target.value);
                                        setError("");
                                    }}
                                />
                            </InputGroup>
                        </Field.Root>

                        {/* Turnstile */}
                        <Flex align="center" justify="center" my="10px">
                            <Turnstile
                                ref={cftokenRef}
                                siteKey="0x4AAAAAAAgKNPLV4pwnwqHI"
                                onSuccess={(val) => setCftoken(val)}
                            />
                        </Flex>

                        {/* Gönder Butonu */}
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

                        {/* Başarıdan sonra girişe dön */}
                        {buttonText === t("setbutton3") && (
                            <Link href="/signIn" style={{ alignSelf: "center" }}>
                                <Button fontSize="sm" colorPalette="teal" mt="2">
                                    {t("setbutton4")}
                                </Button>
                            </Link>
                        )}
                    </Flex>
                </Card.Root>
            </Flex>
        </Box>
    );
}
