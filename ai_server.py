from flask import Flask, request, jsonify
from transformers import GPT2LMHeadModel, GPT2Tokenizer

app = Flask(__name__)

model_name = "./fine_tuned_gpt2"
model = GPT2LMHeadModel.from_pretrained(model_name)
tokenizer = GPT2Tokenizer.from_pretrained(model_name)

def generate_text(prompt, max_length=100, temperature=0.7, top_k=50, top_p=0.9):
    inputs = tokenizer.encode(prompt, return_tensors="pt")
    outputs = model.generate(
        inputs, 
        max_length=max_length, 
        temperature=temperature, 
        top_k=top_k, 
        top_p=top_p, 
        repetition_penalty=1.2,
        num_return_sequences=1
    )
    text = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return text

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    prompt = data['prompt']
    response = generate_text(prompt)
    return jsonify({"response": response})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
