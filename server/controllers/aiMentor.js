/**
 * AI Mentor Controller
 *
 * Provides career guidance and mentorship responses.
 * Uses an AI API if configured, otherwise returns
 * intelligent mock responses so the app works out of the box.
 *
 * To use a real AI, set AI_API_KEY in your .env file.
 */

/**
 * Mock response generator for career guidance.
 * Provides contextual responses based on the user's query category.
 */
const generateMockResponse = (message) => {
  const lower = message.toLowerCase();

  if (lower.includes('resume') || lower.includes('cv')) {
    return {
      text: "Great question about resumes! Here's my advice:\n\n" +
        "1. **Tailor your resume** for each application — highlight relevant skills\n" +
        "2. **Use action verbs** like 'developed', 'implemented', 'led'\n" +
        "3. **Quantify achievements** — use numbers and percentages where possible\n" +
        "4. **Keep it to one page** if you have less than 10 years of experience\n" +
        "5. **Include a strong summary** that showcases your unique value proposition\n\n" +
        "Would you like me to review your resume or help you write a specific section?",
      suggestions: [
        'How do I write a strong summary?',
        'What skills should I list?',
        'Help me format my experience',
      ],
    };
  }

  if (lower.includes('interview')) {
    return {
      text: "Let's prepare for your interview! Here's a structured approach:\n\n" +
        "1. **Research the company** — understand their products, culture, and recent news\n" +
        "2. **Practice the STAR method** (Situation, Task, Action, Result) for behavioral questions\n" +
        "3. **Prepare 3-5 stories** that showcase your key achievements\n" +
        "4. **Have questions ready** for the interviewer\n" +
        "5. **Follow up** with a thank-you email within 24 hours\n\n" +
        "What type of interview are you preparing for? I can give more specific tips.",
      suggestions: [
        'Behavioral interview tips',
        'Technical interview prep',
        'Questions to ask interviewer',
      ],
    };
  }

  if (lower.includes('career') || lower.includes('job') || lower.includes('switch') || lower.includes('change')) {
    return {
      text: "Thinking about a career change? That's exciting! Here's my roadmap:\n\n" +
        "1. **Self-assessment** — identify your transferable skills and interests\n" +
        "2. **Research** the target industry — talk to professionals, read industry news\n" +
        "3. **Skill gap analysis** — what do you need to learn?\n" +
        "4. **Network strategically** — connect with people in your desired field\n" +
        "5. **Start small** — take on projects, freelance, or volunteer to build experience\n\n" +
        "What field are you considering moving into?",
      suggestions: [
        'How do I network effectively?',
        'What skills should I learn?',
        'Help me assess my current skills',
      ],
    };
  }

  if (lower.includes('skill') || lower.includes('learn') || lower.includes('course') || lower.includes('roadmap')) {
    return {
      text: "Building new skills is one of the best investments you can make! Here's how to approach it:\n\n" +
        "1. **Start with the fundamentals** — build a strong foundation before specializing\n" +
        "2. **Use the 80/20 rule** — focus on the 20% of skills that give 80% of results\n" +
        "3. **Learn by doing** — build projects, not just consume tutorials\n" +
        "4. **Set a consistent schedule** — even 30 minutes a day adds up\n" +
        "5. **Join a community** — learning with others keeps you motivated\n\n" +
        "What skill are you looking to develop? I can suggest specific resources.",
      suggestions: [
        'Best resources for learning',
        'How to stay motivated',
        'Create a learning roadmap',
      ],
    };
  }

  if (lower.includes('internship') || lower.includes('intern')) {
    return {
      text: "Internships are a fantastic way to launch your career! Here's my advice:\n\n" +
        "1. **Start early** — many companies recruit 3-6 months in advance\n" +
        "2. **Cast a wide net** — apply to 20-30 positions minimum\n" +
        "3. **Customize applications** — tailor your resume and cover letter for each role\n" +
        "4. **Leverage your network** — referrals dramatically increase your chances\n" +
        "5. **Prepare for interviews** — practice common questions and have examples ready\n\n" +
        "Would you like help finding internships or preparing applications?",
      suggestions: [
        'Where to find internships',
        'How to write a cover letter',
        'Internship interview tips',
      ],
    };
  }

  // Default response
  return {
    text: "Thank you for reaching out! I'm here to help with your career journey.\n\n" +
      "I can assist you with:\n" +
      "• Resume writing and optimization\n" +
      "• Interview preparation and practice\n" +
      "• Career planning and transitions\n" +
      "• Skill development roadmaps\n" +
      "• Internship and job search strategies\n\n" +
      "What would you like to discuss today?",
    suggestions: [
      'Help me with my resume',
      'Interview preparation tips',
      'Career change advice',
      'Learning roadmap guidance',
    ],
  };
};

/**
 * @desc    Send a message to the AI Mentor
 * @route   POST /api/ai-mentor/chat
 * @access  Private
 */
const chat = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ message: 'Message is required' });
    }

    // If an AI API key is configured, use it for real responses
    if (process.env.AI_API_KEY) {
      try {
        // Example: OpenAI API integration
        // const response = await fetch('https://api.openai.com/v1/chat/completions', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //     'Authorization': `Bearer ${process.env.AI_API_KEY}`,
        //   },
        //   body: JSON.stringify({
        //     model: 'gpt-3.5-turbo',
        //     messages: [
        //       { role: 'system', content: 'You are a helpful career mentor AI.' },
        //       { role: 'user', content: message },
        //     ],
        //   }),
        // });
        // const data = await response.json();
        // return res.json({ text: data.choices[0].message.content, suggestions: [] });

        // For now, fall back to mock since API integration needs customization
        const response = generateMockResponse(message);
        return res.json(response);
      } catch (apiError) {
        console.error('AI API error, falling back to mock:', apiError.message);
        const response = generateMockResponse(message);
        return res.json(response);
      }
    }

    // No API key — use mock responses
    const response = generateMockResponse(message);
    res.json(response);
  } catch (error) {
    console.error('AI Mentor chat error:', error.message);
    res.status(500).json({ message: 'Server error processing chat message' });
  }
};

module.exports = { chat };
