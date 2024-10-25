document.addEventListener("DOMContentLoaded", function() {
    let divs = document.querySelectorAll('.ListDiv > div');
    let currentDiv = 0;

    const imgAnimations = [
        'animate__zoomIn',
        'animate__fadeIn',
        'animate__slideInRight',
        'animate__zoomIn',
    ];

    // Hàm hiển thị từng từ của đoạn văn với hiệu ứng dần dần
    function showWords(element, text, duration) {
        let words = text.split(' ');
        element.innerHTML = '';

        words.forEach((word, index) => {
            let span = document.createElement('span');
            span.classList.add('word');
            span.textContent = word;
            element.appendChild(span);

            if (index < words.length - 1) {
                element.appendChild(document.createTextNode(' '));
            }
        });

        let wordElements = element.querySelectorAll('.word');
        let index = 0;

        function showNextWord() {
            if (index < wordElements.length) {
                setTimeout(() => {
                    wordElements[index].classList.add('show');
                    index++;
                    showNextWord();
                }, duration);
            }
        }

        setTimeout(showNextWord, 500);
    }

    // Hàm hiển thị div tiếp theo
    function showNextDiv() {
        if (currentDiv > 0) {
            divs[currentDiv - 1].classList.remove('hien');
            divs[currentDiv - 1].classList.add('an');
        }

        if (currentDiv < divs.length) {
            divs[currentDiv].classList.add('hien');

            // Hiển thị và thêm hiệu ứng cho ảnh
            let images = divs[currentDiv].querySelectorAll('img');
            images.forEach(img => {
                img.style.display = 'block';
                let imgAnimation = imgAnimations[currentDiv % imgAnimations.length];
                img.classList.add('animate__animated', imgAnimation);
            });

            // Hiển thị từng từ của đoạn văn trong div
            let paragraphs = divs[currentDiv].querySelectorAll('p');
            paragraphs.forEach(p => {
                let text = p.textContent.trim();
                showWords(p, text, 100);
            });

            // Hiển thị và thêm hiệu ứng cho các phần tử hr
            let hrs = divs[currentDiv].querySelectorAll('hr');
            hrs.forEach(hr => {
                hr.style.display = 'block';
                hr.classList.add('animate__animated', 'animate__fadeIn');
            });

            // Sau 6 giây chuyển sang div tiếp theo
            setTimeout(() => {
                currentDiv++;
                showNextDiv();
            }, 6000);
        } else {
            currentDiv = 0;
            setTimeout(() => {
                showNextDiv();
            }, 2000);
        }
    }

    // Bắt đầu từ div đầu tiên
    showNextDiv();
});


window.onload = function() {
    var audio = document.getElementById("myAudio");
    audio.play();
}