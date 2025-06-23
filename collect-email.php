<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Configuration
$csvFile = 'd2fr344g.csv';

// Function to validate email
function validateEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

// Function to get client IP
function getClientIP() {
    $ipKeys = ['HTTP_CLIENT_IP', 'HTTP_X_FORWARDED_FOR', 'REMOTE_ADDR'];
    foreach ($ipKeys as $key) {
        if (array_key_exists($key, $_SERVER) === true) {
            foreach (explode(',', $_SERVER[$key]) as $ip) {
                $ip = trim($ip);
                if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE) !== false) {
                    return $ip;
                }
            }
        }
    }
    return $_SERVER['REMOTE_ADDR'] ?? 'Unknown';
}

// Function to initialize CSV file
function initializeCSVFile($filename) {
    if (!file_exists($filename)) {
        $headers = ['Email Address', 'Submission Date', 'IP Address', 'Name'];
        $file = fopen($filename, 'w');
        if ($file) {
            fputcsv($file, $headers);
            fclose($file);
            return true;
        }
        return false;
    }
    return false;
}

// Function to check if email already exists
function emailExists($filename, $email) {
    if (!file_exists($filename)) {
        return false;
    }
    
    $file = fopen($filename, 'r');
    if (!$file) {
        return false;
    }
    
    // Skip header row
    fgetcsv($file);
    
    while (($row = fgetcsv($file)) !== false) {
        if (isset($row[0]) && strtolower(trim($row[0])) === strtolower(trim($email))) {
            fclose($file);
            return true;
        }
    }
    
    fclose($file);
    return false;
}

// Function to add email to CSV
function addEmailToCSV($filename, $email, $timestamp, $ip, $name) {
    try {
        // Initialize file if it doesn't exist
        initializeCSVFile($filename);
        
        $file = fopen($filename, 'a');
        if (!$file) {
            return ['success' => false, 'error' => 'Cannot open file for writing'];
        }
        
        $data = [$email, $timestamp, $ip, $name];
        $result = fputcsv($file, $data);
        fclose($file);
        
        if ($result === false) {
            return ['success' => false, 'error' => 'Failed to write to file'];
        }
        
        return ['success' => true];
    } catch (Exception $e) {
        error_log("Error adding email to CSV: " . $e->getMessage());
        return ['success' => false, 'error' => 'Failed to save email'];
    }
}

// Function to convert CSV to Excel format (basic)
function convertCSVToExcel($csvFile, $excelFile) {
    if (!file_exists($csvFile)) {
        return false;
    }
    
    // Read CSV data
    $csvData = [];
    $file = fopen($csvFile, 'r');
    if ($file) {
        while (($row = fgetcsv($file)) !== false) {
            $csvData[] = $row;
        }
        fclose($file);
    }
    
    // Create basic Excel XML format
    $excelContent = '<?xml version="1.0"?>' . "\n";
    $excelContent .= '<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"' . "\n";
    $excelContent .= ' xmlns:o="urn:schemas-microsoft-com:office:office"' . "\n";
    $excelContent .= ' xmlns:x="urn:schemas-microsoft-com:office:excel"' . "\n";
    $excelContent .= ' xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"' . "\n";
    $excelContent .= ' xmlns:html="http://www.w3.org/TR/REC-html40">' . "\n";
    $excelContent .= '<Worksheet ss:Name="Email Addresses">' . "\n";
    $excelContent .= '<Table>' . "\n";
    
    foreach ($csvData as $rowIndex => $row) {
        $excelContent .= '<Row>' . "\n";
        foreach ($row as $cell) {
            $cellValue = htmlspecialchars($cell, ENT_QUOTES);
            if ($rowIndex === 0) {
                // Header row
                $excelContent .= '<Cell><Data ss:Type="String"><B>' . $cellValue . '</B></Data></Cell>' . "\n";
            } else {
                $excelContent .= '<Cell><Data ss:Type="String">' . $cellValue . '</Data></Cell>' . "\n";
            }
        }
        $excelContent .= '</Row>' . "\n";
    }
    
    $excelContent .= '</Table>' . "\n";
    $excelContent .= '</Worksheet>' . "\n";
    $excelContent .= '</Workbook>' . "\n";
    
    return file_put_contents($excelFile, $excelContent) !== false;
}

// Main logic
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get JSON input
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid JSON data']);
        exit;
    }
    
    $email = trim($input['email'] ?? '');
    $timestamp = $input['timestamp'] ?? date('Y-m-d H:i:s');
    $clientIP = getClientIP();
    $name = $input['name'] ?? '';
    
    // Validate input
    if (empty($email)) {
        http_response_code(400);
        echo json_encode(['error' => 'Email is required']);
        exit;
    }
    
    if (!validateEmail($email)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid email format']);
        exit;
    }
    
    // Check if email already exists
    if (emailExists($csvFile, $email)) {
        http_response_code(409);
        echo json_encode(['error' => 'This email is already registered']);
        exit;
    }
    
    // Add email to CSV
    $result = addEmailToCSV($csvFile, $email, $timestamp, $clientIP, $name);
    
    if ($result['success']) {
        // Also create/update Excel version
        convertCSVToExcel($csvFile, 'email_addresses_d2fr344g.xls');
        
        echo json_encode([
            'message' => 'Email collected successfully',
            'email' => $email
        ]);
        error_log("New email collected: $email");
    } else {
        http_response_code(500);
        echo json_encode(['error' => $result['error']]);
    }
        
    
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}