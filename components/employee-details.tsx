"use client"

import { useTranslation } from "@/lib/i18n"
import { DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Check, Clock, Download, FileText, X } from "lucide-react"

export function EmployeeDetails({ employee }: { employee: any }) {
  const { t } = useTranslation()

  const getTodayStatusBadge = (status: string) => {
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
    <>
      <DialogHeader>
        <DialogTitle>{t("employee_details")}</DialogTitle>
      </DialogHeader>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-4">
          <div className="flex flex-col items-center">
            <Avatar className="h-24 w-24">
              <AvatarImage src={employee.image || "/placeholder.svg"} />
              <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <h3 className="mt-4 font-medium text-lg">{employee.name}</h3>
            <p className="text-gray-500">{employee.position}</p>
            <div
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                employee.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
              }`}
            >
              {employee.status}
            </div>
          </div>

          <div className="border rounded-md p-4 space-y-3">
            <h4 className="font-medium">{t("personal_info")}</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-gray-500">{t("department")}</div>
              <div>{employee.department}</div>
              <div className="text-gray-500">{t("employee_id")}</div>
              <div>EMP-{employee.id.toString().padStart(4, "0")}</div>
              <div className="text-gray-500">{t("join_date")}</div>
              <div>01/06/2023</div>
              <div className="text-gray-500">{t("contract_end")}</div>
              <div>01/06/2024</div>
            </div>
          </div>

          <div className="border rounded-md p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium">{t("documents")}</h4>
              <Button variant="ghost" size="sm" className="h-8 gap-1">
                <FileText className="h-4 w-4" />
                {t("view_all")}
              </Button>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded-md text-sm">
                <span>Contract.pdf</span>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded-md text-sm">
                <span>Resume.pdf</span>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="border rounded-md p-4">
            <h4 className="font-medium mb-4">{t("attendance_today")}</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="text-sm text-gray-500">{t("check_in")}</div>
                <div className="font-medium">{employee.checkIn}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="text-sm text-gray-500">{t("check_out")}</div>
                <div className="font-medium">{employee.checkOut}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="text-sm text-gray-500">{t("status")}</div>
                <div>{getTodayStatusBadge(employee.todayStatus)}</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="text-sm text-gray-500">{t("hours_worked")}</div>
                <div className="font-medium">{employee.hoursToday}</div>
              </div>
            </div>
          </div>

          <div className="border rounded-md p-4">
            <h4 className="font-medium mb-4">{t("monthly_summary")}</h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="text-sm text-gray-500">{t("days_present")}</div>
                <div className="font-medium">21/23</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="text-sm text-gray-500">{t("days_late")}</div>
                <div className="font-medium">3</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="text-sm text-gray-500">{t("days_absent")}</div>
                <div className="font-medium">2</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="text-sm text-gray-500">{t("total_hours")}</div>
                <div className="font-medium">168h 45m</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="text-sm text-gray-500">{t("overtime")}</div>
                <div className="font-medium">8h 45m</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="text-sm text-gray-500">{t("efficiency")}</div>
                <div className="font-medium">91%</div>
              </div>
            </div>
          </div>

          <div className="border rounded-md p-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium">{t("salary_information")}</h4>
              <Button variant="outline" size="sm" className="h-8">
                {t("adjust_salary")}
              </Button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="text-sm text-gray-500">{t("base_salary")}</div>
                  <div className="font-medium">$4,500.00</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="text-sm text-gray-500">{t("overtime_pay")}</div>
                  <div className="font-medium">$350.00</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="text-sm text-gray-500">{t("bonuses")}</div>
                  <div className="font-medium">$200.00</div>
                </div>
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="text-sm text-gray-500">{t("deductions")}</div>
                  <div className="font-medium">-$150.00</div>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-100 rounded-md">
                <div className="font-medium">{t("total_monthly_salary")}</div>
                <div className="text-lg font-bold">$4,900.00</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
