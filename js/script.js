// =====================================================
// LOCAL STORAGE KEYS
// =====================================================
const STORAGE_KEYS = {
    tasks: 'dashboard_tasks',
    links: 'dashboard_links',
    userName: 'dashboard_user_name',
    theme: 'dashboard_theme'
};

// =====================================================
// STATE MANAGEMENT
// =====================================================
let state = {
    tasks: [],
    links: [],
    userName: '',
    isTimerRunning: false,
    timerInterval: null,
    timerSeconds: 1500, // 25 minutes
    timerDefaultSeconds: 1500, // Store the default for reset
    editingTaskId: null
};

// =====================================================
// INITIALIZATION
// =====================================================
document.addEventListener('DOMContentLoaded', () => {
    loadDataFromStorage();
    initializeTheme();
    initializeClock();
    initializeTimer();
    initializeTasksUI();
    initializeLinksUI();
    setupEventListeners();
    updateGreeting();
});

// =====================================================
// CLOCK AND GREETING
// =====================================================
function initializeClock() {
    updateClockDisplay();
    setInterval(updateClockDisplay, 1000);
}

function updateClockDisplay() {
    const now = new Date();
    
    // Format time
    const timeString = now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });
    
    // Format date
    const dateString = now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    document.getElementById('clock-time').textContent = timeString;
    document.getElementById('clock-date').textContent = dateString;
    
    updateGreeting();
}

function updateGreeting() {
    const now = new Date();
    const hour = now.getHours();
    let greeting;
    
    if (hour < 12) {
        greeting = 'Good Morning';
    } else if (hour < 18) {
        greeting = 'Good Afternoon';
    } else if (hour < 21) {
        greeting = 'Good Evening';
    } else {
        greeting = 'Good Night';
    }
    
    if (state.userName) {
        greeting += ', ' + state.userName;
    }
    
    document.querySelector('.greeting-text').textContent = greeting;
}

// =====================================================
// TIMER FUNCTIONALITY
// =====================================================
function initializeTimer() {
    updateTimerDisplay();
    document.getElementById('timer-start').addEventListener('click', startTimer);
    document.getElementById('timer-pause').addEventListener('click', pauseTimer);
    document.getElementById('timer-reset').addEventListener('click', resetTimer);
    document.getElementById('timer-set-btn').addEventListener('click', setTimerDuration);
    document.getElementById('timer-minutes').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') setTimerDuration();
    });
}

function startTimer() {
    if (state.isTimerRunning) return;
    
    state.isTimerRunning = true;
    document.getElementById('timer-start').disabled = true;
    document.getElementById('timer-pause').disabled = false;
    
    state.timerInterval = setInterval(() => {
        if (state.timerSeconds > 0) {
            state.timerSeconds--;
            updateTimerDisplay();
        } else {
            completeTimer();
        }
    }, 1000);
}

function pauseTimer() {
    state.isTimerRunning = false;
    clearInterval(state.timerInterval);
    state.timerInterval = null;
    
    document.getElementById('timer-start').disabled = false;
    document.getElementById('timer-pause').disabled = true;
}

function resetTimer() {
    pauseTimer();
    state.timerSeconds = state.timerDefaultSeconds; // Reset to current default
    updateTimerDisplay();
    document.getElementById('timer-start').disabled = false;
    document.getElementById('timer-pause').disabled = true;
}

function completeTimer() {
    pauseTimer();
    showNotification('Focus time complete! Take a break.', false);
    alert('Your 25-minute focus session is complete!');
}

function updateTimerDisplay() {
    const minutes = Math.floor(state.timerSeconds / 60);
    const seconds = state.timerSeconds % 60;
    const display = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    document.getElementById('timer-display').textContent = display;
}

function setTimerDuration() {
    const minutesInput = document.getElementById('timer-minutes');
    const minutes = parseInt(minutesInput.value);
    
    // Validate input
    if (isNaN(minutes) || minutes < 1 || minutes > 60) {
        showNotification('Please enter a value between 1 and 60 minutes', true);
        minutesInput.value = Math.floor(state.timerSeconds / 60);
        return;
    }
    
    // Stop timer if running
    if (state.isTimerRunning) {
        pauseTimer();
    }
    
    // Set new duration (both current and default for reset)
    state.timerSeconds = minutes * 60;
    state.timerDefaultSeconds = minutes * 60;
    updateTimerDisplay();
    showNotification(`Timer set to ${minutes} minute${minutes > 1 ? 's' : ''}`, false);
}

// =====================================================
// TASKS FUNCTIONALITY
// =====================================================
function initializeTasksUI() {
    renderTasks();
}

