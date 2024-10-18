(() => {
    const $ = document.querySelector.bind(document);

    let timeRotate = 7000;
    let currentRotate = 0;
    let isRotating = false;
    const wheel = $('.wheel');
    const btnWheel = $('.btn--wheel');
    const showMsg = $('.msg');

    //=====< Danh sách phần thưởng >=====
    const listGift = [
        { text: 'Gấu bông ITC', chance: 0.2 }, // 10%
        { text: 'Quạt ITC', chance: 10 },      // 20%
        { text: 'Bình nước ITC', chance: 0.2 },  // 10%
        { text: 'Balo ITC', chance: 0 },         // 10%
        { text: 'Chúc bạn may mắn lần sau', chance: 30 }, // 30%
        { text: 'Bút ITC', chance: 20 },        // 10%
        { text: 'Hồ sơ xét tuyển', chance: 0.6 },  // 5%
        { text: 'Quay lại lần nữa', chance: 30 }   // 5%
    ];

    const totalChance = 100; // Tổng tỉ lệ 100%
    const size = listGift.length;
    const rotate = 360 / size;
    const skewY = 90 - rotate;

    listGift.map((item, index) => {
        const elm = document.createElement('li');
        elm.style.transform = `rotate(${rotate * index}deg) skewY(-${skewY}deg)`;

        elm.innerHTML = `<p style="transform: skewY(${skewY}deg) rotate(${rotate / 2}deg);" class="text ${index % 2 === 0 ? 'text-1' : 'text-2'}">
            <b>${item.text}</b>
        </p>`;

        wheel.appendChild(elm);
    });

    const start = () => {
        showMsg.innerHTML = '';
        isRotating = true;
        const random = Math.random() * totalChance;
        const gift = getGift(random);
        currentRotate += 360 * 10; // Tăng vòng quay
        rotateWheel(currentRotate, gift.index);
        showGift(gift);
    };

    const rotateWheel = (currentRotate, index) => {
        $('.wheel').style.transform = `rotate(${currentRotate - index * rotate - rotate / 2}deg)`;
    };

    const getGift = randomNumber => {
        let currentChance = 0;
        let selectedGift = null;

        for (let i = 0; i < listGift.length; i++) {
            currentChance += listGift[i].chance;
            if (randomNumber < currentChance) {
                selectedGift = { ...listGift[i], index: i };
                break;
            }
        }
        return selectedGift;
    };

    const showGift = gift => {
        let timer = setTimeout(() => {
            isRotating = false;
            showMsg.innerHTML = `Chúc mừng bạn đã nhận được "${gift.text}"`;
            clearTimeout(timer);
        }, timeRotate);
    };

    btnWheel.addEventListener('click', () => {
        !isRotating && start();
    });
})();