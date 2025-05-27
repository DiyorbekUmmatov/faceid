"use client"

import { useTranslation } from "@/lib/i18n"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Download, FileText } from "lucide-react"

interface SalaryReportProps {
  dateRange: string
  department: string
}

export function SalaryReport({ dateRange, department }: SalaryReportProps) {
  const { t } = useTranslation()

  // Mock data
  const reportData = [
    {
      employee: "John Doe",
      department: "Engineering",
      baseSalary: 4500,
      overtime: 350,
      bonuses: 200,
      deductions: 150,
      totalSalary: 4900,
    },
    {
      employee: "Sarah Smith",
      department: "Design",
      baseSalary: 4200,
      overtime: 0,
      bonuses: 300,
      deductions: 100,
      totalSalary: 4400,
    },
  ]

  const totalPayroll = reportData.reduce((sum, record) => sum + record.totalSalary, 0)

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="bg-green-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">{t("total_payroll")}</p>
                <h2 className="text-3xl font-bold text-green-800">${totalPayroll.toLocaleString()}</h2>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{t("average_salary")}</p>
                <h2 className="text-3xl font-bold">${Math.round(totalPayroll / reportData.length).toLocaleString()}</h2>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{t("total_bonuses")}</p>
                <h2 className="text-3xl font-bold">$500</h2>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{t("total_deductions")}</p>
                <h2 className="text-3xl font-bold">$250</h2>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{t("detailed_salary_report")}</CardTitle>
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
                <TableHead>{t("base_salary")}</TableHead>
                <TableHead>{t("overtime")}</TableHead>
                <TableHead>{t("bonuses")}</TableHead>
                <TableHead>{t("deductions")}</TableHead>
                <TableHead>{t("total_salary")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reportData.map((record, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{record.employee}</TableCell>
                  <TableCell>{record.department}</TableCell>
                  <TableCell>${record.baseSalary.toFixed(2)}</TableCell>
                  <TableCell>${record.overtime.toFixed(2)}</TableCell>
                  <TableCell>${record.bonuses.toFixed(2)}</TableCell>
                  <TableCell>-${record.deductions.toFixed(2)}</TableCell>
                  <TableCell className="font-medium">${record.totalSalary.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
