from transformers import GPT2LMHeadModel, GPT2Tokenizer
from flask import Flask, request, jsonify, send_from_directory

model_name = "./fine_tuned_gpt2"
model = GPT2LMHeadModel.from_pretrained(model_name)
tokenizer = GPT2Tokenizer.from_pretrained(model_name)

from transformers import GPT2LMHeadModel, GPT2Tokenizer

# Load the fine-tuned model and tokenizer
tokenizer = GPT2Tokenizer.from_pretrained('./fine_tuned_gpt2')
model = GPT2LMHeadModel.from_pretrained('./fine_tuned_gpt2')

def generate_text(prompt, max_length=100, temperature=0.5, top_k=50, top_p=0.9):
    inputs = tokenizer.encode(prompt, return_tensors="pt")
    outputs = model.generate(
        inputs,
        max_length=max_length,
        temperature=temperature,
        top_k=top_k,
        top_p=top_p,
        repetition_penalty=1.2,  # Adds a penalty to repeated tokens
        num_return_sequences=1
    )
    text = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return text

app = Flask(__name__, static_folder='', static_url_path='')

@app.route('/chat')
def serve_chat():
    return send_from_directory('', 'index.html')

@app.route('/main')
def serve_main():
    return send_from_directory('', 'main.html')

@app.route('/login')
def serve_login():
    return send_from_directory('', 'login.html')

@app.route('/signup')
def serve_signupp():
    return send_from_directory('', 'signup.html')


@app.route('/generate', methods=['POST'])
def generate():
    data = request.json
    prompt = data.get('prompt', '')
    response = generate_text(prompt)
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

