
// Global state
let currentUser = null;
let currentTags = [];
let currentIdeaTags = [];
let currentWorkflowTags = [];

// Login functionality
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Simple validation (in real app, this would be server-side)
    if (email && password) {
        currentUser = {
            name: 'John Doe',
            email: email,
            avatar: 'JD'
        };

        // Hide login, show app
        document.getElementById('loginPage').style.display = 'none';
        document.getElementById('appContainer').classList.add('active');
    }
});

// Search functionality
function handleSearch(event) {
    if (event.key === 'Enter') {
        const query = event.target.value;
        if (query.trim()) {
            showNotification(`Searching for: "${query}"`, 'info');
            // In real app, this would trigger search functionality
        }
    }
}

// Navigation functionality
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });

    // Show selected page
    document.getElementById(pageId).classList.add('active');

    // Update nav active state
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
    });

    // Find and activate the correct nav item
    const activeNavItem = Array.from(navItems).find(item =>
        item.textContent.toLowerCase().includes(pageId) ||
        (pageId === 'home' && item.textContent === 'Home')
    );
    if (activeNavItem) {
        activeNavItem.classList.add('active');
    }
}

// Prompt functionality
function showPromptDetail(promptId) {
    if (promptId === 'new') {
        document.getElementById('promptFormTitle').textContent = 'Add New Prompt';
        document.getElementById('promptForm').reset();
        currentTags = [];
        updateTagsDisplay();
        showPage('addPrompt');
        return;
    }

    // In a real app, this would fetch prompt data based on ID
    showPage('promptDetail');
}

function editPrompt(promptId) {
    document.getElementById('promptFormTitle').textContent = 'Edit Prompt';
    showPage('addPrompt');
}

// Ideas functionality
function showIdeaDetail(ideaId) {
    if (ideaId === 'new') {
        document.getElementById('ideaFormTitle').textContent = 'Add New Idea';
        document.getElementById('ideaForm').reset();
        currentIdeaTags = [];
        updateIdeaTagsDisplay();
        showPage('addIdea');
        return;
    }

    // Would show idea detail page
    showPage('singleIdea');
}

function editIdea(ideaId) {
    document.getElementById('ideaFormTitle').textContent = 'Edit Idea';
    showPage('addIdea');
}

// Workflow functionality
function showWorkflowDetail(workflowId) {
    if (workflowId === 'new') {
        document.getElementById('workflowFormTitle').textContent = 'Add New Workflow';
        document.getElementById('workflowForm').reset();
        currentWorkflowTags = [];
        resetWorkflowBuilder();
        updateWorkflowTagsDisplay();
        showPage('addWorkflow');
        return;
    }

    // Would show workflow detail page
    showPage('singleWorkflow');
}

function editWorkflow(workflowId) {
    document.getElementById('workflowFormTitle').textContent = 'Edit Workflow';
    showPage('addWorkflow');
}

// Tags functionality for prompts
function focusTagsInput() {
    const input = document.querySelector('.tags-input');
    input.focus();
}

function handleTagInput(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        const input = event.target;
        const tag = input.value.trim();

        if (tag && !currentTags.includes(tag)) {
            currentTags.push(tag);
            updateTagsDisplay();
            input.value = '';
        }
    }
}

function updateTagsDisplay() {
    const container = document.querySelector('.tags-input-container');
    const input = container.querySelector('.tags-input');

    // Remove existing tags
    const existingTags = container.querySelectorAll('.tag-item');
    existingTags.forEach(tag => tag.remove());

    // Add current tags
    currentTags.forEach(tag => {
        const tagElement = document.createElement('div');
        tagElement.className = 'tag-item';
        tagElement.innerHTML = `
            ${tag}
            <span class="tag-remove" onclick="removeTag('${tag}')">×</span>
        `;
        container.insertBefore(tagElement, input);
    });
}

function removeTag(tag) {
    currentTags = currentTags.filter(t => t !== tag);
    updateTagsDisplay();
}

// Tags functionality for ideas
function focusIdeaTagsInput() {
    const input = document.getElementById('ideaTagsInput');
    input.focus();
}

function handleIdeaTagInput(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        const input = event.target;
        const tag = input.value.trim();

        if (tag && !currentIdeaTags.includes(tag)) {
            currentIdeaTags.push(tag);
            updateIdeaTagsDisplay();
            input.value = '';
        }
    }
}

function updateIdeaTagsDisplay() {
    const container = document.querySelector('#addIdea .tags-input-container');
    const input = document.getElementById('ideaTagsInput');

    // Remove existing tags
    const existingTags = container.querySelectorAll('.tag-item');
    existingTags.forEach(tag => tag.remove());

    // Add current tags
    currentIdeaTags.forEach(tag => {
        const tagElement = document.createElement('div');
        tagElement.className = 'tag-item';
        tagElement.innerHTML = `
            ${tag}
            <span class="tag-remove" onclick="removeIdeaTag('${tag}')">×</span>
        `;
        container.insertBefore(tagElement, input);
    });
}

