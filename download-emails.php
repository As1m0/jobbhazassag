<?php
// Optional: Add basic authentication for admin access
// Uncomment the lines below to enable password protection

$username = 'admin';
$password = 'agazga';

if (!isset($_SERVER['PHP_AUTH_USER']) || 
    $_SERVER['PHP_AUTH_USER'] !== $username || 
    $_SERVER['PHP_AUTH_PW'] !== $password) {
    header('WWW-Authenticate: Basic realm="Email Download"');
    header('HTTP/1.0 401 Unauthorized');
    echo 'Authentication required';
    exit;
}


// Configuration
$csvFile = 'email_addresses.csv';
$excelFile = 'email_addresses.xls';

// Function to convert CSV to Excel and download
function downloadAsExcel($csvFile, $excelFile) {
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
    
    // Create Excel XML format
    $excelContent = '<?xml version="1.0"?>' . "\n";
    $excelContent .= '<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"' . "\n";
    $excelContent .= ' xmlns:o="urn:schemas-microsoft-com:office:office"' . "\n";
    $excelContent .= ' xmlns:x="urn:schemas-microsoft-com:office:excel"' . "\n";
    $excelContent .= ' xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"' . "\n";
    $excelContent .= ' xmlns:html="http://www.w3.org/TR/REC-html40">' . "\n";
    
    $excelContent .= '<DocumentProperties xmlns="urn:schemas-microsoft-com:office:office">' . "\n";
    $excelContent .= '<Created>' . date('Y-m-d\TH:i:s\Z') . '</Created>' . "\n";
    $excelContent .= '</DocumentProperties>' . "\n";
    
    $excelContent .= '<Styles>' . "\n";
    $excelContent .= '<Style ss:ID="Header">' . "\n";
    $excelContent .= '<Font ss:Bold="1"/>' . "\n";
    $excelContent .= '<Interior ss:Color="#CCE5FF" ss:Pattern="Solid"/>' . "\n";
    $excelContent .= '</Style>' . "\n";
    $excelContent .= '</Styles>' . "\n";
    
    $excelContent .= '<Worksheet ss:Name="Email Addresses">' . "\n";
    $excelContent .= '<Table>' . "\n";
    
    foreach ($csvData as $rowIndex => $row) {
        $excelContent .= '<Row>' . "\n";
        foreach ($row as $cell) {
            $cellValue = htmlspecialchars($cell, ENT_QUOTES);
            if ($rowIndex === 0) {
                // Header row with styling
                $excelContent .= '<Cell ss:StyleID="Header"><Data ss:Type="String">' . $cellValue . '</Data></Cell>' . "\n";
            } else {
                // Detect if it's an email, date, or IP
                if (filter_var($cell, FILTER_VALIDATE_EMAIL)) {
                    $excelContent .= '<Cell><Data ss:Type="String">' . $cellValue . '</Data></Cell>' . "\n";
                } elseif (strtotime($cell)) {
                    $excelContent .= '<Cell><Data ss:Type="DateTime">' . date('Y-m-d\TH:i:s', strtotime($cell)) . '</Data></Cell>' . "\n";
                } else {
                    $excelContent .= '<Cell><Data ss:Type="String">' . $cellValue . '</Data></Cell>' . "\n";
                }
            }
        }
        $excelContent .= '</Row>' . "\n";
    }
    
    $excelContent .= '</Table>' . "\n";
    $excelContent .= '</Worksheet>' . "\n";
    $excelContent .= '</Workbook>' . "\n";
    
    // Save to file
    file_put_contents($excelFile, $excelContent);
    
    return true;
}

// Main logic
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (!file_exists($csvFile)) {
        http_response_code(404);
        echo json_encode(['error' => 'No email data found']);
        exit;
    }
    
    try {
        // Convert CSV to Excel format
        if (downloadAsExcel($csvFile, $excelFile)) {
            // Set headers for Excel download
            header('Content-Type: application/vnd.ms-excel');
            header('Content-Disposition: attachment; filename="email_addresses_' . date('Y-m-d') . '.xls"');
            header('Content-Length: ' . filesize($excelFile));
            header('Cache-Control: must-revalidate');
            header('Pragma: public');
            
            // Output file
            readfile($excelFile);
            
            // Clean up temporary file
            unlink($excelFile);
            exit;
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to create Excel file']);
        }
    } catch (Exception $e) {
        error_log("Error downloading file: " . $e->getMessage());
        http_response_code(500);
        echo json_encode(['error' => 'Failed to download file']);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}