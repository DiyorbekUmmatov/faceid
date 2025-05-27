"use client"

import { useState } from "react"
import { useTranslation } from "@/lib/i18n"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Check, Clock, Download, FileText, Search, X } from "lucide-react"

// Mock attendance data
const attendanceData = [
  {
    id: 1,
    name: "John Doe",
    position: "Frontend Developer",
    department: "Engineering",
    date: "2023-04-21",
    checkIn: "09:00 AM",
    checkOut: "06:05 PM",
    status: "On Time",
    hoursWorked: "9h 5m",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Sarah Smith",
    position: "UI/UX Designer",
    department: "Design",
    date: "2023-04-21",
    checkIn: "09:45 AM",
    checkOut: "06:30 PM",
    status: "Late",
    hoursWorked: "8h 45m",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Michael Johnson",
    position: "Backend Developer",
    department: "Engineering",
    date: "2023-04-21",
    checkIn: "-",
    checkOut: "-",
    status: "Absent",
    hoursWorked: "0h",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "Emily Davis",
    position: "Project Manager",
    department: "Management",
    date: "2023-04-21",
    checkIn: "08:50 AM",
    checkOut: "05:55 PM",
    status: "On Time",
    hoursWorked: "9h 5m",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    name: "David Wilson",
    position: "DevOps Engineer",
    department: "Engineering",
    date: "2023-04-21",
    checkIn: "09:05 AM",
    checkOut: "-",
    status: "On Time",
    hoursWorked: "7h 55m",
    image: "/placeholder.svg?height=40&width=40",
  },
]

export default function AttendancePage() {
  const { t } = useTranslation()
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [searchQuery, setSearchQuery] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  // Filter attendance data based on search and filters
  const filteredAttendance = attendanceData.filter((record) => {
    const matchesSearch =
      record.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.position.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesDepartment = departmentFilter === "all" || record.department === departmentFilter

    const matchesStatus = statusFilter === "all" || record.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesDepartment && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "On Time":
        return (
          <div className="flex items-center gap-1">
            <Check className="h-4 w-4 text-green-500" />
            <span className="text-green-600">{status}</span>
          </div>
        )
      case "Late":
        return (
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-amber-500" />
            <span className="text-amber-600">{status}</span>
          </div>
        )
      case "Absent":
        return (
          <div className="flex items-center gap-1">
            <X className="h-4 w-4 text-red-500" />
            <span className="text-red-600">{status}</span>
          </div>
        )
      default:
        return <span>{status}</span>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">{t("attendance")}</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <FileText className="h-4 w-4" />
            {t("export_report")}
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            {t("download_csv")}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle>{t("attendance_logs")}</CardTitle>
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
                    <SelectItem value="on time">{t("on_time")}</SelectItem>
                    <SelectItem value="late">{t("late")}</SelectItem>
                    <SelectItem value="absent">{t("absent")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="list" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="list">{t("list_view")}</TabsTrigger>
                <TabsTrigger value="grid">{t("grid_view")}</TabsTrigger>
              </TabsList>
              <TabsContent value="list">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t("employee")}</TableHead>
                      <TableHead>{t("department")}</TableHead>
                      <TableHead>{t("date")}</TableHead>
                      <TableHead>{t("check_in")}</TableHead>
                      <TableHead>{t("check_out")}</TableHead>
                      <TableHead>{t("status")}</TableHead>
                      <TableHead>{t("hours_worked")}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAttendance.map((record) => (
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
                        <TableCell>{record.date}</TableCell>
                        <TableCell>{record.checkIn}</TableCell>
                        <TableCell>{record.checkOut}</TableCell>
                        <TableCell>{getStatusBadge(record.status)}</TableCell>
                        <TableCell>{record.hoursWorked}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
              <TabsContent value="grid">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredAttendance.map((record) => (
                    <Card key={record.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex items-start p-4">
                          <Avatar className="h-12 w-12 mr-4">
                            <AvatarImage src={record.image || "/placeholder.svg"} />
                            <AvatarFallback>{record.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">{record.name}</h3>
                            <p className="text-sm text-gray-500">{record.position}</p>
                            <div className="mt-1">{getStatusBadge(record.status)}</div>
                          </div>
                        </div>
                        <div className="border-t px-4 py-3 bg-gray-50 grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <div className="text-gray-500">{t("check_in")}</div>
                            <div>{record.checkIn}</div>
                          </div>
                          <div>
                            <div className="text-gray-500">{t("check_out")}</div>
                            <div>{record.checkOut}</div>
                          </div>
                          <div>
                            <div className="text-gray-500">{t("hours_worked")}</div>
                            <div>{record.hoursWorked}</div>
                          </div>
                          <div>
                            <div className="text-gray-500">{t("date")}</div>
                            <div>{record.date}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("calendar")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-2">
                <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t("face_id_check_in")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg">
                <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-16 h-16 text-gray-400"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">{t("scan_face")}</h3>
                <p className="text-sm text-gray-500 text-center mb-4">{t("face_scan_description")}</p>
                <Button className="w-full">{t("start_scan")}</Button>
              </div>

              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-2">{t("today_status")}</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-sm text-gray-500">{t("check_in")}</div>
                    <div className="font-medium">09:05 AM</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">{t("check_out")}</div>
                    <div className="font-medium">-</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
