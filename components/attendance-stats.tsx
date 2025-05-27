"use client"

import { useTranslation } from "@/lib/i18n"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Clock, X } from "lucide-react"

export function AttendanceStats() {
  const { t } = useTranslation()

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>{t("attendance_overview")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-full bg-green-50">
                <Check className="h-4 w-4 text-green-500" />
              </div>
              <span>{t("on_time")}</span>
            </div>
            <span className="font-medium">82%</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-full bg-amber-50">
                <Clock className="h-4 w-4 text-amber-500" />
              </div>
              <span>{t("late")}</span>
            </div>
            <span className="font-medium">13%</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-full bg-red-50">
                <X className="h-4 w-4 text-red-500" />
              </div>
              <span>{t("absent")}</span>
            </div>
            <span className="font-medium">5%</span>
          </div>

          <div className="mt-4 pt-4 border-t">
            <div className="text-sm text-gray-500 mb-2">{t("monthly_attendance")}</div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="flex h-full">
                <div className="bg-green-500 h-full" style={{ width: "82%" }}></div>
                <div className="bg-amber-500 h-full" style={{ width: "13%" }}></div>
                <div className="bg-red-500 h-full" style={{ width: "5%" }}></div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
