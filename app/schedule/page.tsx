"use client"

import { DialogTrigger } from "@/components/ui/dialog"

import { useState } from "react"
import { useTranslation } from "@/lib/i18n"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { CalendarPlus, ChevronLeft, ChevronRight } from "lucide-react"
import { WeeklySchedule } from "@/components/weekly-schedule"
import { ScheduleForm } from "@/components/schedule-form"

export default function SchedulePage() {
  const { t } = useTranslation()
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [department, setDepartment] = useState("all")
  const [addScheduleOpen, setAddScheduleOpen] = useState(false)
  const [viewMode, setViewMode] = useState("week")

  const currentMonth = date ? date.toLocaleString("default", { month: "long" }) : ""
  const currentYear = date ? date.getFullYear() : new Date().getFullYear()

  const handlePrevMonth = () => {
    if (date) {
      const prevMonth = new Date(date)
      prevMonth.setMonth(prevMonth.getMonth() - 1)
      setDate(prevMonth)
    }
  }

  const handleNextMonth = () => {
    if (date) {
      const nextMonth = new Date(date)
      nextMonth.setMonth(nextMonth.getMonth() + 1)
      setDate(nextMonth)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">{t("schedule")}</h1>
        <Dialog open={addScheduleOpen} onOpenChange={setAddScheduleOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <CalendarPlus className="h-4 w-4" />
              {t("add_schedule")}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{t("add_schedule")}</DialogTitle>
            </DialogHeader>
            <ScheduleForm onClose={() => setAddScheduleOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Select value={department} onValueChange={setDepartment}>
          <SelectTrigger className="w-[180px]">
            <SelectValue>{t("department")}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("all_departments")}</SelectItem>
            <SelectItem value="Engineering">{t("engineering")}</SelectItem>
            <SelectItem value="Design">{t("design")}</SelectItem>
            <SelectItem value="Management">{t("management")}</SelectItem>
          </SelectContent>
        </Select>

        <Select value={viewMode} onValueChange={setViewMode}>
          <SelectTrigger className="w-[180px]">
            <SelectValue>{t("view_mode")}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">{t("day_view")}</SelectItem>
            <SelectItem value="week">{t("week_view")}</SelectItem>
            <SelectItem value="month">{t("month_view")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle>{t("work_schedule")}</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={handlePrevMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="font-medium">
                {currentMonth} {currentYear}
              </div>
              <Button variant="outline" size="icon" onClick={handleNextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <WeeklySchedule date={date} department={department} />
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
            <CardHeader className="pb-2">
              <CardTitle>{t("upcoming_shifts")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">John Doe</div>
                      <div className="text-sm text-gray-500">Frontend Developer</div>
                    </div>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">9:00 AM - 6:00 PM</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" />
                      <AvatarFallback>SS</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">Sarah Smith</div>
                      <div className="text-sm text-gray-500">UI/UX Designer</div>
                    </div>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">10:00 AM - 7:00 PM</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" />
                      <AvatarFallback>MJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">Michael Johnson</div>
                      <div className="text-sm text-gray-500">Backend Developer</div>
                    </div>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">9:00 AM - 6:00 PM</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
