"use client"

import { useState } from "react"
import { useTranslation } from "@/lib/i18n"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export function ScheduleForm({ onClose }: { onClose: () => void }) {
  const { t } = useTranslation()
  const [selectedDays, setSelectedDays] = useState<string[]>([])

  const days = [
    { id: "monday", label: t("monday") },
    { id: "tuesday", label: t("tuesday") },
    { id: "wednesday", label: t("wednesday") },
    { id: "thursday", label: t("thursday") },
    { id: "friday", label: t("friday") },
    { id: "saturday", label: t("saturday") },
    { id: "sunday", label: t("sunday") },
  ]

  const toggleDay = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day))
    } else {
      setSelectedDays([...selectedDays, day])
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="employee">{t("employee")}</Label>
        <Select>
          <SelectTrigger id="employee">
            <SelectValue>{t("select_employee")}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">John Doe</SelectItem>
            <SelectItem value="2">Sarah Smith</SelectItem>
            <SelectItem value="3">Michael Johnson</SelectItem>
            <SelectItem value="4">Emily Davis</SelectItem>
            <SelectItem value="5">David Wilson</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>{t("days")}</Label>
        <div className="grid grid-cols-2 gap-2">
          {days.map((day) => (
            <div key={day.id} className="flex items-center space-x-2">
              <Checkbox id={day.id} checked={selectedDays.includes(day.id)} onCheckedChange={() => toggleDay(day.id)} />
              <label
                htmlFor={day.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {day.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="start-time">{t("start_time")}</Label>
          <Input id="start-time" type="time" defaultValue="09:00" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="end-time">{t("end_time")}</Label>
          <Input id="end-time" type="time" defaultValue="18:00" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="schedule-type">{t("schedule_type")}</Label>
        <Select defaultValue="regular">
          <SelectTrigger id="schedule-type">
            <SelectValue>{t("regular")}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="regular">{t("regular")}</SelectItem>
            <SelectItem value="overtime">{t("overtime")}</SelectItem>
            <SelectItem value="shift">{t("shift")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">{t("notes")}</Label>
        <Input id="notes" placeholder={t("schedule_notes_placeholder")} />
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onClose}>
          {t("cancel")}
        </Button>
        <Button onClick={onClose}>{t("save_schedule")}</Button>
      </div>
    </div>
  )
}
