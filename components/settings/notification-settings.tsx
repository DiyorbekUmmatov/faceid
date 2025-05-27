"use client"

import { useTranslation } from "@/lib/i18n"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"

export function NotificationSettings() {
  const { t } = useTranslation()

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">{t("notification_settings")}</h3>
        <p className="text-sm text-gray-500">{t("notification_settings_description")}</p>
      </div>

      <Separator />

      <div className="space-y-4">
        <h4 className="text-md font-medium">{t("attendance_notifications")}</h4>

        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="late-notifications">{t("late_notifications")}</Label>
              <p className="text-sm text-gray-500">{t("late_notifications_description")}</p>
            </div>
            <Switch id="late-notifications" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="absent-notifications">{t("absent_notifications")}</Label>
              <p className="text-sm text-gray-500">{t("absent_notifications_description")}</p>
            </div>
            <Switch id="absent-notifications" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="overtime-notifications">{t("overtime_notifications")}</Label>
              <p className="text-sm text-gray-500">{t("overtime_notifications_description")}</p>
            </div>
            <Switch id="overtime-notifications" defaultChecked />
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h4 className="text-md font-medium">{t("contract_notifications")}</h4>

        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="contract-ending-notifications">{t("contract_ending_notifications")}</Label>
              <p className="text-sm text-gray-500">{t("contract_ending_notifications_description")}</p>
            </div>
            <Switch id="contract-ending-notifications" defaultChecked />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contract-reminder-days">{t("contract_reminder_days")}</Label>
            <p className="text-sm text-gray-500">{t("contract_reminder_days_description")}</p>
            <div className="flex items-center gap-2">
              <Input id="contract-reminder-days" type="number" defaultValue="30" className="w-20" />
              <span>{t("days")}</span>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h4 className="text-md font-medium">{t("notification_channels")}</h4>

        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="in-app-notifications">{t("in_app_notifications")}</Label>
              <p className="text-sm text-gray-500">{t("in_app_notifications_description")}</p>
            </div>
            <Switch id="in-app-notifications" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="email-notifications">{t("email_notifications")}</Label>
              <p className="text-sm text-gray-500">{t("email_notifications_description")}</p>
            </div>
            <Switch id="email-notifications" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="sms-notifications">{t("sms_notifications")}</Label>
              <p className="text-sm text-gray-500">{t("sms_notifications_description")}</p>
            </div>
            <Switch id="sms-notifications" />
          </div>
        </div>
      </div>
    </div>
  )
}
