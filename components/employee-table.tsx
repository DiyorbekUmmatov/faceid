"use client"
import { useTranslation } from "@/lib/i18n"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Edit, Trash2, Eye } from "lucide-react"

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

interface EmployeeTableProps {
  searchQuery: string
  departmentFilter: string
  statusFilter: string
}

export function EmployeeTable({ searchQuery, departmentFilter, statusFilter }: EmployeeTableProps) {
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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{t("employee")}</TableHead>
          <TableHead>{t("department")}</TableHead>
          <TableHead>{t("email")}</TableHead>
          <TableHead>{t("phone")}</TableHead>
          <TableHead>{t("status")}</TableHead>
          <TableHead>{t("join_date")}</TableHead>
          <TableHead className="text-right">{t("actions")}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredEmployees.map((employee) => (
          <TableRow key={employee.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={employee.image || "/placeholder.svg"} />
                  <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{employee.name}</div>
                  <div className="text-sm text-gray-500">{employee.position}</div>
                </div>
              </div>
            </TableCell>
            <TableCell>{employee.department}</TableCell>
            <TableCell>{employee.email}</TableCell>
            <TableCell>{employee.phone}</TableCell>
            <TableCell>{getStatusBadge(employee.status)}</TableCell>
            <TableCell>{employee.joinDate}</TableCell>
            <TableCell className="text-right">
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
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
