'use client'

import Header from "@/components/layout/Header"
import Hero from "@/components/layout/Hero"
import HowItWorks from "@/components/layout/HowItWorks"
import TreadingFeatures from "@/components/layout/TreadingFeatures"
import Statistics from "@/components/layout/Statistics"
import Security from "@/components/layout/Security"
import TreadingBot from "@/components/layout/TreadingBot"
import Partners from "./components/layout/Partners"
import Footer from "@/components/layout/Footer"
import BotCreationSteps from "./components/layout/BotCreationSteps"
import BotAdvantages from "./components/layout/BotAdvantages"
import SmartPowerFeatures from "./components/layout/SmartPowerFeatures"
import Sss from "./components/layout/Sss"

export default function Page() {
    return (
        <div>
            <Header />
            <Hero />
            <HowItWorks />
            <TreadingFeatures />
            <BotCreationSteps />
            <TreadingBot />
            <SmartPowerFeatures />
            <Statistics />
            <BotAdvantages />
            <Security />
            <Sss />
            <Partners />
            <Footer />
        </div>
    )
}
