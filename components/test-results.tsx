"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { calculateScore, getAssessmentType, getAssessmentDetails } from "@/lib/scoring"

interface TestResultsProps {
  answers: number[]
  onRestart: () => void
}

export function TestResults({ answers, onRestart }: TestResultsProps) {
  const score = calculateScore(answers)
  const assessmentType = getAssessmentType(score)
  const details = getAssessmentDetails(assessmentType)

  const now = new Date()
  const dateString = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日 ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`

  const scoreRanges = [
    { range: "0-19分", label: "极低型", color: "bg-green-500" },
    { range: "20-39分", label: "低型", color: "bg-green-400" },
    { range: "40-59分", label: "平衡型", color: "bg-blue-500" },
    { range: "60-79分", label: "开放型", color: "bg-orange-500" },
    { range: "80-100分", label: "强度型", color: "bg-red-500" },
  ]

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-gradient-to-br from-rose-100 via-pink-100 to-purple-100 dark:from-rose-900/40 dark:via-pink-900/40 dark:to-purple-900/40 rounded-3xl p-8 md:p-12 text-center mb-8 shadow-lg">
        <div className="text-6xl mb-6">💗</div>
          <h1 className="text-3xl md:text-4xl font-bold text-rose-900 dark:text-rose-200 mb-4">SRI 性压抑指数评估量表报告</h1>
          <p className="text-purple-800/90 dark:text-purple-300/90 text-lg mb-2">Sexual Repression Index (SRI) Assessment</p>
          <p className="text-purple-800/80 dark:text-purple-300/80 text-sm">测评完成时间：{dateString}</p>
      </div>

      <Card className="p-8 md:p-10 shadow-md mb-6">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-primary text-sm">✓</span>
          </div>
          <h2 className="text-xl font-bold text-foreground">整体评估结果</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 border border-rose-100 dark:border-rose-800/30">
            <div className="text-sm text-muted-foreground mb-2">性压抑综合指数</div>
            <div className="text-5xl font-bold text-black dark:text-white mb-2">{score.toFixed(1)}</div>
            <div className="text-sm text-muted-foreground">满分 100 分</div>
            <div className="mt-4 bg-muted rounded-full h-2 overflow-hidden">
              <div className="bg-rose-500 h-full transition-all duration-1000" style={{ width: `${score}%` }} />
            </div>
          </Card>

          <Card className="p-6 bg-primary/5 flex flex-col items-center justify-center">
            <div className="text-sm text-muted-foreground mb-3">评估水平</div>
            <div className="text-3xl font-bold text-primary mb-3">{details.type}</div>
            <Button size="sm" className="mt-2">
              {details.badge}
            </Button>
          </Card>
        </div>
      </Card>

      <Card className="p-8 md:p-10 shadow-md mb-6">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-primary text-sm">ℹ</span>
          </div>
          <h2 className="text-xl font-bold text-foreground">评估说明</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed">{details.description}</p>
      </Card>

      <Card className="p-8 md:p-10 shadow-md mb-6 bg-gradient-to-br from-accent/5 to-primary/5">
        <div className="text-center mb-8">
          <div className="text-4xl mb-4">{details.icon}</div>
          <h2 className="text-2xl font-bold text-foreground mb-2">{details.title}</h2>
          <p className="text-muted-foreground">{details.subtitle}</p>
        </div>

        <p className="text-muted-foreground leading-relaxed mb-8">{details.detailedDescription}</p>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 bg-card">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                <span className="text-blue-600 text-lg">🔍</span>
              </div>
              <h3 className="font-semibold text-foreground">关键特征表现</h3>
            </div>
            <ul className="space-y-3">
              {details.characteristics.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-primary mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-6 bg-card">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                <span className="text-green-600 text-lg">✓</span>
              </div>
              <h3 className="font-semibold text-foreground">改善行动建议</h3>
            </div>
            <ul className="space-y-3">
              {details.suggestions.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </Card>

      <Card className="p-8 md:p-10 shadow-md mb-6 bg-amber-50">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-2xl">📊</span>
          <h2 className="text-xl font-bold text-foreground">分数区间参考标准</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {scoreRanges.map((range, index) => (
            <Card
              key={index}
              className={`p-4 text-center ${range.label === details.type ? "ring-2 ring-primary shadow-lg" : ""}`}
            >
              <div className={`w-full h-2 ${range.color} rounded-full mb-3`} />
              <div className="text-xs text-muted-foreground mb-1">{range.range}</div>
              <div className="font-semibold text-foreground">{range.label}</div>
            </Card>
          ))}
        </div>
      </Card>

      <div className="flex justify-center gap-4">
        <Button onClick={onRestart} size="lg" className="px-8">
          重新测试
        </Button>
      </div>

      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>本测试结果仅供参考，不能替代专业心理咨询或医疗诊断</p>
        <p className="mt-2">如有需要，请咨询专业心理健康工作者</p>
      </div>
    </div>
  )
}
