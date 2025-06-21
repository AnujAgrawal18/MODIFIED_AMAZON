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

## 📖 Feature Guide

### 🔹 Trust Score Badges and visual match verified badge  
Each product listing displays a **Trust Score Badges** and **Visual match verified Badge** based on real data like reviews, returns, and authenticity checks.  
<p align="center"><img src="/public/images/trustscore.gif" width="700" alt="Trust Score Badge"></p>
<p align="center"><img src="/public/images/productpagescores.gif" width="700" alt="Badge"></p>

---

### 🔹 Trust Card on Hover  
Hover over any product to see the **real-time Trust Card**:
- Seller Name & Score  
- Product Score (3R Score)  
- Return Rate  
- Verified Visual Match  
- Authentic Review Snippet  
<p align="center"><img src="/public/images/trustcard.gif" width="700" alt="Trust Card Hover"></p>

---

### 🔹 Seller Behavior Monitoring  
Our backend monitors:
- Price spikes  
- Listing duplication  
- Poor delivery records  
Flagged sellers are penalized or suspended.  

---

### 🔹 Smart Return Process  
When receiving a product, customers are prompted with 3 options:
1. Unbox in front of the delivery agent  
2. Upload an unboxing video later  
3. Skip proof → Return allowed only if product matches seller’s images  
<p align="center"><img src="/public/images/returnoptions.gif" width="700" alt="Return Options"></p>

---

### 🔹 Visual Authenticity Check System (VACS)  
Powered by **CLIP/BLIP models**, VACS checks:
- Logo placement  
- Label mismatch  
- Package quality  
<p align="center"><img src="/public/images/fraudmonitor.gif" width="700" alt="Image Match Verification"></p>

---

### 🔹 Conveyor Belt Quality Checks  
AI detects damage or counterfeiting in FBA/FBM shipments using warehouse image feeds. 

---

### 🔹 What You See vs What You Get  
Buyers can compare **official product images vs real customer photos** side-by-side before buying.  
<p align="center"><img src="/public/images/wysiwyg.gif" width="700" alt="WYSIWYG"></p>

---

### 🔹 AI-Based Review Authenticity and Verified Image Review Rewards  
Fine-tuned LLM flags:
- Over-promotional tone  
- Repetitive structures  
- Synthetic phrasing  
Each review is scored and labeled. 
hoppers earn points when uploading real, AI-verified images of received products.  
<p align="center"><img src="/public/images/reviewai.gif" width="700" alt="AI Review Detection"></p>

---

### 🔹 Description vs Reality Match %  and Return Rate & Reasons Breakdown 
A percentage shows how closely the actual product matches the seller description based on user feedback.
Real-time return statistics for every product (e.g., “Too small – 1.8%”)   
<p align="center"><img src="/public/images/descriptionreturn.gif" width="700" alt="Description Match %"></p>

---

### 🔹 Delivery Confirmation ("Yes / Signature")  
Buyers must confirm receipt via button/signature upon delivery arrival to prevent false delivery claims.  
<p align="center"><img src="/public/images/deliveryconfirm.gif" width="700" alt="Delivery Signature Confirmation"></p>

---

### 🔹 The navigation bar contains new sections like
#### Educational Section: 
This section aims to inform and educate customers about our INITIATIVE.
#### Rewards: 
##### Customers accumulate **TrustCoins** by:
- Uploading authentic reviews  
- Confirming deliveries honestly  

##### These TrustCoins can be redeemed in a **Rewards & Gifts section** featuring:
- Exclusive discount coupons  
- Merchandise (bags, mugs, t-shirts)  
- Free delivery tokens 
<p align="center"><img src="/public/images/newsection.gif" width="700" alt="new section"></p>

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