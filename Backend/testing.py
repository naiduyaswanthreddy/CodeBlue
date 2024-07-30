import sys
from transformers import GPT2LMHeadModel, GPT2Tokenizer

model_name = "./fine_tuned_gpt2"
model = GPT2LMHeadModel.from_pretrained(model_name)
tokenizer = GPT2Tokenizer.from_pretrained(model_name)

def generate_text(prompt, max_length=50, temperature=0.7, top_k=50, top_p=0.9):
    inputs = tokenizer.encode(prompt, return_tensors="pt")
    attention_mask = (inputs != tokenizer.pad_token_id).long()
    outputs = model.generate(
        inputs,
        max_length=max_length,
        temperature=temperature,
        top_k=top_k,
        top_p=top_p,
        repetition_penalty=1.2,
        num_return_sequences=1,
        do_sample=True,
        attention_mask=attention_mask,
        pad_token_id=tokenizer.eos_token_id
    )
    text = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return text

if __name__ == "__main__":
    prompt = sys.argv[1]
    print(generate_text(prompt))
