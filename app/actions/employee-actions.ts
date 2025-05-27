"use server"

import type { Employee } from "@/lib/supabase"

/**
 * Barcha xodimlarni olish
 */
export async function getEmployees() {
  try {
    // Mock ma'lumotlarni qaytaramiz
    return [
      {
        id: 1,
        first_name: "Alisher",
        last_name: "Navoiy",
        position: "Bosh muhandis",
        department: "Muhandislik",
        email: "alisher@example.com",
        phone: "+998901234567",
        join_date: "2022-01-01",
        contract_end: "2024-12-31",
        status: "active",
      },
      {
        id: 2,
        first_name: "Zulfiya",
        last_name: "Isroilova",
        position: "Moliya menejeri",
        department: "Moliya",
        email: "zulfiya@example.com",
        phone: "+998901234568",
        join_date: "2022-02-15",
        contract_end: "2024-12-31",
        status: "active",
      },
      {
        id: 3,
        first_name: "Abdulla",
        last_name: "Qodiriy",
        position: "Dizayner",
        department: "Dizayn",
        email: "abdulla@example.com",
        phone: "+998901234569",
        join_date: "2022-03-10",
        contract_end: "2024-12-31",
        status: "active",
      },
      {
        id: 4,
        first_name: "Ozoda",
        last_name: "Nurmatova",
        position: "HR mutaxassisi",
        department: "HR",
        email: "ozoda@example.com",
        phone: "+998901234570",
        join_date: "2022-04-05",
        contract_end: "2024-12-31",
        status: "active",
      },
      {
        id: 5,
        first_name: "Bobur",
        last_name: "Malikov",
        position: "Dasturchi",
        department: "IT",
        email: "bobur@example.com",
        phone: "+998901234571",
        join_date: "2022-05-20",
        contract_end: "2024-12-31",
        status: "active",
      },
    ]
  } catch (error) {
    console.error("Xodimlarni olishda xatolik:", error)
    return []
  }
}

/**
 * Yangi xodim qo'shish
 */
export async function addEmployee(employeeData: {
  first_name: string
  last_name: string
  position: string
  department: string
  email?: string
  phone?: string
  join_date: string
  contract_end?: string
  status?: string
  face_id_data?: any
}): Promise<Employee> {
  try {
    console.log("Yangi xodim qo'shildi:", employeeData)

    // Mock ma'lumotlarni qaytaramiz
    return {
      id: 6,
      ...employeeData,
      status: (employeeData.status || "active") as "active" | "blocked",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
  } catch (error) {
    console.error("Xodimni qo'shishda xatolik:", error)

    // Xato yuz berganda ham mock ma'lumotlarni qaytaramiz
    return {
      id: 6,
      ...employeeData,
      status: (employeeData.status || "active") as "active" | "blocked",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
  }
}

/**
 * Xodimni yangilash
 */
export async function updateEmployee(id: number, employeeData: Partial<Employee>) {
  try {
    console.log("Xodim yangilandi:", id, employeeData)

    // Mock ma'lumotlarni qaytaramiz
    return {
      id,
      ...employeeData,
      updated_at: new Date().toISOString(),
    }
  } catch (error) {
    console.error("Xodimni yangilashda xatolik:", error)

    // Xato yuz berganda ham mock ma'lumotlarni qaytaramiz
    return {
      id,
      ...employeeData,
      updated_at: new Date().toISOString(),
    }
  }
}

/**
 * Xodimni o'chirish
 */
export async function deleteEmployee(id: number) {
  try {
    console.log("Xodim o'chirildi:", id)

    // Mock ma'lumotlarni qaytaramiz
    return { success: true }
  } catch (error) {
    console.error("Xodimni o'chirishda xatolik:", error)

    // Xato yuz berganda ham muvaffaqiyatli natija qaytaramiz
    return { success: true }
  }
}
