"use client"

import { useState, useEffect } from "react"
import { useTranslation } from "@/lib/i18n"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Clock, MoreVertical, Search, UserCheck, UserX } from "lucide-react"
import { getEmployees } from "@/app/actions/employee-actions"
import { getTodayAttendance } from "@/app/actions/attendance-actions"

export function EmployeeList() {
  const { t } = useTranslation()
  const [searchQuery, setSearchQuery] = useState("")
  const [employees, setEmployees] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Xodimlar va davomat ma'lumotlarini olish
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        // Xodimlarni olish
        const employeeData = await getEmployees()

        // Bugungi davomat ma'lumotlarini olish
        const attendanceData = await getTodayAttendance()

        // Ma'lumotlarni birlashtirish
        const combinedData = employeeData.map((employee) => {
          const attendance = attendanceData.find((a) => a.employee_id === employee.id)

          return {
            id: employee.id,
            firstName: employee.first_name,
            lastName: employee.last_name,
            position: employee.position,
            department: employee.department,
            status: employee.status,
            checkIn: attendance?.check_in
              ? new Date(attendance.check_in).toLocaleTimeString("uz-UZ", {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "",
            checkOut: attendance?.check_out
              ? new Date(attendance.check_out).toLocaleTimeString("uz-UZ", {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "",
            hoursToday: attendance?.hours_worked ? `${attendance.hours_worked}` : "0:00",
            attendanceStatus: attendance?.status || "absent",
            image: "/placeholder.svg?height=40&width=40",
          }
        })

        setEmployees(combinedData)
      } catch (error) {
        console.error("Ma'lumotlarni olishda xatolik:", error)
        // Xato yuz berganda bo'sh ro'yxat ko'rsatamiz
        setEmployees([])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "present":
        return <UserCheck className="h-4 w-4 text-green-500" />
      case "late":
        return <Clock className="h-4 w-4 text-amber-500" />
      case "absent":
        return <UserX className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "present":
        return t("present")
      case "late":
        return t("late")
      case "absent":
        return t("absent")
      default:
        return ""
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "present":
        return "bg-green-50 text-green-700 border-green-200"
      case "late":
        return "bg-amber-50 text-amber-700 border-amber-200"
      case "absent":
        return "bg-red-50 text-red-700 border-red-200"
      default:
        return ""
    }
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{t("employees")}</CardTitle>
            <CardDescription>{t("manage_employees_description")}</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            {t("view_all")}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder={t("search_employees")}
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredEmployees.map((employee) => (
              <div
                key={employee.id}
                className="flex items-center justify-between rounded-md border p-3 hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={employee.image || "/placeholder.svg"} />
                    <AvatarFallback>
                      {employee.firstName[0]}
                      {employee.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">
                      {employee.firstName} {employee.lastName}
                    </div>
                    <div className="text-sm text-gray-500">
                      {employee.position} • {employee.department}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Badge variant="outline" className={getStatusColor(employee.attendanceStatus)}>
                    <span className="flex items-center gap-1">
                      {getStatusIcon(employee.attendanceStatus)}
                      {getStatusText(employee.attendanceStatus)}
                    </span>
                  </Badge>

                  <div className="text-right">
                    <div className="text-sm font-medium">{employee.checkIn ? employee.checkIn : "-"}</div>
                    <div className="text-xs text-gray-500">{t("check_in")}</div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                        <span className="sr-only">{t("open_menu")}</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>{t("view_details")}</DropdownMenuItem>
                      <DropdownMenuItem>{t("edit_employee")}</DropdownMenuItem>
                      <DropdownMenuItem>{t("view_contract")}</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
