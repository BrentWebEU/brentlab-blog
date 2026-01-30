/**
 * Prism.js Code Syntax Highlighting
 * Custom initialization with copy buttons and line numbers
 */

(function() {
    'use strict';
    
    // Load Prism.js from CDN
    function loadPrism() {
        return new Promise((resolve, reject) => {
            // Load Prism core
            const prismScript = document.createElement('script');
            prismScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js';
            prismScript.onload = () => {
                // Load additional language components
                loadLanguageComponents().then(resolve);
            };
            prismScript.onerror = reject;
            document.head.appendChild(prismScript);
        });
    }
    
    // Load additional language support
    function loadLanguageComponents() {
        const languages = [
            'markup', 'css', 'clike', 'javascript', 'bash', 'python',
            'java', 'c', 'cpp', 'csharp', 'php', 'ruby', 'go', 'rust',
            'typescript', 'jsx', 'tsx', 'json', 'yaml', 'markdown',
            'sql', 'docker', 'nginx', 'makefile', 'diff'
        ];
        
        const promises = languages.map(lang => {
            return new Promise((resolve) => {
                const script = document.createElement('script');
                script.src = `https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-${lang}.min.js`;
                script.onload = resolve;
                script.onerror = resolve; // Continue even if a language fails to load
                document.head.appendChild(script);
            });
        });
        
        return Promise.all(promises);
    }
    
    // Add copy button to code blocks
    function addCopyButtons() {
        const codeBlocks = document.querySelectorAll('pre[class*="language-"]');
        
        codeBlocks.forEach((block) => {
            // Skip if already has copy button
            if (block.querySelector('.code-copy-btn')) return;
            
            // Create toolbar wrapper
            const toolbar = document.createElement('div');
            toolbar.className = 'code-toolbar';
            
            // Get language from class
            const langClass = Array.from(block.classList).find(cls => cls.startsWith('language-'));
            const language = langClass ? langClass.replace('language-', '') : 'code';
            
            // Create language badge
            const langBadge = document.createElement('div');
            langBadge.className = 'code-lang-badge';
            langBadge.textContent = language.toUpperCase();
            
            // Create copy button
            const copyBtn = document.createElement('button');
            copyBtn.className = 'code-copy-btn';
            copyBtn.setAttribute('aria-label', 'Copy code to clipboard');
            copyBtn.innerHTML = `
                <svg class="code-copy-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                <span class="code-copy-text">Copy</span>
            `;
            
            // Add click handler
            copyBtn.addEventListener('click', async () => {
                const code = block.querySelector('code');
                const text = code.textContent;
                
                try {
                    await navigator.clipboard.writeText(text);
                    
                    // Show success feedback
                    copyBtn.classList.add('copied');
                    copyBtn.querySelector('.code-copy-text').textContent = 'Copied!';
                    
                    // Reset after 2 seconds
                    setTimeout(() => {
                        copyBtn.classList.remove('copied');
                        copyBtn.querySelector('.code-copy-text').textContent = 'Copy';
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy code:', err);
                    copyBtn.querySelector('.code-copy-text').textContent = 'Failed';
                    setTimeout(() => {
                        copyBtn.querySelector('.code-copy-text').textContent = 'Copy';
                    }, 2000);
                }
            });
            
            // Add elements to toolbar
            toolbar.appendChild(langBadge);
            toolbar.appendChild(copyBtn);
            
            // Wrap code block
            block.parentNode.insertBefore(toolbar, block);
            toolbar.appendChild(block);
        });
    }
    
    // Add line numbers option
    function addLineNumbers() {
        const codeBlocks = document.querySelectorAll('pre[class*="language-"]');
        
        codeBlocks.forEach((block) => {
            // Check if line numbers should be added (via data attribute or class)
            if (block.hasAttribute('data-line-numbers') || block.classList.contains('line-numbers')) {
                block.classList.add('line-numbers');
                
                const code = block.querySelector('code');
                if (!code) return;
                
                const lines = code.textContent.split('\n');
                const lineNumbersWrapper = document.createElement('span');
                lineNumbersWrapper.className = 'line-numbers-rows';
                lineNumbersWrapper.setAttribute('aria-hidden', 'true');
                
                // Create line number spans
                lines.forEach(() => {
                    const lineSpan = document.createElement('span');
                    lineNumbersWrapper.appendChild(lineSpan);
                });
                
                block.appendChild(lineNumbersWrapper);
            }
        });
    }
    
    // Highlight specific lines
    function highlightLines() {
        const codeBlocks = document.querySelectorAll('pre[data-line]');
        
        codeBlocks.forEach((block) => {
            const linesToHighlight = block.getAttribute('data-line');
            if (!linesToHighlight) return;
            
            const code = block.querySelector('code');
            if (!code) return;
            
            const lines = code.querySelectorAll('.token.line');
            const ranges = parseLineNumbers(linesToHighlight);
            
            ranges.forEach(range => {
                for (let i = range.start - 1; i < range.end; i++) {
                    if (lines[i]) {
                        lines[i].classList.add('highlight-line');
                    }
                }
            });
        });
    }
    
    // Parse line number ranges (e.g., "1-3,5,7-9")
    function parseLineNumbers(str) {
        const ranges = [];
        const parts = str.split(',');
        
        parts.forEach(part => {
            if (part.includes('-')) {
                const [start, end] = part.split('-').map(Number);
                ranges.push({ start, end });
            } else {
                const num = Number(part);
                ranges.push({ start: num, end: num });
            }
        });
        
        return ranges;
    }
    
    // Initialize code highlighting
    function initCodeHighlighting() {
        const codeBlocks = document.querySelectorAll('pre code');
        
        if (codeBlocks.length === 0) return;
        
        // Load Prism and initialize features
        loadPrism().then(() => {
            // Re-highlight all code blocks
            if (window.Prism) {
                window.Prism.highlightAll();
                
                // Add copy buttons
                setTimeout(() => {
                    addCopyButtons();
                    addLineNumbers();
                    highlightLines();
                }, 100);
            }
        }).catch(err => {
            console.error('Failed to load Prism.js:', err);
        });
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCodeHighlighting);
    } else {
        initCodeHighlighting();
    }
    
})();
