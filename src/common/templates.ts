export const successAuthHtml = (accessToken: string) => `
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

        .token-section {
            margin-top: 24px;
            padding-top: 20px;
            border-top: 1px dashed var(--border-color);
        }

        .token-container {
            display: flex;
            align-items: center;
            margin-top: 12px;
            position: relative;
        }

        .token-display {
            flex: 1;
            padding: 12px;
            background-color: rgba(0, 0, 0, 0.03);
            border: 1px solid var(--border-color);
            border-radius: 6px;
            font-family: monospace;
            font-size: 14px;
            color: var(--text-primary);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            text-align: left;
            user-select: all;
        }

        .copy-button {
            margin-left: 12px;
            padding: 8px 16px;
            background-color: var(--accent-color);
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            transition: background-color 0.2s ease;
        }

        .copy-button:hover {
            background-color: #1565c0;
        }

        .copy-tooltip {
            position: absolute;
            bottom: -30px;
            left: 50%;
            transform: translateX(-50%);
            background-color: rgba(0, 0, 0, 0.7);
            color: white;
            padding: 6px 12px;
            border-radius: 4px;
            font-size: 12px;
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
        }

        .copy-tooltip.show {
            opacity: 1;
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
            
            .token-container {
                flex-direction: column;
            }
            
            .token-display {
                width: 100%;
                margin-bottom: 12px;
            }
            
            .copy-button {
                margin-left: 0;
                width: 100%;
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
            <div class="token-section">
                <p><strong>Your Access Token:</strong></p>
                <div class="token-container">
                    <div id="tokenDisplay" class="token-display">Loading token...</div>
                    <button id="copyButton" class="copy-button" onclick="copyToken()">Copy Token</button>
                    <span id="copyTooltip" class="copy-tooltip">Copied!</span>
                </div>
            </div>
        </div>
        <footer>
            <p>TickTick MCP Server &copy; 2025</p>
        </footer>
    </div>
    <script>
        // Display the token
        document.addEventListener('DOMContentLoaded', function() {
            document.getElementById('tokenDisplay').textContent = ${JSON.stringify(
              accessToken
            )};
        });
        
        // Copy token to clipboard
        function copyToken() {
            const tokenText = document.getElementById('tokenDisplay').textContent;
            navigator.clipboard.writeText(tokenText).then(function() {
                // Show the tooltip
                const tooltip = document.getElementById('copyTooltip');
                tooltip.classList.add('show');
                
                // Hide tooltip after delay
                setTimeout(function() {
                    tooltip.classList.remove('show');
                }, 2000);
            }).catch(function(err) {
                console.error('Could not copy text: ', err);
                alert('Failed to copy token. Please select and copy it manually.');
            });
        }
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
                <button class="button secondary" onclick="toggleDetails()">Show Details</button>
            </div>
            
            <div id="errorDetails" class="error-details">
                <span id="errorMessage">Error connecting to TickTick authorization server. Please check your internet connection and try again.</span>
            </div>
        </div>
        <footer>
            <p>Need help? Check the <a href="https://github.com/alexarevalo9/ticktick-mcp-server" style="color: var(--accent-color);">documentation</a>.</p>
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
    
        // You can update this with the actual error message from your server
        function updateErrorMessage(message) {
            if (message) {
                document.getElementById('errorMessage').textContent = message;
            }
        }
        
        // Parse URL parameters to extract error message if present
        const urlParams = new URLSearchParams(window.location.search);
        const errorMsg = urlParams.get('error') + ': ' + urlParams.get('error_description');
        if (errorMsg) {
            updateErrorMessage(decodeURIComponent(errorMsg));
            document.getElementById('errorDetails').classList.add('show');
        }
    </script>
</body>
</html>
`;
