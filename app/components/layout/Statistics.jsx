"use client";

import { useState, useEffect, useRef } from "react";
import {
  Box,
  Flex,
  Grid,
  Heading,
  Text,
  Badge,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useColorModeValue } from "@/components/ui/color-mode";
import { Users, DollarSign, TrendingUp, Activity, Zap } from "lucide-react";

const MotionBox = motion(Box);

const stats = [
  {
    label: "Aktif Kullanıcı",
    change: "+12%",
    icon: Users,
    color: "blue.400",
    format: (val) => `${Math.floor(val).toLocaleString()}+`,
    targetValue: 5247,
  },
  {
    label: "Toplam İşlem Hacmi",
    change: "+83%",
    icon: DollarSign,
    color: "green.400",
    format: (val) => `£${val.toFixed(1)}M+`,
    targetValue: 52.4,
  },
  {
    label: "Ortalama Başarı Oranı",
    change: "+2.1%",
    icon: TrendingUp,
    color: "purple.400",
    format: (val) => `%${val.toFixed(1)}`,
    targetValue: 87.3,
  },
  {
    label: "Platform Uptime",
    change: "0%",
    icon: Activity,
    color: "cyan.400",
    format: (val) => `${val.toFixed(1)}%`,
    targetValue: 99.9,
  },
];

const recentTrades = [
  { pair: "BTC/USDT", type: "AL", price: "$45,234", change: "+2.3%", changeColor: "green.400" },
  { pair: "ETH/USDT", type: "SAT", price: "$2,845", change: "+1.8%", changeColor: "green.400" },
  { pair: "ADA/USDT", type: "AL", price: "$0.485", change: "-0.5%", changeColor: "red.400" },
  { pair: "SOL/USDT", type: "SAT", price: "$98.75", change: "+3.2%", changeColor: "green.400" },
  { pair: "DOT/USDT", type: "AL", price: "$6.234", change: "+1.1%", changeColor: "green.400" },
];

export default function Statistics() {
  const [visibleStats, setVisibleStats] = useState([]);
  const [animatedValues, setAnimatedValues] = useState([0, 0, 0, 0]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          stats.forEach((stat, i) => {
            setTimeout(() => setVisibleStats((prev) => [...prev, i]), i * 200);

            let current = 0;
            const end = stat.targetValue;
            const duration = 2000;
            const increment = end / (duration / 16);

            const timer = setInterval(() => {
              current += increment;
              if (current >= end) {
                current = end;
                clearInterval(timer);
              }
              setAnimatedValues((prev) => {
                const copy = [...prev];
                copy[i] = current;
                return copy;
              });
            }, 16);
          });
        }
      });
    }, { threshold: 0.3 });

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const bg = useColorModeValue("#c8e4e6", "#163f42");
  const cardBg = useColorModeValue("white", "#1E1E28");
  const borderColor = useColorModeValue("gray.300", "gray.600");
  const textColor = useColorModeValue("gray.800", "gray.100");
  const subText = useColorModeValue("gray.600", "gray.300");

  return (
    <Box ref={sectionRef} bg={bg} py={20} px={6} transition="all 0.3s">
      <Box textAlign="center" mb={16}>
        <Heading fontSize={{ base: "3xl", md: "5xl" }} mb={4} color={textColor} mt={16}>
          Gerçek Zamanlı Trading İstatistikleri
        </Heading>
        <Text fontSize="xl" color={subText}>
          Platformumuzun canlı performans verileri ve son işlemler
        </Text>
      </Box>

      {/* ✅ İstatistik Kartları */}
      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} gap={6} mb={16}>
        {stats.map((stat, i) => {
          const IconComp = stat.icon;
          return (
            <MotionBox
              key={i}
              bg={cardBg}
              border="1px solid"
              borderColor={borderColor}
              borderRadius="lg"
              p={6}
              boxShadow="md"
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px #85deed" }}
              initial={{ y: 20, opacity: 0 }}
              animate={visibleStats.includes(i) ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.4 }}
              cursor="pointer"
            >
              <Flex justify="space-between" mb={4}>
                <IconComp size={32} stroke={stat.color} strokeWidth={1.8} />
                <Text fontSize="sm" color="green.400" fontWeight="bold" animation="pulse 2s infinite">
                  {stat.change}
                </Text>
              </Flex>
              <Text fontSize="3xl" fontWeight="bold" color={textColor}>
                {stat.format(animatedValues[i])}
              </Text>
              <Text fontSize="sm" color={subText}>{stat.label}</Text>
            </MotionBox>
          );
        })}
      </Grid>

      {/* ✅ Son İşlemler Tablosu */}
      <Box bg={cardBg} border="1px solid" borderColor={borderColor} borderRadius="lg" p={6} boxShadow="md">
        <Flex align="center" mb={6}>
          <Zap size={20} stroke="blue" strokeWidth={2} style={{ marginRight: 8 }} />
          <Text fontWeight="bold" color={textColor} fontSize="lg">Son İşlemler</Text>
        </Flex>

        <Box>
          {/* Header */}
          <Grid templateColumns="1fr 1fr 1fr 1fr" gap={4} p={3} bg={useColorModeValue("gray.100", "gray.700")} borderRadius="md" mb={2}>
            <Text fontSize="sm" fontWeight="bold" color={subText}>Parite</Text>
            <Text fontSize="sm" fontWeight="bold" color={subText}>Tip</Text>
            <Text fontSize="sm" fontWeight="bold" color={subText}>Fiyat</Text>
            <Text fontSize="sm" fontWeight="bold" color={subText} textAlign="right">Kar/Zarar</Text>
          </Grid>

          {/* Rows */}
          {recentTrades.map((trade, i) => (
            <Grid
              key={i}
              templateColumns="1fr 1fr 1fr 1fr"
              gap={4}
              p={3}
              borderRadius="md"
              _hover={{
                bg: useColorModeValue("#f4f6fa", "gray.700"),
                transform: "scale(1.02)",
                boxShadow: "0 0 15px #85deed"
              }}
              transition="all 0.2s"
              cursor="pointer"
            >
              <Text color={textColor} fontWeight="medium">{trade.pair}</Text>
              <Box>
                <Badge colorScheme={trade.type === "AL" ? "green" : "red"}>{trade.type}</Badge>
              </Box>
              <Text color={subText}>{trade.price}</Text>
              <Text textAlign="right" fontWeight="bold" color={trade.changeColor}>{trade.change}</Text>
            </Grid>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
