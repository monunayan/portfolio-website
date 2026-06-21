// Blog Database
const blogPosts = [
    {
        id: 1,
        title: "Mastering Spring Boot: A Guide to Building Robust REST APIs",
        category: "java",
        categoryName: "Java & Backend",
        date: "June 15, 2026",
        readTime: "5 min read",
        coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800",
        summary: "Learn how to build, secure, and structure robust enterprise-grade RESTful APIs using Spring Boot, JPA, and PostgreSQL.",
        content: `
            <p class="lead">Spring Boot has become the de-facto standard for building Java-based enterprise applications. Its opinionated approach to configuration, auto-wiring, and starter packages allows developers to transition from bootstrap to business logic in minutes.</p>
            
            <h2>Why Choose Spring Boot?</h2>
            <p>Traditional Spring applications required extensive XML configurations or complex Java config files. Spring Boot resolves this complexity by introducing three key features:</p>
            <ul>
                <li><strong>Auto-configuration:</strong> Configures your app automatically based on jar dependencies you add.</li>
                <li><strong>Starter Dependencies:</strong> Standardized groups of dependency descriptors that simplify package management.</li>
                <li><strong>Embedded Servers:</strong> No need to package WAR files and deploy to external Tomcat servers; it runs as an executable JAR.</li>
            </ul>

            <blockquote>
                "Simplifying the developer's journey is not about removing control, but rather providing sensible defaults."
            </blockquote>

            <h2>Core Architecture of a REST API</h2>
            <p>When building a RESTful API, adhering to a layered architecture ensures modularity, testability, and clean code principles. Here is the standard architecture we implement:</p>
            
            <pre><code>// 1. Controller Layer: Exposes HTTP endpoints
@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity&lt;UserDTO&gt; getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }
}</code></pre>

            <p>Next comes the Service Layer, where all business logic is processed, and then the Repository Layer which acts as the abstraction over SQL operations using Spring Data JPA.</p>

            <h2>Handling Exceptional Cases Elegantly</h2>
            <p>Rather than cluttering controller methods with try-catch blocks, Spring Boot allows us to declare a global handler utilizing <code>@ControllerAdvice</code>:</p>

            <pre><code>@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity&lt;ErrorResponse&gt; handleNotFound(ResourceNotFoundException ex) {
        ErrorResponse err = new ErrorResponse("NOT_FOUND", ex.getMessage());
        return new ResponseEntity&lt;&gt;(err, HttpStatus.NOT_FOUND);
    }
}</code></pre>

            <h2>Conclusion</h2>
            <p>By leveraging auto-configuration, strict layering, and clean error handling, you can easily develop robust REST APIs that satisfy real-world corporate standards. In the next post, we will cover OAuth2 and security integrations.</p>
        `
    },
    {
        id: 2,
        title: "Building Interactive Interfaces: 3D Parallax Card Effects",
        category: "web-dev",
        categoryName: "Web Development",
        date: "May 28, 2026",
        readTime: "4 min read",
        coverImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800",
        summary: "Take your portfolio UI to the next level. Let's build interactive hover elements featuring dynamic 3D tilt effects using vanilla JavaScript and CSS.",
        content: `
            <p class="lead">Static websites are a thing of the past. To stand out, portfolios require micro-interactions and interactive elements that engage users immediately. Let's create an elegant 3D Parallax Tilt effect from scratch.</p>

            <h2>The Mathematics Behind Tilt</h2>
            <p>The core concept is to capture the mouse coordinate relative to the card dimensions, calculate the offset from the card's center, and convert that offset into degrees of rotation for both the X and Y axes.</p>

            <pre><code>// Calculating rotations based on cursor coordinate
const rect = card.getBoundingClientRect();
const x = e.clientX - rect.left; // x coordinate inside element
const y = e.clientY - rect.top;  // y coordinate inside element

const centerX = rect.width / 2;
const centerY = rect.height / 2;

// Calculate rotation angle (max 15 degrees)
const rotateX = ((centerY - y) / centerY) * 15;
const rotateY = ((x - centerX) / centerX) * 15;</code></pre>

            <h2>CSS Setup for 3D Space</h2>
            <p>For the rotations to take effect in three dimensions, the parent elements must establish a perspective context. Without setting <code>perspective</code>, the element will look like it is scaling flatly.</p>

            <pre><code>.card-container {
    transform-style: preserve-3d;
    transform: perspective(1000px);
    transition: transform 0.4s ease;
}

/* Elevate specific subelements on hover */
.card-container:hover .card-icon {
    transform: translateZ(50px);
}</code></pre>

            <blockquote>
                "Micro-animations are the bridge between technical functionality and user delight."
            </blockquote>

            <h2>Performance Considerations</h2>
            <p>Adding listeners to many cards can sometimes degrade scrolling performance on low-end devices. To maintain 60 FPS, ensure your transitions target <code>transform</code> and <code>box-shadow</code>, rather than properties that trigger layouts, such as <code>margin</code> or <code>padding</code>.</p>
        `
    },
    {
        id: 3,
        title: "Demystifying Big O: Time Complexity for CSE Students",
        category: "coding",
        categoryName: "Coding & DSA",
        date: "April 10, 2026",
        readTime: "6 min read",
        coverImage: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=800",
        summary: "Struggling with algorithm analysis? A simple, math-free breakdown of time complexities, Big O notation, and sorting comparisons.",
        content: `
            <p class="lead">Understanding algorithm performance is one of the most critical hurdles in Computer Science. Writing working code is not enough; we must build systems that run efficiently at scale.</p>

            <h2>What is Time Complexity?</h2>
            <p>Time complexity does not measure the actual runtime of an algorithm in seconds (since that depends on hardware). Instead, it measures how the execution time increases relative to the size of the input data, represented as <strong>N</strong>.</p>

            <h2>Common Complexities Ranked</h2>
            <ol>
                <li><strong>O(1) - Constant Time:</strong> The execution time remains the same regardless of data size. Example: Accessing an index in an array.</li>
                <li><strong>O(log N) - Logarithmic Time:</strong> The problem space is halved at each step. Example: Binary Search. Highly scalable.</li>
                <li><strong>O(N) - Linear Time:</strong> Runtime increases proportionally with input size. Example: A single loop search.</li>
                <li><strong>O(N log N) - Linearithmic Time:</strong> Common in efficient sorting algorithms like Merge Sort and Quick Sort.</li>
                <li><strong>O(N²) - Quadratic Time:</strong> Two nested loops. Growth scales exponentially. Example: Bubble Sort.</li>
            </ol>

            <blockquote>
                "An engineer who doesn't understand Big O is like a mechanical engineer who ignores friction."
            </blockquote>

            <h2>Visualizing Growth</h2>
            <p>For an input of N = 10,000 items:</p>
            <ul>
                <li>An <strong>O(N)</strong> algorithm executes roughly 10,000 operations.</li>
                <li>An <strong>O(N²)</strong> algorithm executes 100,000,000 operations! This will easily freeze single-threaded servers.</li>
            </ul>

            <pre><code>// Example of O(N log N) - Merge Sort Divider logic
void mergeSort(int[] arr, int left, int right) {
    if (left &lt; right) {
        int mid = left + (right - left) / 2;
        mergeSort(arr, left, mid);      // Logarithmic division
        mergeSort(arr, mid + 1, right);  
        merge(arr, left, mid, right);    // Linear merge operation
    }
}</code></pre>

            <h2>Summary</h2>
            <p>Always review loops, recursions, and database queries. Strive to optimize O(N²) solutions into O(N log N) or O(N) using appropriate data structures like HashMaps or sorting mechanisms.</p>
        `
    },
    {
        id: 4,
        title: "Why Operating Systems Matter for Backend Engineers",
        category: "cs-core",
        categoryName: "CS Core Subjects",
        date: "March 18, 2026",
        readTime: "5 min read",
        coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800",
        summary: "Concurrency, scheduling, and virtual memory. A guide on how low-level OS topics affect real-world backend architectures.",
        content: `
            <p class="lead">Many backend engineers treat the operating system as a black box. However, understanding CPU scheduling, paging, and system calls is key to debugging scaling bugs and thread-locking issues.</p>

            <h2>1. Concurrency vs. Parallelism</h2>
            <p>In modern web servers handling thousands of HTTP requests, CPU cores switch tasks rapidly. Concurrency is about dealing with a lot of things at once (logical structure), whereas Parallelism is about doing a lot of things at once (physical execution on multi-core systems).</p>
            
            <h2>2. The Threat of Thread Contention</h2>
            <p>When multiple threads attempt to access a shared memory resource concurrently, race conditions can occur. Locking structures (like mutexes or synchronized blocks) solve this but introduce thread contention: threads waiting in line, wasting CPU cycles.</p>

            <pre><code>// Contended resource example
public class Counter {
    private int count = 0;
    
    // Lock forces threads to block, degrading throughput
    public synchronized void increment() {
        count++;
    }
}</code></pre>

            <blockquote>
                "Knowing how CPU contexts switch helps you write code that doesn't waste CPU cycles context-switching."
            </blockquote>

            <h2>3. Virtual Memory and Page Faults</h2>
            <p>An OS abstracts physical RAM into virtual memory. If your server application runs out of allocated physical RAM, the OS starts swapping pages onto the disk (swapping). Since disk read/write is thousands of times slower than RAM, your API response times will spike, and the server will crawl.</p>

            <h2>Key Takeaway</h2>
            <p>Optimize your application threads, avoid unnecessary synchronization, design stateless containers to utilize physical multicores, and monitor memory footprints closely to prevent page faults.</p>
        `
    },
    {
        id: 5,
        title: "Top 5 Tips to Crack Competitive Exams Successfully",
        category: "exams",
        categoryName: "Competitive Exam Tips",
        date: "July 2, 2026",
        readTime: "7 min read",
        coverImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800",
        summary: "Struggling with competitive exam preparation? Here is a practical roadmap covering syllabus analysis, notes creation, mock tests, and time management tips.",
        content: `
            <p class="lead">Competitive exams like GATE, UPSC, or national-level placement assessments can feel overwhelming due to their vast syllabus and high difficulty levels. However, a structured approach and smart strategies can significantly boost your clearing odds.</p>

            <h2>1. Analyze the Syllabus and Weightage First</h2>
            <p>Before buying any study material, thoroughly study the official syllabus and previous years' papers. Identify high-weightage topics that yield maximum marks. Rather than trying to cover 100% of the syllabus half-heartedly, focus on mastering 80% of the syllabus with extreme depth.</p>

            <blockquote>
                "Efficiency in competitive preparation is knowing what to skip just as much as knowing what to read."
            </blockquote>

            <h2>2. Create Short Hand-Written Notes</h2>
            <p>While studying a topic, write down formulas, definitions, and key logic in your own words. These short notes will be your main resource during the final weeks. Reviewing standard textbooks right before the exam is impossible; a concise 50-page notebook of your own notes makes revision extremely fast.</p>

            <h2>3. Take Timed Mock Tests Consistently</h2>
            <p>Many students study extensively but fail to complete the paper on time. Start practicing with mock tests under strict exam-like conditions early in your preparation. This helps you build muscle memory for:</p>
            <ul>
                <li><strong>Speed and Accuracy:</strong> Balancing quick answers without making careless negative marking errors.</li>
                <li><strong>Question Selection:</strong> Learning to skip complex, time-consuming questions and securing easy points first.</li>
                <li><strong>Handling Pressure:</strong> Getting comfortable with the timer ticking down.</li>
            </ul>

            <h2>4. Analyze Your Mistakes Post-Test</h2>
            <p>Giving a mock test is only half the battle. Spend at least 2 hours analyzing the test results. Write down the questions you got wrong, identify if it was a calculation error or a conceptual gap, and immediately study that topic again to avoid repeating the mistake.</p>

            <h2>5. Maintain Physical and Mental Well-being</h2>
            <p>Consistency is key, but burning out a month before the exam can derail all your efforts. Maintain a healthy sleep cycle of 7-8 hours, stay hydrated, and take short active breaks during your study sessions. A refreshed mind processes logic much faster on exam day.</p>
        `
    },
    {
        id: 6,
        title: "Technology for Good: Social Service in the Digital Era",
        category: "social-work",
        categoryName: "Social Work",
        date: "July 10, 2026",
        readTime: "6 min read",
        coverImage: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=800",
        summary: "How student communities can leverage technology, teach coding, and build open-source tools to solve real-world local community problems.",
        content: `
            <p class="lead">As developers, we hold a unique skill set that can create massive positive impact. By building software for local non-profits or hosting computer literacy camps, we can directly empower underserved communities.</p>

            <h2>1. Open Source Tools for Local Non-Profits</h2>
            <p>Many local charity organizations operate on paper or inefficient spreadsheets. Developing small inventory systems, donation tracking dashboards, or simple informational websites helps them dedicate more resources to their core mission.</p>

            <h2>2. Digital Literacy Campaigns</h2>
            <p>Teaching basic web development or scratch programming to underprivileged students can inspire them to pursue higher technical education. Community initiatives like these build self-reliance and open doors to high-paying careers.</p>

            <blockquote>
                "The value of software is not only measured by the profit it generates, but by the human challenges it resolves."
            </blockquote>

            <h2>3. Building Accessible Web Interfaces</h2>
            <p>Ensure that the software you develop is accessible to all, including people with physical or cognitive challenges. Adhering to WCAG rules, adding descriptive aria-labels, and maintaining screen-reader compatibility is a basic social responsibility of modern web engineers.</p>
        `
    },
    {
        id: 7,
        title: "Active Recall & Spaced Repetition: Scientific Study Methods",
        category: "exams",
        categoryName: "Competitive Exam Tips",
        date: "July 15, 2026",
        readTime: "6 min read",
        coverImage: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=800",
        summary: "Stop passive reading. Discover how active recall and spaced repetition algorithms can double your long-term memory retention for exams.",
        content: `
            <p class="lead">Passive highlighting and re-reading notes create an illusion of competence. To retain thousands of formulas and theorems for competitive exams, you must switch to scientifically proven active learning methods.</p>

            <h2>1. What is Active Recall?</h2>
            <p>Active recall involves testing your brain to retrieve information without looking at the material. Instead of re-reading a page of formulas, close the book and try to write down all the formulas from memory. This forces the brain to build stronger neural pathways.</p>

            <h2>2. Implementing Spaced Repetition</h2>
            <p>The forgetting curve shows that we forget 50% of new information within 24 hours unless we review it. Review schedules should be spaced out incrementally (e.g., Day 1, Day 3, Day 7, Day 14, Day 30) using flashcard tools like Anki or handwritten cards. This locks facts into long-term memory.</p>

            <blockquote>
                "Memory is not a bucket to fill, but a muscle to build through active retrieval."
            </blockquote>

            <h2>3. The Power of Self-Testing</h2>
            <p>Solve chapter-end questions before you feel fully ready. The struggle to retrieve answers identifies precise knowledge gaps, making your subsequent reading highly targeted and effective.</p>
        `
    },
    {
        id: 8,
        title: "How to Build Speed and Speed Up Calculations for Tech Papers",
        category: "exams",
        categoryName: "Competitive Exam Tips",
        date: "July 20, 2026",
        readTime: "5 min read",
        coverImage: "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?q=80&w=800",
        summary: "Succeed in timed online aptitude and coding assessments. Learn the techniques to solve complex calculations and questions under tight deadlines.",
        content: `
            <p class="lead">Under strict exam timers, speed is the differentiator between average scorers and toppers. Let's look at key mathematical shortcuts and calculation hacks that save precious minutes.</p>

            <h2>1. Memorize Basic Powers and Fractions</h2>
            <p>Having values like fraction equivalents (e.g., 1/8 = 12.5%, 1/16 = 6.25%) and powers of 2 up to 2^10 (1024) at your fingertips prevents manual multiplication mistakes during tests.</p>

            <h2>2. Use Approximation Methods</h2>
            <p>In multiple-choice questions (MCQs), you do not need to calculate values to the fourth decimal place. Round off numbers to estimate the nearest option. This helps you eliminate incorrect options in seconds.</p>

            <blockquote>
                "Do not spend time finding the exact answer if you can eliminate three wrong answers in half the time."
            </blockquote>

            <h2>3. Learn Vedic Math & Short Tricks</h2>
            <p>Techniques for rapid squaring, percentage calculations, and cross-multiplications can reduce paper calculation times by up to 40%. Dedicate 10 minutes daily to speed calculation exercises.</p>
        `
    },
    {
        id: 9,
        title: "Lessons in Leadership: Volunteering at Local NGO Camps",
        category: "social-work",
        categoryName: "Social Work",
        date: "July 25, 2026",
        readTime: "6 min read",
        coverImage: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=800",
        summary: "Discover how organizing local digital literacy camps and volunteering at non-profits builds communication, leadership, and emotional intelligence.",
        content: `
            <p class="lead">Volunteering is not just about helping others; it is one of the most powerful ways to develop professional soft skills that corporate companies value deeply, such as empathy, delegation, and teamwork.</p>

            <h2>1. Cultivating Empathy and Context</h2>
            <p>Working directly with diverse socio-economic communities teaches you to listen actively and solve problems from a user-centric perspective, which is crucial for building software products that appeal to the masses.</p>

            <h2>2. Project Coordination Under Constraints</h2>
            <p>NGO operations often have low budgets and limited resources. Planning camps under these conditions forces you to think creatively, delegate tasks efficiently, and manage logistics effectively.</p>

            <blockquote>
                "Leadership is not a title; it is the willingness to take responsibility and serve those around you."
            </blockquote>

            <h2>3. Communication Across Barriers</h2>
            <p>Explaining technical concepts to people without digital backgrounds refines your communication skills. This directly translates to your ability to pitch tech ideas to non-technical stakeholders in business environments.</p>
        `
    },
    {
        id: 10,
        title: "Empowering Rural Communities Through Free Tech Education",
        category: "social-work",
        categoryName: "Social Work",
        date: "July 30, 2026",
        readTime: "6 min read",
        coverImage: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800",
        summary: "A case study on setting up offline computer literacy workshops in rural schools to bridge the digital divide for younger generations.",
        content: `
            <p class="lead">The digital divide remains a massive barrier to economic growth in developing areas. Teaching basic computer skills, internet safety, and introduction to coding can help bridge this gap for young rural students.</p>

            <h2>1. Designing a Simple Curriculum</h2>
            <p>Keep training materials simple and visual. Using tools like Scratch or Blockly teaches algorithmic thinking without drowning students in complex coding syntax.</p>

            <h2>2. Building Sustainable Community Labs</h2>
            <p>Instead of one-off workshops, setting up local community labs with donated old computers ensures students have continuous access to practice and grow their skills long after the workshop ends.</p>

            <blockquote>
                "Empowerment is not giving someone resources; it is teaching them how to build their own tools."
            </blockquote>

            <h2>3. Driving Collective Volunteer Support</h2>
            <p>Partnering with college student councils and local volunteers expands the reach of tech camps, creating a sustainable network of tech mentors for schools in rural areas.</p>
        `
    }
];

