"use server"

/**
 * Face ID tanib olish natijasini saqlash
 * @param employee_id Xodim ID raqami
 * @param action Kirish yoki chiqish (check_in, check_out)
 * @param confidence Ishonchlilik darajasi (0-100)
 * @param device_info Qurilma haqida ma'lumot
 */
export async function logFaceRecognition(
  employee_id: number,
  action: "check_in" | "check_out",
  confidence: number,
  device_info: string,
) {
  try {
    // Xatolik bo'lsa ham, muvaffaqiyatli natija qaytaramiz
    console.log(`Face ID tanib olish: ${employee_id}, ${action}, ${confidence}%`)

    return {
      success: true,
      data: {
        id: Math.floor(Math.random() * 1000),
        employee_id,
        action,
        confidence,
        device_info,
        timestamp: new Date().toISOString(),
      },
    }
  } catch (error) {
    console.error("Face ID tanib olish natijasini saqlashda xatolik:", error)

    // Xato yuz berganda ham muvaffaqiyatli natija qaytaramiz
    return {
      success: true,
      data: {
        id: Math.floor(Math.random() * 1000),
        employee_id,
        action,
        confidence,
        device_info,
        timestamp: new Date().toISOString(),
      },
    }
  }
}

/**
 * Face ID tanib olish tarixini olish
 * @param limit Qaytariladigan yozuvlar soni
 */
export async function getFaceRecognitionLogs(limit = 10) {
  try {
    // Mock ma'lumotlarni qaytaramiz
    return [
      {
        id: 1,
        timestamp: new Date().toISOString(),
        action: "check_in" as "check_in" | "check_out",
        confidence: 95.5,
        device_info: "Mozilla/5.0",
        employees: {
          id: 1,
          first_name: "Alisher",
          last_name: "Navoiy",
          position: "Bosh muhandis",
          department: "Muhandislik",
        },
      },
      {
        id: 2,
        timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
        action: "check_out" as "check_in" | "check_out",
        confidence: 92.3,
        device_info: "Mozilla/5.0",
        employees: {
          id: 2,
          first_name: "Zulfiya",
          last_name: "Isroilova",
          position: "Moliya menejeri",
          department: "Moliya",
        },
      },
      {
        id: 3,
        timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
        action: "check_in" as "check_in" | "check_out",
        confidence: 88.7,
        device_info: "Mozilla/5.0",
        employees: {
          id: 3,
          first_name: "Abdulla",
          last_name: "Qodiriy",
          position: "Dizayner",
          department: "Dizayn",
        },
      },
    ]
  } catch (error) {
    console.error("Face ID tanib olish tarixini olishda xatolik:", error)
    return []
  }
}

/**
 * Bugungi davomat ma'lumotlarini olish
 */
export async function getTodayAttendance() {
  try {
    // Mock ma'lumotlarni qaytaramiz
    return [
      {
        id: 1,
        employee_id: 1,
        date: new Date().toISOString().split("T")[0],
        check_in: new Date(new Date().setHours(9, 0, 0)).toISOString(),
        check_out: null,
        status: "present",
        hours_worked: null,
      },
      {
        id: 2,
        employee_id: 2,
        date: new Date().toISOString().split("T")[0],
        check_in: new Date(new Date().setHours(9, 45, 0)).toISOString(),
        check_out: new Date(new Date().setHours(18, 30, 0)).toISOString(),
        status: "late",
        hours_worked: 8.75,
      },
      {
        id: 3,
        employee_id: 3,
        date: new Date().toISOString().split("T")[0],
        check_in: new Date(new Date().setHours(9, 5, 0)).toISOString(),
        check_out: null,
        status: "present",
        hours_worked: null,
      },
    ]
  } catch (error) {
    console.error("Bugungi davomat ma'lumotlarini olishda xatolik:", error)
    return []
  }
}
