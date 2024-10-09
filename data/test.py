import random
import json
from faker import Faker

fake = Faker()

roles_salaries_hartford = {
    "Operations Manager": (80000, 130000),
    "Administrative Assistant": (45000, 65000),
    "Business Analyst": (70000, 100000),
    "Claims Adjuster": (55000, 85000),
    "Claims Representative": (50000, 75000),
    "Underwriter": (60000, 100000),
    "Risk Control Consultant": (65000, 110000),
    "Actuarial Analyst": (70000, 115000),
    "Software Developer": (90000, 150000),
    "IT Project Manager": (90000, 140000),
    "Data Analyst": (70000, 110000),
    "Cybersecurity Specialist": (90000, 150000),
    "Systems Administrator": (70000, 110000),
    "Financial Analyst": (65000, 100000),
    "Accountant": (60000, 95000),
    "Internal Auditor": (70000, 105000),
    "Investment Analyst": (80000, 125000),
    "Sales Representative": (60000, 120000),
    "Marketing Specialist": (55000, 95000),
    "Product Manager": (95000, 140000),
    "Customer Relationship Manager": (65000, 110000),
    "HR Generalist": (55000, 85000),
    "Talent Acquisition Specialist": (60000, 95000),
    "Compensation Analyst": (65000, 105000),
    "Corporate Counsel": (120000, 180000),
    "Compliance Officer": (90000, 140000),
    "Paralegal": (50000, 80000),
    "Regulatory Affairs Specialist": (70000, 110000),
    "Manager": (90000, 140000),
    "Customer Service Representative": (40000, 60000),
    "Call Center Agent": (35000, 55000),
}

roles_salaries_atlanta = {
    "Operations Manager": (63000, 96000),
    "Administrative Assistant": (47000, 69000),
    "Business Analyst": (84000, 95000),
    "Claims Adjuster": (70000, 93000),
    "Claims Representative": (50000, 75000),
    "Underwriter": (80000, 115000),
    "Risk Control Consultant": (80000, 110000),
    "Actuarial Analyst": (70000, 134000),
    "Software Developer": (100000, 140000),
    "IT Project Manager": (100000, 150000),
    "Data Analyst": (68000, 95000),
    "Cybersecurity Specialist": (90000, 130000),
    "Systems Administrator": (80000, 110000),
    "Financial Analyst": (66000, 88000),
    "Accountant": (66000, 88000),
    "Internal Auditor": (90000, 120000),
    "Investment Analyst": (95000, 125000),
    "Sales Representative": (70000, 110000),
    "Marketing Specialist": (84000, 105000),
    "Product Manager": (105000, 140000),
    "Customer Relationship Manager": (75000, 110000),
    "HR Generalist": (55000, 85000),
    "Talent Acquisition Specialist": (66000, 95000),
    "Compensation Analyst": (75000, 110000),
    "Corporate Counsel": (125000, 180000),
    "Compliance Officer": (90000, 130000),
    "Paralegal": (55000, 85000),
    "Regulatory Affairs Specialist": (80000, 110000),
    "Manager": (100000, 140000),
    "Customer Service Representative": (50000, 70000),
    "Call Center Agent": (45000, 60000),
}


roles_salaries_st_paul = {
    "Operations Manager": (85000, 125000),
    "Administrative Assistant": (47000, 69000),
    "Business Analyst": (84000, 95000),
    "Claims Adjuster": (60000, 85000),
    "Claims Representative": (50000, 75000),
    "Underwriter": (83800, 138200),
    "Risk Control Consultant": (75000, 115000),
    "Actuarial Analyst": (65000, 110000),
    "Software Developer": (90000, 130000),
    "IT Project Manager": (100000, 145000),
    "Data Analyst": (67000, 95000),
    "Cybersecurity Specialist": (85000, 130000),
    "Systems Administrator": (70000, 105000),
    "Financial Analyst": (66000, 88000),
    "Accountant": (57400, 94600),
    "Internal Auditor": (85000, 120000),
    "Investment Analyst": (80000, 120000),
    "Sales Representative": (60000, 100000),
    "Marketing Specialist": (84000, 105000),
    "Product Manager": (100000, 140000),
    "Customer Relationship Manager": (70000, 110000),
    "HR Generalist": (55000, 85000),
    "Talent Acquisition Specialist": (66000, 95000),
    "Compensation Analyst": (75000, 110000),
    "Corporate Counsel": (115000, 170000),
    "Compliance Officer": (85000, 130000),
    "Paralegal": (50000, 85000),
    "Regulatory Affairs Specialist": (75000, 110000),
    "Manager": (95000, 140000),
    "Customer Service Representative": (45000, 65000),
    "Call Center Agent": (40000, 60000),
}

