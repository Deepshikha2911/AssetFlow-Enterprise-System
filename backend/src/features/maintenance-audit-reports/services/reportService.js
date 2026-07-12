const reportRepository = require('../repositories/reportRepository');

class ReportService {
    async getAllRequests() {
        // Fetch all maintenance requests from the repository
        return await reportRepository.getAllRequests();
    }

    async createRequest(requestData) {
        // Validate required fields based on the database schema
        if (!requestData.asset_id || !requestData.requested_by || !requestData.issue_description) {
            throw new Error('Missing required fields: asset_id, requested_by, issue_description');
        }
        
        // Pass data to repository for insertion
        const insertId = await reportRepository.createRequest(requestData);
        return { message: 'Maintenance request created successfully', request_id: insertId };
    }
}

module.exports = new ReportService();
