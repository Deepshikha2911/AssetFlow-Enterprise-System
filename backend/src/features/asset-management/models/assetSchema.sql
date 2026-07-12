CREATE TABLE IF NOT EXISTS assets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  asset_tag VARCHAR(20) NOT NULL UNIQUE,
  asset_name VARCHAR(150) NOT NULL,
  category VARCHAR(100) NOT NULL,
  serial_number VARCHAR(100) NOT NULL UNIQUE,
  acquisition_date DATE NOT NULL,
  acquisition_cost DECIMAL(12,2) NOT NULL DEFAULT 0.00,
  asset_condition VARCHAR(50) NOT NULL,
  location VARCHAR(150) NOT NULL,
  bookable BOOLEAN NOT NULL DEFAULT FALSE,
  asset_photo VARCHAR(255) NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'Available',
  deleted_at DATETIME NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_assets_status (status),
  INDEX idx_assets_category (category),
  INDEX idx_assets_location (location)
);

CREATE TABLE IF NOT EXISTS asset_history (
  id INT AUTO_INCREMENT PRIMARY KEY,
  asset_id INT NOT NULL,
  module_name VARCHAR(100) NOT NULL,
  action VARCHAR(100) NOT NULL,
  details TEXT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (asset_id) REFERENCES assets(id) ON DELETE CASCADE
);
