import os
import json
import base64
import urllib.request

# API call for photorealistic image
url = "https://api.openai.com/v1/images/generations"
headers = {
    "Authorization": f"Bearer {os.environ['OPENAI_API_KEY']}",
    "Content-Type": "application/json"
}
data = {
    "model": "gpt-image-1.5",
    "prompt": "A photorealistic editorial photograph of a modern software developer's workspace. On the desk: a sleek MacBook Pro with code on screen, next to it a futuristic holographic AI assistant interface floating in mid-air showing Claude and OpenAI logos. The scene is lit with soft natural light from a window, with subtle blue and cyan accent lighting from the screens. Professional photography, shallow depth of field, 85mm lens look, magazine quality, highly detailed, no cartoon elements.",
    "size": "1536x1024",
    "quality": "high",
    "n": 1
}

req = urllib.request.Request(
    url,
    data=json.dumps(data).encode(),
    headers=headers,
    method='POST'
)

print("Generating photorealistic image...")
with urllib.request.urlopen(req, timeout=300) as response:
    result = json.loads(response.read().decode())
    b64_data = result['data'][0]['b64_json']
    
    # Save the image
    os.makedirs('/home/ec2-user/clawd/pulse-ai/public/images', exist_ok=True)
    with open('/home/ec2-user/clawd/pulse-ai/public/images/xcode-ai-coding-feb-2026.png', 'wb') as f:
        f.write(base64.b64decode(b64_data))
    
    print("Image saved to /home/ec2-user/clawd/pulse-ai/public/images/xcode-ai-coding-feb-2026.png")
