#!/usr/bin/env python3
"""Generate 3 GPT-1.5 images for today's articles"""

import os
import base64
import requests

OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY')

images = [
    {
        "filename": "when-chatbots-become-chums-1770390000.png",
        "prompt": "Photorealistic editorial illustration showing a human silhouette forming an emotional connection with a glowing AI hologram. Warm golden and soft blue tones. The scene evokes friendship but with a subtle sense of digital artificiality. Cinematic lighting, magazine-quality, professional editorial style."
    },
    {
        "filename": "ai-agents-expense-accounts-1770390001.png", 
        "prompt": "Photorealistic illustration of an AI robot holding a corporate credit card, standing in front of a modern office building with glass windows. Purple and cyan neon accents. Professional, slightly humorous tone. Cinematic lighting, high detail, editorial magazine style."
    },
    {
        "filename": "reddit-ai-search-1770390002.png",
        "prompt": "Photorealistic editorial illustration showing a magnifying glass made of light beams scanning through a vast digital landscape of Reddit threads and discussions. Glowing purple and orange accents. Futuristic search technology concept. Cinematic lighting, professional quality."
    }
]

for img in images:
    print(f"Generating {img['filename']}...")
    try:
        response = requests.post(
            "https://api.openai.com/v1/images/generations",
            headers={
                "Authorization": f"Bearer {OPENAI_API_KEY}",
                "Content-Type": "application/json"
            },
            json={
                "model": "gpt-image-1.5",
                "prompt": img['prompt'],
                "size": "1536x1024",
                "quality": "high"
            },
            timeout=180
        )
        
        if response.status_code == 200:
            data = response.json()
            b64 = data['data'][0]['b64_json']
            
            path = f"/home/ec2-user/clawd/pulse-ai/public/images/{img['filename']}"
            with open(path, "wb") as f:
                f.write(base64.b64decode(b64))
            
            print(f"  ✅ Saved: {img['filename']}")
        else:
            print(f"  ❌ Error: {response.status_code}")
    except Exception as e:
        print(f"  ❌ Error: {e}")

print("\nDone!")
