#!/usr/bin/env python3
"""
Pulse AI - RSS Monitor Daemon
Runs continuously and checks RSS feeds every hour
"""

import time
import subprocess
import sys
from datetime import datetime

def run_monitor():
    """Run the RSS monitor script"""
    try:
        result = subprocess.run(
            ['python3', '/home/ec2-user/clawd/pulse-ai/rss-monitor.py'],
            capture_output=True,
            text=True,
            timeout=300  # 5 minute timeout
        )
        
        output = result.stdout.strip()
        
        if result.returncode == 1:  # Found articles
            print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M')}] 📰 Articles found!")
            print(output)
            
            # Send notification to Discord (we'll implement this)
            send_discord_notification(output)
        else:
            print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M')}] No new articles")
            
    except Exception as e:
        print(f"Error running monitor: {e}")

def auto_generate_articles():
    """Auto-generate articles with Claude when found"""
    import subprocess
    print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M')}] 🤖 Auto-generating articles...")
    
    try:
        result = subprocess.run(
            ['python3', '/home/ec2-user/clawd/pulse-ai/generate-drafts.py'],
            capture_output=True,
            text=True,
            timeout=600  # 10 minute timeout for generation
        )
        
        print(result.stdout)
        if result.stderr:
            print(f"Generation warnings: {result.stderr}")
            
    except Exception as e:
        print(f"Error auto-generating: {e}")

def send_discord_notification(message):
    """Send notification to Discord (placeholder for now)"""
    # This will be implemented to send to your Discord channel
    # For now, just log to file and auto-generate
    with open('/home/ec2-user/clawd/pulse-ai/.notifications.log', 'a') as f:
        f.write(f"\n{'='*60}\n")
        f.write(f"NOTIFICATION: {datetime.now().isoformat()}\n")
        f.write(message)
        f.write("\n")
    
    # Auto-trigger article generation
    auto_generate_articles()

def main():
    print("🚀 Pulse AI RSS Monitor Daemon Started")
    print(f"   Checking {15} sources every hour")
    print(f"   Started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("   Press Ctrl+C to stop\n")
    
    # Run immediately on start
    run_monitor()
    
    # Then run every 2 hours (12 times/day, you pick ~6 to publish)
    while True:
        time.sleep(7200)  # Sleep for 2 hours
        run_monitor()

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n👋 Monitor stopped")
        sys.exit(0)
