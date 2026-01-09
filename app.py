from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Basic list of scam-related keywords
SCAM_KEYWORDS = [
    "lottery", "free money", "urgent", "click link", 
    "win prize", "offer expires", "congratulations", 
    "bank account", "verify now", "cash prize"
]

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/detect', methods=['POST'])
def detect():
    data = request.get_json()
    message = data.get('message', '').lower()
    
    is_scam = False
    found_keywords = []

    for keyword in SCAM_KEYWORDS:
        if keyword in message:
            is_scam = True
            found_keywords.append(keyword)

    if is_scam:
        return jsonify({
            "status": "scam",
            "message": "⚠️ Scam Message Detected!",
            "details": f"Keywords found: {', '.join(found_keywords)}"
        })
    else:
        return jsonify({
            "status": "safe",
            "message": "✅ Safe Message",
            "details": "No common scam keywords found."
        })

if __name__ == '__main__':
    app.run(debug=True)
