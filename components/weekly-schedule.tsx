"use client"

import { useTranslation } from "@/lib/i18n"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

// Mock data for schedule
const scheduleData = [
  {
    id: 1,
    name: "John Doe",
    position: "Frontend Developer",
    department: "Engineering",
    schedule: [
      { day: "Monday", start: "09:00", end: "18:00" },
      { day: "Tuesday", start: "09:00", end: "18:00" },
      { day: "Wednesday", start: "09:00", end: "18:00" },
      { day: "Thursday", start: "09:00", end: "18:00" },
      { day: "Friday", start: "09:00", end: "18:00" },
    ],
    image: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 2,
    name: "Sarah Smith",
    position: "UI/UX Designer",
    department: "Design",
    schedule: [
      { day: "Monday", start: "10:00", end: "19:00" },
      { day: "Tuesday", start: "10:00", end: "19:00" },
      { day: "Wednesday", start: "10:00", end: "19:00" },
      { day: "Thursday", start: "10:00", end: "19:00" },
      { day: "Friday", start: "10:00", end: "19:00" },
    ],
    image: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 3,
    name: "Michael Johnson",
    position: "Backend Developer",
    department: "Engineering",
    schedule: [
      { day: "Monday", start: "09:00", end: "18:00" },
      { day: "Tuesday", start: "09:00", end: "18:00" },
      { day: "Wednesday", start: "09:00", end: "18:00" },
      { day: "Thursday", start: "09:00", end: "18:00" },
      { day: "Friday", start: "09:00", end: "18:00" },
    ],
    image: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 4,
    name: "Emily Davis",
    position: "Project Manager",
    department: "Management",
    schedule: [
      { day: "Monday", start: "08:30", end: "17:30" },
      { day: "Tuesday", start: "08:30", end: "17:30" },
      { day: "Wednesday", start: "08:30", end: "17:30" },
      { day: "Thursday", start: "08:30", end: "17:30" },
      { day: "Friday", start: "08:30", end: "17:30" },
    ],
    image: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 5,
    name: "David Wilson",
    position: "DevOps Engineer",
    department: "Engineering",
    schedule: [
      { day: "Monday", start: "09:00", end: "18:00" },
      { day: "Tuesday", start: "09:00", end: "18:00" },
      { day: "Wednesday", start: "09:00", end: "18:00" },
      { day: "Thursday", start: "09:00", end: "18:00" },
      { day: "Friday", start: "09:00", end: "18:00" },
    ],
    image: "/placeholder.svg?height=32&width=32",
  },
]

export function WeeklySchedule({
  date,
  department,
}: {
  date?: Date
  department: string
}) {
  const { t } = useTranslation()

  // Get the days of the week
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

  // Filter data based on department
  const filteredData =
    department === "all" ? scheduleData : scheduleData.filter((item) => item.department === department)

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="p-2 border-b text-left">{t("employee")}</th>
            {days.map((day) => (
              <th key={day} className="p-2 border-b text-center min-w-[120px]">
                {t(day.toLowerCase())}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((employee) => (
            <tr key={employee.id}>
              <td className="p-2 border-b">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={employee.image || "/placeholder.svg"} />
                    <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{employee.name}</div>
                    <div className="text-xs text-gray-500">{employee.position}</div>
                  </div>
                </div>
              </td>
              {days.map((day) => {
                const schedule = employee.schedule.find((s) => s.day === day)
                return (
                  <td key={day} className="p-2 border-b text-center">
                    {schedule ? (
                      <Badge className="bg-blue-100 text-blue-800">
                        {schedule.start} - {schedule.end}
                      </Badge>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
