# MediTrack - IIITBH Medical Management System

## Introduction
The **IIITBH Medical Management System** is a robust and efficient platform designed specifically for the Medical Department at IIIT Bhagalpur. This system streamlines medical inventory management and medicine distribution to students, ensuring accurate record-keeping and efficient tracking of medicine usage.  

This project was entirely developed by **Siddharth Nama** to enhance medical management within IIIT Bhagalpur.  

---

## 🌟 Key Features

- **Medicine Management:**  
  Administrators can efficiently manage medical inventory by performing CRUD operations on medicine records. The system keeps a detailed log of available stock, including adding, updating, and deleting medicines.

- **Medicine Distribution Tracking:**  
  Administrators can log new medicine distributions to students, generate bills, and automatically update the stock. The system keeps track of the quantity of medicine taken by each student, allowing for accurate record maintenance.

- **Profile Management:**  
  Enables administrators to update and manage user profiles, ensuring accurate personal information storage.

---

## 📁 Project Structure

- **medicine/:** Handles CRUD operations and inventory management for medical supplies.  
- **distribution/:** Manages medicine distribution to students and bill generation.  
- **profiles/:** Handles user profile management and updates.  
- **templates/:** HTML templates for the frontend pages.  
- **static/:** CSS, JavaScript, and images for styling and functionality.  

---

## 🛠️ Tech Stack

- **Frontend:** React, Tailwind CSS, HTML, JavaScript  
- **Backend:** Django, REST API  
- **Database:** PostgreSQL  
- **Deployment:** IIIT Bhagalpur College Server  

---

## 🚀 Getting Started

### Prerequisites
- Python 3.x  
- PostgreSQL  

### Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Siddharth-Nama/IIITBHMedicalManagementSystem.git
   ```
2. **Navigate to the project directory:**
   ```bash
   cd IIITBHMedicalManagementSystem
   ```
3. **Install the required dependencies:**
   ```bash
   pip install -r requirements.txt
   ```
4. **Run database migrations:**
   ```bash
   python manage.py migrate
   ```
5. **Start the development server:**
   ```bash
   python manage.py runserver
   ```
6. **Access the application in your browser:**
   ```
   http://127.0.0.1:8000/
   ```

---

## 🛠️ Project Workflow  

### Administrator Workflow  
1. **Log In:**  
   Administrators log in using their credentials to access the dashboard.  

2. **Medicine Management:**  
   - Add, update, or delete medicines from the inventory.  
   - View the current stock of available medicines.  

3. **Medicine Distribution:**  
   - Record new medicine distributions to students.  
   - Generate bills and automatically update stock after each distribution.  

4. **Profile Management:**  
   - Manage and update user profiles, keeping details accurate and up-to-date.  

### Student Workflow  
1. **Log In:**  
   Students log in to view their medicine history and profile details.  

2. **View Medicine Distribution:**  
   - Check the list of medicines received.  
   - Access the generated bills.  

---

## 📚 Usage

1. **Log in with your administrator credentials.**  
2. **Manage Medicines:** Add, update, or delete medicines and keep track of stock.  
3. **Track Distributions:** Log distributions made to students and generate bills automatically.  
4. **Manage Profiles:** Update personal details of users efficiently.  

---

## 🤝 Contributions

This project was developed entirely by **Siddharth Nama**, with valuable feedback and suggestions from peers. Contributions are welcome!  

### How to Contribute:
1. Fork the repository.  
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes and commit:
   ```bash
   git commit -m "Add a brief description of your changes"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a Pull Request.  

---

## 📜 License
This project is licensed under the MIT License. See the LICENSE file for details.  

---

## 👥 Developed By  
This project was developed by **Siddharth Nama** with the goal of enhancing medical management at IIIT Bhagalpur.  
