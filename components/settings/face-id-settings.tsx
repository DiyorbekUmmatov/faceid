"use client"

import { useTranslation } from "@/lib/i18n"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Camera, RefreshCw } from "lucide-react"

export function FaceIdSettings() {
  const { t } = useTranslation()

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">{t("face_id_recognition")}</h3>
        <p className="text-sm text-gray-500">{t("face_id_recognition_description")}</p>
      </div>

      <Separator />

      <div className="grid gap-4">
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="enable-face-id">{t("enable_face_id")}</Label>
            <p className="text-sm text-gray-500">{t("enable_face_id_description")}</p>
          </div>
          <Switch id="enable-face-id" defaultChecked />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="require-confirmation">{t("require_confirmation")}</Label>
            <p className="text-sm text-gray-500">{t("require_confirmation_description")}</p>
          </div>
          <Switch id="require-confirmation" defaultChecked />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="auto-check-out">{t("auto_check_out")}</Label>
            <p className="text-sm text-gray-500">{t("auto_check_out_description")}</p>
          </div>
          <Switch id="auto-check-out" />
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="recognition-threshold">{t("recognition_threshold")}</Label>
          <p className="text-sm text-gray-500">{t("recognition_threshold_description")}</p>
          <Select defaultValue="medium">
            <SelectTrigger id="recognition-threshold">
              <SelectValue>{t("medium")}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">{t("low")}</SelectItem>
              <SelectItem value="medium">{t("medium")}</SelectItem>
              <SelectItem value="high">{t("high")}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="late-threshold">{t("late_threshold")}</Label>
          <p className="text-sm text-gray-500">{t("late_threshold_description")}</p>
          <div className="flex items-center gap-2">
            <Input id="late-threshold" type="number" defaultValue="15" className="w-20" />
            <span>{t("minutes")}</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="camera-source">{t("camera_source")}</Label>
          <p className="text-sm text-gray-500">{t("camera_source_description")}</p>
          <Select defaultValue="default">
            <SelectTrigger id="camera-source">
              <SelectValue>{t("default_camera")}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">{t("default_camera")}</SelectItem>
              <SelectItem value="front">{t("front_camera")}</SelectItem>
              <SelectItem value="back">{t("back_camera")}</SelectItem>
              <SelectItem value="external">{t("external_camera")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-md font-medium">{t("face_id_database")}</h3>
          <p className="text-sm text-gray-500">{t("face_id_database_description")}</p>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            {t("rebuild_database")}
          </Button>
          <Button variant="outline" className="gap-2">
            <Camera className="h-4 w-4" />
            {t("test_recognition")}
          </Button>
        </div>
      </div>
    </div>
  )
}
