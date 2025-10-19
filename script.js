// 全局变量
let currentQuestion = 0;
let answers = [];
let startX = 0;
let touchStartTime = 0;
let touchEndTime = 0;

// DOM 元素
const introPage = document.getElementById('intro-page');
const questionsPage = document.getElementById('questions-page');
const resultsPage = document.getElementById('results-page');
const startTestBtn = document.getElementById('start-test-btn');
const restartTestBtn = document.getElementById('restart-test-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const questionNumber = document.getElementById('question-number');
const questionText = document.getElementById('question-text');
const optionsContainer = document.querySelector('.options-container');
const progressFill = document.getElementById('progress-fill');
const scoreValue = document.getElementById('score-value');
const assessmentType = document.getElementById('assessment-type');
const assessmentDescription = document.getElementById('assessment-description');
const characteristicsList = document.getElementById('characteristics-list');
const suggestionsList = document.getElementById('suggestions-list');

// 初始化
function init() {
    // 初始化事件监听器
    initEventListeners();
    
    // 预加载数据
    if (typeof questions !== 'undefined' && typeof options !== 'undefined') {
        console.log('数据加载成功');
    } else {
        console.error('数据加载失败');
    }
    
    // 显示介绍页面
    showPage(introPage);
}

// 初始化事件监听器
function initEventListeners() {
    // 页面切换按钮
    startTestBtn.addEventListener('click', startTest);
    restartTestBtn.addEventListener('click', restartTest);
    prevBtn.addEventListener('click', goToPreviousQuestion);
    nextBtn.addEventListener('click', goToNextQuestion);
    
    // 键盘导航
    document.addEventListener('keydown', handleKeyboardNavigation);
    
    // 触摸滑动支持
    questionsPage.addEventListener('touchstart', handleTouchStart);
    questionsPage.addEventListener('touchend', handleTouchEnd);
}

// 显示指定页面
function showPage(page) {
    // 隐藏所有页面
    introPage.classList.remove('active');
    questionsPage.classList.remove('active');
    resultsPage.classList.remove('active');
    
    // 显示目标页面
    page.classList.add('active');
    page.classList.add('fade-in');
    
    // 重置动画
    setTimeout(() => {
        page.classList.remove('fade-in');
    }, 600);
}

// 开始测试
function startTest() {
    // 重置测试状态
    currentQuestion = 0;
    answers = [];
    
    // 显示问题页面
    showPage(questionsPage);
    
    // 渲染第一个问题
    renderCurrentQuestion();
    
    // 更新进度
    updateProgress();
}

// 渲染当前问题
function renderCurrentQuestion() {
    if (currentQuestion >= 0 && currentQuestion < questions.length) {
        // 更新问题编号
        questionNumber.querySelector('span').textContent = currentQuestion + 1;
        
        // 更新问题文本
        questionText.textContent = questions[currentQuestion];
        
        // 清空选项容器
        optionsContainer.innerHTML = '';
        
        // 生成选项
        options.forEach(option => {
            const optionLabel = document.createElement('label');
            optionLabel.className = 'option-label';
            
            const optionInput = document.createElement('input');
            optionInput.type = 'radio';
            optionInput.name = 'question-option';
            optionInput.value = option.value;
            optionInput.className = 'option-input';
            
            // 如果之前回答过这个问题，选中对应的选项
            if (answers[currentQuestion] === option.value) {
                optionInput.checked = true;
            }
            
            // 添加事件监听器
            optionInput.addEventListener('change', () => handleOptionSelect(option.value));
            
            const optionText = document.createElement('span');
            optionText.className = 'option-text';
            optionText.textContent = option.text;
            
            optionLabel.appendChild(optionInput);
            optionLabel.appendChild(optionText);
            optionsContainer.appendChild(optionLabel);
        });
        
        // 更新导航按钮状态
        prevBtn.disabled = currentQuestion === 0;
        nextBtn.textContent = currentQuestion === questions.length - 1 ? '查看结果' : '下一题';
    }
}

// 处理选项选择
function handleOptionSelect(value) {
    answers[currentQuestion] = parseInt(value);
    
    // 保存答案到本地存储
    localStorage.setItem('sri-answers', JSON.stringify(answers));
}

// 加载保存的答案
function loadAnswers() {
    const savedAnswers = localStorage.getItem('sri-answers');
    if (savedAnswers) {
        try {
            answers = JSON.parse(savedAnswers);
            console.log('已加载保存的答案');
        } catch (e) {
            console.error('加载答案失败:', e);
        }
    }
}

// 前往上一题
function goToPreviousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        renderCurrentQuestion();
        updateProgress();
    }
}

// 前往下一题或查看结果
function goToNextQuestion() {
    if (currentQuestion < questions.length - 1) {
        // 如果没有回答当前问题，显示提示
        if (!answers[currentQuestion]) {
            alert('请回答当前问题');
            return;
        }
        currentQuestion++;
        renderCurrentQuestion();
        updateProgress();
    } else {
        // 检查是否所有问题都已回答
        if (answers.length < questions.length || answers.some(answer => !answer)) {
            alert('请完成所有问题后再提交');
            return;
        }
        // 计算并显示结果
        showResults();
    }
}

