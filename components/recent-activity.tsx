"use client"

import { useTranslation } from "@/lib/i18n"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, LogIn, LogOut } from "lucide-react"

export function RecentActivity() {
  const { t } = useTranslation()

  const activities = [
    {
      id: 1,
      name: "John Doe",
      action: "check_in",
      time: "09:00 AM",
      image: "/placeholder.svg?height=32&width=32",
      icon: LogIn,
      iconColor: "text-green-500 bg-green-50",
    },
    {
      id: 2,
      name: "Sarah Smith",
      action: "check_in",
      time: "09:45 AM",
      image: "/placeholder.svg?height=32&width=32",
      icon: LogIn,
      iconColor: "text-amber-500 bg-amber-50",
    },
    {
      id: 3,
      name: "Emily Davis",
      action: "check_out",
      time: "05:55 PM",
      image: "/placeholder.svg?height=32&width=32",
      icon: LogOut,
      iconColor: "text-blue-500 bg-blue-50",
    },
    {
      id: 4,
      name: "David Wilson",
      action: "check_in",
      time: "09:05 AM",
      image: "/placeholder.svg?height=32&width=32",
      icon: LogIn,
      iconColor: "text-green-500 bg-green-50",
    },
  ]

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>{t("recent_activity")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${activity.iconColor}`}>
                <activity.icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={activity.image || "/placeholder.svg"} />
                    <AvatarFallback>{activity.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium truncate">{activity.name}</span>
                </div>
                <div className="text-sm text-gray-500">
                  {t(activity.action)} • {activity.time}
                </div>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Clock className="h-3 w-3" />
                <span>2m</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
