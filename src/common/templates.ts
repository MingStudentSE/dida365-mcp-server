export const successAuthHtml = `
<html>
<head>
    <title>TickTick MCP Server - Authentication Successful</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --success-color: #4CAF50;
            --error-color: #f44336;
            --accent-color: #2979ff;
            --text-primary: #333333;
            --text-secondary: #666666;
            --background-light: #ffffff;
            --background-box: #f9f9f9;
            --border-color: #e0e0e0;
            --shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            line-height: 1.6;
            max-width: 600px;
            margin: 0 auto;
            padding: 40px 20px;
            text-align: center;
            color: var(--text-primary);
            background-color: var(--background-light);
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            justify-content: center;
        }
        
        .container {
            animation: fadeIn 0.5s ease-in-out;
        }
        
        h1 {
            font-weight: 700;
            font-size: 28px;
            margin-bottom: 16px;
            color: var(--success-color);
        }
        
        .icon {
            font-size: 64px;
            margin-bottom: 24px;
        }
        
        .box {
            border: 1px solid var(--border-color);
            border-radius: 12px;
            padding: 32px;
            margin-top: 24px;
            background-color: var(--background-box);
            box-shadow: var(--shadow);
            transition: transform 0.3s ease;
        }
        
        .box:hover {
            transform: translateY(-3px);
        }
        
        p {
            color: var(--text-secondary);
            margin-bottom: 16px;
            font-size: 16px;
        }
        
        .button {
            display: inline-block;
            margin-top: 16px;
            padding: 12px 24px;
            background-color: var(--accent-color);
            color: white;
            border-radius: 6px;
            text-decoration: none;
            font-weight: 600;
            transition: background-color 0.3s ease, transform 0.2s ease;
            border: none;
            cursor: pointer;
        }
        
        .button:hover {
            background-color: #1565c0;
            transform: translateY(-2px);
        }
        
        footer {
            margin-top: 40px;
            font-size: 14px;
            color: var(--text-secondary);
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @media (max-width: 480px) {
            .box {
                padding: 24px 16px;
            }
            
            h1 {
                font-size: 24px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="icon">✅</div>
        <h1>Authentication Successful!</h1>
        <div class="box">
            <p>You have successfully authenticated with TickTick.</p>
            <p>Your account is now connected and ready to use.</p>
            <button class="button" onclick="window.close()">Close Window</button>
        </div>
        <footer>
            <p>TickTick MCP Server &copy; ${new Date().getFullYear()}</p>
        </footer>
    </div>
    <script>
        // Auto-close window after 5 seconds
        setTimeout(() => {
            window.close();
        }, 5000);
    </script>
</body>
</html>
`;

export const errorAuthHtml = `
<html>
<head>
    <title>TickTick MCP Server - Authentication Failed</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --success-color: #4CAF50;
            --error-color: #f44336;
            --accent-color: #2979ff;
            --text-primary: #333333;
            --text-secondary: #666666;
            --background-light: #ffffff;
            --background-box: #f9f9f9;
            --border-color: #e0e0e0;
            --shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            line-height: 1.6;
            max-width: 600px;
            margin: 0 auto;
            padding: 40px 20px;
            text-align: center;
            color: var(--text-primary);
            background-color: var(--background-light);
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            justify-content: center;
        }
        
        .container {
            animation: fadeIn 0.5s ease-in-out;
        }
        
        h1 {
            font-weight: 700;
            font-size: 28px;
            margin-bottom: 16px;
            color: var(--error-color);
        }
        
        .icon {
            font-size: 64px;
            margin-bottom: 24px;
        }
        
        .box {
            border: 1px solid var(--border-color);
            border-radius: 12px;
            padding: 32px;
            margin-top: 24px;
            background-color: var(--background-box);
            box-shadow: var(--shadow);
        }
        
        p {
            color: var(--text-secondary);
            margin-bottom: 16px;
            font-size: 16px;
        }
        
        .error-details {
            background-color: rgba(244, 67, 54, 0.08);
            border-radius: 6px;
            padding: 16px;
            margin: 16px 0;
            text-align: left;
            font-family: monospace;
            font-size: 14px;
            color: var(--error-color);
            display: none;
        }
        
        .error-details.show {
            display: block;
        }
        
        .button-group {
            margin-top: 24px;
            display: flex;
            flex-direction: column;
            gap: 12px;
            align-items: center;
        }
        
        .button {
            display: inline-block;
            padding: 12px 24px;
            background-color: var(--accent-color);
            color: white;
            border-radius: 6px;
            text-decoration: none;
            font-weight: 600;
            transition: background-color 0.3s ease, transform 0.2s ease;
            border: none;
            cursor: pointer;
            width: 100%;
            max-width: 200px;
        }
        
        .button:hover {
            background-color: #1565c0;
            transform: translateY(-2px);
        }
        
        .button.secondary {
            background-color: transparent;
            color: var(--accent-color);
            border: 1px solid var(--accent-color);
        }
        
        .button.secondary:hover {
            background-color: rgba(41, 121, 255, 0.08);
        }
        
        footer {
            margin-top: 40px;
            font-size: 14px;
            color: var(--text-secondary);
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @media (max-width: 480px) {
            .box {
                padding: 24px 16px;
            }
            
            h1 {
                font-size: 24px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="icon">❌</div>
        <h1>Authentication Failed</h1>
        <div class="box">
            <p>Failed to receive authorization code from TickTick.</p>
            <p>This might be due to a timeout or permission denial.</p>
            
            <div class="button-group">
                <a href="#" class="button" onclick="retryAuth()">Try Again</a>
                <button class="button secondary" onclick="toggleDetails()">Show Details</button>
            </div>
            
            <div id="errorDetails" class="error-details">
                <span id="errorMessage">Error connecting to TickTick authorization server. Please check your internet connection and try again.</span>
            </div>
        </div>
        <footer>
            <p>Need help? Check the <a href="#" style="color: var(--accent-color);">documentation</a> or <a href="#" style="color: var(--accent-color);">contact support</a>.</p>
            <p>TickTick MCP Server &copy; ${new Date().getFullYear()}</p>
        </footer>
    </div>

    <script>
        function toggleDetails() {
            const details = document.getElementById('errorDetails');
            details.classList.toggle('show');
            const button = document.querySelector('.button.secondary');
            button.textContent = details.classList.contains('show') ? 'Hide Details' : 'Show Details';
        }
        
        function retryAuth() {
            // This function would be connected to your authentication flow
            window.location.href = window.location.href.split('?')[0];
        }
        
        // You can update this with the actual error message from your server
        function updateErrorMessage(message) {
            if (message) {
                document.getElementById('errorMessage').textContent = message;
            }
        }
        
        // Parse URL parameters to extract error message if present
        const urlParams = new URLSearchParams(window.location.search);
        const errorMsg = urlParams.get('error');
        if (errorMsg) {
            updateErrorMessage(decodeURIComponent(errorMsg));
            document.getElementById('errorDetails').classList.add('show');
        }
    </script>
</body>
</html>
`;
