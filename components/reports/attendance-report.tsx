"use client"

import { useTranslation } from "@/lib/i18n"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Download, FileText } from "lucide-react"

interface AttendanceReportProps {
  dateRange: string
  department: string
}

export function AttendanceReport({ dateRange, department }: AttendanceReportProps) {
  const { t } = useTranslation()

  // Mock data
  const reportData = [
    {
      employee: "John Doe",
      department: "Engineering",
      totalDays: 22,
      presentDays: 20,
      absentDays: 2,
      lateDays: 3,
      attendanceRate: "91%",
    },
    {
      employee: "Sarah Smith",
      department: "Design",
      totalDays: 22,
      presentDays: 22,
      absentDays: 0,
      lateDays: 1,
      attendanceRate: "100%",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{t("total_employees")}</p>
                <h2 className="text-3xl font-bold">25</h2>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{t("average_attendance")}</p>
                <h2 className="text-3xl font-bold">94%</h2>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{t("total_late_days")}</p>
                <h2 className="text-3xl font-bold">12</h2>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{t("total_absent_days")}</p>
                <h2 className="text-3xl font-bold">8</h2>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{t("detailed_attendance_report")}</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <FileText className="h-4 w-4" />
              {t("export_pdf")}
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              {t("export_csv")}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("employee")}</TableHead>
                <TableHead>{t("department")}</TableHead>
                <TableHead>{t("total_days")}</TableHead>
                <TableHead>{t("present_days")}</TableHead>
                <TableHead>{t("absent_days")}</TableHead>
                <TableHead>{t("late_days")}</TableHead>
                <TableHead>{t("attendance_rate")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reportData.map((record, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{record.employee}</TableCell>
                  <TableCell>{record.department}</TableCell>
                  <TableCell>{record.totalDays}</TableCell>
                  <TableCell>{record.presentDays}</TableCell>
                  <TableCell>{record.absentDays}</TableCell>
                  <TableCell>{record.lateDays}</TableCell>
                  <TableCell>{record.attendanceRate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
