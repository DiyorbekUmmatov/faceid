"use client"

import { useState } from "react"
import { useTranslation } from "@/lib/i18n"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { CreditCard, FileText, MoreHorizontal, Plus, Search } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock payroll data
const payrollData = [
  {
    id: 1,
    name: "John Doe",
    position: "Frontend Developer",
    department: "Engineering",
    baseSalary: 4500,
    overtime: 350,
    bonuses: 200,
    deductions: 150,
    totalSalary: 4900,
    status: "Paid",
    date: "2023-04-15",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Sarah Smith",
    position: "UI/UX Designer",
    department: "Design",
    baseSalary: 4200,
    overtime: 0,
    bonuses: 300,
    deductions: 100,
    totalSalary: 4400,
    status: "Paid",
    date: "2023-04-15",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Michael Johnson",
    position: "Backend Developer",
    department: "Engineering",
    baseSalary: 4800,
    overtime: 200,
    bonuses: 0,
    deductions: 200,
    totalSalary: 4800,
    status: "Pending",
    date: "2023-04-15",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "Emily Davis",
    position: "Project Manager",
    department: "Management",
    baseSalary: 5500,
    overtime: 0,
    bonuses: 500,
    deductions: 250,
    totalSalary: 5750,
    status: "Paid",
    date: "2023-04-15",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    name: "David Wilson",
    position: "DevOps Engineer",
    department: "Engineering",
    baseSalary: 4700,
    overtime: 300,
    bonuses: 150,
    deductions: 180,
    totalSalary: 4970,
    status: "Pending",
    date: "2023-04-15",
    image: "/placeholder.svg?height=40&width=40",
  },
]

export default function PayrollPage() {
  const { t } = useTranslation()
  const [searchQuery, setSearchQuery] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [adjustSalaryOpen, setAdjustSalaryOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null)

  // Filter payroll data based on search and filters
  const filteredPayroll = payrollData.filter((record) => {
    const matchesSearch =
      record.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.position.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesDepartment = departmentFilter === "all" || record.department === departmentFilter

    const matchesStatus = statusFilter === "all" || record.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesDepartment && matchesStatus
  })

  const handleAdjustSalary = (employee: any) => {
    setSelectedEmployee(employee)
    setAdjustSalaryOpen(true)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Paid":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{status}</Badge>
      case "Pending":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">{status}</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">{t("payroll")}</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <FileText className="h-4 w-4" />
            {t("export_report")}
          </Button>
          <Button className="gap-2">
            <CreditCard className="h-4 w-4" />
            {t("process_payroll")}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card className="bg-green-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">{t("total_payroll")}</p>
                <h2 className="text-3xl font-bold text-green-800">$24,820</h2>
              </div>
              <div className="p-3 rounded-full bg-green-100 text-green-700">
                <CreditCard className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{t("base_salaries")}</p>
                <h2 className="text-3xl font-bold">$23,700</h2>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{t("bonuses_overtime")}</p>
                <h2 className="text-3xl font-bold">$2,000</h2>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{t("deductions")}</p>
                <h2 className="text-3xl font-bold">$880</h2>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>{t("salary_management")}</CardTitle>
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder={t("search_employees")}
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-3">
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
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

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={t("status")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("all_statuses")}</SelectItem>
                  <SelectItem value="paid">{t("paid")}</SelectItem>
                  <SelectItem value="pending">{t("pending")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
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
                <TableHead>{t("total")}</TableHead>
                <TableHead>{t("status")}</TableHead>
                <TableHead className="text-right">{t("actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayroll.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={record.image || "/placeholder.svg"} />
                        <AvatarFallback>{record.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{record.name}</div>
                        <div className="text-sm text-gray-500">{record.position}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{record.department}</TableCell>
                  <TableCell>${record.baseSalary.toFixed(2)}</TableCell>
                  <TableCell>${record.overtime.toFixed(2)}</TableCell>
                  <TableCell>${record.bonuses.toFixed(2)}</TableCell>
                  <TableCell>-${record.deductions.toFixed(2)}</TableCell>
                  <TableCell className="font-medium">${record.totalSalary.toFixed(2)}</TableCell>
                  <TableCell>{getStatusBadge(record.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">{t("open_menu")}</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleAdjustSalary(record)}>
                          {t("adjust_salary")}
                        </DropdownMenuItem>
                        <DropdownMenuItem>{t("view_history")}</DropdownMenuItem>
                        <DropdownMenuItem>{t("download_slip")}</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Adjust Salary Dialog */}
      <Dialog open={adjustSalaryOpen} onOpenChange={setAdjustSalaryOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{t("adjust_salary")}</DialogTitle>
            <DialogDescription>{t("adjust_salary_description")}</DialogDescription>
          </DialogHeader>

          {selectedEmployee && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 pb-4 border-b">
                <Avatar>
                  <AvatarImage src={selectedEmployee.image || "/placeholder.svg"} />
                  <AvatarFallback>{selectedEmployee.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{selectedEmployee.name}</div>
                  <div className="text-sm text-gray-500">{selectedEmployee.position}</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-3 space-y-2">
                    <label className="text-sm font-medium">{t("base_salary")}</label>
                    <Input type="number" defaultValue={selectedEmployee.baseSalary} className="w-full" />
                  </div>

                  <div className="col-span-3 space-y-2">
                    <label className="text-sm font-medium">{t("add_bonus")}</label>
                    <div className="flex gap-2">
                      <Input type="number" placeholder="0.00" className="w-full" />
                      <Button variant="outline" size="icon">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="col-span-3 space-y-2">
                    <label className="text-sm font-medium">{t("add_deduction")}</label>
                    <div className="flex gap-2">
                      <Input type="number" placeholder="0.00" className="w-full" />
                      <Button variant="outline" size="icon">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t">
                  <div className="flex justify-between items-center">
                    <div className="font-medium">{t("new_total_salary")}</div>
                    <div className="text-lg font-bold">${selectedEmployee.totalSalary.toFixed(2)}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setAdjustSalaryOpen(false)}>
              {t("cancel")}
            </Button>
            <Button onClick={() => setAdjustSalaryOpen(false)}>{t("save_changes")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