function addTask() {
    const input = document.getElementById('task-input');
    const taskText = input.value.trim();
    
    if (!taskText) {
        showNotification('Task cannot be empty', true);
        return;
    }
    
    // Check for duplicates (case-insensitive, ignoring extra spaces)
    const normalizedNewTask = taskText.toLowerCase().replace(/\s+/g, ' ');
    const isDuplicate = state.tasks.some(task => 
        task.text.toLowerCase().replace(/\s+/g, ' ') === normalizedNewTask
    );
    
    if (isDuplicate) {
        showNotification('This task already exists', true);
        return;
    }
    
    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };
    
    state.tasks.push(task);
    saveTasksToStorage();
    renderTasks();
    input.value = '';
    showNotification('Task added successfully', false);
}

function deleteTask(taskId) {
    state.tasks = state.tasks.filter(task => task.id !== taskId);
    saveTasksToStorage();
    renderTasks();
    showNotification('Task deleted', false);
}

function toggleTaskCompletion(taskId) {
    const task = state.tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        saveTasksToStorage();
        renderTasks();
    }
}

function openEditTaskModal(taskId) {
    const task = state.tasks.find(t => t.id === taskId);
    if (!task) return;
    
    state.editingTaskId = taskId;
    document.getElementById('edit-task-input').value = task.text;
    document.getElementById('task-edit-modal').classList.add('active');
    document.getElementById('edit-task-input').focus();
}

function saveEditedTask() {
    const newText = document.getElementById('edit-task-input').value.trim();
    
    if (!newText) {
        showNotification('Task cannot be empty', true);
        return;
    }
    
    const task = state.tasks.find(t => t.id === state.editingTaskId);
    if (!task) return;
    
    // Check for duplicates (excluding the current task)
    const normalizedNewTask = newText.toLowerCase().replace(/\s+/g, ' ');
    const isDuplicate = state.tasks.some(t => 
        t.id !== state.editingTaskId && 
        t.text.toLowerCase().replace(/\s+/g, ' ') === normalizedNewTask
    );
    
    if (isDuplicate) {
        showNotification('A task with this text already exists', true);
        return;
    }
    
    task.text = newText;
    saveTasksToStorage();
    renderTasks();
    closeEditTaskModal();
    showNotification('Task updated', false);
}

function closeEditTaskModal() {
    document.getElementById('task-edit-modal').classList.remove('active');
    state.editingTaskId = null;
}

function renderTasks() {
    const container = document.getElementById('tasks-container');
    container.innerHTML = '';
    
    if (state.tasks.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 20px;">No tasks yet. Add one to get started!</p>';
        return;
    }
    
    state.tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.className = `task-item ${task.completed ? 'completed' : ''}`;
        
        taskElement.innerHTML = `
            <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
            <span class="task-text">${escapeHtml(task.text)}</span>
            <div class="task-actions">
                <button class="btn btn-small task-edit">Edit</button>
                <button class="btn btn-small task-delete">Delete</button>
            </div>
        `;
        
        const checkbox = taskElement.querySelector('.task-checkbox');
        const editBtn = taskElement.querySelector('.task-edit');
        const deleteBtn = taskElement.querySelector('.task-delete');
        
        checkbox.addEventListener('change', () => toggleTaskCompletion(task.id));
        editBtn.addEventListener('click', () => openEditTaskModal(task.id));
        deleteBtn.addEventListener('click', () => deleteTask(task.id));
        
        container.appendChild(taskElement);
    });
}

// =====================================================
// QUICK LINKS FUNCTIONALITY
// =====================================================
function initializeLinksUI() {
    renderLinks();
}

function addLink() {
    const nameInput = document.getElementById('link-name');
    const urlInput = document.getElementById('link-url');
    
    const name = nameInput.value.trim();
    const url = urlInput.value.trim();
    
    if (!name) {
        showNotification('Link name cannot be empty', true);
        return;
    }
    
    if (!url) {
        showNotification('URL cannot be empty', true);
        return;
    }
    
    // Validate URL format
    try {
        new URL(url);
    } catch (e) {
        showNotification('Invalid URL format', true);
        return;
    }
    
    const link = {
        id: Date.now(),
        name: name,
        url: url
    };
    
    state.links.push(link);
    saveLinksToStorage();
    renderLinks();
    nameInput.value = '';
    urlInput.value = '';
    showNotification('Link added successfully', false);
}

function deleteLink(linkId) {
    state.links = state.links.filter(link => link.id !== linkId);
    saveLinksToStorage();
    renderLinks();
    showNotification('Link deleted', false);
}

