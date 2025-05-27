"use client"

import { useTranslation } from "@/lib/i18n"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, UserCheck, UserMinus, UserX } from "lucide-react"

export function DashboardHeader() {
  const { t } = useTranslation()

  const stats = [
    {
      title: t("present_today"),
      value: "42",
      icon: UserCheck,
      color: "text-green-500 bg-green-50",
    },
    {
      title: t("late_today"),
      value: "7",
      icon: Clock,
      color: "text-amber-500 bg-amber-50",
    },
    {
      title: t("absent_today"),
      value: "3",
      icon: UserMinus,
      color: "text-red-500 bg-red-50",
    },
    {
      title: t("blocked"),
      value: "2",
      icon: UserX,
      color: "text-gray-500 bg-gray-50",
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">{t("dashboard")}</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">{t("export_report")}</Button>
          <Button>{t("add_employee")}</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <h2 className="text-3xl font-bold">{stat.value}</h2>
                </div>
                <div className={`p-3 rounded-full ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
