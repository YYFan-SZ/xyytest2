"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { questions } from "@/lib/questions"

interface TestQuestionsProps {
  onComplete: (answers: number[]) => void
}

export function TestQuestions({ onComplete }: TestQuestionsProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>(new Array(questions.length).fill(-1))

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = value
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      onComplete(answers)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100
  const isAnswered = answers[currentQuestion] !== -1

  const options = [
    { value: 1, label: "完全不符合" },
    { value: 2, label: "比较不符合" },
    { value: 3, label: "不确定" },
    { value: 4, label: "比较符合" },
    { value: 5, label: "完全符合" },
  ]

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-medium text-muted-foreground">
            题目 {currentQuestion + 1} / {questions.length}
          </span>
          <span className="text-sm font-medium text-primary">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card className="p-8 md:p-10 shadow-lg mb-6">
        <div className="mb-8">
          <div className="text-sm text-muted-foreground mb-3">第 {currentQuestion + 1} 题</div>
          <h2 className="text-xl md:text-2xl font-medium text-foreground leading-relaxed">
            {questions[currentQuestion]}
          </h2>
        </div>

        <div className="space-y-3">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleAnswer(option.value)}
              className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                answers[currentQuestion] === option.value
                  ? "border-primary bg-primary/10 shadow-md"
                  : "border-border hover:border-primary/50 hover:bg-secondary/50"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    answers[currentQuestion] === option.value ? "border-primary bg-primary" : "border-muted-foreground"
                  }`}
                >
                  {answers[currentQuestion] === option.value && (
                    <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                  )}
                </div>
                <span className="font-medium text-foreground">{option.label}</span>
              </div>
            </button>
          ))}
        </div>
      </Card>

      <div className="flex justify-between gap-4">
        <Button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          variant="outline"
          size="lg"
          className="px-8 bg-transparent"
        >
          上一题
        </Button>
        <Button onClick={handleNext} disabled={!isAnswered} size="lg" className="px-8">
          {currentQuestion === questions.length - 1 ? "查看结果" : "下一题"}
        </Button>
      </div>
    </div>
  )
}