// 更新进度条
function updateProgress() {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    progressFill.style.width = `${progress}%`;
}

// 处理键盘导航
function handleKeyboardNavigation(e) {
    if (!questionsPage.classList.contains('active')) return;
    
    if (e.key === 'ArrowLeft') {
        goToPreviousQuestion();
    } else if (e.key === 'ArrowRight') {
        goToNextQuestion();
    } else if (e.key >= '1' && e.key <= '5') {
        // 数字键1-5选择选项
        const optionValue = parseInt(e.key);
        const inputs = document.querySelectorAll('.option-input');
        inputs.forEach(input => {
            if (parseInt(input.value) === optionValue) {
                input.checked = true;
                handleOptionSelect(optionValue);
            }
        });
    }
}

// 触摸开始
function handleTouchStart(e) {
    startX = e.touches[0].clientX;
    touchStartTime = new Date().getTime();
}

// 触摸结束
function handleTouchEnd(e) {
    const endX = e.changedTouches[0].clientX;
    touchEndTime = new Date().getTime();
    
    // 计算滑动距离和时间
    const diffX = startX - endX;
    const diffTime = touchEndTime - touchStartTime;
    
    // 如果滑动距离足够且时间较短，视为有效滑动
    if (Math.abs(diffX) > 50 && diffTime < 500) {
        if (diffX > 0) {
            // 向左滑动，下一题
            goToNextQuestion();
        } else {
            // 向右滑动，上一题
            goToPreviousQuestion();
        }
    }
}

// 显示测试结果
function showResults() {
    // 计算总分
    const totalScore = answers.reduce((sum, answer) => sum + answer, 0);
    
    // 找到对应的评估类型
    let userAssessment = scoreRanges[0]; // 默认保守型
    for (const range of scoreRanges) {
        if (totalScore >= range.min && totalScore <= range.max) {
            userAssessment = range;
            break;
        }
    }
    
    // 更新结果页面
    scoreValue.textContent = totalScore;
    assessmentType.textContent = userAssessment.type;
    assessmentDescription.textContent = assessmentDetails[userAssessment.type].description;
    
    // 清空并添加特征列表
    characteristicsList.innerHTML = '';
    assessmentDetails[userAssessment.type].characteristics.forEach(characteristic => {
        const li = document.createElement('li');
        li.textContent = characteristic;
        characteristicsList.appendChild(li);
    });
    
    // 清空并添加建议列表
    suggestionsList.innerHTML = '';
    assessmentDetails[userAssessment.type].suggestions.forEach(suggestion => {
        const li = document.createElement('li');
        li.textContent = suggestion;
        suggestionsList.appendChild(li);
    });
    
    // 显示结果页面
    showPage(resultsPage);
    
    // 清除本地存储的答案
    localStorage.removeItem('sri-answers');
}

// 重新测试
function restartTest() {
    startTest();
}

// 当 DOM 加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// 防止表单提交
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
    });
});

// 添加无障碍功能
function enhanceAccessibility() {
    // 安全地获取DOM元素
    const optionsContainer = document.querySelector('.options-container');
    
    // 添加ARIA属性
    if (questionsPage) questionsPage.setAttribute('role', 'main');
    if (optionsContainer) optionsContainer.setAttribute('role', 'radiogroup');
    
    // 确保所有按钮都有适当的ARIA标签
    if (prevBtn) prevBtn.setAttribute('aria-label', '上一题');
    if (nextBtn) nextBtn.setAttribute('aria-label', '下一题');
    if (startTestBtn) startTestBtn.setAttribute('aria-label', '开始测试');
    if (restartTestBtn) restartTestBtn.setAttribute('aria-label', '重新测试');
    
    // 键盘焦点样式增强
    const style = document.createElement('style');
    style.textContent = `
        .option-input:focus + .option-text {
            outline: 2px solid #9370db;
            outline-offset: 2px;
        }
        .primary-button:focus,
        .secondary-button:focus {
            outline: 2px solid #9370db;
            outline-offset: 2px;
        }
    `;
    document.head.appendChild(style);
}

// 当页面加载完成后初始化
window.addEventListener('DOMContentLoaded', function() {
    // 初始化应用
    init();
    
    // 增强无障碍功能
    enhanceAccessibility();
});

// 添加打印样式
function addPrintStyles() {
    const style = document.createElement('style');
    style.setAttribute('media', 'print');
    style.textContent = `
        body {
            background: white;
            padding: 0;
        }
        .page-container {
            box-shadow: none;
            padding: 20px;
        }
        #intro-page,
        #questions-page {
            display: none;
        }
        #results-page {
            display: block;
        }
        .btn,
        .progress-container {
            display: none;
        }
        .score-display {
            background: #f0f0f0 !important;
            color: #000 !important;
        }
    `;
    document.head.appendChild(style);
}

// 添加打印样式
addPrintStyles();