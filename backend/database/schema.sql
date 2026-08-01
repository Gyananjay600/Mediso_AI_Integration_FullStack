-- ===========================================================
-- Mediso Healthcare Platform - MySQL Schema
-- ===========================================================
CREATE DATABASE IF NOT EXISTS mediso_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE mediso_db;

-- ---------------------------------------------------------
-- Users (patients who register / log in)
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
  id CHAR(36) PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(190) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ---------------------------------------------------------
-- Contact form submissions (from the Contact page)
-- AI triage fields are populated automatically by the AI service
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS contact_submissions (
  id CHAR(36) PRIMARY KEY,
  user_id CHAR(36) NULL,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(190) NOT NULL,
  subject VARCHAR(120) NOT NULL,
  message TEXT NOT NULL,
  ai_priority ENUM('low','medium','high','emergency') NULL,
  ai_summary VARCHAR(500) NULL,
  ai_suggested_department VARCHAR(120) NULL,
  status ENUM('new','in_progress','resolved') NOT NULL DEFAULT 'new',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_contact_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_contact_priority (ai_priority),
  INDEX idx_contact_status (status)
) ENGINE=InnoDB;

-- ---------------------------------------------------------
-- Newsletter subscribers (from the Footer form)
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id CHAR(36) PRIMARY KEY,
  email VARCHAR(190) NOT NULL UNIQUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ---------------------------------------------------------
-- Career applications (from the CareerDetail "Apply for this Role" form)
-- AI fields help staff triage/rank applicants quickly
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS career_applications (
  id CHAR(36) PRIMARY KEY,
  job_slug VARCHAR(150) NOT NULL,
  job_title VARCHAR(200) NOT NULL,
  name VARCHAR(150) NOT NULL,
  email VARCHAR(190) NOT NULL,
  phone VARCHAR(40) NULL,
  message TEXT NOT NULL,
  ai_summary VARCHAR(500) NULL,
  ai_fit_score TINYINT NULL,
  ai_highlights JSON NULL,
  status ENUM('received','screening','interview','rejected','hired') NOT NULL DEFAULT 'received',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_career_slug (job_slug),
  INDEX idx_career_status (status)
) ENGINE=InnoDB;

-- ---------------------------------------------------------
-- AI Health Assistant chat logs (from the floating chat widget)
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS ai_chat_sessions (
  id CHAR(36) PRIMARY KEY,
  user_id CHAR(36) NULL,
  started_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_session_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS ai_chat_messages (
  id CHAR(36) PRIMARY KEY,
  session_id CHAR(36) NOT NULL,
  role ENUM('user','assistant') NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_message_session FOREIGN KEY (session_id) REFERENCES ai_chat_sessions(id) ON DELETE CASCADE,
  INDEX idx_message_session (session_id)
) ENGINE=InnoDB;
