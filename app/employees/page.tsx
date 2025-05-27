"use client"

import { useState } from "react"
import { useTranslation } from "@/lib/i18n"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EmployeeTable } from "@/components/employee-table"
import { EmployeeGrid } from "@/components/employee-grid"
import { EmployeeForm } from "@/components/employee-form"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Search, UserPlus } from "lucide-react"

export default function EmployeesPage() {
  const { t } = useTranslation()
  const [searchQuery, setSearchQuery] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [addEmployeeOpen, setAddEmployeeOpen] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">{t("employees")}</h1>
        <Dialog open={addEmployeeOpen} onOpenChange={setAddEmployeeOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <UserPlus className="h-4 w-4" />
              {t("add_employee")}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <EmployeeForm onClose={() => setAddEmployeeOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>{t("employees")}</CardTitle>
          <CardDescription>{t("manage_employees_description")}</CardDescription>
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
                  <SelectItem value="active">{t("active")}</SelectItem>
                  <SelectItem value="blocked">{t("blocked")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="table" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="table">{t("table_view")}</TabsTrigger>
              <TabsTrigger value="grid">{t("grid_view")}</TabsTrigger>
            </TabsList>
            <TabsContent value="table">
              <EmployeeTable
                searchQuery={searchQuery}
                departmentFilter={departmentFilter}
                statusFilter={statusFilter}
              />
            </TabsContent>
            <TabsContent value="grid">
              <EmployeeGrid searchQuery={searchQuery} departmentFilter={departmentFilter} statusFilter={statusFilter} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