function renderLinks() {
    const container = document.getElementById('links-container');
    container.innerHTML = '';
    
    if (state.links.length === 0) {
        container.innerHTML = '<p style="color: var(--text-secondary); font-size: 0.9rem;">No quick links yet.</p>';
        return;
    }
    
    state.links.forEach(link => {
        const linkElement = document.createElement('div');
        linkElement.className = 'link-item';
        
        linkElement.innerHTML = `
            <a href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer" title="${escapeHtml(link.name)}">
                ${escapeHtml(link.name)}
            </a>
            <button class="link-delete" type="button">×</button>
        `;
        
        const deleteBtn = linkElement.querySelector('.link-delete');
        deleteBtn.addEventListener('click', (e) => {
            e.preventDefault();
            deleteLink(link.id);
        });
        
        container.appendChild(linkElement);
    });
}

// =====================================================
// NAME EDITING
// =====================================================
function openEditNameModal() {
    document.getElementById('name-input').value = state.userName;
    document.getElementById('name-modal').classList.add('active');
    document.getElementById('name-input').focus();
}

function saveUserName() {
    const newName = document.getElementById('name-input').value.trim();
    state.userName = newName;
    saveUserNameToStorage();
    updateGreeting();
    closeEditNameModal();
    showNotification('Name updated', false);
}

function closeEditNameModal() {
    document.getElementById('name-modal').classList.remove('active');
}

// =====================================================
// THEME TOGGLE
// =====================================================
function initializeTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEYS.theme);
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        updateThemeToggleButton();
    }
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem(STORAGE_KEYS.theme, isDarkMode ? 'dark' : 'light');
    updateThemeToggleButton();
}

function updateThemeToggleButton() {
    const isDarkMode = document.body.classList.contains('dark-mode');
    document.getElementById('theme-toggle').textContent = isDarkMode ? '☀️' : '🌙';
}

// =====================================================
// STORAGE FUNCTIONS
// =====================================================
function loadDataFromStorage() {
    // Load tasks
    const tasksData = localStorage.getItem(STORAGE_KEYS.tasks);
    if (tasksData) {
        try {
            state.tasks = JSON.parse(tasksData);
        } catch (e) {
            console.error('Error loading tasks:', e);
            state.tasks = [];
        }
    }
    
    // Load links
    const linksData = localStorage.getItem(STORAGE_KEYS.links);
    if (linksData) {
        try {
            state.links = JSON.parse(linksData);
        } catch (e) {
            console.error('Error loading links:', e);
            state.links = [];
        }
    }
    
    // Load user name
    const userName = localStorage.getItem(STORAGE_KEYS.userName);
    if (userName) {
        state.userName = userName;
    }
}

function saveTasksToStorage() {
    localStorage.setItem(STORAGE_KEYS.tasks, JSON.stringify(state.tasks));
}

function saveLinksToStorage() {
    localStorage.setItem(STORAGE_KEYS.links, JSON.stringify(state.links));
}

function saveUserNameToStorage() {
    localStorage.setItem(STORAGE_KEYS.userName, state.userName);
}

// =====================================================
// EVENT LISTENERS
// =====================================================
function setupEventListeners() {
    // Tasks
    document.getElementById('add-task-btn').addEventListener('click', addTask);
    document.getElementById('task-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });
    
    // Task Edit Modal
    document.getElementById('save-task-btn').addEventListener('click', saveEditedTask);
    document.getElementById('cancel-task-btn').addEventListener('click', closeEditTaskModal);
    document.getElementById('edit-task-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') saveEditedTask();
    });
    
    // Links
    document.getElementById('add-link-btn').addEventListener('click', addLink);
    document.getElementById('link-url').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addLink();
    });
    
    // Name editing
    document.getElementById('edit-name-btn').addEventListener('click', openEditNameModal);
    document.getElementById('save-name-btn').addEventListener('click', saveUserName);
    document.getElementById('cancel-name-btn').addEventListener('click', closeEditNameModal);
    document.getElementById('name-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') saveUserName();
    });
    
    // Theme toggle
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
    
    // Close modals on background click
    document.getElementById('name-modal').addEventListener('click', (e) => {
        if (e.target === document.getElementById('name-modal')) {
            closeEditNameModal();
        }
    });
    
    document.getElementById('task-edit-modal').addEventListener('click', (e) => {
        if (e.target === document.getElementById('task-edit-modal')) {
            closeEditTaskModal();
        }
    });
}

// =====================================================
// UTILITY FUNCTIONS
// =====================================================
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

function showNotification(message, isError = false) {
    const notification = document.createElement('div');
    notification.className = `notification ${isError ? 'error' : ''}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}
