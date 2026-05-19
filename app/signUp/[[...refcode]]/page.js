"use client";

import { useState, useEffect, useRef } from "react";
import {
    Button,
    Flex,
    Card,
    Collapsible,
    Field,
    Heading,
    Icon,
    Input,
    InputGroup,
    Text,
    useDisclosure,
    Box,
} from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { Toaster, toaster } from "@/components/ui/toaster";
import Link from "next/link";
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Turnstile } from "@marsidev/react-turnstile";

export default function SignUp(props) {
    const router = useRouter();
    const cftoken = useRef(null);

    const [buttonText, setButtonText] = useState("Hesap Oluştur");
    const [error, setError] = useState("");
    const [show, setShow] = useState(false);
    const { open: isOpen, onToggle, onOpen } = useDisclosure();

    const textColor = useColorModeValue("gray.700", "gray.100");
    const textColorSecondary = "gray.400";
    const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
    const textColorBrand = useColorModeValue("brand.500", "white");

    const validationSchema = Yup.object().shape({
        email: Yup.string().trim().required("E-posta gerekli").email("Geçerli bir e-posta girin"),
        password: Yup.string()
            .trim()
            .min(8, "Şifre en az 8 karakter olmalı")
            .max(100, "Şifre en fazla 100 karakter olabilir")
            .required("Şifre gerekli"),
        referenceCode: Yup.string(),
        token: Yup.string(),
    });

    const formik = useFormik({
        initialValues: { email: "", password: "", referenceCode: "", token: "" },
        validationSchema,
        onSubmit: async (values) => {
            setButtonText("Oluşturuluyor...");
            const req = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });

            if (req.ok) {
                toaster.create({
                    title: "Kayıt Başarılı",
                    description: "Kayıt başarılı! E-postanızı kontrol edin.",
                    type: "success",
                });

                if (typeof window !== "undefined" && window.gtag) {
                    window.gtag("event", "user_registered");
                }
                router.replace("/signIn");
            } else {
                const res = await req.json().catch(() => ({}));
                switch (res.message) {
                    case "ValidationError":
                        setError("Doğrulama hatası");
                        cftoken.current?.reset?.();
                        break;
                    case "InvalidToken":
                        setError("Doğrulama token'ı geçersiz");
                        break;
                    case "InvalidRefNumber":
                        setError("Referans kodu geçersiz");
                        cftoken.current?.reset?.();
                        break;
                    case "UserExisting":
                        setError("Bu e-posta ile zaten bir kullanıcı var");
                        cftoken.current?.reset?.();
                        break;
                    default:
                        setError("Beklenmeyen bir hata oluştu");
                }
                setButtonText("Hesap Oluştur");
            }
        },
    });

    useEffect(() => {
        if (props?.params?.refcode?.[0]) {
            formik.setFieldValue("referenceCode", props.params.refcode[0]);
            onOpen();
        }
    }, [props?.params?.refcode, onOpen]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Box>
            <Toaster /> {/* toaster bileşeni eklendi */}

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
                            Hesap Oluşturun
                        </Heading>
                        <Text mb="10px" color={textColorSecondary} fontSize="md">
                            Lütfen bilgilerinizi girin ve hesap oluşturun.
                        </Text>

                        {error && (
                            <Text color="red" fontSize="sm" textAlign="center">
                                {error}
                            </Text>
                        )}

                        <Field.Root required id="email">
                            <Field.Label fontSize="sm" color={textColor}>
                                E-posta
                            </Field.Label>
                            <Input
                                name="email"
                                value={formik.values.email}
                                fontSize="sm"
                                type="email"
                                placeholder="mail@example.com"
                                size="lg"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </Field.Root>

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
                                    value={formik.values.password}
                                    name="password"
                                    fontSize="sm"
                                    placeholder="En az 8 karakter"
                                    type={show ? "text" : "password"}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </InputGroup>
                        </Field.Root>

                        {/* Referans kodu bölümü */}
                        <Box my="15px">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={onToggle}
                                leftIcon={
                                    <Icon as={isOpen ? ChevronUp : ChevronDown} />
                                }
                                color={textColorBrand}
                                _hover={{ bg: "gray.100" }}
                                p="8px"
                            >
                                {isOpen ? "Referans kodunu gizle" : "Referans kodu eklemek için tıklayın"}
                            </Button>
                        </Box>

                        <Collapsible.Root open={isOpen}>
                            <Collapsible.Content>
                                <Input
                                    value={formik.values.referenceCode}
                                    name="referenceCode"
                                    isDisabled={!!props?.params?.refcode?.[0]}
                                    fontSize="sm"
                                    placeholder="Referans kodu (opsiyonel)"
                                    size="lg"
                                    onChange={formik.handleChange}
                                    mb="10px"
                                />
                            </Collapsible.Content>
                        </Collapsible.Root>

                        <Button fontSize="sm" colorPalette="teal" size="lg" onClick={formik.handleSubmit}>
                            {buttonText}
                        </Button>

                        <Flex align="center" justify="center" my="10px">
                            <Turnstile
                                ref={cftoken}
                                siteKey="0x4AAAAAAAgKNPLV4pwnwqHI"
                                onSuccess={(data) => formik.setFieldValue("token", data)}
                            />
                        </Flex>

                        <Text color={textColorDetails} fontSize="14px">
                            Zaten hesabınız var mı?{" "}
                            <Link href="/signIn" style={{ color: "blue" }}>
                                Giriş yapın
                            </Link>
                        </Text>
                    </Flex>
                </Card.Root>
            </Flex>
        </Box>
    );
}
