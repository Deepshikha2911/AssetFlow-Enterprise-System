-- Placeholder SQL schema
-- Schema for AssetFlow - Allocation & Resource Management Module
-- Target: MySQL 8+ | Engine: InnoDB | Character Set: utf8mb4

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- 1. ASSET ALLOCATIONS
CREATE TABLE asset_allocations (
    allocation_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique identifier for allocation',
    asset_id INT UNSIGNED NOT NULL COMMENT 'FK to assets table',
    employee_id INT UNSIGNED NOT NULL COMMENT 'FK to employees table (the recipient)',
    allocated_by INT UNSIGNED NOT NULL COMMENT 'FK to users table (the admin/manager)',
    allocation_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Date when allocation started',
    expected_return_date DATETIME NOT NULL COMMENT 'Expected return deadline',
    actual_return_date DATETIME NULL COMMENT 'Actual date of physical return',
    allocation_status ENUM('Allocated', 'Returned', 'Overdue', 'Cancelled') NOT NULL DEFAULT 'Allocated' COMMENT 'Status of current allocation',
    remarks TEXT NULL COMMENT 'Additional details or notes',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Record creation time',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Record last update time',
    
    -- CONSTRAINT fk_alloc_asset FOREIGN KEY (asset_id) REFERENCES assets(asset_id),
    -- CONSTRAINT fk_alloc_employee FOREIGN KEY (employee_id) REFERENCES employees(employee_id),
    -- CONSTRAINT fk_alloc_user FOREIGN KEY (allocated_by) REFERENCES users(user_id),
    CONSTRAINT chk_return_date CHECK (actual_return_date IS NULL OR actual_return_date >= allocation_date)
) ENGINE=InnoDB COMMENT='Tracks current and historical asset assignments to employees';

-- Indexing for Allocation:
-- idx_asset_status: Crucial for "Only one active allocation per asset" queries.
-- idx_employee_alloc: Optimizes dashboard views for specific employee current holdings.
CREATE INDEX idx_asset_status ON asset_allocations(asset_id, allocation_status);
CREATE INDEX idx_employee_alloc ON asset_allocations(employee_id, allocation_status);

-- 2. TRANSFER REQUESTS
CREATE TABLE transfer_requests (
    transfer_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT 'Unique identifier for transfer',
    allocation_id INT UNSIGNED NOT NULL COMMENT 'FK to asset_allocations',
    asset_id INT UNSIGNED NOT NULL COMMENT 'FK to assets table',
    current_employee_id INT UNSIGNED NOT NULL COMMENT 'FK to employees (giver)',
    requested_employee_id INT UNSIGNED NOT NULL COMMENT 'FK to employees (receiver)',
    requested_by INT UNSIGNED NOT NULL COMMENT 'FK to users',
    request_reason TEXT NOT NULL COMMENT 'Reason for the transfer request',
    manager_approval ENUM('Pending', 'Approved', 'Rejected') NOT NULL DEFAULT 'Pending',
    department_approval ENUM('Pending', 'Approved', 'Rejected') NOT NULL DEFAULT 'Pending',
    request_status ENUM('Requested', 'Approved', 'Rejected', 'Completed', 'Cancelled') NOT NULL DEFAULT 'Requested',
    approved_at DATETIME NULL COMMENT 'Timestamp when final approval granted',
    completed_at DATETIME NULL COMMENT 'Timestamp when transfer finalized',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

    -- CONSTRAINT fk_trans_alloc FOREIGN KEY (allocation_id) REFERENCES asset_allocations(allocation_id),
    -- CONSTRAINT fk_trans_asset FOREIGN KEY (asset_id) REFERENCES assets(asset_id),
    -- CONSTRAINT fk_trans_curr_emp FOREIGN KEY (current_employee_id) REFERENCES employees(employee_id),
    -- CONSTRAINT fk_trans_req_emp FOREIGN KEY (requested_employee_id) REFERENCES employees(employee_id)
) ENGINE=InnoDB COMMENT='Workflows for transferring assets between employees';

CREATE INDEX idx_trans_status ON transfer_requests(request_status);
CREATE INDEX idx_trans_allocation ON transfer_requests(allocation_id);

-- 3. ASSET RETURNS
CREATE TABLE asset_returns (
    return_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    allocation_id INT UNSIGNED NOT NULL COMMENT 'FK to asset_allocations',
    asset_id INT UNSIGNED NOT NULL COMMENT 'FK to assets',
    employee_id INT UNSIGNED NOT NULL COMMENT 'FK to employees',
    returned_to INT UNSIGNED NOT NULL COMMENT 'FK to user receiving the asset',
    return_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    asset_condition ENUM('Good', 'Minor Damage', 'Major Damage') NOT NULL,
    inspection_notes TEXT NULL,
    return_status ENUM('Pending Inspection', 'Completed', 'Sent to Maintenance') NOT NULL DEFAULT 'Pending Inspection',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP

    -- CONSTRAINT fk_ret_alloc FOREIGN KEY (allocation_id) REFERENCES asset_allocations(allocation_id),
    -- CONSTRAINT fk_ret_asset FOREIGN KEY (asset_id) REFERENCES assets(asset_id),
    -- CONSTRAINT fk_ret_emp FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
) ENGINE=InnoDB COMMENT='Logging of asset return processes and condition reports';

CREATE INDEX idx_ret_status ON asset_returns(return_status);

-- 4. RESOURCE BOOKINGS
CREATE TABLE resource_bookings (
    booking_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    resource_id INT UNSIGNED NOT NULL COMMENT 'FK to resources table',
    employee_id INT UNSIGNED NOT NULL COMMENT 'FK to employees',
    booking_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    booking_purpose VARCHAR(255) NOT NULL,
    booking_status ENUM('Upcoming', 'Ongoing', 'Completed', 'Cancelled') NOT NULL DEFAULT 'Upcoming',
    remarks TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    -- CONSTRAINT fk_book_emp FOREIGN KEY (employee_id) REFERENCES employees(employee_id),
    CONSTRAINT chk_times CHECK (end_time > start_time)
) ENGINE=InnoDB COMMENT='Scheduling system for shared company resources';

-- Indexing for Bookings:
-- idx_res_date_time: Prevents double-booking by allowing quick range checks for specific resource/date.
CREATE INDEX idx_res_date_time ON resource_bookings(resource_id, booking_date, start_time, end_time);

SET FOREIGN_KEY_CHECKS = 1;