def generate_employee(employee_type, hello=None):
    if hello is None:
        hello = []
    work_locations = ['Atlanta', 'Hartford', 'St Paul']
    f_name = fake.first_name()
    l_name = fake.last_name()
    name = f"{f_name} {l_name}"
    email = f"{f_name}.{l_name}@travelers.com"
    r_num1 = random.randint(0,100)
    r_num2 = random.randint(0,1000)
    u_name = f"{f_name[0]}{l_name}{r_num1}"
    p_word = f"{f_name[0]}{l_name}@{r_num2}"
    phone_number = fake.phone_number()
    
    #Cleaning Phone number format
    phone_number = fake.phone_number()
    cleaned_phone_number = phone_number.split('x')[0].split('ext')[0].strip()
    if cleaned_phone_number.startswith('+1-'):
        cleaned_phone_number = cleaned_phone_number[3:]  # Remove +1-
    elif cleaned_phone_number.startswith('001-'):
        cleaned_phone_number = cleaned_phone_number[4:]  # Remove 001-
    cleaned_phone_number = ''.join(filter(str.isdigit, cleaned_phone_number))
    if len(cleaned_phone_number) == 10:
        formatted_phone_number = f"{cleaned_phone_number[:3]}-{cleaned_phone_number[3:6]}-{cleaned_phone_number[6:]}"
    else:
        formatted_phone_number = cleaned_phone_number
        
    #Finding Location and salary
    location = random.choice(work_locations)
    hr_jobs = ["HR Generalist","Talent Acquisition Specialist","Compensation Analyst"]
    if (employee_type == 'Manager'):
        manager_name = "Alan Schnitzer"
        job_role = 'Manager'
        role_num = 1
        if location == 'Atlanta':
            salary_range = roles_salaries_atlanta['Manager']
        elif location == 'Hartford':
            salary_range = roles_salaries_hartford['Manager']
        else:
            salary_range = roles_salaries_st_paul['Manager']
        salary = random.randint(salary_range[0], salary_range[1])
        
    elif (employee_type == 'Employee'):
        manager_name = random.choice(hello)
        role_num = 0
        job_role = random.choice(list(roles_salaries_atlanta.keys()))
        while (job_role == 'Manager' or (job_role in hr_jobs)):
            job_role = random.choice(list(roles_salaries_atlanta.keys()))
        if location == 'Atlanta':
            salary_range = roles_salaries_atlanta[job_role]
        elif location == 'Hartford':
            salary_range = roles_salaries_hartford[job_role]
        else:
            salary_range = roles_salaries_st_paul[job_role]
        salary = random.randint(salary_range[0], salary_range[1])
        
    elif (employee_type == 'HR'):
        manager_name = random.choice(hello)
        role_num = 3
        job_role = random.choice(hr_jobs)
        if location == 'Atlanta':
            salary_range = roles_salaries_atlanta[job_role]
        elif location == 'Hartford':
            salary_range = roles_salaries_hartford[job_role]
        else:
            salary_range = roles_salaries_st_paul[job_role]
        salary = random.randint(salary_range[0], salary_range[1])
        
    e = {
        "name": name,
        "phoneNumber": formatted_phone_number,
        "jobRole": job_role,
        "workLocation": location,
        "salary": salary,
        "managerId": manager_name,
        "role": role_num ,
        "email": email,
        "username": u_name,
        "password": p_word
    }
    
    return e


def generate_db(employees_num, managers_num, hr_num):
    managers = []
    employees = []
    
    ceo = {
        "name": "Alan Schnitzer",
        "phoneNumber": "123-456-7890",
        "jobRole": "Ceo",
        "workLocation": "New York",
        "salary": 21207397,
        "role": 2 ,
        "email": "Alan.Schnitzer@travelers.com",
        "username": "ASchnitzer",
        "password": "ASchnitzer@1"
    }
    employees.append(ceo)
    
    #Adding Managers
    for i in range(managers_num):
        e = generate_employee('Manager')
        managers.append(e['name'])
        employees.append(e)
    for i in range(employees_num):
        f = generate_employee('Employee', managers)
        employees.append(f)
    for i in range(hr_num):
        f = generate_employee('HR', managers)
        employees.append(f)
    print(employees)
    print(managers)
        

generate_db(3,3,1)
            
        
                