function removeIdeaTag(tag) {
    currentIdeaTags = currentIdeaTags.filter(t => t !== tag);
    updateIdeaTagsDisplay();
}

// Tags functionality for workflows
function focusWorkflowTagsInput() {
    const input = document.getElementById('workflowTagsInput');
    input.focus();
}

function handleWorkflowTagInput(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        const input = event.target;
        const tag = input.value.trim();

        if (tag && !currentWorkflowTags.includes(tag)) {
            currentWorkflowTags.push(tag);
            updateWorkflowTagsDisplay();
            input.value = '';
        }
    }
}

function updateWorkflowTagsDisplay() {
    const container = document.querySelector('#addWorkflow .tags-input-container');
    const input = document.getElementById('workflowTagsInput');

    // Remove existing tags
    const existingTags = container.querySelectorAll('.tag-item');
    existingTags.forEach(tag => tag.remove());

    // Add current tags
    currentWorkflowTags.forEach(tag => {
        const tagElement = document.createElement('div');
        tagElement.className = 'tag-item';
        tagElement.innerHTML = `
            ${tag}
            <span class="tag-remove" onclick="removeWorkflowTag('${tag}')">×</span>
        `;
        container.insertBefore(tagElement, input);
    });
}

function removeWorkflowTag(tag) {
    currentWorkflowTags = currentWorkflowTags.filter(t => t !== tag);
    updateWorkflowTagsDisplay();
}

// Workflow builder functionality
function addWorkflowStep() {
    const builder = document.getElementById('workflowBuilder');
    const stepCount = builder.children.length + 1;

    const stepDiv = document.createElement('div');
    stepDiv.className = 'workflow-step-form';
    stepDiv.innerHTML = `
        <div class="step-header">
            <span style="font-weight: 600; color: #667eea;">Step ${stepCount}</span>
            <button type="button" class="btn-remove-step" onclick="removeWorkflowStep(this)">Remove</button>
        </div>
        <div style="display: grid; grid-template-columns: 1fr; gap: 15px;">
            <input type="text" class="step-title-input" placeholder="Step title" required>
            <textarea placeholder="Detailed description..." required style="min-height: 80px;"></textarea>
        </div>
    `;

    builder.appendChild(stepDiv);
    updateStepNumbers();
}

function removeWorkflowStep(button) {
    const stepDiv = button.closest('.workflow-step-form');
    stepDiv.remove();
    updateStepNumbers();
}

function updateStepNumbers() {
    const steps = document.querySelectorAll('#workflowBuilder .workflow-step-form');
    steps.forEach((step, index) => {
        const stepHeader = step.querySelector('.step-header span');
        stepHeader.textContent = `Step ${index + 1}`;

        const removeBtn = step.querySelector('.btn-remove-step');
        removeBtn.style.display = steps.length > 1 ? 'block' : 'none';
    });
}

function resetWorkflowBuilder() {
    const builder = document.getElementById('workflowBuilder');
    builder.innerHTML = `
        <div class="workflow-step-form">
            <div class="step-header">
                <span style="font-weight: 600; color: #667eea;">Step 1</span>
                <button type="button" class="btn-remove-step" onclick="removeWorkflowStep(this)" style="display: none;">Remove</button>
            </div>
            <div style="display: grid; grid-template-columns: 1fr; gap: 15px;">
                <input type="text" class="step-title-input" placeholder="Step title" required>
                <textarea placeholder="Detailed description..." required style="min-height: 80px;"></textarea>
            </div>
        </div>
    `;
}

