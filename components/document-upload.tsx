"use client"
import { useTranslation } from "@/lib/i18n"
import { DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { FileUpload } from "@/components/file-upload"
import { FileText } from "lucide-react"

export function DocumentUpload({ onClose }: { onClose: () => void }) {
  const { t } = useTranslation()

  return (
    <>
      <DialogHeader>
        <DialogTitle>{t("upload_document")}</DialogTitle>
      </DialogHeader>

      <div className="space-y-4 mt-4">
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
          <Label htmlFor="document-type">{t("document_type")}</Label>
          <Select>
            <SelectTrigger id="document-type">
              <SelectValue>{t("select_document_type")}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="contract">{t("contract")}</SelectItem>
              <SelectItem value="resume">{t("resume")}</SelectItem>
              <SelectItem value="id">{t("id_document")}</SelectItem>
              <SelectItem value="certificate">{t("certificate")}</SelectItem>
              <SelectItem value="other">{t("other")}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>{t("document")}</Label>
          <FileUpload
            icon={<FileText className="h-8 w-8 text-gray-400" />}
            title={t("upload_document")}
            description={t("upload_document_description")}
            accept=".pdf,.doc,.docx,.jpg,.png"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">{t("description")}</Label>
          <Input id="description" placeholder={t("document_description_placeholder")} />
        </div>

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={onClose}>
            {t("cancel")}
          </Button>
          <Button onClick={onClose}>{t("upload")}</Button>
        </div>
      </div>
    </>
  )
}
