"use client"

import { useState } from "react"
import { useTranslation } from "@/lib/i18n"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AttendanceReport } from "@/components/reports/attendance-report"
import { SalaryReport } from "@/components/reports/salary-report"
import { EmployeeReport } from "@/components/reports/employee-report"
import { FileText, Download, Calendar } from "lucide-react"

export default function ReportsPage() {
  const { t } = useTranslation()
  const [dateRange, setDateRange] = useState("this-month")
  const [department, setDepartment] = useState("all")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">{t("reports")}</h1>
        <div className="flex items-center gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t("select_period")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="this-week">{t("this_week")}</SelectItem>
              <SelectItem value="this-month">{t("this_month")}</SelectItem>
              <SelectItem value="last-month">{t("last_month")}</SelectItem>
              <SelectItem value="this-year">{t("this_year")}</SelectItem>
            </SelectContent>
          </Select>
          <Select value={department} onValueChange={setDepartment}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t("department")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("all_departments")}</SelectItem>
              <SelectItem value="Engineering">{t("engineering")}</SelectItem>
              <SelectItem value="Design">{t("design")}</SelectItem>
              <SelectItem value="Management">{t("management")}</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            {t("export_all")}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="attendance" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="attendance" className="gap-2">
            <Calendar className="h-4 w-4" />
            {t("attendance_report")}
          </TabsTrigger>
          <TabsTrigger value="salary" className="gap-2">
            <FileText className="h-4 w-4" />
            {t("salary_report")}
          </TabsTrigger>
          <TabsTrigger value="employee" className="gap-2">
            <FileText className="h-4 w-4" />
            {t("employee_report")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="attendance">
          <AttendanceReport dateRange={dateRange} department={department} />
        </TabsContent>

        <TabsContent value="salary">
          <SalaryReport dateRange={dateRange} department={department} />
        </TabsContent>

        <TabsContent value="employee">
          <EmployeeReport dateRange={dateRange} department={department} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
