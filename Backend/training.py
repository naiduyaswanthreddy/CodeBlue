from transformers import GPT2LMHeadModel, GPT2Tokenizer, DataCollatorForLanguageModeling, Trainer, TrainingArguments
from datasets import Dataset

# Load pre-trained model and tokenizer
model_name = "gpt2"
tokenizer = GPT2Tokenizer.from_pretrained(model_name)

# Set the padding token
tokenizer.pad_token = tokenizer.eos_token

model = GPT2LMHeadModel.from_pretrained(model_name)

# Function to load the custom dataset
def load_custom_dataset(file_path, tokenizer):
    # Read the file and create a dataset
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    # Create a dataset from the lines
    dataset = Dataset.from_dict({"text": lines})
    
    # Tokenize the dataset
    dataset = dataset.map(
        lambda e: tokenizer(e['text'], truncation=True, padding='max_length', max_length=128),
        batched=True
    )
    dataset.set_format(type='torch', columns=['input_ids', 'attention_mask'])
    return dataset

# Path to the dataset
file_path = "D:\PROGRAMING\CodeBlue\Backend\dialogues.txt"

# Load the custom dataset
dataset = load_custom_dataset(file_path, tokenizer)

# Data collator
data_collator = DataCollatorForLanguageModeling(
    tokenizer=tokenizer,
    mlm=False,
)

# Training arguments
training_args = TrainingArguments(
    output_dir="./results",
    overwrite_output_dir=True,
    num_train_epochs=20,
    per_device_train_batch_size=2,
    save_steps=20_000,
    save_total_limit=2,
    logging_dir='./logs',  # Enable logging
    logging_steps=200,
)

# Trainer
trainer = Trainer(
    model=model,
    args=training_args,
    data_collator=data_collator,
    train_dataset=dataset,
)

# Fine-tune the model
trainer.train()

# Save the fine-tuned model and tokenizer
trainer.save_model("./fine_tuned_gpt2")
tokenizer.save_pretrained("./fine_tuned_gpt2")
