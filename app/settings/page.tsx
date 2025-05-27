"use client"
import { useTranslation } from "@/lib/i18n"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { FaceIdSettings } from "@/components/settings/face-id-settings"
import { NotificationSettings } from "@/components/settings/notification-settings"
import { SystemSettings } from "@/components/settings/system-settings"

export default function SettingsPage() {
  const { t } = useTranslation()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">{t("settings")}</h1>
        <Button>{t("save_changes")}</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("settings")}</CardTitle>
          <CardDescription>{t("settings_description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="face-id" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="face-id">{t("face_id")}</TabsTrigger>
              <TabsTrigger value="notifications">{t("notifications")}</TabsTrigger>
              <TabsTrigger value="system">{t("system")}</TabsTrigger>
            </TabsList>
            <TabsContent value="face-id">
              <FaceIdSettings />
            </TabsContent>
            <TabsContent value="notifications">
              <NotificationSettings />
            </TabsContent>
            <TabsContent value="system">
              <SystemSettings />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
