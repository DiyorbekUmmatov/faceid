"use client";

import { useState, createContext, type ReactNode, useEffect } from "react";

// Define translations
const translations: Record<string, Record<string, string>> = {
  en: {
    // Navigation
    dashboard: "Dashboard",
    employees: "Employees",
    attendance: "Attendance",
    payroll: "Payroll",
    reports: "Reports",
    schedule: "Schedule",
    settings: "Settings",

    // Common
    search: "Search",
    filter: "Filter",
    export: "Export",
    save: "Save",
    cancel: "Cancel",
    edit: "Edit",
    delete: "Delete",
    view: "View",
    add: "Add",

    // Employee related
    add_employee: "Add Employee",
    employee_name: "Employee Name",
    position: "Position",
    department: "Department",
    email: "Email",
    phone: "Phone",
    status: "Status",
    join_date: "Join Date",

    // Attendance
    check_in: "Check In",
    check_out: "Check Out",
    present: "Present",
    absent: "Absent",
    late: "Late",
    on_time: "On Time",

    // Face ID
    face_id_camera: "Face ID Camera",
    scanning_faces: "Scanning faces...",
    face_recognized: "Face recognized",
    unknown_face: "Unknown face",
    recognition_history: "Recognition History",

    // Other
    loading: "Loading...",
    no_data: "No data available",
  },
  uz: {
    dashboard: "Boshqaruv paneli",
    employees: "Xodimlar",
    attendance: "Davomat",
    schedule: "Jadval",
    payroll: "Ish haqi",
    reports: "Hisobotlar",
    settings: "Sozlamalar",
    search: "Qidirish",
    filter: "Filtrlash",
    export: "Eksport qilish",
    save: "Saqlash",
    cancel: "Bekor qilish",
    edit: "Tahrirlash",
    delete: "O'chirish",
    view: "Ko'rish",
    add: "Qo'shish",
    add_employee: "Xodim qo'shish",
    employee_name: "Xodimning ismi",
    position: "Lavozim",
    department: "Bo'lim",
    email: "Elektron pochta",
    phone: "Telefon",
    status: "Holat",
    join_date: "Ishga kirgan sana",
    check_in: "Kirish",
    check_out: "Chiqish",
    present: "Kelgan",
    absent: "Kelmagan",
    late: "Kechikkan",
    on_time: "O'z vaqtida",
    face_id_camera: "Face ID Kamera",
    scanning_faces: "Yuzlarni skanerlash...",
    face_recognized: "Yuz aniqlandi",
    unknown_face: "Noma'lum yuz",
    recognition_history: "Tanib olish tarixi",
    loading: "Yuklanmoqda...",
    no_data: "Ma'lumotlar mavjud emas",
  },
  ru: {
    dashboard: "Панель управления",
    employees: "Сотрудники",
    attendance: "Посещаемость",
    schedule: "Расписание",
    payroll: "Заработная плата",
    reports: "Отчеты",
    settings: "Настройки",
    search: "Поиск",
    filter: "Фильтр",
    export: "Экспорт",
    save: "Сохранить",
    cancel: "Отмена",
    edit: "Редактировать",
    delete: "Удалить",
    view: "Просмотр",
    add: "Добавить",
    add_employee: "Добавить сотрудника",
    employee_name: "Имя сотрудника",
    position: "Должность",
    department: "Отдел",
    email: "Электронная почта",
    phone: "Телефон",
    status: "Статус",
    join_date: "Дата приема",
    check_in: "Вход",
    check_out: "Выход",
    present: "Присутствует",
    absent: "Отсутствует",
    late: "Опоздал",
    on_time: "Вовремя",
    face_id_camera: "Камера Face ID",
    scanning_faces: "Сканирование лиц...",
    face_recognized: "Лицо распознано",
    unknown_face: "Неизвестное лицо",
    recognition_history: "История распознавания",
    loading: "Загрузка...",
    no_data: "Нет доступных данных",
  },
};

// Create context for translations
const I18nContext = createContext<{
  language: keyof typeof translations;
  changeLanguage: (lang: keyof typeof translations) => void;
  t: (key: string, vars?: { [key: string]: string | number }) => string;
}>({
  language: "en",
  changeLanguage: () => {},
  t: (key) => key,
});

// Provider component
export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<keyof typeof translations>("en");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage && Object.keys(translations).includes(savedLanguage)) {
      setLanguage(savedLanguage as keyof typeof translations);
    }
  }, []);

  const changeLanguage = (lang: keyof typeof translations) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const t = (
    key: string,
    vars?: { [key: string]: string | number }
  ): string => {
    let translation =
      translations[language][
        key as keyof (typeof translations)[typeof language]
      ] || key;

    if (vars) {
      Object.keys(vars).forEach((key) => {
        translation = translation.replace(`{${key}}`, String(vars[key]));
      });
    }

    return translation;
  };

  return (
    <I18nContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}

// Hook for using translations
export function useTranslation() {
  const [locale, setLocale] = useState("en");

  const t = (key: string, params?: Record<string, any>) => {
    let translation = translations[locale]?.[key] || key;

    if (params) {
      Object.keys(params).forEach((param) => {
        translation = translation.replace(`{${param}}`, params[param]);
      });
    }

    return translation;
  };

  return { t, locale, setLocale };
}
