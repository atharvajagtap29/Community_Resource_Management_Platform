# ERP Simulation Project Overview

This project is a simulation of an ERP software system that I built primarily to strengthen my hands-on experience with:

- **Designing complex relational database structures** using PostgreSQL.
- **Leveraging an ORM tool** for effective database interaction.
- **Building a full-stack solution** with a modern, maintainable architecture.
- **Exploring new frontend technologies** like the **Mantine UI CSS framework**.
- **Implementing complex state management** using React’s `useReducer` hook.

---

## Core Technologies Used

- **Backend:** Node.js with Express.js
- **Frontend:** React.js with Mantine UI and useReducer
- **Database:** PostgreSQL (Planned migration to AWS RDS)
- **ORM Tool:** Sequelize

---

## AWS Cloud Architecture & Deployment Goals

The main focus of this project was to perform a **production-grade deployment** adhering to **AWS Well-Architected Framework**, specifically following the architecture outlined [in this AWS VPC example](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-example-private-subnets-nat.html).

### AWS Architecture Design (1 Region, 2 AZs)

- **Public & Private Subnets** in each Availability Zone (AZ)
- **Application Load Balancer (ALB)** for traffic distribution and load balancing
- **Auto Scaling Group (ASG)** for scalability and resilience
- **NAT Gateway** for secure internet access from private subnets
- **Bastion Host** for SSH access to private servers
- **CDN (CloudFront)** for caching and performance optimization

---

## System Design Goals on AWS

- **High Availability** through Multi-AZ deployment and ASG
- **Security** using private subnets, security groups, and IAM roles
- **Caching** with CloudFront for frontend content and API optimization
- **Load Balancing** using ALB for request routing and fault tolerance
- **Scalability** through Auto Scaling based on demand
- **API Rate Limiting** using AWS WAF integrated with CloudFront

---

## Summary

This project is a comprehensive exploration of **system design principles**, **cloud-native deployments**, and **full-stack development**. It not only simulates ERP-level complexity in terms of database and application architecture but also aligns with **best practices for deploying modern web applications on AWS Cloud**.
