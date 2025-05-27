"use client"

import { useState } from "react"
import { useTranslation } from "@/lib/i18n"
import { DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { FileUpload } from "@/components/file-upload"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, Upload } from "lucide-react"
import { addEmployee } from "@/app/actions/employee-actions"

export function EmployeeForm({ onClose }: { onClose: () => void }) {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState("personal")
  const [profileImage, setProfileImage] = useState("/placeholder.svg?height=100&width=100")
  const [loading, setLoading] = useState(false)

  // Form ma'lumotlari
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    birth_date: "",
    gender: "",
    address: "",
    position: "",
    department: "",
    join_date: new Date().toISOString().split("T")[0],
    contract_end: "",
    employee_type: "",
    work_schedule: "",
    base_salary: 0,
    payment_method: "",
    bank_name: "",
    account_number: "",
    tax_id: "",
    overtime_rate: 0,
  })

  // Form ma'lumotlarini yangilash
  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // Xodimni saqlash
  const handleSaveEmployee = async () => {
    try {
      setLoading(true)

      // Majburiy maydonlarni tekshirish
      if (
        !formData.first_name ||
        !formData.last_name ||
        !formData.position ||
        !formData.department ||
        !formData.join_date
      ) {
        alert("Iltimos, barcha majburiy maydonlarni to'ldiring")
        return
      }

      // Xodimni qo'shish
      const newEmployee = await addEmployee({
        first_name: formData.first_name,
        last_name: formData.last_name,
        position: formData.position,
        department: formData.department,
        email: formData.email || undefined,
        phone: formData.phone || undefined,
        join_date: formData.join_date,
        contract_end: formData.contract_end || undefined,
        status: "active",
        face_id_data: {
          // Haqiqiy loyihada Face ID ma'lumotlari saqlanadi
        },
      })

      alert("Xodim muvaffaqiyatli qo'shildi")
      onClose()
    } catch (error) {
      console.error("Xodimni saqlashda xatolik:", error)
      alert("Xodimni saqlashda xatolik yuz berdi")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>{t("add_employee")}</DialogTitle>
      </DialogHeader>

      <Tabs defaultValue="personal" value={activeTab} onValueChange={setActiveTab} className="mt-4">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="personal">{t("personal_info")}</TabsTrigger>
          <TabsTrigger value="employment">{t("employment")}</TabsTrigger>
          <TabsTrigger value="salary">{t("salary")}</TabsTrigger>
          <TabsTrigger value="documents">{t("documents")}</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4">
          <div className="flex flex-col items-center mb-6">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={profileImage || "/placeholder.svg"} />
                <AvatarFallback>
                  <Camera className="h-8 w-8 text-gray-400" />
                </AvatarFallback>
              </Avatar>
              <Button size="icon" variant="secondary" className="absolute bottom-0 right-0 h-8 w-8 rounded-full">
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-2">{t("upload_photo")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first-name">{t("first_name")}</Label>
              <Input
                id="first-name"
                value={formData.first_name}
                onChange={(e) => handleChange("first_name", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last-name">{t("last_name")}</Label>
              <Input
                id="last-name"
                value={formData.last_name}
                onChange={(e) => handleChange("last_name", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{t("email")}</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">{t("phone")}</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="birth-date">{t("birth_date")}</Label>
              <Input
                id="birth-date"
                type="date"
                value={formData.birth_date}
                onChange={(e) => handleChange("birth_date", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">{t("gender")}</Label>
              <Select value={formData.gender} onValueChange={(value) => handleChange("gender", value)}>
                <SelectTrigger id="gender">
                  <SelectValue placeholder={t("select_gender")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">{t("male")}</SelectItem>
                  <SelectItem value="female">{t("female")}</SelectItem>
                  <SelectItem value="other">{t("other")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="address">{t("address")}</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => handleChange("address", e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={onClose}>
              {t("cancel")}
            </Button>
            <Button onClick={() => setActiveTab("employment")}>{t("next")}</Button>
          </div>
        </TabsContent>

        <TabsContent value="employment" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="position">{t("position")}</Label>
              <Input
                id="position"
                value={formData.position}
                onChange={(e) => handleChange("position", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">{t("department")}</Label>
              <Select value={formData.department} onValueChange={(value) => handleChange("department", value)}>
                <SelectTrigger id="department">
                  <SelectValue placeholder={t("select_department")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Engineering">{t("engineering")}</SelectItem>
                  <SelectItem value="Design">{t("design")}</SelectItem>
                  <SelectItem value="Management">{t("management")}</SelectItem>
                  <SelectItem value="HR">{t("hr")}</SelectItem>
                  <SelectItem value="Finance">{t("finance")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="join-date">{t("join_date")}</Label>
              <Input
                id="join-date"
                type="date"
                value={formData.join_date}
                onChange={(e) => handleChange("join_date", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contract-end">{t("contract_end")}</Label>
              <Input
                id="contract-end"
                type="date"
                value={formData.contract_end}
                onChange={(e) => handleChange("contract_end", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="employee-type">{t("employee_type")}</Label>
              <Select value={formData.employee_type} onValueChange={(value) => handleChange("employee_type", value)}>
                <SelectTrigger id="employee-type">
                  <SelectValue placeholder={t("select_type")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full-time">{t("full_time")}</SelectItem>
                  <SelectItem value="part-time">{t("part_time")}</SelectItem>
                  <SelectItem value="contract">{t("contract")}</SelectItem>
                  <SelectItem value="intern">{t("intern")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="work-schedule">{t("work_schedule")}</Label>
              <Select value={formData.work_schedule} onValueChange={(value) => handleChange("work_schedule", value)}>
                <SelectTrigger id="work-schedule">
                  <SelectValue placeholder={t("select_schedule")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="9-5">{t("standard_9_5")}</SelectItem>
                  <SelectItem value="flexible">{t("flexible")}</SelectItem>
                  <SelectItem value="shift">{t("shift_based")}</SelectItem>
                  <SelectItem value="remote">{t("remote")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={() => setActiveTab("personal")}>
              {t("back")}
            </Button>
            <Button onClick={() => setActiveTab("salary")}>{t("next")}</Button>
          </div>
        </TabsContent>

        <TabsContent value="salary" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="base-salary">{t("base_salary")}</Label>
              <Input
                id="base-salary"
                type="number"
                value={formData.base_salary.toString()}
                onChange={(e) => handleChange("base_salary", Number.parseFloat(e.target.value) || 0)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="payment-method">{t("payment_method")}</Label>
              <Select value={formData.payment_method} onValueChange={(value) => handleChange("payment_method", value)}>
                <SelectTrigger id="payment-method">
                  <SelectValue placeholder={t("select_payment_method")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bank-transfer">{t("bank_transfer")}</SelectItem>
                  <SelectItem value="cash">{t("cash")}</SelectItem>
                  <SelectItem value="check">{t("check")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bank-name">{t("bank_name")}</Label>
              <Input
                id="bank-name"
                value={formData.bank_name}
                onChange={(e) => handleChange("bank_name", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="account-number">{t("account_number")}</Label>
              <Input
                id="account-number"
                value={formData.account_number}
                onChange={(e) => handleChange("account_number", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tax-id">{t("tax_id")}</Label>
              <Input id="tax-id" value={formData.tax_id} onChange={(e) => handleChange("tax_id", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="overtime-rate">{t("overtime_rate")}</Label>
              <Input
                id="overtime-rate"
                type="number"
                value={formData.overtime_rate.toString()}
                onChange={(e) => handleChange("overtime_rate", Number.parseFloat(e.target.value) || 0)}
              />
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={() => setActiveTab("employment")}>
              {t("back")}
            </Button>
            <Button onClick={() => setActiveTab("documents")}>{t("next")}</Button>
          </div>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>{t("contract")}</Label>
              <FileUpload
                icon={<Upload className="h-8 w-8 text-gray-400" />}
                title={t("upload_contract")}
                description={t("upload_contract_description")}
                accept=".pdf,.doc,.docx"
              />
            </div>

            <div className="space-y-2">
              <Label>{t("resume")}</Label>
              <FileUpload
                icon={<Upload className="h-8 w-8 text-gray-400" />}
                title={t("upload_resume")}
                description={t("upload_resume_description")}
                accept=".pdf,.doc,.docx"
              />
            </div>

            <div className="space-y-2">
              <Label>{t("id_documents")}</Label>
              <FileUpload
                icon={<Upload className="h-8 w-8 text-gray-400" />}
                title={t("upload_id")}
                description={t("upload_id_description")}
                accept=".pdf,.jpg,.png"
              />
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={() => setActiveTab("salary")}>
              {t("back")}
            </Button>
            <Button onClick={handleSaveEmployee} disabled={loading}>
              {loading ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></div>
                  {t("saving")}
                </>
              ) : (
                t("save_employee")
              )}
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </>
  )
}
