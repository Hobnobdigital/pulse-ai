#!/bin/bash

# Pulse AI Workflow Test Script
# This script tests key components of the workflow without running full n8n

set -e

echo "🧪 Pulse AI Workflow Test Suite"
echo "================================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test counter
TESTS_PASSED=0
TESTS_FAILED=0

# Helper functions
pass() {
    echo -e "${GREEN}✓${NC} $1"
    ((TESTS_PASSED++))
}

fail() {
    echo -e "${RED}✗${NC} $1"
    ((TESTS_FAILED++))
}

warn() {
    echo -e "${YELLOW}⚠${NC} $1"
}

# Test 1: Check directory structure
echo "📁 Test 1: Directory Structure"
echo "-------------------------------"

if [ -d "/home/ec2-user/clawd/pulse-ai/public/images" ]; then
    pass "Images directory exists"
else
    fail "Images directory missing"
    mkdir -p /home/ec2-user/clawd/pulse-ai/public/images
    warn "Created images directory"
fi

if [ -d "/home/ec2-user/clawd/pulse-ai/public/posts" ]; then
    pass "Posts directory exists"
else
    fail "Posts directory missing"
    mkdir -p /home/ec2-user/clawd/pulse-ai/public/posts
    warn "Created posts directory"
fi

if [ -f "/home/ec2-user/clawd/pulse-ai/public/posts/posts.json" ]; then
    pass "posts.json exists"
else
    fail "posts.json missing"
    echo "[]" > /home/ec2-user/clawd/pulse-ai/public/posts/posts.json
    warn "Created empty posts.json"
fi

echo ""

# Test 2: Check RSS feeds availability
echo "🌐 Test 2: RSS Feed Availability"
echo "---------------------------------"

declare -a feeds=(
    "https://openai.com/blog/rss.xml"
    "https://www.marktechpost.com/feed/"
    "https://huggingface.co/blog/feed.xml"
    "https://techcrunch.com/category/artificial-intelligence/feed/"
    "https://venturebeat.com/category/ai/feed/"
    "https://blog.google/technology/ai/rss/"
    "https://www.anthropic.com/news/rss.xml"
    "http://export.arxiv.org/api/query?search_query=cat:cs.AI&sortBy=submittedDate&max_results=5"
)

declare -a feed_names=(
    "OpenAI"
    "MarkTechPost"
    "Hugging Face"
    "TechCrunch"
    "VentureBeat"
    "Google AI"
    "Anthropic"
    "ArXiv"
)

for i in "${!feeds[@]}"; do
    feed="${feeds[$i]}"
    name="${feed_names[$i]}"
    
    if curl -s -f -o /dev/null -w "%{http_code}" "$feed" | grep -q "200"; then
        pass "$name feed reachable"
    else
        fail "$name feed unreachable"
    fi
done

echo ""

# Test 3: Check API credentials (if set)
echo "🔑 Test 3: API Credentials Check"
echo "---------------------------------"

# Check for environment variables (common way to store keys)
if [ ! -z "$OPENROUTER_API_KEY" ]; then
    pass "OpenRouter API key found in environment"
    
    # Test OpenRouter API
    echo "   Testing OpenRouter connection..."
    response=$(curl -s -o /dev/null -w "%{http_code}" https://openrouter.ai/api/v1/models \
        -H "Authorization: Bearer $OPENROUTER_API_KEY" 2>/dev/null || echo "000")
    
    if [ "$response" = "200" ]; then
        pass "OpenRouter API connection successful"
    else
        fail "OpenRouter API connection failed (HTTP $response)"
    fi
else
    warn "OpenRouter API key not found in environment (set OPENROUTER_API_KEY)"
fi

if [ ! -z "$OPENAI_API_KEY" ]; then
    pass "OpenAI API key found in environment"
    
    # Test OpenAI API
    echo "   Testing OpenAI connection..."
    response=$(curl -s -o /dev/null -w "%{http_code}" https://api.openai.com/v1/models \
        -H "Authorization: Bearer $OPENAI_API_KEY" 2>/dev/null || echo "000")
    
    if [ "$response" = "200" ]; then
        pass "OpenAI API connection successful"
    else
        fail "OpenAI API connection failed (HTTP $response)"
    fi
else
    warn "OpenAI API key not found in environment (set OPENAI_API_KEY)"
fi

echo ""

# Test 4: Check Git setup
echo "🔧 Test 4: Git Repository Setup"
echo "--------------------------------"

cd /home/ec2-user/clawd/pulse-ai

if [ -d ".git" ]; then
    pass "Git repository initialized"
    
    # Check remote
    if git remote get-url origin &>/dev/null; then
        remote=$(git remote get-url origin)
        pass "Git remote configured: $remote"
    else
        warn "Git remote not configured"
        echo "   Run: git remote add origin YOUR_REPO_URL"
    fi
    
    # Check git config
    if git config user.email &>/dev/null; then
        pass "Git user configured"
    else
        warn "Git user not configured"
        echo "   Run: git config user.email 'bot@pulse-ai.com'"
        echo "   Run: git config user.name 'Pulse AI Bot'"
    fi
else
    fail "Git repository not initialized"
    warn "Run: git init && git remote add origin YOUR_REPO_URL"
fi

echo ""

# Test 5: Fetch sample articles
echo "📰 Test 5: Fetch Sample Articles"
echo "---------------------------------"

echo "Fetching 3 sample articles from OpenAI blog..."
sample_articles=$(curl -s "https://openai.com/blog/rss.xml" | grep -o '<item>.*</item>' | head -3 | wc -l)

if [ "$sample_articles" -gt 0 ]; then
    pass "Successfully fetched sample articles"
else
    fail "Could not fetch sample articles"
fi

echo ""

# Test 6: Check Node.js and dependencies
echo "📦 Test 6: Node.js Dependencies"
echo "--------------------------------"

if command -v node &>/dev/null; then
    node_version=$(node --version)
    pass "Node.js installed: $node_version"
else
    fail "Node.js not found"
fi

if command -v npm &>/dev/null; then
    pass "npm installed"
else
    fail "npm not found"
fi

echo ""

# Test 7: Check posts.json structure
echo "📄 Test 7: posts.json Structure"
echo "--------------------------------"

if [ -f "/home/ec2-user/clawd/pulse-ai/public/posts/posts.json" ]; then
    if cat /home/ec2-user/clawd/pulse-ai/public/posts/posts.json | jq empty 2>/dev/null; then
        pass "posts.json is valid JSON"
        
        post_count=$(cat /home/ec2-user/clawd/pulse-ai/public/posts/posts.json | jq 'length')
        echo "   Current post count: $post_count"
    else
        fail "posts.json is malformed"
    fi
else
    fail "posts.json not found"
fi

echo ""

# Summary
echo "================================"
echo "📊 Test Summary"
echo "================================"
echo -e "Passed: ${GREEN}$TESTS_PASSED${NC}"
echo -e "Failed: ${RED}$TESTS_FAILED${NC}"
echo ""

if [ $TESTS_FAILED -eq 0 ]; then
    echo -e "${GREEN}✓ All tests passed! Ready to run workflow.${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Import workflow into n8n"
    echo "2. Configure credentials in n8n UI"
    echo "3. Run a test execution"
    echo "4. Check output in /home/ec2-user/clawd/pulse-ai/public/posts/"
    exit 0
else
    echo -e "${RED}✗ Some tests failed. Fix issues before running workflow.${NC}"
    exit 1
fi
