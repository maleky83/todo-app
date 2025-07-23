# ✅ پروژه TODO لیست — Full Stack (Node.js + Express + HTML/CSS/JS)

این پروژه یک اپلیکیشن ساده اما حرفه‌ای مدیریت تسک (To-Do List) است که با **HTML، CSS، JavaScript (Vanilla)** در فرانت‌اند و **Node.js + Express** در بک‌اند پیاده‌سازی شده. اطلاعات در فایل JSON ذخیره می‌شوند (بدون دیتابیس برای سادگی و تمرکز روی منطق).

---

## 🎯 ویژگی‌ها

- اضافه‌کردن تسک با نام و زمان
- حذف تسک
- علامت‌گذاری تسک به عنوان انجام‌شده یا انجام‌نشده (با ایموجی)
- نمایش پیام خطا یا موفقیت
- اعتبارسنجی اطلاعات ورودی
- رابط کاربری راست‌چین و فارسی (فونت سفارشی Vazir)
- ساختار ماژولار در سمت سرور

---

## 🧠 تکنولوژی‌های استفاده‌شده

| بخش         | تکنولوژی                 |
| ----------- | ------------------------ |
| فرانت‌اند   | HTML, CSS, JavaScript    |
| بک‌اند      | Node.js, Express.js      |
| ذخیره‌سازی  | فایل JSON (بدون دیتابیس) |
| مدیریت فایل | Node fs module           |

---

## 🗂️ ساختار پوشه‌ها

project-root/
├── client/
│ ├── index.html
│ ├── style/style.css
│ ├── script/app.js
│ └── assets/fonts/vazir.woff2
├── server/
│ ├── data/todos.json
│ ├── routes/todoRouter.js
│ ├── controllers/todoController.js
│ └── server.js

yaml

---

## 🚀 راه‌اندازی محلی

### 1. کلاینت:

کد HTML/CSS/JS در پوشه `client` قرار دارد. سرور به صورت `static` آن را سرو می‌کند.

### 2. سرور:

```bash
cd server
npm install
node server.js
سپس باز کن:


http://localhost:3000
```
