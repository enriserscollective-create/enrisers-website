# ENRISERS Website – README

Welcome! Here's everything you need to get your site live.

---

## 📁 Files in this folder

| File | What it is |
|------|-----------|
| `index.html` | Main website page |
| `style.css` | All styles (dark navy + gold) |
| `script.js` | Animations, form logic, confetti |
| `netlify.toml` | Netlify config for deployment |
| `logo.png` | ← **You need to add this!** |

---

## 🖼️ Step 1 — Add your logo

1. Place your ENRISERS logo file inside this folder
2. Name it exactly: **`logo.png`**
3. That's it — it will auto-appear in the navbar, hero section, and footer

> If you have a different file format (JPG, SVG, WebP), rename it to `logo.png`
> or open `index.html` and replace all `logo.png` with your filename (3 places).

---

## 📧 Step 2 — Get your free Web3Forms key (to receive form emails)

When someone registers on your website, you want to receive their details in your Gmail inbox.

**Web3Forms is completely FREE — no credit card, no signup required:**

1. Go to: **https://web3forms.com**
2. Enter your email: `enriserscollective@gmail.com`
3. Click **"Create Access Key"**
4. They'll email you a key that looks like: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`
5. Open `index.html` and find this line (around line 110):

```html
<input type="hidden" name="access_key" value="YOUR_WEB3FORMS_KEY"/>
```

6. Replace `YOUR_WEB3FORMS_KEY` with your actual key:

```html
<input type="hidden" name="access_key" value="abc12345-xxxx-xxxx-xxxx-your-real-key"/>
```

**Done!** Every registration will land in your Gmail inbox with all student details.

---

## 🚀 Step 3 — Deploy free on Netlify (drag & drop — 2 minutes)

1. Go to: **https://app.netlify.com** (create a free account if needed)
2. Click **"Add new site"** → **"Deploy manually"**
3. Drag your entire folder (with all 4 files + logo.png) into the drop zone
4. Your site goes live in ~30 seconds at a URL like: `https://amazing-name.netlify.app`

**Optional – Custom domain:**
- In Netlify: Site settings → Domain management → Add custom domain
- If you buy a domain like `enrisers.org`, point it to Netlify for free

---

## 📱 Step 4 — Change the WhatsApp number later

When your number changes from the testing number, open `index.html` and do a Find & Replace:

- **Find:** `917604898367`
- **Replace with:** `91` + your 10-digit number (e.g., `919876543210`)

This appears in 4 places in the HTML. Replace all 4.

---

## ✅ How form submissions work (3-step flow)

When a student submits the registration form:

1. **Gmail** → Details sent to `enriserscollective@gmail.com` via Web3Forms (free)
2. **WhatsApp** → A new browser tab opens with a pre-filled WhatsApp message to your number with all the student's details
3. **Success screen** → The form is replaced with a celebration screen and confetti animation

---

## 🔗 Instagram link

All Instagram buttons link to: `https://instagram.com/enrisers`
To change the handle, find `instagram.com/enrisers` in `index.html` and update it.

---

## 🆓 Zero paid services used

| Service | Cost | Purpose |
|---------|------|---------|
| Netlify | Free | Hosting |
| Web3Forms | Free | Email delivery |
| WhatsApp | Free | Student notification |
| Google Fonts | Free | Bebas Neue + Outfit fonts |

---

## 💬 Need help?

The site is fully self-contained — just 4 files. No server, no database, no monthly bills.

**Padippom • Pagirvom • Parappom** 🌟
