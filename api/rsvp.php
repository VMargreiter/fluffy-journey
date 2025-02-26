<?php
// api/rsvp.php

// Set headers for JSON response
header('Content-Type: application/json');

// Enable error reporting for development (remove in production)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database configuration
$dbConfig = [
    'host' => 'ho7w.your-database.de',
    'database' => 'jazzya_db1',
    'username' => 'jazzya_1',
    'password' => 'VhRNJjx3efMJTZxy'
];

// Function to create database tables if they don't exist
function initializeDatabase($conn) {
    $sql = "CREATE TABLE IF NOT EXISTS wedding_rsvps (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        attending BOOLEAN NOT NULL,
        guest_count INT,
        dietary_restrictions TEXT,
        message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )";
    
    if (!$conn->query($sql)) {
        throw new Exception("Error creating table: " . $conn->error);
    }
}

// Main logic
try {
    // Only allow POST method
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Method not allowed']);
        exit;
    }
    
    // Get JSON input
    $input = json_decode(file_get_contents('php://input'), true);
    
    // Validate input
    if (!$input || !isset($input['name']) || !isset($input['email']) || !isset($input['attending'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Invalid input data']);
        exit;
    }
    
    // Sanitize and extract data
    $name = htmlspecialchars(trim($input['name']));
    $email = filter_var(trim($input['email']), FILTER_SANITIZE_EMAIL);
    $attending = (bool) $input['attending'];
    $guestCount = $attending ? max(1, min(5, (int) ($input['guestCount'] ?? 1))) : 0;
    $dietaryRestrictions = $attending ? htmlspecialchars(trim($input['dietaryRestrictions'] ?? '')) : '';
    $message = htmlspecialchars(trim($input['message'] ?? ''));
    
    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Invalid email address']);
        exit;
    }
    
    // Connect to database
    $conn = new mysqli($dbConfig['host'], $dbConfig['username'], $dbConfig['password'], $dbConfig['database']);
    
    // Check connection
    if ($conn->connect_error) {
        throw new Exception("Connection failed: " . $conn->connect_error);
    }
    
    // Initialize database tables if needed
    initializeDatabase($conn);
    
    // Prepare SQL statement
    $stmt = $conn->prepare("INSERT INTO wedding_rsvps (name, email, attending, guest_count, dietary_restrictions, message) VALUES (?, ?, ?, ?, ?, ?)");
    
    if (!$stmt) {
        throw new Exception("Prepare failed: " . $conn->error);
    }
    
    // Bind parameters
    $stmt->bind_param("ssisss", $name, $email, $attending, $guestCount, $dietaryRestrictions, $message);
    
    // Execute statement
    if (!$stmt->execute()) {
        throw new Exception("Execute failed: " . $stmt->error);
    }
    
    // Close statement and connection
    $stmt->close();
    $conn->close();
    
    // Return success response
    echo json_encode([
        'success' => true,
        'message' => 'RSVP submitted successfully',
        'data' => [
            'name' => $name,
            'attending' => $attending
        ]
    ]);
    
} catch (Exception $e) {
    // Log error (in a production environment, use a proper logging system)
    error_log("RSVP Error: " . $e->getMessage());
    
    // Return error response
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Server error occurred. Please try again later.'
    ]);
}
