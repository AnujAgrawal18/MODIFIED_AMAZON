# 🛡️ Trust Commerce with Amazon

### 👥 Team Name: TECHGEEKS

**Team Members:**
- Anuj Agrawal  
- Gaurav Kapoor  
- Pranav Chaudhary  
- Sanya Goyal  

[🔗 Idea Submission PPT](https://drive.google.com/file/d/1ePIJrmIFDVhrne6hQOl_UtvEFdmjEdb4/view?usp=sharing)

---

## 📌 PROJECT OVERVIEW

"Trust Commerce with Amazon" is an AI-powered trust & safety platform designed to combat counterfeiting, fraud, and misinformation in e-commerce. It introduces innovative verification tools, user engagement models, and intelligent scoring mechanisms to boost trust, transparency, and operational efficiency for platforms like Amazon.

---

## 🎯 Key Objectives

1. Prevent counterfeit product listings using AI-based authenticity checks.
2. Minimize frauds like item-not-received and return frauds using visual proof workflows.
3. Improve review authenticity by detecting fake/generated reviews.
4. Equip customers with data-backed product and seller trust scores.
5. Provide platforms and sellers with actionable insights, reduced disputes, and enhanced credibility.

---

## ✨ Features

| Category | Feature |
|---------|---------|
| **Product Verification** | Visual Authenticity Check using CLIP/BLIP models |
| **Seller Validation** | Invoice matching, packaging analysis, supply chain verification |
| **Customer Confirmation** | "Did you receive this order?" prompts |
| **Returns** | Video-based unboxing verification, fraud-aware returns |
| **Fake Review Detection** | LLM-powered fake review filtering |
| **Visual Review UGC** | "What You See Vs What You Get" with rewards |
| **Seller Trust Score** | Based on return rates, issue resolution, and customer satisfaction |
| **Product Score** | Derived from ratings, return reasons, satisfaction, and visual match accuracy |
| **Hover Dashboard** | On-hover product card shows trust indicators and match scores |
| **Gamification** | Trust rewards, badges, verified review incentives |
| **Marketplace Insights** | Real-time dashboards and transparency at every touchpoint |

---

## 🧭 Project Guide

### 🏗️ Architecture Overview

- **Frontend (Next.js + React )**  
- **Backend (Node.js / Express via Next.js API routes)**  
- **Database (MongoDB + Mongoose)**  
- **AI Models (CLIP/BLIP/LLMs)**  
- **Cloud Infra ( MongoDB Atlas)**  

---

### 🚀 Deployment Guide

```bash
git clone git@github.com:AnujAgrawal18/MODIFIED_AMAZON.git
cd MODIFIED-AMAZON

# MongoDB Setup
# Update your MONGODB_URI

npm run seed
npm install --legacy-peer-deps
npm run dev
```

**Admin Login**
- URL: http://localhost:3000
- Email: roh@example.com
- Password: 123456

---

## 🧠 Future Scope

- Blockchain provenance tracking
- Smart packaging with sensors
- AI-based predictive seller fraud models
- Decentralized trust validation