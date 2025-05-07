🧠 SMART CRM - BACKEND API (Node.js + Express + MongoDB)

Smart CRM bu yengil, xavfsiz va kengaytiriladigan backend tizimi bo‘lib, biznesingizdagi foydalanuvchilar, rollar va boshqaruvni markazlashtirilgan holda boshqarish imkonini beradi.

===================================================================

📦 TEXNOLOGIYALAR

===================================================================

- Node.js (v18+)
- Express.js
- MongoDB + Mongoose
- JSON Web Tokens (JWT)
- Bcrypt.js (parollarni xashlash uchun)
- dotenv (maxfiy sozlamalar uchun)
- CORS (xavfsiz API chaqiriqlari uchun)

===================================================================
🚀 LOYIHANI ISHGA TUSHURISH YO‘RIQNOMASI
===================================================================

1. Repositoriyani klon qiling:
----------------------------------
git clone https://github.com/azamjonbro/smart-crm-backend.git
cd smart-crm-backend

2. Bog‘liqliklarni o‘rnating:
-----------------------------
npm install

3. .env fayl yarating:
----------------------
/root papkada `.env` fayl oching:

PORT=5000
MONGO_URI=mongodb://localhost:27017/smartcrm
JWT_SECRET=supersecretkey123

4. Serverni ishga tushurish:
-----------------------------
npm run dev

===================================================================
👥 USER ROLLARI
===================================================================

🛡 SuperAdmin:
- Manager yaratish
- Super admin sozlamalarini boshqarish
- Butun tizim ustidan nazorat

👨‍💼 Manager:
- O‘ziga tegishli ishlarni bajaradi (Frontend orqali sozlanadi)

===================================================================
🔐 AUTENTIFIKATSIYA (JWT)
===================================================================

Tizim JWT orqali autentifikatsiya qiladi.
Har bir muhim so‘rov uchun `Authorization: Bearer <token>` headeri talab qilinadi.

Login vaqtida berilgan token bilan himoyalangan API chaqiriqlari qilinadi.

===================================================================
⚙️ SUPERADMIN SETTINGS MODELI
===================================================================

superadmin.settings.model.js orqali quyidagi sozlamalar saqlanadi:

- styled: "dark" | "light"
- fontFamily: font nomi
- brandColor: asosiy rang
- mainColor: orqa fon rangi
- notification: true/false
- changedPassword: true/false
- changedPasswordTime: vaqt belgisi

Bu modelni yaratish va update qilish uchun maxsus controllerlar mavjud.


===================================================================
🧩 KUTILGAN QO‘SHIMCHA FUNKSIYALAR (NEXT STEPS)
===================================================================

- Email orqali yuborish
- Managerga mahsulot biriktirish
- CRUD: Mahsulotlar, Kategoriya, Mijozlar
- Foydalanuvchi faoliyatini kuzatish (logs)

===================================================================
🛠 HISSA QO‘SHISH
===================================================================

Pull requestlar ochiq! Siz ham tizimga yangilik kiritmoqchi bo‘lsangiz `fork` qilib, yangiliklaringizni yuborishingiz mumkin.

===================================================================
📄 LITSENZIYA
===================================================================

MIT License © 2025 Azamjonbro
