"use client"

import { useTranslation } from "@/lib/i18n"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Edit, Trash2, Eye, Mail, Phone } from "lucide-react"

// Mock employee data
const employeeData = [
  {
    id: 1,
    name: "John Doe",
    position: "Frontend Developer",
    department: "Engineering",
    email: "john@example.com",
    phone: "+1234567890",
    status: "Active",
    joinDate: "2023-01-15",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Sarah Smith",
    position: "UI/UX Designer",
    department: "Design",
    email: "sarah@example.com",
    phone: "+1234567891",
    status: "Active",
    joinDate: "2023-02-20",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Michael Johnson",
    position: "Backend Developer",
    department: "Engineering",
    email: "michael@example.com",
    phone: "+1234567892",
    status: "Blocked",
    joinDate: "2023-03-10",
    image: "/placeholder.svg?height=40&width=40",
  },
]

interface EmployeeGridProps {
  searchQuery: string
  departmentFilter: string
  statusFilter: string
}

export function EmployeeGrid({ searchQuery, departmentFilter, statusFilter }: EmployeeGridProps) {
  const { t } = useTranslation()

  // Filter employee data
  const filteredEmployees = employeeData.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesDepartment = departmentFilter === "all" || employee.department === departmentFilter
    const matchesStatus = statusFilter === "all" || employee.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesDepartment && matchesStatus
  })

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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredEmployees.map((employee) => (
        <Card key={employee.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="p-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={employee.image || "/placeholder.svg"} />
                    <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{employee.name}</h3>
                    <p className="text-sm text-gray-500">{employee.position}</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">{t("open_menu")}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      {t("view_details")}
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      {t("edit")}
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      {t("delete")}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="h-4 w-4" />
                  {employee.email}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="h-4 w-4" />
                  {employee.phone}
                </div>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div>
                  <div className="text-sm text-gray-500">{t("department")}</div>
                  <div className="font-medium">{employee.department}</div>
                </div>
                {getStatusBadge(employee.status)}
              </div>

              <div className="mt-3 pt-3 border-t">
                <div className="text-sm text-gray-500">{t("join_date")}</div>
                <div className="font-medium">{employee.joinDate}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