// Tutorial functionality
function viewTutorial(tutorialId) {
    const tutorials = {
        'getting-started': {
            title: 'Getting Started with AI Prompts',
            badge: 'Beginner',
            duration: '5 min read',
            content: `
                <h2>What are AI Prompts?</h2>
                <p>AI prompts are instructions or questions you give to artificial intelligence models to get specific responses. Think of them as a way to communicate with AI effectively.</p>
                
                <h2>Basic Prompt Structure</h2>
                <p>A good prompt typically includes:</p>
                <ul>
                    <li><strong>Context:</strong> Background information about the task</li>
                    <li><strong>Task:</strong> What you want the AI to do</li>
                    <li><strong>Format:</strong> How you want the response structured</li>
                    <li><strong>Constraints:</strong> Any limitations or requirements</li>
                </ul>
                
                <div class="example-box">
                    <h3>Example:</h3>
                    <p><strong>Poor prompt:</strong> "Write about marketing"</p>
                    <p><strong>Good prompt:</strong> "As a marketing expert, write a 200-word social media strategy for a small coffee shop targeting young professionals. Include 3 specific tactics and expected outcomes."</p>
                </div>
                
                <h2>Best Practices</h2>
                <ol>
                    <li><strong>Be specific:</strong> Vague prompts lead to vague responses</li>
                    <li><strong>Provide context:</strong> Help the AI understand the situation</li>
                    <li><strong>Use examples:</strong> Show the AI what you're looking for</li>
                    <li><strong>Iterate:</strong> Refine your prompts based on results</li>
                </ol>
                
                <div class="tip-box">
                    <strong>💡 Pro Tip:</strong> Start with simple prompts and gradually add complexity as you learn what works best for your use case.
                </div>
                
                <h2>Common Mistakes to Avoid</h2>
                <ul>
                    <li>Being too vague or too complex</li>
                    <li>Not providing enough context</li>
                    <li>Expecting perfect results on the first try</li>
                    <li>Not testing prompts with different inputs</li>
                </ul>
            `
        },
        'advanced-prompting': {
            title: 'Advanced Prompt Engineering',
            badge: 'Intermediate',
            duration: '8 min read',
            content: `
                <h2>Chain-of-Thought Prompting</h2>
                <p>This technique involves asking the AI to show its reasoning process step-by-step, leading to more accurate and logical responses.</p>
                
                <div class="example-box">
                    <h3>Example:</h3>
                    <p><strong>Standard prompt:</strong> "What's 15% of 240?"</p>
                    <p><strong>Chain-of-thought prompt:</strong> "What's 15% of 240? Let's think step by step."</p>
                </div>
                
                <h2>Few-Shot Learning</h2>
                <p>Provide a few examples of the desired input-output format to guide the AI's responses.</p>
                
                <div class="example-box">
                    <h3>Example:</h3>
                    <p>Translate these phrases to Spanish:</p>
                    <p>Hello → Hola<br>
                    Good morning → Buenos días<br>
                    How are you? → ¿Cómo estás?<br>
                    Thank you → ?</p>
                </div>
                
                <h2>Prompt Chaining</h2>
                <p>Break complex tasks into smaller, sequential prompts where each builds on the previous response.</p>
                
                <ol>
                    <li><strong>Step 1:</strong> Generate ideas</li>
                    <li><strong>Step 2:</strong> Evaluate and refine ideas</li>
                    <li><strong>Step 3:</strong> Create detailed implementation plan</li>
                </ol>
                
                <h2>Advanced Techniques</h2>
                <ul>
                    <li><strong>Role prompting:</strong> "Act as a [expert/character]"</li>
                    <li><strong>Temperature control:</strong> Adjust creativity vs consistency</li>
                    <li><strong>Constraint satisfaction:</strong> Multiple requirements</li>
                    <li><strong>Meta-prompting:</strong> Prompts about prompting</li>
                </ul>
            `
        }
        // Add more tutorials here...
    };
    
    const tutorial = tutorials[tutorialId];
    if (tutorial) {
        document.getElementById('tutorialTitle').textContent = tutorial.title;
        document.getElementById('tutorialBadge').textContent = tutorial.badge;
        document.getElementById('tutorialBadge').className = `tutorial-badge ${tutorial.badge.toLowerCase()}`;
        document.getElementById('tutorialDuration').textContent = tutorial.duration;
        document.getElementById('tutorialContent').innerHTML = tutorial.content;
        
        showPage('tutorialDetail');
    }
}


// Signup functionality
function showSignup() {
    alert('Signup form would open here');
}

// News filter functionality
document.addEventListener('DOMContentLoaded', function () {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            // In a real app, this would filter the news items
            console.log('Filter by:', this.textContent);
        });
    });

    // Form submissions
    document.getElementById('promptForm').addEventListener('submit', function (e) {
        e.preventDefault();
        showNotification('Prompt published successfully!', 'success');
        setTimeout(() => showPage('prompts'), 1500);
    });

    document.getElementById('ideaForm').addEventListener('submit', function (e) {
        e.preventDefault();
        showNotification('Idea published successfully!', 'success');
        setTimeout(() => showPage('ideas'), 1500);
    });

    document.getElementById('workflowForm').addEventListener('submit', function (e) {
        e.preventDefault();
        showNotification('Workflow published successfully!', 'success');
        setTimeout(() => showPage('workflows'), 1500);
    });
});

// Add some interactive hover effects
document.addEventListener('DOMContentLoaded', function () {
    // Add hover animations to cards
    const cards = document.querySelectorAll('.prompt-card, .news-card, .dashboard-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-5px)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Simulated real-time updates
function updateStats() {
    // In a real app, this would fetch latest stats from server
    const statsElements = document.querySelectorAll('.dashboard-number');
    statsElements.forEach(el => {
        // Add subtle animation to indicate updates
        el.style.transform = 'scale(1.05)';
        setTimeout(() => {
            el.style.transform = 'scale(1)';
        }, 300);
    });
}

// Update stats every 30 seconds (in real app)
setInterval(updateStats, 30000);

// Add notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#667eea'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add CSS animation for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Simulate notifications
setTimeout(() => {
    showNotification('Welcome to MCAPrompts!', 'success');
}, 2000);
