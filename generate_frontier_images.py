#!/usr/bin/env python3
"""Generate images for OpenAI Frontier article using GPT-Image-1.5"""

import requests
import json
import os

OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY')

headers = {
    "Authorization": f"Bearer {OPENAI_API_KEY}",
    "Content-Type": "application/json"
}

# Image 1: Hero image - AI agents in enterprise setting
prompt1 = "A futuristic enterprise control room with glowing holographic AI agents working alongside human professionals. Deep purple and cyan neon accents. Clean, minimalist corporate environment. Abstract digital particles floating in the air. Cinematic lighting, photorealistic, high detail."

# Image 2: AI agents working autonomously
prompt2 = "Abstract visualization of interconnected AI agents as luminous geometric nodes in a dark void. Glowing neural pathways connecting them. Purple, magenta, and teal color palette. Futuristic, ethereal, corporate tech aesthetic. Photorealistic rendering."

output_dir = "/home/ec2-user/clawd/pulse-ai/public/images/frontier"

for i, prompt in enumerate([prompt1, prompt2], 1):
    print(f"Generating image {i}...")
    
    response = requests.post(
        "https://api.openai.com/v1/images/generations",
        headers=headers,
        json={
            "model": "gpt-image-1.5",
            "prompt": prompt,
            "size": "1536x1024",
            "quality": "high"
        },
        timeout=120
    )
    
    if response.status_code == 200:
        data = response.json()
        image_data = data['data'][0]['b64_json']
        
        # Save image
        import base64
        image_path = f"{output_dir}/frontier-image-{i}.png"
        with open(image_path, "wb") as f:
            f.write(base64.b64decode(image_data))
        print(f"✓ Saved: {image_path}")
    else:
        print(f"✗ Error: {response.status_code} - {response.text}")
