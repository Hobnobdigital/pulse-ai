#!/usr/bin/env python3
"""Generate GPT-1.5 image for Video Generation article"""

import os
import base64
import requests

OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY')

prompt = "Photorealistic cinematic scene showing AI-generated video content. A futuristic film director's viewfinder or camera lens in the foreground, with holographic video frames floating in the air showing various scenes - cityscapes, nature, abstract art. Deep purple and cyan neon lighting accents. Professional filmmaking aesthetic, hyper realistic, 8K quality, dramatic cinematic lighting."

print("Generating GPT-1.5 image for Video Generation article...")

try:
    response = requests.post(
        "https://api.openai.com/v1/images/generations",
        headers={
            "Authorization": f"Bearer {OPENAI_API_KEY}",
            "Content-Type": "application/json"
        },
        json={
            "model": "gpt-image-1.5",
            "prompt": prompt,
            "size": "1536x1024",
            "quality": "high"
        },
        timeout=180
    )
    
    if response.status_code == 200:
        data = response.json()
        b64 = data['data'][0]['b64_json']
        
        filename = "video-generation-ai-cinematic-1770390100.png"
        path = f"/home/ec2-user/clawd/pulse-ai/public/images/{filename}"
        
        with open(path, "wb") as f:
            f.write(base64.b64decode(b64))
        
        print(f"✅ Saved: {filename}")
        print(f"   Path: {path}")
        
        # Update the article with the new image
        import json
        with open('/home/ec2-user/clawd/pulse-ai/public/posts/posts.json', 'r') as f:
            posts = json.load(f)
        
        for post in posts:
            if post['id'] == 'video-generation-reality-check':
                post['image_url'] = f"/images/{filename}"
                post['images'] = [f"/images/{filename}"]
                print(f"✅ Updated article: {post['title']}")
                break
        
        with open('/home/ec2-user/clawd/pulse-ai/public/posts/posts.json', 'w') as f:
            json.dump(posts, f, indent=2)
        
        # Git commit
        os.system('cd /home/ec2-user/clawd/pulse-ai && git add -A && git commit -m "fix: Add GPT-1.5 image to Video Generation article" && git push')
        print("✅ Deployed!")
    else:
        print(f"❌ Error: {response.status_code}")
        print(response.text)
except Exception as e:
    print(f"❌ Error: {e}")
