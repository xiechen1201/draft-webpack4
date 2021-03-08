import logoImg from './logo.png';

export default function createAvatar02() {
    let img1 = new Image();
    img1.src = logoImg;
    img1.classList.add("avatar");
    document.getElementById("app").appendChild(img1);
}