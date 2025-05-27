"use client"

import { useTranslation } from "@/lib/i18n"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Database, Globe, RefreshCw } from "lucide-react"

export function SystemSettings() {
  const { t } = useTranslation()

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-medium">{t("system_settings")}</h3>
        <p className="text-sm text-gray-500">{t("system_settings_description")}</p>
      </div>

      <Separator />

      <div className="space-y-4">
        <h4 className="text-md font-medium">{t("language_settings")}</h4>

        <div className="space-y-2">
          <Label htmlFor="default-language">{t("default_language")}</Label>
          <p className="text-sm text-gray-500">{t("default_language_description")}</p>
          <Select defaultValue="en">
            <SelectTrigger id="default-language" className="w-[240px]">
              <SelectValue>{t("english")}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">{t("english")}</SelectItem>
              <SelectItem value="uz">{t("uzbek")}</SelectItem>
              <SelectItem value="ru">{t("russian")}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="enable-language-switcher">{t("enable_language_switcher")}</Label>
            <p className="text-sm text-gray-500">{t("enable_language_switcher_description")}</p>
          </div>
          <Switch id="enable-language-switcher" defaultChecked />
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h4 className="text-md font-medium">{t("company_settings")}</h4>

        <div className="space-y-2">
          <Label htmlFor="company-name">{t("company_name")}</Label>
          <Input id="company-name" defaultValue="SH/S.CRM" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="company-address">{t("company_address")}</Label>
          <Textarea id="company-address" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="company-timezone">{t("timezone")}</Label>
          <Select defaultValue="UTC+5">
            <SelectTrigger id="company-timezone" className="w-[240px]">
              <SelectValue>UTC+5 (Uzbekistan)</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="UTC+5">UTC+5 (Uzbekistan)</SelectItem>
              <SelectItem value="UTC+3">UTC+3 (Moscow)</SelectItem>
              <SelectItem value="UTC+0">UTC+0 (London)</SelectItem>
              <SelectItem value="UTC-5">UTC-5 (New York)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h4 className="text-md font-medium">{t("system_maintenance")}</h4>

        <div className="flex items-center gap-4">
          <Button variant="outline" className="gap-2">
            <Database className="h-4 w-4" />
            {t("backup_data")}
          </Button>
          <Button variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            {t("clear_cache")}
          </Button>
          <Button variant="outline" className="gap-2">
            <Globe className="h-4 w-4" />
            {t("check_for_updates")}
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="auto-backup">{t("auto_backup")}</Label>
            <p className="text-sm text-gray-500">{t("auto_backup_description")}</p>
          </div>
          <Switch id="auto-backup" defaultChecked />
        </div>
      </div>
    </div>
  )
}
