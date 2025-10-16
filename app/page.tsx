"use client"

import { useState } from "react"
import { TestIntro } from "@/components/test-intro"
import { TestQuestions } from "@/components/test-questions"
import { TestResults } from "@/components/test-results"

export default function Home() {
  const [stage, setStage] = useState<"intro" | "test" | "results">("intro")
  const [answers, setAnswers] = useState<number[]>([])

  const handleStartTest = () => {
    setStage("test")
  }

  const handleCompleteTest = (testAnswers: number[]) => {
    setAnswers(testAnswers)
    setStage("results")
  }

  const handleRestartTest = () => {
    setAnswers([])
    setStage("intro")
  }

  return (
    <main className="min-h-screen bg-background">
      {stage === "intro" && <TestIntro onStart={handleStartTest} />}
      {stage === "test" && <TestQuestions onComplete={handleCompleteTest} />}
      {stage === "results" && <TestResults answers={answers} onRestart={handleRestartTest} />}
    </main>
  )
}
