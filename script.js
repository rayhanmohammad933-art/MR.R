const questions = [
    {
        question: "Berapakah hasil dari $7 \times 8$?",
        answers: {
            a: "49",
            b: "56",
            c: "64",
            d: "72"
        },
        correctAnswer: "b"
    },
    {
        question: "Siapakah penemu bola lampu?",
        answers: {
            a: "Nikola Tesla",
            b: "Alexander Graham Bell",
            c: "Thomas Edison",
            d: "Albert Einstein"
        },
        correctAnswer: "c"
    },
    {
        question: "Apa nama planet terdekat dari Matahari?",
        answers: {
            a: "Venus",
            b: "Mars",
            c: "Merkurius",
            d: "Bumi"
        },
        correctAnswer: "c"
    }
];
// Lanjutan dari kode data 'const questions = [...]' di atas

const quizDiv = document.getElementById('quiz');
const resultsDiv = document.getElementById('results');
const nextBtn = document.getElementById('nextBtn');
const submitBtn = document.getElementById('submitBtn');

let currentQuestionIndex = 0;
let score = 0;
let userAnswers = {}; // Menyimpan jawaban pengguna

// --- FUNGSI UTAMA ---

function buildQuiz() {
    const currentQ = questions[currentQuestionIndex];
    const answersHTML = [];

    // Tampilkan pertanyaan
    let output = <div class="question">${currentQuestionIndex + 1}. ${currentQ.question}</div>;

    // Tampilkan opsi jawaban
    output += '<ul class="answers">';
    for (const letter in currentQ.answers) {
        answersHTML.push(
            `<label>
                <input type="radio" name="question${currentQuestionIndex}" value="${letter}"
                ${userAnswers[currentQuestionIndex] === letter ? 'checked' : ''}>
                ${letter}: ${currentQ.answers[letter]}
            </label>`
        );
    }
    output += answersHTML.join('');
    output += '</ul>';
    
    quizDiv.innerHTML = output;

    // Sembunyikan tombol 'Kirim' kecuali di pertanyaan terakhir
    if (currentQuestionIndex === questions.length - 1) {
        nextBtn.classList.add('hidden');
        submitBtn.classList.remove('hidden');
    } else {
        nextBtn.classList.remove('hidden');
        submitBtn.classList.add('hidden');
    }
    
    resultsDiv.classList.add('hidden'); // Sembunyikan hasil saat kuis berjalan
}

function storeAnswer() {
    // Dapatkan jawaban yang dipilih oleh pengguna
    const selector = input[name=question${currentQuestionIndex}]:checked;
    const userAnswer = (quizDiv.querySelector(selector) || {}).value;

    // Simpan jawaban
    userAnswers[currentQuestionIndex] = userAnswer;
}

function showNextQuestion() {
    storeAnswer(); // Simpan jawaban sebelum pindah

    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        buildQuiz();
    }
}

function showResults() {
    score = 0;
    
    // Pastikan jawaban terakhir disimpan
    storeAnswer();

    // Hitung skor dan tampilkan hasil
    quizDiv.innerHTML = ''; // Kosongkan tampilan pertanyaan

    questions.forEach((currentQ, qIndex) => {
        const userAnswer = userAnswers[qIndex];
        const correct = currentQ.correctAnswer;
        
        let feedbackHTML = <div class="question">${qIndex + 1}. ${currentQ.question}</div>;
        feedbackHTML += '<ul class="answers">';

        for (const letter in currentQ.answers) {
            let className = '';
            
            if (letter === correct) {
                className = 'correct'; // Jawaban benar
            } else if (letter === userAnswer && userAnswer !== correct) {
                className = 'incorrect'; // Jawaban salah pengguna
            }
            
            feedbackHTML += <label class="${className}">${letter}: ${currentQ.answers[letter]}</label>;
        }
        feedbackHTML += '</ul><hr>';

        if (userAnswer === correct) {
            score++;
        }
        
        quizDiv.innerHTML += feedbackHTML;
    });

    resultsDiv.classList.remove('hidden');
    resultsDiv.innerHTML = <h2>Skor Anda: ${score} dari ${questions.length}</h2>;
    
    // Sembunyikan tombol navigasi
    nextBtn.classList.add('hidden');
    submitBtn.classList.add('hidden');
}


// --- EVENT LISTENERS ---

// Mulai kuis saat halaman dimuat
document.addEventListener('DOMContentLoaded', buildQuiz);

// Tombol selanjutnya
nextBtn.addEventListener('click', showNextQuestion);

// Tombol kirim/selesai
submitBtn.addEventListener('click', showResults);
