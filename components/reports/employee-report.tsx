"use client"

import { useTranslation } from "@/lib/i18n"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, FileText } from "lucide-react"

interface EmployeeReportProps {
  dateRange: string
  department: string
}

export function EmployeeReport({ dateRange, department }: EmployeeReportProps) {
  const { t } = useTranslation()

  // Mock data
  const reportData = [
    {
      employee: "John Doe",
      position: "Frontend Developer",
      department: "Engineering",
      joinDate: "2023-01-15",
      status: "Active",
      performance: "Excellent",
    },
    {
      employee: "Sarah Smith",
      position: "UI/UX Designer",
      department: "Design",
      joinDate: "2023-02-20",
      status: "Active",
      performance: "Good",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{status}</Badge>
      case "Blocked":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">{status}</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPerformanceBadge = (performance: string) => {
    switch (performance) {
      case "Excellent":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{performance}</Badge>
      case "Good":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">{performance}</Badge>
      case "Average":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">{performance}</Badge>
      default:
        return <Badge variant="outline">{performance}</Badge>
    }
  }

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
                <p className="text-sm font-medium text-gray-500">{t("active_employees")}</p>
                <h2 className="text-3xl font-bold">23</h2>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{t("new_hires")}</p>
                <h2 className="text-3xl font-bold">3</h2>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{t("departments")}</p>
                <h2 className="text-3xl font-bold">5</h2>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{t("detailed_employee_report")}</CardTitle>
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
                <TableHead>{t("position")}</TableHead>
                <TableHead>{t("department")}</TableHead>
                <TableHead>{t("join_date")}</TableHead>
                <TableHead>{t("status")}</TableHead>
                <TableHead>{t("performance")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reportData.map((record, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{record.employee}</TableCell>
                  <TableCell>{record.position}</TableCell>
                  <TableCell>{record.department}</TableCell>
                  <TableCell>{record.joinDate}</TableCell>
                  <TableCell>{getStatusBadge(record.status)}</TableCell>
                  <TableCell>{getPerformanceBadge(record.performance)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
