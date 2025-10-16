"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface TestIntroProps {
  onStart: () => void
}

export function TestIntro({ onStart }: TestIntroProps) {
  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl">
      <div className="bg-gradient-to-br from-rose-100 via-pink-100 to-purple-100 dark:from-rose-900/40 dark:via-pink-900/40 dark:to-purple-900/40 rounded-3xl p-10 md:p-16 text-center mb-10 shadow-lg">
        <div className="text-6xl mb-6">💗</div>
        <h1 className="text-3xl md:text-4xl font-bold text-rose-900 dark:text-rose-200 mb-4">SRI 性压抑指数评估量表报告</h1>
          <p className="text-purple-800/90 dark:text-purple-300/90 text-lg">Sexual Repression Index (SRI) Assessment</p>
      </div>

      <Card className="p-10 md:p-12 shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-foreground">测试说明</h2>

        <div className="space-y-4 text-muted-foreground leading-relaxed mb-8">
          <p>
            性压抑指数（SRI）是一个专业的心理评估工具，用于了解个体在性相关话题、态度和行为方面的开放程度与压抑程度。
          </p>

          <div className="bg-secondary/50 rounded-lg p-6 my-6">
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <span className="text-xl">📋</span>
              测试信息
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>题目数量：50题</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>预计时间：8-10分钟</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>评分方式：5级量表评分</span>
              </li>
            </ul>
          </div>

          <div className="bg-accent/10 rounded-lg p-6 my-6">
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <span className="text-xl">⚠️</span>
              注意事项
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-accent">•</span>
                <span>请根据您的真实感受作答，没有对错之分</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent">•</span>
                <span>请在安静、私密的环境中完成测试</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent">•</span>
                <span>所有数据仅用于生成报告，不会被保存或分享</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent">•</span>
                <span>建议一次性完成所有题目，中途退出将不保存进度</span>
              </li>
            </ul>
          </div>

          <p className="text-sm italic">
            本测试仅供参考，不能替代专业的心理咨询或医疗诊断。如有需要，请咨询专业心理健康工作者。
          </p>
        </div>

        <div className="flex justify-center">
          <Button
            onClick={onStart}
            size="lg"
            className="px-12 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            开始测试
          </Button>
        </div>
      </Card>
    </div>
  )
}
