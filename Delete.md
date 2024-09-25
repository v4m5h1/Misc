```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Circle Icons</title>
    <style>
        .container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .circle {
            width: 200px;
            height: 200px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 20px;
            position: relative;
        }
        .circle-left {
            background-color: #f0f0f0;
        }
        .circle-right {
            border: 2px solid #000;
        }
        .text {
            position: absolute;
            bottom: -30px;
            text-align: center;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div id="root"></div>

    <script src="https://unpkg.com/react/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

    <script type="text/babel">
        const App = () => (
            <div className="container">
                <div className="circle circle-left">
                    {/* Replace with your icon component */}
                    <span style={{ fontSize: '50px' }}>S</span>
                    <div className="text">DOCUMENT STORAGE & COLLABORATION</div>
                </div>
                <div className="circle circle-right">
                    {/* Replace with your icon component */}
                    <span style={{ fontSize: '50px' }}>T</span>
                    <div className="text">CHAT & DOCUMENT COLLABORATION</div>
                </div>
            </div>
        );

        ReactDOM.render(<App />, document.getElementById('root'));
    </script>
</body>
</html>

```
