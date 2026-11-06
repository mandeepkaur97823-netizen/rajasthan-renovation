# Rajasthan Renovation and Landscaping Services - Localhost Guide

This repository contains the complete localhost-ready website application for **Rajasthan Renovation and Landscaping Services**.

---

## 🚀 Quick Start (Easiest Way)

### Option 1: 1-Click Launch (Recommended for Windows)
Simply **double-click** either launcher script in this folder:
- **`start-localhost.bat`** (Development Mode)
  - Automatically verifies Node.js is present
  - Automatically installs dependencies if needed (`npm install`)
  - Starts the Vite local development server at **http://localhost:3000**
  - Automatically launches the website in your default browser

- **`start-production.bat`** (Production Mode)
  - Automatically builds the bundle (`npm run build`)
  - Runs the lightweight built-in Node server (`server.js`) serving the `dist/` directory
  - Available at **http://localhost:3000**

---

### Option 2: PowerShell
Right-click **`start-localhost.ps1`** and select **Run with PowerShell**, or in a PowerShell terminal run:
```powershell
.\start-localhost.ps1
```

---

### Option 3: Terminal / Command Line

You can run commands directly from the **workspace root folder**:
```bash
# Start development server with instant hot-reloading:
npm run dev

# Or start the production server:
npm start

# Or build the production bundle:
npm run build
```

Or from inside `rajasthan-renovation-and-landscaping-services`:
```bash
cd rajasthan-renovation-and-landscaping-services
npm run dev
```

Then open your browser at:
👉 **[http://localhost:3000](http://localhost:3000)**

---

## 🔐 Localhost Admin Panel
A private administration and lead management dashboard is built-in:
- **Direct URL:** [http://localhost:3000/#admin](http://localhost:3000/#admin)
- **Footer Shortcut:** Click **"Admin Portal"** at the bottom of the page.
- **Admin Password:** `12345678`

### Admin Features:
- **Customer Leads Management**: View, search, and manage all quotes/enquiries received.
- **1-Click Customer Contact**: Direct click-to-call, WhatsApp pre-filled message, and email buttons.
- **Lead Status Workflow**: Update status (`New`, `Contacted`, `Quote Sent`, `Completed`).
- **Export Leads to CSV**: Download leads spreadsheet directly into Excel/Google Sheets.
- **Manage Client Reviews**: View and publish verified customer testimonials.
- **Business Details Editor**: Edit owner name, phone number, email, and service areas.

---

## 🛠 Available Scripts

| Command (from root or subfolder) | Description |
|---|---|
| `npm run dev` | Runs the development server on `http://localhost:3000` with instant hot-reloading |
| `npm run build` | Builds the optimized production bundle into `dist/` with relative assets |
| `npm start` / `npm run serve` | Runs the zero-dependency Node static server (`server.js`) serving `dist/` on `http://localhost:3000` |
| `npm run preview` | Previews the production build using Vite preview on `http://localhost:3000` |
| `npm run lint` | Runs TypeScript type checking (`tsc --noEmit`) |

---

## 📱 Testing on Mobile / Other Devices (Same Wi-Fi)
The server binds to `0.0.0.0`, enabling direct testing on your mobile phone or tablet:
1. Make sure your phone is connected to the same Wi-Fi network as this computer.
2. Find your computer's local IPv4 address (run `ipconfig` in Command Prompt / PowerShell, e.g. `192.168.1.15`).
3. Open your phone's browser and navigate to: `http://<your-computer-ip>:3000`.

---

## 📋 Features Included
- **Services Catalog**: Lawn mowing, landscape design, ground preparation & leveling, fencing, and professional floor/wall tiling.
- **Representative Visual Showcase**: High-res before/after cards and interactive service selections.
- **Quote Calculator / Form**: Interactive project estimator with pre-selected service routing.
- **Direct Contact**: Dedicated click-to-call link for Khushkaran (`0484914973`) and email (`khush_99@outlook.com`).
- **Responsive Mobile Navigation**: Dedicated sticky action bar optimized for smartphones.
