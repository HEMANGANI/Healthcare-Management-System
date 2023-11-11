export const patientsData = [
    {
      "id": 1,
      "name": "John Doe",
      "dateOfBirth": "1985-07-12",
      "gender": "Male",
      "contact": "555-123-4567",
      "emergencyContact": {
        "name": "Jane Doe",
        "relationship": "Spouse",
        "contact": "555-987-6543"
      },
      "ssn": "123-45-6789",
      "insurance": {
        "provider": "BlueCross BlueShield",
        "policyNumber": "BCBS12345"
      },
      "medicalHistory": {
        "allergies": ["Penicillin", "Peanuts"],
        "chronicConditions": ["Hypertension"],
        "surgeries": ["Appendectomy"]
      },
      "medications": [
        {
          "name": "Lisinopril",
          "dosage": "10mg",
          "frequency": "Once daily"
        },
        {
          "name": "Aspirin",
          "dosage": "81mg",
          "frequency": "Once daily"
        }
      ],
      "vaccinations": [
        {
          "name": "Flu Shot",
          "date": "2022-09-25"
        },
        {
          "name": "Tetanus Booster",
          "date": "2021-05-10"
        }
      ],
      "primaryCarePhysician": {
        "name": "Dr. Sarah Johnson",
        "contact": "555-555-5555"
      },
      "appointments": [
        {
          "date": "2023-11-15",
          "purpose": "Follow-up Checkup",
          "attendingPhysician": "Dr. Sarah Johnson"
        }
      ],
      "prescriptions": [
        {
          "name": "Metformin",
          "dosage": "500mg",
          "instructions": "Take with meals"
        }
      ],
      "billing": {
        "invoices": [
          {
            "invoiceNumber": "INV12345",
            "amount": 150.00,
            "status": "Paid"
          }
        ],
        "insuranceClaims": [
          {
            "claimNumber": "CLM98765",
            "amount": 100.00,
            "status": "Approved"
          }
        ]
      }
    },
    {
      "id": 2,
      "name": "Jane Smith",
      "dateOfBirth": "1979-02-28",
      "gender": "Female",
      "contact": "555-555-5555",
      "emergencyContact": {
        "name": "Michael Smith",
        "relationship": "Brother",
        "contact": "555-987-6543"
      },
      "ssn": "234-56-7890",
      "insurance": {
        "provider": "Aetna",
        "policyNumber": "AET12345"
      },
      "medicalHistory": {
        "allergies": ["None"],
        "chronicConditions": ["Asthma"],
        "surgeries": ["Knee Replacement"]
      },
      "medications": [
        {
          "name": "Albuterol",
          "dosage": "90mcg",
          "frequency": "As needed"
        },
        {
          "name": "Advair",
          "dosage": "250/50",
          "frequency": "Twice daily"
        }
      ],
      "vaccinations": [
        {
          "name": "COVID-19 Vaccine",
          "date": "2021-06-15"
        }
      ],
      "primaryCarePhysician": {
        "name": "Dr. Mark Davis",
        "contact": "555-555-5555"
      },
      "appointments": [
        {
          "date": "2023-11-20",
          "purpose": "Annual Physical",
          "attendingPhysician": "Dr. Mark Davis"
        }
      ],
      "prescriptions": [
        {
          "name": "Lisinopril",
          "dosage": "10mg",
          "instructions": "Take with meals"
        }
      ],
      "billing": {
        "invoices": [
          {
            "invoiceNumber": "INV23456",
            "amount": 200.00,
            "status": "Paid"
          }
        ],
        "insuranceClaims": [
          {
            "claimNumber": "CLM12345",
            "amount": 150.00,
            "status": "Approved"
          }
        ]
      }
    },
    {
      "id": 3,
      "name": "David Johnson",
      "dateOfBirth": "1990-10-05",
      "gender": "Male",
      "contact": "555-888-9999",
      "emergencyContact": {
        "name": "Mary Johnson",
        "relationship": "Mother",
        "contact": "555-777-6666"
      },
      "ssn": "345-67-8901",
      "insurance": {
        "provider": "Cigna",
        "policyNumber": "CIG12345"
      },
      "medicalHistory": {
        "allergies": ["Pollen", "Penicillin"],
        "chronicConditions": ["Diabetes", "High Cholesterol"],
        "surgeries": ["Appendectomy"]
      },
      "medications": [
        {
          "name": "Metformin",
          "dosage": "1000mg",
          "frequency": "Twice daily"
        },
        {
          "name": "Lipitor",
          "dosage": "40mg",
          "frequency": "Once daily"
        }
      ],
      "vaccinations": [
        {
          "name": "Hepatitis B Vaccine",
          "date": "2023-02-15"
        },
        {
          "name": "Pneumococcal Vaccine",
          "date": "2022-09-30"
        }
      ],
      "primaryCarePhysician": {
        "name": "Dr. Laura Martinez",
        "contact": "555-555-5555"
      },
      "appointments": [
        {
          "date": "2023-11-25",
          "purpose": "Follow-up Checkup",
          "attendingPhysician": "Dr. Laura Martinez"
        }
      ],
      "prescriptions": [
        {
          "name": "Aspirin",
          "dosage": "81mg",
          "instructions": "Take with meals"
        }
      ],
      "billing": {
        "invoices": [
          {
            "invoiceNumber": "INV34567",
            "amount": 300.00,
            "status": "Paid"
          }
        ],
        "insuranceClaims": [
          {
            "claimNumber": "CLM23456",
            "amount": 250.00,
            "status": "Approved"
          }
        ]
      }
    },
    {
      "id": 4,
      "name": "Lisa Davis",
      "dateOfBirth": "1982-04-18",
      "gender": "Female",
      "contact": "555-333-4444",
      "emergencyContact": {
        "name": "Paul Davis",
        "relationship": "Husband",
        "contact": "555-222-1111"
      },
      "ssn": "456-78-9012",
      "insurance": {
        "provider": "UnitedHealthcare",
        "policyNumber": "UHC12345"
      },
      "medicalHistory": {
        "allergies": ["Shellfish"],
        "chronicConditions": ["Asthma", "Migraines"],
        "surgeries": ["C-Section"]
      },
      "medications": [
        {
          "name": "Ventolin",
          "dosage": "90mcg",
          "frequency": "As needed"
        },
        {
          "name": "Sumatriptan",
          "dosage": "50mg",
          "frequency": "As needed for migraines"
        }
      ],
      "vaccinations": [
        {
          "name": "MMR Vaccine",
          "date": "2022-03-10"
        }
      ],
      "primaryCarePhysician": {
        "name": "Dr. James Wilson",
        "contact": "555-555-5555"
      },
      "appointments": [
        {
          "date": "2023-12-02",
          "purpose": "Annual Checkup",
          "attendingPhysician": "Dr. James Wilson"
        }
      ],
      "prescriptions": [
        {
          "name": "Nexium",
          "dosage": "20mg",
          "instructions": "Take before meals"
        }
      ],
      "billing": {
        "invoices": [
          {
            "invoiceNumber": "INV45678",
            "amount": 150.00,
            "status": "Paid"
          }
        ],
        "insuranceClaims": [
          {
            "claimNumber": "CLM34567",
            "amount": 100.00,
            "status": "Approved"
          }
        ]
      }
    },
    {
      "id": 5,
      "name": "Sarah Williams",
      "dateOfBirth": "1998-09-20",
      "gender": "Female",
      "contact": "555-777-2222",
      "emergencyContact": {
        "name": "Michael Williams",
        "relationship": "Father",
        "contact": "555-999-3333"
      },
      "ssn": "567-89-0123",
      "insurance": {
        "provider": "Humana",
        "policyNumber": "HUM12345"
      },
      "medicalHistory": {
        "allergies": ["None"],
        "chronicConditions": ["Anxiety", "Depression"],
        "surgeries": ["None"]
      },
      "medications": [
        {
          "name": "Lexapro",
          "dosage": "10mg",
          "frequency": "Once daily"
        },
        {
          "name": "Xanax",
          "dosage": "0.5mg",
          "frequency": "As needed for anxiety"
        }
      ],
      "vaccinations": [
        {
          "name": "Influenza Vaccine",
          "date": "2022-10-05"
        }
      ],
      "primaryCarePhysician": {
        "name": "Dr. Emily Rodriguez",
        "contact": "555-555-5555"
      },
      "appointments": [
        {
          "date": "2023-11-28",
          "purpose": "Mental Health Checkup",
          "attendingPhysician": "Dr. Emily Rodriguez"
        }
      ],
      "prescriptions": [
        {
          "name": "Ambien",
          "dosage": "10mg",
          "instructions": "Take at bedtime"
        }
      ],
      "billing": {
        "invoices": [
          {
            "invoiceNumber": "INV56789",
            "amount": 75.00,
            "status": "Paid"
          }
        ],
        "insuranceClaims": [
          {
            "claimNumber": "CLM45678",
            "amount": 50.00,
            "status": "Approved"
          }
        ]
      }
    },
    {
      "id": 6,
      "name": "Michael Brown",
      "dateOfBirth": "1975-03-15",
      "gender": "Male",
      "contact": "555-555-8888",
      "emergencyContact": {
        "name": "Lisa Brown",
        "relationship": "Wife",
        "contact": "555-555-7777"
      },
      "ssn": "678-90-1234",
      "insurance": {
        "provider": "Kaiser Permanente",
        "policyNumber": "KP12345"
      },
      "medicalHistory": {
        "allergies": ["Pollen"],
        "chronicConditions": ["Diabetes", "High Blood Pressure"],
        "surgeries": ["Gallbladder Removal"]
      },
      "medications": [
        {
          "name": "Metformin",
          "dosage": "1000mg",
          "frequency": "Twice daily"
        },
        {
          "name": "Lisinopril",
          "dosage": "20mg",
          "frequency": "Once daily"
        }
      ],
      "vaccinations": [
        {
          "name": "Shingles Vaccine",
          "date": "2022-07-18"
        }
      ],
      "primaryCarePhysician": {
        "name": "Dr. Michael Thompson",
        "contact": "555-555-5555"
      },
      "appointments": [
        {
          "date": "2023-12-05",
          "purpose": "Diabetes Management",
          "attendingPhysician": "Dr. Michael Thompson"
        }
      ],
      "prescriptions": [
        {
          "name": "Simvastatin",
          "dosage": "40mg",
          "instructions": "Take in the evening"
        }
      ],
      "billing": {
        "invoices": [
          {
            "invoiceNumber": "INV67890",
            "amount": 120.00,
            "status": "Paid"
          }
        ],
        "insuranceClaims": [
          {
            "claimNumber": "CLM56789",
            "amount": 80.00,
            "status": "Approved"
          }
        ]
      }
    }
  ]
  