// Elements
const blogGrid = document.getElementById('blogGrid');
const blogSearch = document.getElementById('blogSearch');
const filterBtns = document.querySelectorAll('.filter-btn');
const blogModal = document.getElementById('blogModal');
const modalOverlay = document.getElementById('modalOverlay');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const modalContent = document.getElementById('modalContent');
const progressBar = document.getElementById('progressBar');

// State
let activeCategory = 'all';
let searchQuery = '';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderBlogs();
    setupListeners();
});

// Render Blog Posts
function renderBlogs() {
    blogGrid.innerHTML = '';
    
    // Filter posts
    const filteredPosts = blogPosts.filter(post => {
        const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              post.categoryName.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    if (filteredPosts.length === 0) {
        blogGrid.innerHTML = `
            <div class="no-blogs-found">
                <i class='bx bx-search-alt no-blogs-icon'></i>
                <h3>No articles found</h3>
                <p>We couldn't find any articles matching your search query. Try checking for spelling errors or choosing another category.</p>
            </div>
        `;
        return;
    }

    filteredPosts.forEach(post => {
        const card = document.createElement('div');
        card.className = 'blog-card';
        card.setAttribute('data-id', post.id);
        
        card.innerHTML = `
            <div class="blog-card-image">
                <img src="${post.coverImage}" alt="${post.title}">
                <span class="blog-card-tag">${post.categoryName}</span>
            </div>
            <div class="blog-card-content">
                <div class="blog-card-meta">
                    <span><i class='bx bx-calendar'></i> ${post.date}</span>
                    <span><i class='bx bx-time-five'></i> ${post.readTime}</span>
                </div>
                <h3>${post.title}</h3>
                <p>${post.summary}</p>
                <button class="read-more-btn">Read More <i class='bx bx-right-arrow-alt'></i></button>
            </div>
        `;

        // Card Click to Open Modal
        card.addEventListener('click', (e) => {
            // Prevent double-firing if read-more-btn was clicked
            openBlogModal(post.id);
        });

        blogGrid.appendChild(card);
    });

    // Reinitialize 3D Parallax Tilt Effect for new elements
    initTiltEffect();
}

// Listeners
function setupListeners() {
    // Search input
    if (blogSearch) {
        blogSearch.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            renderBlogs();
        });
    }

    // Category Buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeCategory = btn.getAttribute('data-category');
            renderBlogs();
        });
    });

    // Close Modal Events
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeBlogModal);
    }
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeBlogModal);
    }

    // Modal Scroll progress bar
    if (modalContent) {
        modalContent.addEventListener('scroll', () => {
            const scrollTop = modalContent.scrollTop;
            const scrollHeight = modalContent.scrollHeight - modalContent.clientHeight;
            const scrollPercent = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
            progressBar.style.width = scrollPercent + '%';
        });
    }

    // Keyboard ESC key to close modal
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && blogModal.classList.contains('active')) {
            closeBlogModal();
        }
    });
}

// Modal functions
function openBlogModal(id) {
    const post = blogPosts.find(p => p.id === id);
    if (!post) return;

    // Inject data
    document.getElementById('modalCover').src = post.coverImage;
    document.getElementById('modalCover').alt = post.title;
    document.getElementById('modalCategory').textContent = post.categoryName;
    document.getElementById('modalDate').textContent = post.date;
    document.getElementById('modalReadTime').textContent = post.readTime;
    document.getElementById('modalTitle').textContent = post.title;
    document.getElementById('modalBody').innerHTML = post.content;

    // Reset scroll and progress bar
    modalContent.scrollTop = 0;
    progressBar.style.width = '0%';

    // Activate modal
    blogModal.classList.add('active');
    document.body.classList.add('modal-open');
}

function closeBlogModal() {
    blogModal.classList.remove('active');
    document.body.classList.remove('modal-open');
}

// 3D Parallax Tilt Effect
function initTiltEffect() {
    const cards = document.querySelectorAll('.blog-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((centerY - y) / centerY) * 12; // Max 12deg rotation
            const rotateY = ((x - centerX) / centerX) * 12;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    });
}
