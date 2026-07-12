CREATE TABLE Maintenance_Requests (
    request_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    asset_id BIGINT NOT NULL,
    requested_by BIGINT NOT NULL,
    issue_description TEXT NOT NULL,
    priority_level ENUM('Low', 'Medium', 'High', 'Critical') DEFAULT 'Medium',
    photo_url VARCHAR(255) NULL,
    status ENUM('Pending', 'Approved', 'Rejected', 'Assigned', 'In Progress', 'Resolved') DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    -- Foreign key to Assets table; RESTRICT prevents accidental deletion of assets with historical/active maintenance records
    CONSTRAINT fk_maintenance_asset FOREIGN KEY (asset_id) REFERENCES Assets(asset_id) ON DELETE RESTRICT,
    
    -- Foreign key to Users/Employees table; RESTRICT ensures user records are not deleted if tied to requests
    CONSTRAINT fk_maintenance_user FOREIGN KEY (requested_by) REFERENCES Users(user_id) ON DELETE RESTRICT,

    -- Index on asset_id for rapid retrieval of a specific asset's maintenance history
    INDEX idx_asset (asset_id),
    
    -- Index on status to optimize dashboard queries filtering active workflows (e.g., 'Pending' or 'In Progress')
    INDEX idx_status (status),
    
    -- Index on priority_level to accelerate queries for critical/high priority KPI tracking
    INDEX idx_priority (priority_level)
);
